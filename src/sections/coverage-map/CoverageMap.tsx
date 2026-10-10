import { m, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useRef, useState, type CSSProperties } from 'react';
import { site, type Locality } from '@/config/site';
import { cn } from '@/lib/cn';
import { MAP_HEIGHT, MAP_WIDTH, municipalities, project } from './geo';

/** Vizinhos com nome discreto no mapa, só para orientar a leitura. */
const CONTEXT_LABELS = new Set(['São Francisco de Itabapoana', 'Quissamã', 'São Fidélis', 'Cardoso Moreira']);

const ease = [0.22, 1, 0.36, 1] as const;

// Os textos do SVG escalam com o mapa; no celular usam tamanhos maiores (em unidades do viewBox).

/**
 * Mapa ilustrado da área de atuação, desenhado com a malha municipal do IBGE.
 * Municípios atendidos em destaque; localidades marcadas com pulso. Passar o
 * mouse (ou focar) um item da lista destaca o ponto correspondente.
 */
export function CoverageMap() {
  const localities = site.coverage.localities;
  const [active, setActive] = useState<string | null>(null);
  // Um único observador para o mapa todo; elementos SVG soltos não são confiáveis com IntersectionObserver.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const served = municipalities.filter((mun) => mun.served);
  const neighbors = municipalities.filter((mun) => !mun.served);

  return (
    <figure ref={ref} className="overflow-hidden rounded-card border border-white/10 bg-navy-900/60 backdrop-blur-sm">
      <div className="grid sm:grid-cols-[minmax(0,1fr)_13.5rem]">
        <div className="relative border-b border-white/10 sm:border-b-0 sm:border-r">
          <svg
            viewBox={`40 40 ${MAP_WIDTH - 40} ${MAP_HEIGHT - 60}`}
            role="img"
            aria-label={`Mapa da área de atuação da FastNet: ${localities.map((l) => l.name).join(', ')}.`}
            className="block h-auto w-full"
          >
            <defs>
              <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.035)" />
              </pattern>
              <linearGradient id="map-served" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#085BDB" stopOpacity="0.55" />
                <stop offset="1" stopColor="#39B9FF" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-grid)" />

            <text textAnchor="middle" className="fill-white/25 text-[13px] italic tracking-[0.2em] sm:text-[10px]">
              <tspan x="566" y="540">OCEANO</tspan>
              <tspan x="566" dy="1.4em">ATLÂNTICO</tspan>
            </text>

            {neighbors.map((mun) => (
              <path
                key={mun.name}
                d={mun.d}
                fill="rgba(255,255,255,0.025)"
                stroke="rgba(255,255,255,0.13)"
                strokeWidth={0.8}
                strokeLinejoin="round"
              />
            ))}

            {neighbors
              .filter((mun) => CONTEXT_LABELS.has(mun.name))
              .map((mun) => (
                <text
                  key={mun.name}
                  x={mun.cx}
                  y={mun.cy}
                  textAnchor="middle"
                  className="fill-white/30 text-[15px] font-medium sm:text-[10px]"
                >
                  {mun.name}
                </text>
              ))}

            {served.map((mun, i) => (
              <m.g
                key={mun.name}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.9, delay: 0.15 * i, ease }}
              >
                {/* Halo largo e translúcido no lugar de um filtro de blur: mesmo efeito, custo quase zero. */}
                <path d={mun.d} fill="none" stroke="rgba(57,185,255,0.12)" strokeWidth={9} strokeLinejoin="round" />
                <path
                  d={mun.d}
                  fill="url(#map-served)"
                  stroke="#39B9FF"
                  strokeWidth={1.3}
                  strokeLinejoin="round"
                />
              </m.g>
            ))}

            {localities.map((place, i) => (
              <Marker
                key={place.name}
                place={place}
                index={i}
                show={inView}
                active={active === place.name}
                dimmed={active !== null && active !== place.name}
              />
            ))}
          </svg>
        </div>

        <figcaption className="flex flex-col p-5 sm:p-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/55">Área de atuação</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
            {localities.map((place) => (
              <li
                key={place.name}
                tabIndex={0}
                onMouseEnter={() => setActive(place.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(place.name)}
                onBlur={() => setActive(null)}
                className={cn(
                  'flex cursor-default items-start gap-2.5 rounded-md outline-none transition-opacity duration-200',
                  'focus-visible:ring-2 focus-visible:ring-sky-brand focus-visible:ring-offset-4 focus-visible:ring-offset-navy-900',
                  active && active !== place.name && 'opacity-45',
                )}
              >
                <MapPin size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-sky-brand" />
                <span className="leading-tight">
                  <span className="block text-[0.9rem] font-semibold text-white">{place.name}</span>
                  <span className="text-[0.76rem] text-white/55">{place.kind}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-6 text-[0.74rem] leading-relaxed text-white/45">
            Mapa ilustrativo. A disponibilidade varia por endereço — consulte o seu ao lado.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

type MarkerProps = { place: Locality; index: number; show: boolean; active: boolean; dimmed: boolean };

function Marker({ place, index, show, active, dimmed }: MarkerProps) {
  const [x, y] = project(place.lon, place.lat);
  const main = place.kind === 'Município';
  const left = place.label === 'left';
  return (
    <m.g
      initial={{ opacity: 0, y: -10 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.12, ease }}
    >
      <g className="transition-opacity duration-200" opacity={dimmed ? 0.4 : 1}>
      <circle
        cx={x}
        cy={y}
        r={main ? 7 : 5.5}
        className="svg-ring fill-none stroke-sky-brand"
        strokeWidth={1.2}
        style={{ '--delay': `${index * 0.45}s` } as CSSProperties}
      />
      <circle
        cx={x}
        cy={y}
        r={active ? (main ? 7 : 6) : main ? 5 : 3.8}
        className="fill-sky-brand stroke-navy transition-[r] duration-200"
        strokeWidth={2}
      />
      <text
        x={left ? x - 11 : x + 11}
        y={y + 4}
        textAnchor={left ? 'end' : 'start'}
        className={cn(
          'paint-halo font-display transition-[fill] duration-200',
          main ? 'text-[20px] font-bold sm:text-[14px]' : 'text-[18px] font-semibold sm:text-[12.5px]',
          active ? 'fill-sky-brand' : 'fill-white',
        )}
      >
        {place.name}
      </text>
      </g>
    </m.g>
  );
}

import type { CSSProperties } from 'react';
import { ArrowRight, Gauge, Headset, MapPin, ShieldCheck, Wifi, Zap } from 'lucide-react';
import { maxSpeed, site, type ResponsiveImage } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

const facts = [
  { icon: Wifi, title: '100%', text: 'Fibra óptica' },
  { icon: Gauge, title: `Até ${maxSpeed} Mb`, text: 'de velocidade' },
  { icon: Headset, title: 'Suporte', text: 'humanizado' },
  { icon: ShieldCheck, title: 'Conexão', text: 'estável' },
];

const delay = (seconds: number) => ({ '--delay': `${seconds}s` }) as CSSProperties;

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy pt-[72px] text-white">
      {!site.images.hero && <FiberComposition />}
      <SpeedBadge />

      <Container className="relative lg:static">
        <div className="grid grid-rows-[1fr_auto] lg:min-h-[min(calc(100svh-72px),820px)]">
          <div className="flex max-w-[600px] flex-col justify-center py-14 sm:py-20">
            <div className="anim-fade-up">
              <Eyebrow tone="dark">Internet fibra óptica em Campos e região</Eyebrow>
            </div>
            <h1
              id="hero-title"
              className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]"
            >
              <span className="anim-line">
                <span style={delay(0.05)}>Internet de verdade</span>
              </span>{' '}
              <span className="anim-line">
                <span style={delay(0.15)}>para tudo que</span>
              </span>{' '}
              <span className="anim-line">
                <span style={delay(0.25)}>
                  <span className="relative inline-block whitespace-nowrap text-electric-bright">
                    move você.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.06em] left-[2%] h-[0.2em] w-[92%] overflow-visible"
                    >
                      <path
                        d="M3 14 C 70 5, 170 3, 297 9"
                        pathLength={1}
                        fill="none"
                        stroke="#39B9FF"
                        strokeWidth={4}
                        strokeLinecap="round"
                        className="anim-draw"
                        style={delay(0.85)}
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>
            <p
              className="anim-fade-up mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-white/75"
              style={delay(0.4)}
            >
              Mais velocidade, mais estabilidade e mais possibilidades para sua casa ou empresa. Conectando Campos dos
              Goytacazes e região com o que há de melhor em fibra óptica.
            </p>
            <div className="anim-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay(0.5)}>
              <Button href="#planos" variant="onDark" size="lg">
                Conhecer planos
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#cobertura" variant="outlineDark" size="lg">
                <MapPin size={18} aria-hidden="true" />
                Consultar cobertura
              </Button>
            </div>
          </div>

          {site.images.hero && <HeroPhoto image={site.images.hero} />}

          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 py-7 sm:grid-cols-4 lg:max-w-[760px] lg:border-t-0 lg:pb-12 lg:pt-0">
            {facts.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="anim-fade-up flex items-center gap-3" style={delay(0.65 + i * 0.08)}>
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" className="shrink-0 text-sky-brand" />
                <p className="text-[0.82rem] leading-tight text-white/70">
                  <span className="block font-semibold text-white">{title}</span>
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/**
 * Foto do hero: no celular é um bloco entre os botões e os destaques; a partir
 * de 1024 px vira o fundo da seção. Um único <img> serve os dois layouts.
 */
function HeroPhoto({ image }: { image: ResponsiveImage }) {
  return (
    <div
      aria-hidden="true"
      className="relative -mx-5 aspect-[4/3] overflow-hidden sm:-mx-8 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:mx-0 lg:aspect-auto"
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="100vw"
        width={image.width}
        height={image.height}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="anim-photo size-full object-cover object-[68%_30%] lg:object-[right_30%]"
      />
      {/* Celular: funde a foto no azul-marinho em cima e embaixo. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#071B3D_0%,rgba(7,27,61,0)_30%,rgba(7,27,61,0)_70%,#071B3D_100%)] lg:hidden" />
      {/* Desktop: lateral esquerda sólida para o texto, base escura para os destaques. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#071B3D_0%,#071B3D_24%,rgba(7,27,61,0.82)_40%,rgba(7,27,61,0.25)_58%,rgba(7,27,61,0)_72%)] lg:block" />
      <div className="absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-navy via-navy/60 to-transparent lg:block" />
      <div className="absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-navy/70 to-transparent lg:block" />
    </div>
  );
}

const fiberPath = (i: number) =>
  `M -40 ${640 - i * 22} C 280 ${600 - i * 34}, 480 ${300 + i * 14}, 840 ${150 + i * 34}`;

/** Fibras que recebem um pulso de luz: poucas, com ritmos diferentes, para não chamar atenção demais. */
const pulses = [
  { line: 2, duration: 7, start: 1.2 },
  { line: 4, duration: 5.5, start: 0.4 },
  { line: 7, duration: 8, start: 3 },
];

/** Composição gráfica usada enquanto a fotografia oficial do hero não é definida. */
function FiberComposition() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute -right-40 top-1/2 size-[780px] -translate-y-1/2 rounded-full bg-electric/25 blur-[140px]" />
      <svg
        viewBox="0 0 800 700"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-y-0 right-0 hidden h-full w-[62%] lg:block"
      >
        <defs>
          <linearGradient id="fiber" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#39B9FF" stopOpacity="0" />
            <stop offset="0.55" stopColor="#39B9FF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#3D8BFF" stopOpacity="0.15" />
          </linearGradient>
          {/* O pulso só acende na metade direita, longe do texto e dos botões. */}
          <linearGradient id="pulse" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0.35" stopColor="#BFE6FF" stopOpacity="0" />
            <stop offset="0.6" stopColor="#BFE6FF" stopOpacity="0.9" />
            <stop offset="1" stopColor="#BFE6FF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={fiberPath(i)}
            fill="none"
            stroke="url(#fiber)"
            strokeWidth={i === 4 ? 1.6 : 0.9}
            opacity={1 - Math.abs(i - 4) * 0.16}
          />
        ))}
        {pulses.map(({ line, duration, start }) => (
          <path
            key={line}
            d={fiberPath(line)}
            pathLength={1}
            fill="none"
            stroke="url(#pulse)"
            strokeWidth={2}
            strokeLinecap="round"
            className="fiber-pulse"
            style={{ '--duration': `${duration}s`, '--delay': `${start}s`, strokeDashoffset: 1 } as CSSProperties}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(7,27,61,0)_0%,rgba(4,17,42,0.65)_100%)]" />
    </div>
  );
}

function SpeedBadge() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'anim-fade-up absolute right-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] hidden xl:block',
        site.images.hero ? 'top-[17%]' : 'top-[34%]',
      )}
      style={delay(0.6)}
    >
    <div className="anim-float w-[220px] overflow-hidden rounded-2xl border border-white/15 bg-navy-900/70 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <div className="bg-electric px-6 py-5">
        <p className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">100%</p>
        <p className="mt-1.5 font-display text-sm font-bold uppercase tracking-[0.08em]">Fibra óptica</p>
      </div>
      <div className="flex items-center gap-3 px-6 py-5">
        <Zap size={26} strokeWidth={1.8} className="text-sky-brand" />
        <p className="font-display leading-none">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/60">Até</span>
          <span className="text-[1.9rem] font-extrabold tabular-nums tracking-[-0.02em]">
            <CountUp to={maxSpeed} delay={0.8} /> Mb
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}

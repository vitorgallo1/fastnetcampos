import { ArrowRight, Gauge, Headset, MapPin, ShieldCheck, Wifi, Zap } from 'lucide-react';
import { maxSpeed, site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

const facts = [
  { icon: Wifi, title: '100%', text: 'Fibra óptica' },
  { icon: Gauge, title: `Até ${maxSpeed} Mb`, text: 'de velocidade' },
  { icon: Headset, title: 'Suporte', text: 'humanizado' },
  { icon: ShieldCheck, title: 'Conexão', text: 'estável' },
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy pt-[72px] text-white">
      <HeroVisual />

      <Container className="relative">
        <div className="grid grid-rows-[1fr_auto] lg:min-h-[min(calc(100svh-72px),820px)]">
          <div className="flex max-w-[600px] flex-col justify-center py-14 sm:py-20">
            <Eyebrow tone="dark">Internet fibra óptica em Campos e região</Eyebrow>
            <h1
              id="hero-title"
              className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]"
            >
              Internet de verdade <br className="hidden sm:block" />
              para tudo que <br className="hidden sm:block" />
              <span className="whitespace-nowrap text-electric-bright">move você.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-white/75"
            >
              Mais velocidade, mais estabilidade e mais possibilidades para sua casa ou empresa. Conectando Campos dos
              Goytacazes e região com o que há de melhor em fibra óptica.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 py-7 sm:grid-cols-4 lg:max-w-[760px] lg:border-t-0 lg:pt-0 lg:pb-12"
          >
            {facts.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
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

function HeroVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {site.images.hero ? (
        <>
          <img
            src={site.images.hero}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-[70%_center] opacity-40 lg:left-[38%] lg:w-[62%] lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/10 lg:via-navy/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />
        </>
      ) : (
        <FiberComposition />
      )}
      <SpeedBadge />
    </div>
  );
}

/** Composição gráfica usada enquanto a fotografia oficial do hero não é definida. */
function FiberComposition() {
  return (
    <>
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
        </defs>
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M -40 ${640 - i * 22} C 280 ${600 - i * 34}, 480 ${300 + i * 14}, 840 ${150 + i * 34}`}
            fill="none"
            stroke="url(#fiber)"
            strokeWidth={i === 4 ? 1.6 : 0.9}
            opacity={1 - Math.abs(i - 4) * 0.16}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(7,27,61,0)_0%,rgba(4,17,42,0.65)_100%)]" />
    </>
  );
}

function SpeedBadge() {
  return (
    <div className="absolute right-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] top-[34%] hidden w-[220px] overflow-hidden rounded-2xl border border-white/15 bg-navy-900/70 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md xl:block">
      <div className="bg-electric px-6 py-5">
        <p className="font-display text-[2.6rem] font-extrabold leading-none tracking-[-0.03em]">100%</p>
        <p className="mt-1.5 font-display text-sm font-bold uppercase tracking-[0.08em]">Fibra óptica</p>
      </div>
      <div className="flex items-center gap-3 px-6 py-5">
        <Zap size={26} strokeWidth={1.8} className="text-sky-brand" />
        <p className="font-display leading-none">
          <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/60">Até</span>
          <span className="text-[1.9rem] font-extrabold tracking-[-0.02em]">{maxSpeed} Mb</span>
        </p>
      </div>
    </div>
  );
}

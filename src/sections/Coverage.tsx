import { MapPin } from 'lucide-react';
import type { CSSProperties } from 'react';
import { site } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { CoverageForm } from './CoverageForm';

export function Coverage() {
  const { coverage, images } = site;
  const localities = coverage.confirmed ? coverage.localities : [];

  return (
    <section
      id="cobertura"
      aria-labelledby="cobertura-title"
      className="relative isolate overflow-hidden bg-navy-950 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {images.coverage ? (
          <>
            <img src={images.coverage} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/50" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)]" />
            <div className="absolute right-[10%] top-1/2 size-[560px] -translate-y-1/2 rounded-full bg-electric/20 blur-[130px]" />
          </>
        )}
      </div>

      <SignalMap />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_minmax(0,440px)] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow tone="dark">Nossa cobertura</Eyebrow>
            <h2
              id="cobertura-title"
              className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem]"
            >
              Campos dos Goytacazes <br className="hidden sm:block" />e região{' '}
              <span className="text-electric-bright">sempre conectadas.</span>
            </h2>
            <p className="mt-5 max-w-[500px] text-[1.02rem] leading-relaxed text-white/75">
              Levamos internet em fibra óptica para Campos dos Goytacazes e região. Informe o seu endereço e nossa
              equipe confirma a disponibilidade para você.
            </p>

            {localities.length > 0 && (
              <div className="mt-10">
                <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white/55">
                  Localidades atendidas
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {localities.map((place) => (
                    <li
                      key={place}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-[0.85rem] text-white/85"
                    >
                      <MapPin size={13} aria-hidden="true" className="text-sky-brand" />
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <CoverageForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Pontos de sinal pulsando ao fundo — ilustrativos, sem representar endereços reais. */
const signals = [
  { top: '22%', left: '46%', delay: 0 },
  { top: '64%', left: '38%', delay: 0.9 },
  { top: '38%', left: '58%', delay: 1.8 },
  { top: '78%', left: '52%', delay: 0.5 },
];

function SignalMap() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      {signals.map(({ top, left, delay }) => (
        <span key={`${top}-${left}`} className="absolute" style={{ top, left }}>
          <span
            className="anim-ring absolute -inset-1.5 rounded-full border border-sky-brand/60"
            style={{ '--delay': `${delay}s` } as CSSProperties}
          />
          <span className="block size-1.5 rounded-full bg-sky-brand shadow-[0_0_12px_3px_rgba(57,185,255,0.45)]" />
        </span>
      ))}
    </div>
  );
}

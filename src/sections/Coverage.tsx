import { site } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { CoverageForm } from './CoverageForm';
import { CoverageMap } from './coverage-map/CoverageMap';

export function Coverage() {
  const { coverage, images } = site;

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

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start lg:gap-14 xl:gap-20">
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
              Levamos internet em fibra óptica para Campos dos Goytacazes, São João da Barra e localidades da
              região. Informe o seu endereço e nossa equipe confirma a disponibilidade para você.
            </p>

            {coverage.confirmed && (
              <div className="mt-10">
                <CoverageMap />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <CoverageForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import { ArrowRight, Check } from 'lucide-react';
import { site, type Plan } from '@/config/site';
import { cn } from '@/lib/cn';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export function Plans() {
  return (
    <section id="planos" aria-labelledby="planos-title" className="bg-mist py-20 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <Eyebrow>Planos residenciais</Eyebrow>
            <h2
              id="planos-title"
              className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.75rem]"
            >
              Escolha o plano ideal <br className="hidden sm:block" />
              para a <span className="text-electric">sua casa.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[460px] text-[1.02rem] leading-relaxed text-ink-muted lg:justify-self-end">
              Internet em fibra óptica para estudar, trabalhar, assistir, jogar e conectar toda a sua família.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-4 lg:mt-14 lg:gap-6">
          {site.plans.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.08} className="flex">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-center text-[0.82rem] text-ink-muted">
          Velocidades e valores mensais sujeitos à viabilidade técnica no endereço. Consulte as condições de contratação
          pelo WhatsApp.
        </p>
      </Container>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);
  return (
    <article
      aria-labelledby={`plano-${plan.id}`}
      className={cn(
        'relative flex w-full flex-col rounded-card p-7 transition-[transform,box-shadow,border-color] duration-300 lg:p-8',
        'hover:-translate-y-1',
        featured
          ? 'bg-navy text-white shadow-lift ring-1 ring-electric/60 md:-my-3 md:py-10 lg:py-11'
          : 'border border-[#DCE5F2] bg-white text-navy shadow-card hover:border-electric/40 hover:shadow-lift',
      )}
    >
      {featured && (
        <p className="absolute -top-3 left-7 rounded-full bg-electric px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white lg:left-8">
          Mais popular
        </p>
      )}

      <h3 id={`plano-${plan.id}`} className="font-display leading-none">
        <span className="block text-[2.6rem] font-extrabold tracking-[-0.035em]">
          {plan.speedMb} <span className="text-[1.6rem]">Mb</span>
        </span>
        <span className={cn('mt-2 block text-lg font-bold', featured ? 'text-sky-brand' : 'text-electric')}>
          {plan.name}
        </span>
      </h3>
      <p className={cn('mt-4 text-[0.93rem] leading-relaxed', featured ? 'text-white/70' : 'text-ink-muted')}>
        {plan.description}
      </p>

      <p className="mt-7 flex items-baseline gap-1 font-display">
        <span className="sr-only">{`R$ ${plan.price} por mês`}</span>
        <span aria-hidden="true" className="text-xl font-bold">R$</span>
        <span aria-hidden="true" className="text-[3.4rem] font-extrabold leading-none tracking-[-0.04em]">{plan.price}</span>
        <span aria-hidden="true" className={cn('text-base font-semibold', featured ? 'text-white/60' : 'text-ink-muted')}>/mês</span>
      </p>

      <Button
        href={whatsappUrl(messages.plan(plan))}
        external
        variant={featured ? 'onDark' : 'outlineLight'}
        className={cn('mt-7 w-full', featured && 'bg-electric hover:bg-[#1468EA]')}
        aria-label={`Assinar o plano ${plan.name} de ${plan.speedMb} Mb pelo WhatsApp`}
      >
        Assinar agora
        <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
      </Button>

      <ul className={cn('mt-7 space-y-3 border-t pt-6', featured ? 'border-white/10' : 'border-[#E6ECF5]')}>
        {plan.highlights.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.9rem]">
            <Check
              size={17}
              strokeWidth={2.4}
              aria-hidden="true"
              className={cn('mt-0.5 shrink-0', featured ? 'text-sky-brand' : 'text-electric')}
            />
            <span className={featured ? 'text-white/85' : 'text-ink'}>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

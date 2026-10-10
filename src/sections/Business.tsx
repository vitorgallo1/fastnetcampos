import { ArrowRight, ClipboardList, Headset, Network, SlidersHorizontal } from 'lucide-react';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const benefits = [
  { icon: Network, title: 'Conexão em fibra óptica', text: 'Infraestrutura em fibra para a rotina da sua empresa.' },
  { icon: ClipboardList, title: 'Diagnóstico da necessidade', text: 'Entendemos a operação antes de propor a solução.' },
  { icon: SlidersHorizontal, title: 'Proposta sob medida', text: 'Conectividade dimensionada para o seu negócio.' },
  { icon: Headset, title: 'Atendimento direto', text: 'Contato com a equipe comercial pelo WhatsApp.' },
];

export function Business() {
  const photo = site.images.business;
  return (
    <section
      id="empresas"
      aria-labelledby="empresas-title"
      className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24"
    >
      {photo ? (
        <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden w-[40%] lg:block">
          <img src={photo} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/30 to-transparent" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-electric/20 blur-[120px]"
        />
      )}

      <Container>
        <div className={cn('grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16', photo && 'lg:pr-[38%] lg:grid-cols-1 xl:grid-cols-[1.1fr_1fr]')}>
          <Reveal>
            <Eyebrow tone="dark">Para sua empresa</Eyebrow>
            <h2
              id="empresas-title"
              className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem]"
            >
              Link Corporativo
            </h2>
            <p className="mt-5 max-w-[480px] text-[1.02rem] leading-relaxed text-white/75">
              Soluções de conectividade sob medida para empresas que precisam de estabilidade, segurança e suporte
              especializado.
            </p>
            <Button
              href={whatsappUrl(messages.business)}
              external
              variant="outlineDark"
              size="lg"
              className="mt-9"
            >
              Falar com um especialista
              <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Reveal>

          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:gap-y-9">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={0.06 * i} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-sky-brand">
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-[0.98rem] font-bold">{title}</h3>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-white/65">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import { Building2, Clock, Headset, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const features = [
  {
    icon: Zap,
    title: 'Fibra óptica',
    text: 'Tecnologia que leva velocidade e estabilidade até a sua casa ou empresa.',
  },
  {
    icon: Headset,
    title: 'Atendimento humanizado',
    text: 'Você fala com pessoas da nossa equipe, de forma simples e direta pelo WhatsApp.',
  },
  {
    icon: Clock,
    title: 'Conectividade para sua rotina',
    text: 'Para estudar, trabalhar, assistir e jogar com a conexão que o seu dia pede.',
  },
  {
    icon: Building2,
    title: 'Residencial e empresarial',
    text: 'Planos para a sua casa e soluções sob medida para o seu negócio.',
  },
];

export function Features() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="bg-white py-20 sm:py-28">
      <Container>
        <Reveal>
          <Eyebrow>Diferenciais FastNet</Eyebrow>
          <h2
            id="beneficios-title"
            className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.75rem]"
          >
            Muito mais que internet.
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-card border border-[#E3EAF4] bg-[#E3EAF4] sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 0.07}
              className="group bg-white p-7 transition-colors duration-300 hover:bg-mist lg:p-8"
            >
              <Icon
                size={26}
                strokeWidth={1.6}
                aria-hidden="true"
                className="text-electric transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h3 className="mt-6 font-display text-[1.05rem] font-bold text-navy">{title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-muted">{text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

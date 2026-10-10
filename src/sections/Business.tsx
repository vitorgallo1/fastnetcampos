import { ArrowRight, ClipboardList, Headset, Network, SlidersHorizontal } from 'lucide-react';
import { site, type ResponsiveImage } from '@/config/site';
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
      {!photo && (
        <div
          aria-hidden="true"
          className="absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-electric/20 blur-[120px]"
        />
      )}

      <Container className={cn(photo && 'xl:static')}>
        {/* Com a arte de fundo, o conteúdo fica na metade esquerda para não cobrir a foto. */}
        <div
          className={cn(
            'grid gap-12',
            'lg:grid-cols-2 lg:items-center lg:gap-16',
            photo && 'xl:max-w-[56%] xl:grid-cols-1 xl:gap-12',
          )}
        >
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
              <Reveal as="li" key={title} delay={0.06 * i} className="group flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.04] text-sky-brand transition-[background-color,border-color,color] duration-300 group-hover:border-sky-brand/50 group-hover:bg-sky-brand/10 group-hover:text-white">
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

        {photo && <BusinessPhoto image={photo} />}
      </Container>
    </section>
  );
}

/**
 * Arte do Link Corporativo: até 1279 px, um card abaixo do conteúdo (no celular,
 * recortado no profissional); a partir de 1280 px, o fundo inteiro da seção —
 * a própria arte já escurece à esquerda, onde fica o texto.
 */
function BusinessPhoto({ image }: { image: ResponsiveImage }) {
  return (
    <div
      aria-hidden="true"
      className="relative mt-12 aspect-[4/3] overflow-hidden rounded-card sm:aspect-[2/1] lg:aspect-[5/2] xl:absolute xl:inset-0 xl:-z-10 xl:mt-0 xl:aspect-auto xl:rounded-none"
    >
      <picture>
        <source media="(min-width: 640px)" srcSet={image.srcSet} sizes="100vw" />
        <img
          src={image.mobile?.src ?? image.src}
          width={image.mobile?.width ?? image.width}
          height={image.mobile?.height ?? image.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-[60%_25%] sm:object-[right_30%] xl:object-[right_center]"
        />
      </picture>
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#071B3D_0%,rgba(7,27,61,0.6)_35%,rgba(7,27,61,0)_60%)] xl:block" />
    </div>
  );
}

import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion';
import { CheckCheck, Clock, Phone } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { site } from '@/config/site';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="overflow-hidden bg-mist py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative order-2 hidden justify-center sm:flex md:order-1">
            <ChatMockup />
          </Reveal>

          <Reveal delay={0.08} className="order-1 md:order-2">
            <Eyebrow>Atendimento</Eyebrow>
            <h2
              id="contato-title"
              className="mt-4 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-navy sm:text-[2.75rem]"
            >
              Fale com a gente <br className="hidden sm:block" />
              pelo WhatsApp.
            </h2>
            <p className="mt-5 max-w-[460px] text-[1.02rem] leading-relaxed text-ink-muted">
              Tire suas dúvidas, consulte cobertura ou contrate seu plano de forma rápida e fácil.
            </p>

            <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Button href={whatsappUrl(messages.general)} external variant="whatsapp" size="lg">
                <WhatsAppIcon size={19} />
                Chamar no WhatsApp
              </Button>
              <a
                href={site.contact.phoneHref}
                className="group flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
              >
                <span className="grid size-11 place-items-center rounded-full border border-electric/25 text-electric transition-colors group-hover:bg-electric group-hover:text-white">
                  <Phone size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-navy">{site.contact.phoneDisplay}</span>
                  <span className="flex items-center gap-1.5 text-[0.82rem] text-ink-muted">
                    <Clock size={12} aria-hidden="true" />
                    Atendimento de {site.contact.hours.toLowerCase()}
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

type Phase = 'idle' | 'typing' | 'sent' | 'replying';

/**
 * Ilustração da conversa iniciada pelo site — reproduz a mensagem real enviada
 * pelo botão. Quando entra na tela, a mensagem é "digitada", enviada e aparece
 * o indicador de resposta. Com movimento reduzido, mostra direto a mensagem.
 */
function ChatMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (reduced) return setPhase('sent');
    if (!inView) return;
    setPhase('typing');
    const timers = [setTimeout(() => setPhase('sent'), 1300), setTimeout(() => setPhase('replying'), 2300)];
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced]);

  return (
    <div ref={ref} aria-hidden="true" className="relative">
      <div className="absolute inset-x-6 bottom-0 top-10 -z-10 rounded-[2rem] bg-navy" />
      <div className="absolute -left-10 top-16 -z-10 size-48 rounded-full bg-electric/25 blur-3xl" />
      <div className="w-[270px] -rotate-[4deg] rounded-[2.4rem] border-[7px] border-[#0B1220] bg-[#0B1220] shadow-[0_40px_80px_-30px_rgba(7,27,61,0.6)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-[#EFE7DD]">
          <div className="flex items-center gap-3 bg-[#0B5C4B] px-4 pb-3 pt-7 text-white">
            <span className="grid size-9 place-items-center rounded-full bg-white font-display text-[0.7rem] font-extrabold text-navy">
              FN
            </span>
            <span className="leading-tight">
              <span className="block text-[0.85rem] font-semibold">{site.name}</span>
              <span className="text-[0.68rem] text-white/75">WhatsApp comercial</span>
            </span>
          </div>
          <div className="flex min-h-[300px] flex-col justify-end gap-2 px-3 pb-4 pt-6">
            <AnimatePresence>
              {phase !== 'typing' && phase !== 'idle' && (
                <m.p
                  key="sent"
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  style={{ originX: 1, originY: 1 }}
                  className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 text-[0.78rem] leading-snug text-[#111B21] shadow-sm"
                >
                  {messages.general}
                  <span className="mt-1 flex items-center justify-end gap-1 text-[0.62rem] text-[#667781]">
                    agora <CheckCheck size={12} className="text-[#53BDEB]" />
                  </span>
                </m.p>
              )}
              {phase === 'replying' && (
                <m.span
                  key="reply"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mr-auto flex gap-1 rounded-xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm"
                >
                  <TypingDots />
                </m.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 bg-[#F0F2F5] px-3 py-2.5">
            <span className="flex h-8 flex-1 items-center gap-1 rounded-full bg-white px-3.5">
              {phase === 'typing' && <TypingDots />}
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-[#0B5C4B] text-white">
              <WhatsAppIcon size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <>
      {[0, 0.15, 0.3].map((d) => (
        <span
          key={d}
          className="typing-dot size-1.5 rounded-full bg-[#8696A0]"
          style={{ '--delay': `${d}s` } as CSSProperties}
        />
      ))}
    </>
  );
}

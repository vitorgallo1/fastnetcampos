import { AnimatePresence, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { messages, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

/**
 * Botão flutuante. Aparece após o hero e some sobre o formulário de cobertura,
 * a seção de contato e o rodapé — e, no celular, sobre os cards de planos —
 * para nunca cobrir campos, botões ou links equivalentes.
 */
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setBlocked(visible.size > 0);
    });
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const guarded = ['cobertura', 'contato', 'rodape', ...(mobile ? ['planos'] : [])];
    guarded.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <AnimatePresence>
      {show && (
        <m.a
          href={whatsappUrl(messages.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a FastNet pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgba(21,128,61,0.6)] transition-colors hover:bg-whatsapp-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
        >
          <WhatsAppIcon size={27} />
        </m.a>
      )}
    </AnimatePresence>
  );
}

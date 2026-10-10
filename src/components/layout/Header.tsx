import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { messages, subscriberPortalHref, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

// 'inicio' e 'contato' entram na observação para limpar o destaque fora das seções do menu.
const sectionIds = ['inicio', ...navLinks.map((l) => l.id), 'contato'];

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        solid
          ? 'border-b border-white/[0.06] bg-navy-950/[0.92] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md'
          : 'border-b border-white/[0.08] bg-transparent',
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <a
          href="#inicio"
          className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
          aria-label="FastNet Campos — página inicial"
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-md px-3.5 py-2 text-[0.88rem] font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand',
                    active === link.id ? 'text-white' : 'text-white/70 hover:text-white',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3.5 -bottom-px h-0.5 origin-left rounded-full bg-sky-brand transition-transform duration-300',
                      active === link.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href={subscriberPortalHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-[0.88rem] font-medium text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
              >
                Central do Assinante
                <ArrowUpRight size={14} aria-hidden="true" className="opacity-60" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={whatsappUrl(messages.hire)}
            external
            variant="whatsapp"
            className="hidden h-10 px-4 text-[0.85rem] focus-visible:ring-offset-navy sm:inline-flex"
          >
            <WhatsAppIcon size={16} />
            Assinar agora
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-11 place-items-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {/* Progresso de leitura em CSS puro (animation-timeline); some onde não há suporte. */}
      <div
        aria-hidden="true"
        className={cn(
          'scroll-progress absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-gradient-to-r from-electric to-sky-brand transition-opacity duration-300',
          scrolled && !open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/[0.06] bg-navy-950 lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              <nav aria-label="Menu móvel">
                <ul className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <m.li
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.04 * (i + 1) }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
                      >
                        {link.label}
                      </a>
                    </m.li>
                  ))}
                  <m.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * (navLinks.length + 1) }}
                  >
                    <a
                      href={subscriberPortalHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
                    >
                      Central do Assinante
                      <ArrowUpRight size={18} aria-hidden="true" className="text-white/50" />
                    </a>
                  </m.li>
                </ul>
              </nav>
              <Button
                href={whatsappUrl(messages.hire)}
                external
                variant="whatsapp"
                size="lg"
                className="mt-6 w-full focus-visible:ring-offset-navy"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon size={18} />
                Assinar agora
              </Button>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

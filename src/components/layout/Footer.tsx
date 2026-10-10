import { ArrowUpRight, Clock, Mail, Phone } from 'lucide-react';
import { navLinks, site } from '@/config/site';
import { messages, subscriberPortalHref, whatsappUrl } from '@/lib/whatsapp';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

const linkClass =
  'rounded text-[0.9rem] text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand';

export function Footer() {
  const socials = [
    { label: 'Instagram', href: site.social.instagram, icon: InstagramIcon },
    { label: 'Facebook', href: site.social.facebook, icon: FacebookIcon },
  ].filter((s): s is typeof s & { href: string } => Boolean(s.href));

  return (
    <footer id="rodape" className="bg-navy-950 pb-10 pt-16 text-white">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[300px] text-[0.9rem] leading-relaxed text-white/60">
              Internet em fibra óptica para casas e empresas de Campos dos Goytacazes e região.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="font-display text-[0.95rem] font-bold">Links</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className={linkClass}>
                  Atendimento
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[0.95rem] font-bold">Atendimento</h2>
            <ul className="mt-4 space-y-3 text-[0.9rem]">
              <li>
                <a href={site.contact.phoneHref} className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <Phone size={16} aria-hidden="true" className="text-sky-brand" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(messages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-2.5`}
                >
                  <WhatsAppIcon size={16} className="text-sky-brand" />
                  Fale pelo WhatsApp
                </a>
              </li>
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <Mail size={16} aria-hidden="true" className="text-sky-brand" />
                    {site.contact.email}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2.5 text-white/65">
                <Clock size={16} aria-hidden="true" className="text-sky-brand" />
                {site.contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[0.95rem] font-bold">Área do cliente</h2>
            <a
              href={subscriberPortalHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-[10px] border border-white/25 px-4 font-display text-[0.88rem] font-semibold transition-colors hover:border-white hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
            >
              Central do Assinante
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} no ${label}`}
                      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand"
                    >
                      <Icon size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legal.companyName ?? site.name}
            {site.legal.cnpj && ` · CNPJ ${site.legal.cnpj}`}. Todos os direitos reservados.
          </p>
          <p>
            {site.city} – {site.state}
          </p>
        </div>
      </Container>
    </footer>
  );
}

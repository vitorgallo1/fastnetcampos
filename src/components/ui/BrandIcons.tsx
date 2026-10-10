import type { SVGProps } from 'react';
import { siFacebook, siInstagram, siWhatsapp } from 'simple-icons';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function brandIcon(path: string) {
  return function BrandIcon({ size = 20, ...props }: IconProps) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
        <path d={path} />
      </svg>
    );
  };
}

export const WhatsAppIcon = brandIcon(siWhatsapp.path);
export const InstagramIcon = brandIcon(siInstagram.path);
export const FacebookIcon = brandIcon(siFacebook.path);

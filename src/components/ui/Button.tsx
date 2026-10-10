import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outlineDark' | 'outlineLight' | 'whatsapp' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-[10px] font-display font-semibold tracking-[-0.005em] ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-brand focus-visible:ring-offset-2 ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-electric text-white hover:bg-electric-600 focus-visible:ring-offset-white',
  onDark: 'bg-electric text-white hover:bg-[#1468EA] focus-visible:ring-offset-navy',
  outlineDark:
    'border border-white/30 text-white hover:border-white hover:bg-white/[0.06] focus-visible:ring-offset-navy',
  outlineLight:
    'border border-electric/35 bg-white text-navy hover:border-electric hover:bg-electric hover:text-white focus-visible:ring-offset-white',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover focus-visible:ring-offset-white',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[0.9rem]',
  lg: 'h-[3.25rem] px-6 text-[0.95rem]',
};

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, external, children: _ch, ...rest } = props as ButtonAsLink;
    return (
      <a
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

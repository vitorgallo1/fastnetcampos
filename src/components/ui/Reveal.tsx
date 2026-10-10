import { m } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' };

/** Entrada suave ao rolar. Desativada automaticamente com prefers-reduced-motion (MotionConfig). */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Component = as === 'li' ? m.li : m.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

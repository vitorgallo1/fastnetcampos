import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-display text-[0.72rem] font-bold uppercase tracking-eyebrow',
        tone === 'dark' ? 'text-sky-brand' : 'text-electric',
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

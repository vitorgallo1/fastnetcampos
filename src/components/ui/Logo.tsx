import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/**
 * Logo oficial (site.logo.onDark). Enquanto o arquivo oficial não for
 * fornecido, exibe apenas o nome da empresa em texto — sem recriar a marca.
 */
export function Logo({ className }: { className?: string }) {
  if (site.logo.onDark) {
    return (
      <img
        src={site.logo.onDark}
        alt={site.name}
        width={site.logo.width}
        height={site.logo.height}
        className={cn('h-9 w-auto', className)}
      />
    );
  }
  return (
    <span className={cn('font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.02em] text-white', className)}>
      FastNet <span className="font-semibold text-ink-soft">Campos</span>
    </span>
  );
}

import { useEffect, useRef } from 'react';

/**
 * Conta de 0 até `to` uma única vez, logo após o carregamento.
 * O HTML pré-renderizado já traz o valor final. Se a página hidratar depois
 * que o número já apareceu na tela (`visibleAfter`), ele fica parado em vez
 * de "voltar" para zero — o mesmo vale para quem prefere menos movimento.
 */
type CountUpProps = { to: number; delay?: number; duration?: number; visibleAfter?: number };

export function CountUp({ to, delay = 0, duration = 1.2, visibleAfter = 0.6 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduced || performance.now() > visibleAfter * 1000) return;

    let frame = 0;
    const start = performance.now() + delay * 1000;
    el.textContent = '0';
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / (duration * 1000), 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(eased * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = String(to);
    };
  }, [to, delay, duration, visibleAfter]);

  return <span ref={ref}>{to}</span>;
}

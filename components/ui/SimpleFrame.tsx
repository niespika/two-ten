import type { ReactNode } from 'react';

export function SimpleFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-[#C3A65C]/45 bg-white/75 p-4 shadow-soft dark:border-brand-darkCopper/60 dark:bg-brand-darkCard ${className}`}
    >
      <div className="pointer-events-none absolute inset-[6px] rounded-[0.9rem] border border-[#C3A65C]/25" />
      <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-[#C3A65C]/60" />
      <span className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r border-t border-[#C3A65C]/60" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[#C3A65C]/60" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-[#C3A65C]/60" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

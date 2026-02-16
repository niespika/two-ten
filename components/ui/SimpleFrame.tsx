import type { ReactNode } from 'react';

export function SimpleFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-[#A99264]/35 bg-white/78 p-4 shadow-soft dark:border-brand-darkCopper/60 dark:bg-brand-darkCard ${className}`}
    >
      <div className="pointer-events-none absolute inset-[7px] rounded-[0.9rem] border border-[#A99264]/18" />
      <span className="pointer-events-none absolute left-3 top-3 h-2 w-2 border-l border-t border-[#A99264]/45" />
      <span className="pointer-events-none absolute right-3 top-3 h-2 w-2 border-r border-t border-[#A99264]/45" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-2 w-2 border-b border-l border-[#A99264]/45" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 border-b border-r border-[#A99264]/45" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

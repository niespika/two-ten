import type { ReactNode } from 'react';
import { CornerFlourish, TopMotif } from '@/components/ui/ornaments';

export function OrnateFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`paper-grain relative overflow-hidden rounded-[1.75rem] border border-[#C3A65C]/55 bg-white/80 p-5 shadow-soft dark:border-brand-darkCopper/70 dark:bg-brand-darkCard/95 ${className}`}
    >
      <div className="pointer-events-none absolute inset-[8px] rounded-[1.35rem] border border-[#C3A65C]/40" />
      <TopMotif className="pointer-events-none absolute left-1/2 top-2 h-6 w-[11rem] -translate-x-1/2 text-[#C3A65C]/85" />

      <CornerFlourish className="pointer-events-none absolute left-1 top-1 h-14 w-14 text-[#C3A65C]/80" />
      <CornerFlourish className="pointer-events-none absolute right-1 top-1 h-14 w-14 scale-x-[-1] text-[#C3A65C]/80" />
      <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 h-14 w-14 scale-y-[-1] text-[#C3A65C]/80" />
      <CornerFlourish className="pointer-events-none absolute bottom-1 right-1 h-14 w-14 scale-[-1] text-[#C3A65C]/80" />

      <div className="relative z-10 mt-5">{children}</div>
    </section>
  );
}

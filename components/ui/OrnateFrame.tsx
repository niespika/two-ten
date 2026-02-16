import type { ReactNode } from 'react';
import { FrameEngraving } from '@/components/ui/ornaments';

export function OrnateFrame({ children, className = '', minimal = false }: { children: ReactNode; className?: string; minimal?: boolean }) {
  return (
    <section
      className={`paper-grain relative overflow-hidden rounded-[1.75rem] border border-[#A99264]/44 bg-white/82 p-7 shadow-soft dark:border-brand-darkCopper/70 dark:bg-brand-darkCard/95 ${className}`}
    >
      <FrameEngraving className="pointer-events-none absolute inset-0 text-[#A99264]/78" minimal={minimal} />
      <div className="pointer-events-none absolute inset-[13px] rounded-[1.4rem] border border-[#A99264]/18" />

      <div className={`relative z-10 ${minimal ? 'mt-2' : 'mt-4'}`}>{children}</div>
    </section>
  );
}

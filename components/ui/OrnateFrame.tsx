import type { ReactNode } from 'react';
import { CornerFlourish, TopMotif } from '@/components/ui/ornaments';

export function OrnateFrame({ children, className = '', minimal = false }: { children: ReactNode; className?: string; minimal?: boolean }) {
  return (
    <section
      className={`paper-grain relative overflow-hidden rounded-[1.75rem] border border-[#A99264]/45 bg-white/82 p-7 shadow-soft dark:border-brand-darkCopper/70 dark:bg-brand-darkCard/95 ${className}`}
    >
      <div className="pointer-events-none absolute inset-[9px] rounded-[1.3rem] border border-[#A99264]/28" />
      {!minimal && <TopMotif className="pointer-events-none absolute left-1/2 top-2 h-5 w-[10rem] -translate-x-1/2 text-[#A99264]/70" />}

      <CornerFlourish className={`pointer-events-none absolute left-[5px] top-[5px] text-[#A99264]/65 ${minimal ? 'h-9 w-9' : 'h-11 w-11'}`} />
      <CornerFlourish className={`pointer-events-none absolute right-[5px] top-[5px] scale-x-[-1] text-[#A99264]/65 ${minimal ? 'h-9 w-9' : 'h-11 w-11'}`} />
      <CornerFlourish className={`pointer-events-none absolute bottom-[5px] left-[5px] scale-y-[-1] text-[#A99264]/65 ${minimal ? 'h-9 w-9' : 'h-11 w-11'}`} />
      <CornerFlourish className={`pointer-events-none absolute bottom-[5px] right-[5px] scale-[-1] text-[#A99264]/65 ${minimal ? 'h-9 w-9' : 'h-11 w-11'}`} />

      <div className={`relative z-10 ${minimal ? "mt-2" : "mt-4"}`}>{children}</div>
    </section>
  );
}

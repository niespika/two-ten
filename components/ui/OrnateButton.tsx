import type { ButtonHTMLAttributes } from 'react';
import { SideFlourish } from '@/components/ui/ornaments';

export function OrnateButton({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`group relative inline-flex min-h-12 w-full items-center justify-center gap-4 overflow-hidden rounded-full border border-[#9F885D]/80 bg-[#2A4742] px-7 py-[0.92rem] font-serif text-3xl text-brand-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-2px_6px_rgba(10,22,20,0.28),0_2px_8px_rgba(42,71,66,0.22)] transition duration-200 hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F885D] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg dark:bg-brand-darkGreen dark:text-brand-darkText dark:focus-visible:ring-offset-brand-darkBg ${className}`}
    >
      <div className="pointer-events-none absolute inset-[4px] rounded-full border border-[#9F885D]/72" />
      <SideFlourish className="h-4 w-[3.3rem] shrink-0 text-[#B49A67]" />
      <span className="relative z-10 leading-none tracking-[0.03em]">{children}</span>
      <SideFlourish className="h-4 w-[3.3rem] shrink-0 scale-x-[-1] text-[#B49A67]" />
    </button>
  );
}

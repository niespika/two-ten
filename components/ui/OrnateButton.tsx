import type { ButtonHTMLAttributes } from 'react';
import { CartoucheFlourish } from '@/components/ui/ornaments';

export function OrnateButton({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`group relative inline-flex min-h-12 w-full items-center justify-center gap-1 overflow-hidden rounded-[999px] border border-[#94784B]/85 bg-[#2A4742] px-6 py-[0.9rem] font-serif text-3xl text-brand-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-2px_8px_rgba(8,21,18,0.32),0_2px_8px_rgba(42,71,66,0.22)] transition duration-200 hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F885D] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg dark:bg-brand-darkGreen dark:text-brand-darkText dark:focus-visible:ring-offset-brand-darkBg ${className}`}
    >
      <div className="pointer-events-none absolute inset-[4px] rounded-[999px] border border-[#9B7F51]/78" />
      <div className="pointer-events-none absolute inset-[7px] rounded-[999px] border border-[#C3A96F]/36" />

      <CartoucheFlourish className="h-5 w-[4.3rem] shrink-0" />
      <span className="relative z-10 px-2 leading-none tracking-[0.03em]">{children}</span>
      <CartoucheFlourish className="h-5 w-[4.3rem] shrink-0 scale-x-[-1]" />
    </button>
  );
}

import type { ButtonHTMLAttributes } from 'react';
import { SideFlourish } from '@/components/ui/ornaments';

export function OrnateButton({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`group relative inline-flex min-h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#C3A65C] bg-brand-green px-6 py-3 font-serif text-3xl text-brand-bg shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_3px_12px_rgba(46,79,79,0.25)] transition duration-200 hover:brightness-105 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0_14px_rgba(195,166,92,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3A65C] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg dark:bg-brand-darkGreen dark:text-brand-darkText dark:focus-visible:ring-offset-brand-darkBg ${className}`}
    >
      <div className="pointer-events-none absolute inset-[4px] rounded-full border border-[#C3A65C]/85" />
      <SideFlourish className="h-5 w-10 shrink-0 text-[#D2B36D]" />
      <span className="relative z-10 leading-none tracking-wide">{children}</span>
      <SideFlourish className="h-5 w-10 shrink-0 scale-x-[-1] text-[#D2B36D]" />
    </button>
  );
}

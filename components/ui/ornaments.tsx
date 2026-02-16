import type { SVGProps } from 'react';

type OrnamentProps = SVGProps<SVGSVGElement>;

export function CornerFlourish({ className, ...props }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      {...props}
    >
      <path
        d="M4 60C15 52 22 41 22 26C22 16 19 8 14 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 60C25 49 36 35 38 20C39 13 37 8 34 4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M13 51C21 48 27 43 29 35"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M22 16C26 12 31 10 36 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="30" cy="32" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function TopMotif({ className, ...props }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 180 26"
      aria-hidden="true"
      className={className}
      fill="none"
      {...props}
    >
      <path d="M8 13H72" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M108 13H172" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M76 13C81 13 83 10 86 7C88 5 91 5 93 7C96 10 99 13 104 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M84 15C87 15 89 17 90 20C91 17 93 15 96 15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="90" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function SideFlourish({ className, ...props }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 40 24"
      aria-hidden="true"
      className={className}
      fill="none"
      {...props}
    >
      <path
        d="M2 12H16C18 12 19 10 19 8C19 5 17 3 13 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 21C16 21 19 18 19 15C19 13 20 12 22 12H38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

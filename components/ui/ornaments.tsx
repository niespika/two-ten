import type { SVGProps } from 'react';

type OrnamentProps = SVGProps<SVGSVGElement>;

export function FrameEngraving({ className, minimal = false, ...props }: OrnamentProps & { minimal?: boolean }) {
  const inset = minimal ? 12 : 10;
  const outer = minimal ? 18 : 16;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className={className} fill="none" {...props}>
      <path
        d={`M${outer} 8C9.5 8 8 9.5 8 11V${outer}C8 18 9.3 19.8 11.6 20.4C14.8 21.2 16.2 18 17.8 15.6C19.7 12.7 22 10.8 25.5 10.2C28.1 9.8 30.1 10.4 32.6 11.9C35.1 13.3 37.2 14.3 39.7 13.7C42.4 13.1 43.5 10.7 44.6 8.5C45.4 6.9 46.4 5.8 48 5.4C49.6 5 50.9 5.5 52 6.6C53.3 8 54 9.7 54.9 11.4C56 13.4 57.4 14.8 59.8 14.8C62.3 14.8 64 13 66.2 11.7C69.9 9.5 73.9 9.7 77.7 11.8C80.9 13.6 82.6 16.1 83.8 19.4C84.6 21.8 85.8 22.8 88.3 22.3C90.7 21.8 92 19.7 92 17.2V11C92 9.3 90.7 8 89 8H${100 - outer}`}
        stroke="currentColor"
        strokeWidth="0.58"
        strokeLinecap="round"
      />
      <path
        d={`M${100 - outer} 92C90.7 92 92 90.7 92 89V${100 - outer}C92 82 90.7 80.2 88.4 79.6C85.2 78.8 83.8 82 82.2 84.4C80.3 87.3 78 89.2 74.5 89.8C71.9 90.2 69.9 89.6 67.4 88.1C64.9 86.7 62.8 85.7 60.3 86.3C57.6 86.9 56.5 89.3 55.4 91.5C54.6 93.1 53.6 94.2 52 94.6C50.4 95 49.1 94.5 48 93.4C46.7 92 46 90.3 45.1 88.6C44 86.6 42.6 85.2 40.2 85.2C37.7 85.2 36 87 33.8 88.3C30.1 90.5 26.1 90.3 22.3 88.2C19.1 86.4 17.4 83.9 16.2 80.6C15.4 78.2 14.2 77.2 11.7 77.7C9.3 78.2 8 80.3 8 82.8V89C8 90.7 9.3 92 11 92H${outer}`}
        stroke="currentColor"
        strokeWidth="0.58"
        strokeLinecap="round"
      />
      <path
        d={`M${inset} 13.5H${100 - inset}M${inset} 86.5H${100 - inset}M13.5 ${inset}V${100 - inset}M86.5 ${inset}V${100 - inset}`}
        stroke="currentColor"
        strokeWidth="0.42"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M22 13.5C24.6 14.7 26.8 16.5 28.5 18.8M78 13.5C75.4 14.7 73.2 16.5 71.5 18.8M22 86.5C24.6 85.3 26.8 83.5 28.5 81.2M78 86.5C75.4 85.3 73.2 83.5 71.5 81.2"
        stroke="currentColor"
        strokeWidth="0.38"
        strokeLinecap="round"
        opacity="0.85"
      />
      {!minimal && (
        <>
          <path d="M31 13.5C37.5 13.4 41.2 11.2 44.6 8.3C46.2 6.9 47.9 6.4 49.8 6.8C51.6 7.1 53 8.3 54.4 9.8C58.1 13.7 62.8 14.6 69 13.5" stroke="currentColor" strokeWidth="0.47" strokeLinecap="round" />
          <path d="M42.8 15.2C45.5 15.5 47.3 16.8 48.3 19M57.2 15.2C54.5 15.5 52.7 16.8 51.7 19" stroke="currentColor" strokeWidth="0.34" strokeLinecap="round" opacity="0.85" />
        </>
      )}
    </svg>
  );
}

export function CartoucheFlourish({ className, ...props }: OrnamentProps) {
  return (
    <svg viewBox="0 0 72 24" aria-hidden="true" className={className} fill="none" {...props}>
      <path d="M1 12H21C24.6 12 27.1 10.5 29 8.1C30.8 5.8 32.8 4.2 35.8 4" stroke="url(#cartoucheGold)" strokeWidth="0.75" strokeLinecap="round" />
      <path d="M14 19.8C20.5 19.8 24.5 17.5 27.8 14.6C30.2 12.4 32.4 11 36.2 10.8" stroke="url(#cartoucheGold)" strokeWidth="0.58" strokeLinecap="round" opacity="0.95" />
      <path d="M27.8 14.6C28.1 16.8 29.4 18.6 31.4 19.5" stroke="url(#cartoucheGold)" strokeWidth="0.46" strokeLinecap="round" opacity="0.82" />
      <circle cx="36.2" cy="10.8" r="0.8" fill="url(#cartoucheGold)" opacity="0.88" />
      <defs>
        <linearGradient id="cartoucheGold" x1="1" y1="11" x2="41" y2="11" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8D7448" />
          <stop offset="0.54" stopColor="#CBB27A" />
          <stop offset="1" stopColor="#967A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

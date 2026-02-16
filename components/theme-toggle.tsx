'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="min-h-12 rounded-xl border border-black/15 px-3 text-sm dark:border-white/20"
        disabled
        suppressHydrationWarning
      >
        Theme
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="min-h-12 rounded-xl border border-black/15 px-3 text-sm dark:border-white/20"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { TOAST_EVENT, type ToastPayload } from '@/lib/toast';

type ToastItem = ToastPayload;

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>;
      const payload = customEvent.detail;
      setItems((prev) => [...prev, payload]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== payload.id));
      }, 2600);
    };

    window.addEventListener(TOAST_EVENT, listener as EventListener);
    return () => window.removeEventListener(TOAST_EVENT, listener as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex flex-col items-center gap-2 px-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`w-full max-w-sm rounded-xl border px-3 py-2 text-sm shadow-lg ${
            item.variant === 'success'
              ? 'border-emerald-600/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
              : 'border-red-700/30 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100'
          }`}
          role="status"
          aria-live="polite"
        >
          {item.message}
        </div>
      ))}
    </div>
  );
}

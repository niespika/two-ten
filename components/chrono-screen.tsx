'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OrnateFrame } from '@/components/ui/OrnateFrame';

type ChronoState = {
  sessionId: string;
  exerciseId: string;
  weightLb: number;
  startedAtMs: number;
};

const COUNTDOWN_SECONDS = 5;
const MAX_EFFORT_SECONDS = 130;

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function ChronoScreen({ state, onDone }: { state: ChronoState; onDone: () => void }) {
  const [now, setNow] = useState(Date.now());
  const savingRef = useRef(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const elapsedTotal = Math.max(0, Math.floor((now - state.startedAtMs) / 1000));
  const countdownLeft = Math.max(0, COUNTDOWN_SECONDS - elapsedTotal);
  const effort = Math.max(0, elapsedTotal - COUNTDOWN_SECONDS);
  const running = effort < MAX_EFFORT_SECONDS;

  const stop = useCallback(async (manual: boolean) => {
    if (savingRef.current) return;
    savingRef.current = true;
    const elapsedSeconds = Math.min(MAX_EFFORT_SECONDS, Math.max(0, Math.floor((Date.now() - state.startedAtMs) / 1000) - COUNTDOWN_SECONDS));

    await fetch('/api/sets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: state.sessionId,
        exerciseId: state.exerciseId,
        weightLb: state.weightLb,
        elapsedSeconds,
        performedAt: new Date().toISOString(),
        manual,
      }),
    });

    localStorage.removeItem('active-chrono');
    await wakeLockRef.current?.release();
    onDone();
  }, [onDone, state.exerciseId, state.sessionId, state.startedAtMs, state.weightLb]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem('active-chrono', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').then((lock) => {
        wakeLockRef.current = lock;
      }).catch(() => undefined);
    }
    return () => {
      wakeLockRef.current?.release().catch(() => undefined);
    };
  }, []);

  useEffect(() => {
    if (!running) {
      stop(false).catch(() => undefined);
    }
  }, [running, stop]);

  const text = useMemo(() => {
    if (countdownLeft > 0) return String(countdownLeft);
    return format(effort);
  }, [countdownLeft, effort]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-brand-bg px-4 dark:bg-brand-darkBg">
      <OrnateFrame className="w-full max-w-[420px] text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] opacity-70">{countdownLeft > 0 ? 'Get Ready' : 'Effort'}</p>
        <div className="font-serif text-8xl transition-all duration-500 ease-out">{text}</div>
        <button onClick={() => stop(true)} className="btn-primary mt-12 max-w-[280px] text-xl">Stop</button>
      </OrnateFrame>
    </div>
  );
}

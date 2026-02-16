'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChronoScreen } from '@/components/chrono-screen';
import { RecommendationBadge, recommendation } from '@/components/recommendation-badge';
import { OrnateButton } from '@/components/ui/OrnateButton';
import { OrnateFrame } from '@/components/ui/OrnateFrame';
import { SimpleFrame } from '@/components/ui/SimpleFrame';

type ExerciseMeta = {
  id: string;
  name: string;
  incrementLb: number;
  lastWeight: number | null;
  lastDuration: number | null;
};

function fmtDuration(seconds: number | null) {
  if (seconds == null) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function SessionFlow({ sessionId, exercises }: { sessionId: string; exercises: ExerciseMeta[] }) {
  const [exerciseId, setExerciseId] = useState(exercises[0]?.id ?? '');
  const [weightLb, setWeightLb] = useState<number>(exercises[0]?.lastWeight ?? 0);
  const [active, setActive] = useState<null | { sessionId: string; exerciseId: string; weightLb: number; startedAtMs: number }>(null);


  useEffect(() => {
    const raw = localStorage.getItem('active-chrono');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as { sessionId: string; exerciseId: string; weightLb: number; startedAtMs: number };
      if (parsed.sessionId === sessionId) {
        setActive(parsed);
        setExerciseId(parsed.exerciseId);
        setWeightLb(parsed.weightLb);
      }
    } catch {
      localStorage.removeItem('active-chrono');
    }
  }, [sessionId]);
  const current = useMemo(() => exercises.find((e) => e.id === exerciseId), [exerciseId, exercises]);
  const rec = recommendation(current?.lastDuration ?? null, current?.lastWeight ?? null, current?.incrementLb ?? 5);

  const handleChangeExercise = (id: string) => {
    setExerciseId(id);
    const ex = exercises.find((item) => item.id === id);
    setWeightLb(ex?.lastWeight ?? 0);
  };

  return (
    <div className="space-y-4">
      {active && (
        <ChronoScreen
          state={active}
          onDone={() => {
            setActive(null);
            window.location.reload();
          }}
        />
      )}
      <OrnateFrame className="space-y-3">
        <label className="text-sm uppercase tracking-[0.14em] text-brand-text/75">Exercise</label>
        <select className="input" value={exerciseId} onChange={(event) => handleChangeExercise(event.target.value)}>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
          ))}
        </select>

        <label className="text-sm uppercase tracking-[0.14em] text-brand-text/75">Proposed weight (lb)</label>
        <input className="input" type="number" step="5" value={weightLb} onChange={(event) => {
            const next = Number(event.target.value);
            setWeightLb(Number.isFinite(next) ? next : 0);
          }} />

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-brand-text/85">Last duration: <strong className="font-semibold">{fmtDuration(current?.lastDuration ?? null)}</strong></p>
          <RecommendationBadge label={rec.label} tone={rec.tone} />
        </div>

        {rec.nextWeight && <p className="text-sm text-brand-text/85">Recommended weight: <strong className="font-semibold">{rec.nextWeight} lb</strong></p>}

        <OrnateButton
          type="button"
          className="mt-2"
          onClick={() => {
            if (!exerciseId) return;
            const normalizedWeight = Math.max(0, Math.round(weightLb / 5) * 5);
            setWeightLb(normalizedWeight);
            setActive({ sessionId, exerciseId, weightLb: normalizedWeight, startedAtMs: Date.now() });
          }}
        >
          Start Set
        </OrnateButton>
      </OrnateFrame>

      <SimpleFrame>
        {/* Keep non-primary actions intentionally minimalist to preserve clear CTA hierarchy. */}
        <button
          type="button"
          className="btn-secondary"
          onClick={async () => {
            await fetch('/api/sessions/end', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId }),
            });
            window.location.href = '/dashboard';
          }}
        >
          End Session
        </button>
      </SimpleFrame>
    </div>
  );
}

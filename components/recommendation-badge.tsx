export function recommendation(durationSeconds: number | null, weightLb: number | null, increment = 5) {
  if (!durationSeconds || !weightLb) {
    return { label: 'No data', tone: 'neutral' as const, nextWeight: null as number | null };
  }
  if (durationSeconds > 120) {
    return {
      label: 'Increase weight',
      tone: 'up' as const,
      nextWeight: weightLb + increment,
    };
  }
  return { label: 'Keep weight', tone: 'keep' as const, nextWeight: null as number | null };
}

export function RecommendationBadge({ label, tone }: { label: string; tone: 'up' | 'keep' | 'neutral' }) {
  const classes = {
    up: 'border-brand-copper/50 text-brand-copper dark:border-brand-darkCopper/60 dark:text-brand-darkCopper',
    keep: 'border-brand-green/40 text-brand-green dark:border-brand-darkGreen/60 dark:text-brand-darkGreen',
    neutral: 'border-black/15 text-black/70 dark:border-white/20 dark:text-white/70',
  };

  return <span className={`rounded-full border px-3 py-1 text-xs tracking-wide ${classes[tone]}`}>{label}</span>;
}

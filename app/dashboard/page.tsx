import Link from 'next/link';
import { format } from 'date-fns';
import { ThemeToggle } from '@/components/theme-toggle';
import { RecommendationBadge, recommendation } from '@/components/recommendation-badge';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';
import { SimpleFrame } from '@/components/ui/SimpleFrame';

function fmtDuration(seconds: number | null) {
  if (seconds == null) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default async function DashboardPage() {
  const user = await requireUser();

  const exercises = await prisma.exercise.findMany({
    where: { userId: user.id },
    orderBy: { name: 'asc' },
    include: {
      setLogs: {
        take: 1,
        orderBy: { performedAt: 'desc' },
      },
    },
  });

  return (
    <main className="app-shell mx-auto min-h-screen max-w-[420px] space-y-4 px-4 py-4">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-brand-green dark:text-brand-darkCopper">Dashboard</h1>
        <ThemeToggle />
      </header>

      <Link className="btn-primary" href="/session/new">
        New Session
      </Link>

      <Link className="btn-secondary" href="/exercises">
        Manage Exercises
      </Link>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Progress</h2>
        {exercises.map((exercise) => {
          const last = exercise.setLogs[0] ?? null;
          const rec = recommendation(last?.durationSeconds ?? null, last?.weightLb ?? null, exercise.incrementLb);

          return (
            <SimpleFrame key={exercise.id} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-medium">{exercise.name}</h3>
                <RecommendationBadge label={rec.label} tone={rec.tone} />
              </div>
              <p className="text-sm">Current weight: <strong>{last?.weightLb ?? '-'} lb</strong></p>
              <p className="text-sm">Last duration: <strong>{fmtDuration(last?.durationSeconds ?? null)}</strong></p>
              {last && <p className="text-xs opacity-70">Last set: {format(last.performedAt, 'MMM d')}</p>}
              <Link href={`/exercises/${exercise.id}`} className="text-sm underline underline-offset-4">
                View chart
              </Link>
            </SimpleFrame>
          );
        })}
      </section>
    </main>
  );
}

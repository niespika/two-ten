import Link from 'next/link';
import { format } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';
import { ExerciseChart } from '@/components/exercise-chart';

export default async function ExerciseDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const exercise = await prisma.exercise.findFirst({
    where: { id: params.id, userId: user.id },
    include: {
      setLogs: {
        orderBy: { performedAt: 'asc' },
      },
    },
  });

  if (!exercise) {
    return <main className="mx-auto max-w-[420px] p-4">Exercise not found.</main>;
  }

  const chartData = exercise.setLogs.map((log) => ({
    date: format(log.performedAt, 'MMM d'),
    weightLb: log.weightLb,
    durationSeconds: log.durationSeconds,
  }));

  return (
    <main className="app-shell mx-auto min-h-screen max-w-[420px] space-y-4 px-4 py-4">
      <Link href="/dashboard" className="text-sm underline">Back</Link>
      <h1 className="font-serif text-3xl">{exercise.name}</h1>
      <section className="card">
        <h2 className="mb-3 font-serif text-xl">Weight trend</h2>
        {chartData.length > 0 ? <ExerciseChart data={chartData} /> : <p>No sets yet.</p>}
      </section>
    </main>
  );
}

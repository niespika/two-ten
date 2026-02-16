import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';
import { SessionFlow } from '@/components/session-flow';

export default async function NewSessionPage() {
  const user = await requireUser();

  let session = await prisma.workoutSession.findFirst({
    where: { userId: user.id, endedAt: null },
    orderBy: { startedAt: 'desc' },
  });

  if (!session) {
    session = await prisma.workoutSession.create({ data: { userId: user.id } });
  }

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

  const payload = exercises.map((exercise) => ({
    id: exercise.id,
    name: exercise.name,
    incrementLb: exercise.incrementLb,
    lastWeight: exercise.setLogs[0]?.weightLb ?? null,
    lastDuration: exercise.setLogs[0]?.durationSeconds ?? null,
  }));

  return (
    <main className="app-shell mx-auto min-h-screen max-w-[420px] space-y-4 px-4 py-4">
      <Link href="/dashboard" className="text-sm underline">Back</Link>
      <h1 className="font-serif text-3xl">Session in progress</h1>
      <SessionFlow sessionId={session.id} exercises={payload} />
    </main>
  );
}

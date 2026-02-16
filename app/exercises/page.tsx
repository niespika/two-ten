import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';
import { ExercisesManager } from '@/app/exercises/exercises-manager';

export default async function ExercisesPage() {
  const user = await requireUser();
  const exercises = await prisma.exercise.findMany({
    where: { userId: user.id },
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return <ExercisesManager exercises={exercises} />;
}

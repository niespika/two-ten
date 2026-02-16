import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { setLogSchema } from '@/lib/validation';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const json = await request.json();
  const parsed = setLogSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
  }

  const exercise = await prisma.exercise.findFirst({
    where: { id: parsed.data.exerciseId, userId: session.user.id },
  });

  const activeSession = await prisma.workoutSession.findFirst({
    where: { id: parsed.data.sessionId, userId: session.user.id, endedAt: null },
  });

  if (!exercise || !activeSession) {
    return NextResponse.json({ error: 'Invalid session/exercise' }, { status: 400 });
  }

  const durationSeconds = Math.max(0, parsed.data.elapsedSeconds - 2);

  await prisma.setLog.create({
    data: {
      userId: session.user.id,
      sessionId: parsed.data.sessionId,
      exerciseId: parsed.data.exerciseId,
      weightLb: parsed.data.weightLb,
      durationSeconds,
      performedAt: parsed.data.performedAt ? new Date(parsed.data.performedAt) : new Date(),
    },
  });

  return NextResponse.json({ ok: true, durationSeconds });
}

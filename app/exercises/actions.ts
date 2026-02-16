'use server';

import { revalidatePath } from 'next/cache';
import { exerciseSchema } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';

export type ExerciseActionState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export const initialExerciseActionState: ExerciseActionState = { status: 'idle' };

export async function createExerciseAction(
  _prevState: ExerciseActionState,
  formData: FormData,
): Promise<ExerciseActionState> {
  const user = await requireUser();
  const parsed = exerciseSchema.safeParse({
    name: formData.get('name'),
    incrementLb: 5,
  });

  if (!parsed.success) {
    return { status: 'error', message: 'Something went wrong' };
  }

  try {
    await prisma.exercise.create({ data: { ...parsed.data, userId: user.id } });
    revalidatePath('/exercises');
    revalidatePath('/dashboard');
    return { status: 'success', message: 'Exercise added' };
  } catch {
    return { status: 'error', message: 'Something went wrong' };
  }
}

export async function updateExerciseAction(
  _prevState: ExerciseActionState,
  formData: FormData,
): Promise<ExerciseActionState> {
  const user = await requireUser();
  const id = String(formData.get('id'));
  const parsed = exerciseSchema.safeParse({
    name: formData.get('name'),
    incrementLb: 5,
  });

  if (!parsed.success || !id) {
    return { status: 'error', message: 'Something went wrong' };
  }

  try {
    await prisma.exercise.updateMany({ where: { id, userId: user.id }, data: parsed.data });
    revalidatePath('/exercises');
    revalidatePath('/dashboard');
    return { status: 'success', message: 'Changes saved' };
  } catch {
    return { status: 'error', message: 'Something went wrong' };
  }
}

export async function deleteExerciseAction(
  _prevState: ExerciseActionState,
  formData: FormData,
): Promise<ExerciseActionState> {
  const user = await requireUser();
  const id = String(formData.get('id'));

  if (!id) {
    return { status: 'error', message: 'Something went wrong' };
  }

  try {
    await prisma.exercise.deleteMany({ where: { id, userId: user.id } });
    revalidatePath('/exercises');
    revalidatePath('/dashboard');
    return { status: 'success', message: 'Exercise deleted' };
  } catch {
    return { status: 'error', message: 'Something went wrong' };
  }
}

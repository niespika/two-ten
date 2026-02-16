import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session';
import { exerciseSchema } from '@/lib/validation';

async function createExercise(formData: FormData) {
  'use server';
  const user = await requireUser();
  const parsed = exerciseSchema.safeParse({
    name: formData.get('name'),
    incrementLb: Number(formData.get('incrementLb')),
  });

  if (!parsed.success) return;

  await prisma.exercise.create({ data: { ...parsed.data, userId: user.id } });
  revalidatePath('/exercises');
}

async function updateExercise(formData: FormData) {
  'use server';
  const user = await requireUser();
  const id = String(formData.get('id'));
  const parsed = exerciseSchema.safeParse({
    name: formData.get('name'),
    incrementLb: Number(formData.get('incrementLb')),
  });
  if (!parsed.success) return;

  await prisma.exercise.updateMany({ where: { id, userId: user.id }, data: parsed.data });
  revalidatePath('/exercises');
  revalidatePath('/dashboard');
}

async function deleteExercise(formData: FormData) {
  'use server';
  const user = await requireUser();
  const id = String(formData.get('id'));
  await prisma.exercise.deleteMany({ where: { id, userId: user.id } });
  revalidatePath('/exercises');
}

export default async function ExercisesPage() {
  const user = await requireUser();
  const exercises = await prisma.exercise.findMany({ where: { userId: user.id }, orderBy: { name: 'asc' } });

  return (
    <main className="app-shell mx-auto min-h-screen max-w-[420px] space-y-4 px-4 py-4">
      <h1 className="font-serif text-3xl">Exercises</h1>

      <section className="card space-y-3">
        <h2 className="font-serif text-xl">Add Exercise</h2>
        <form action={createExercise} className="space-y-2">
          <input name="name" className="input" placeholder="Exercise name" required />
          <input name="incrementLb" type="number" defaultValue={5} min={1} className="input" />
          <button className="btn-primary" type="submit">Add</button>
        </form>
      </section>

      <section className="space-y-3">
        {exercises.map((exercise) => (
          <article key={exercise.id} className="card space-y-2">
            <form action={updateExercise} className="space-y-2">
              <input type="hidden" name="id" value={exercise.id} />
              <input name="name" className="input" defaultValue={exercise.name} required />
              <input name="incrementLb" className="input" type="number" defaultValue={exercise.incrementLb} min={1} />
              <button className="btn-secondary" type="submit">Save</button>
            </form>
            <form action={deleteExercise}>
              <input type="hidden" name="id" value={exercise.id} />
              <button className="btn text-red-700 dark:text-red-400" type="submit">Delete</button>
            </form>
          </article>
        ))}
      </section>
    </main>
  );
}

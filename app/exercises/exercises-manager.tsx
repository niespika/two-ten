'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from '@/lib/toast';
import { SimpleFrame } from '@/components/ui/SimpleFrame';
import {
  createExerciseAction,
  deleteExerciseAction,
  initialExerciseActionState,
  type ExerciseActionState,
  updateExerciseAction,
} from '@/app/exercises/actions';

type Exercise = {
  id: string;
  name: string;
};

function useToastFromState(state: ExerciseActionState) {
  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast.success(state.message);
      return;
    }
    if (state.status === 'error') {
      toast.error(state.message ?? 'Something went wrong');
    }
  }, [state]);
}

function SubmitButton({ className, children }: { className: string; children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={pending}>
      {children}
    </button>
  );
}

function AddExerciseForm() {
  const [state, formAction] = useFormState(createExerciseAction, initialExerciseActionState);
  useToastFromState(state);

  return (
    <SimpleFrame className="space-y-3">
      <h2 className="font-serif text-xl">Add Exercise</h2>
      <form action={formAction} className="space-y-2">
        <input name="name" className="input" placeholder="Exercise name" required />
        <SubmitButton className="btn-primary">Add</SubmitButton>
      </form>
    </SimpleFrame>
  );
}

function ExerciseItem({ exercise }: { exercise: Exercise }) {
  const [updateState, updateAction] = useFormState(updateExerciseAction, initialExerciseActionState);
  const [deleteState, deleteAction] = useFormState(deleteExerciseAction, initialExerciseActionState);

  useToastFromState(updateState);
  useToastFromState(deleteState);

  return (
    <SimpleFrame className="space-y-2">
      <form action={updateAction} className="space-y-2">
        <input type="hidden" name="id" value={exercise.id} />
        <input name="name" className="input" defaultValue={exercise.name} required />
        <SubmitButton className="btn-secondary">Save</SubmitButton>
      </form>
      <form
        action={deleteAction}
        onSubmit={(event) => {
          const ok = window.confirm(`Delete '${exercise.name}'? This cannot be undone.`);
          if (!ok) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={exercise.id} />
        <SubmitButton className="btn text-red-700 dark:text-red-400">Delete</SubmitButton>
      </form>
    </SimpleFrame>
  );
}

export function ExercisesManager({ exercises }: { exercises: Exercise[] }) {
  return (
    <main className="app-shell mx-auto min-h-screen max-w-[420px] space-y-4 px-4 py-4">
      <Link href="/dashboard" className="btn-secondary inline-flex min-h-12 items-center justify-center">
        Back to Dashboard
      </Link>
      <h1 className="font-serif text-3xl">Exercises</h1>

      <AddExerciseForm />

      <section className="space-y-3">
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </section>
    </main>
  );
}

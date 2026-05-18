import { ChevronLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ErrorContainer } from '@/components/layout/error-container';
import { Navbar } from '@/components/layout/navbar';
import { getWorkoutDayData } from '@/data-fetch/get-workout-day';
import { authClient } from '@/lib/auth-client';

import { ExerciseList } from './components/exercise-list';
import { FinishButton } from './components/finish-button';
import { Hero } from './components/hero';

export const dynamic = 'force-dynamic';

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ id: string; workoutDayId: string }>;
}) {
  const { id, workoutDayId } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/login');
  }

  let response;
  try {
    response = await getWorkoutDayData(id, workoutDayId);
  } catch (error) {
    console.error('Failed to fetch workout day data:', error);
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar o treino."
        backHref={`/workout-plan/${id}`}
        backLabel="Voltar para o plano"
      />
    );
  }

  if (
    response.status !== 200 &&
    response.status !== 403 &&
    response.status !== 404
  ) {
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar o treino."
        backHref={`/workout-plan/${id}`}
        backLabel="Voltar para o plano"
      />
    );
  }

  if (response.status === 403) {
    return (
      <ErrorContainer
        title="Você não tem permissão para acessar esta página."
        backHref={`/workout-plan/${id}`}
        backLabel="Voltar para o plano"
      />
    );
  }

  if (response.status === 404) {
    return (
      <ErrorContainer
        title="Treino não encontrado."
        backHref={`/workout-plan/${id}`}
        backLabel="Voltar para o plano"
      />
    );
  }

  const workoutDay = response.data;

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      {/* l3fqk - Main Container */}
      <main className="flex w-full max-w-[393px] flex-col items-center">
        {/* twsDH - Section */}
        <section className="flex w-full flex-col gap-5 p-5">
          {/* Header (U4XXZx) */}
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-900 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Treino de Hoje</h1>
            <div className="h-10 w-10" /> {/* Spacer */}
          </div>

          {/* Hero Section (q3wGFH) */}
          <Hero
            workoutDay={workoutDay}
            workoutPlanId={id}
            workoutDayId={workoutDayId}
          />

          {/* Exercise List (HnlKL) */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Exercícios</h2>
            <p className="text-sm text-gray-500">
              {workoutDay.workoutExercises?.length || 0} exercícios planejados
            </p>
            <ExerciseList exercises={workoutDay.workoutExercises || []} />
          </div>

          {/* Finish Action (gYCIU) */}
          <div className="mt-4">
            <FinishButton
              workoutPlanId={id}
              workoutDayId={workoutDayId}
              sessionId={workoutDay.workoutSessionId}
              isCompleted={workoutDay.isCompleted}
            />
          </div>
        </section>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

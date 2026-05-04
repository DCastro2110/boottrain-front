import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Navbar } from '@/app/home/components/navbar';
import { Button } from '@/components/ui/button';
import { getWorkoutDayData } from '@/data-fetch/get-workout-day';
import { authClient } from '@/lib/auth-client';

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-center">
        <h1 className="mb-6 text-xl font-bold text-gray-900">
          Ocorreu um erro ao carregar o treino.
        </h1>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="h-12 w-full max-w-xs rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
        >
          Voltar para o menu
        </Button>
      </div>
    );
  }

  if (response.status !== 200 && response.status !== 403 && response.status !== 404) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-center">
        <h1 className="mb-6 text-xl font-bold text-gray-900">
          Ocorreu um erro ao carregar o treino.
        </h1>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="h-12 w-full max-w-xs rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
        >
          Voltar para o menu
        </Button>
      </div>
    );
  }

  if (response.status === 403) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-center">
        <h1 className="mb-6 text-xl font-bold text-gray-900">
          Você não tem permissão para acessar esta página.
        </h1>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="h-12 w-full max-w-xs rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
        >
          Voltar para o menu
        </Button>
      </div>
    );
  }

  if (response.status === 404) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-center">
        <h1 className="mb-6 text-xl font-bold text-gray-900">
          Treino não encontrado.
        </h1>
        <Button
          render={<Link href="/" />}
          nativeButton={false}
          className="h-12 w-full max-w-xs rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
        >
          Voltar para o menu
        </Button>
      </div>
    );
  }

  const workoutDay = response.data;

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      {/* l3fqk - Main Container */}
      <main className="flex w-full max-w-[393px] flex-col items-center">
        {/* twsDH - Section */}
        <section className="flex w-full flex-col gap-5 p-5">
          {/* Header Placeholder (U4XXZx) */}
          <div className="flex h-14 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Treino do Dia</h1>
          </div>

          {/* Banner Placeholder (q3wGFH) */}
          <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-gray-100">
             {/* Info will be added in Task 3 */}
             <div className="flex h-full items-center justify-center text-gray-400">
                Banner Area
             </div>
          </div>

          {/* Exercise List Placeholder (HnlKL) */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Exercícios</h2>
            <p className="text-sm text-gray-500">
              {workoutDay.workoutExercises?.length || 0} exercícios planejados
            </p>
            {/* Exercises will be added in Task 4 */}
          </div>
        </section>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

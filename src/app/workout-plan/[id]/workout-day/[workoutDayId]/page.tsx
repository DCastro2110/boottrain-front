import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Navbar } from '@/app/home/components/navbar';
import { Button } from '@/components/ui/button';
import { getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId } from '@/lib/api/boo-train-api';
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
    response = await getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId(
      id,
      workoutDayId,
      {
        headers: await headers(),
      },
    );
  } catch (error) {
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

  // Placeholder content for Task 1
  return (
    <div className="relative min-h-screen bg-white pb-24">
      <main className="flex flex-col items-center justify-center px-5 pt-20">
        <h1 className="text-2xl font-bold text-gray-900">Treino do Dia</h1>
        <p className="mt-4 text-center text-gray-600">
          O conteúdo desta página será implementado nas próximas tarefas.
        </p>
        <div className="mt-8 rounded-lg bg-gray-50 p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Identificadores:
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Plano ID:</span> {id}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Dia ID:</span> {workoutDayId}
          </p>
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

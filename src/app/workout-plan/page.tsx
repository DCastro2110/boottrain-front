import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Navbar } from '@/app/home/components/navbar';
import { ErrorPage } from '@/components/error-page';
import { getWorkoutPlanData } from '@/data-fetch/get-workout-plan';
import { authClient } from '@/lib/auth-client';

export const dynamic = 'force-dynamic';

export default async function WorkoutPlansPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/login');
  }

  const plans = await getWorkoutPlanData();

  if (!plans) {
    return (
      <ErrorPage
        title="Ocorreu um erro ao carregar os planos de treino."
        backHref="/"
        backLabel="Voltar para o menu"
      />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      <main className="flex w-full max-w-[393px] flex-col items-center">
        <section className="flex w-full flex-col gap-5 p-5">
          <div className="flex h-14 items-center justify-center">
            <h1 className="text-xl font-bold text-gray-900">Meus Planos</h1>
          </div>

          <div className="flex flex-col gap-4">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/workout-plan/${plan.id}`}
                className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h2>
                  {plan.isActive && (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      Ativo
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
                <div className="text-xs text-gray-400">
                  {plan.workoutDays.length} dias de treino
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Navbar />
    </div>
  );
}
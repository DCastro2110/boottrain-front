import { ChevronLeft } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ErrorContainer } from '@/components/layout/error-container';
import { Navbar } from '@/components/layout/navbar';
import { RestDayCard } from '@/components/workout/rest-day-card';
import { WorkoutCard } from '@/components/workout/workout-card';
import { getWorkoutPlanById } from '@/data-fetch/get-workout-plan';
import { authClient } from '@/lib/auth-client';

export const dynamic = 'force-dynamic';

function getNextDateForWeekday(weekday: string): string {
  const weekdayMap: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };
  const today = new Date();
  const targetDay = weekdayMap[weekday.toUpperCase()];
  if (targetDay === undefined) return today.toISOString().split('T')[0];

  const daysUntil = (targetDay - today.getDay() + 7) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + (daysUntil === 0 ? 7 : daysUntil));
  return nextDate.toISOString().split('T')[0];
}

function getWeekdayName(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekdays = [
    'DOMINGO',
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
  ];
  return weekdays[date.getDay()];
}

export default async function WorkoutPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
    response = await getWorkoutPlanById(id);
  } catch (error) {
    console.error('Failed to fetch workout plan data:', error);
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar o plano de treino."
        backHref="/workout-plan"
        backLabel="Voltar para a lista"
      />
    );
  }

  if (!response) {
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar o plano de treino."
        backHref="/workout-plan"
        backLabel="Voltar para a lista"
      />
    );
  }

  const workoutPlan = response;

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      <main className="container flex w-full flex-col items-center px-4">
        <section className="flex w-full flex-col gap-5 p-4 sm:p-5">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-900 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Plano de Treino</h1>
            <div className="h-10 w-10" />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {workoutPlan.name}
            </h2>
            <p className="text-sm text-gray-500">{workoutPlan.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <h3 className="col-span-full text-base font-semibold text-gray-900 sm:text-lg">Treinos</h3>
            {workoutPlan.workoutDays.map((day) => {
              const date = getNextDateForWeekday(day.weekDay);
              const weekdayName = getWeekdayName(date);

              return day.workoutExercises.length === 0 ? (
                <RestDayCard key={day.id} weekday={weekdayName} />
              ) : (
                <WorkoutCard
                  key={day.id}
                  planId={id}
                  dayId={day.id}
                  workout={{
                    date,
                    name: day.name,
                    estimatedDurationInSeconds: day.estimatedDurationInSeconds,
                    numberOfExercises: day.workoutExercises.length,
                    coverImageUrl: day.coverImageUrl,
                    isCompleted: false,
                  }}
                />
              );
            })}
          </div>
        </section>
      </main>

      <Navbar />
    </div>
  );
}

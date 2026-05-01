import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getHomeInfoData } from '@/data-fetch/get-home-info';
import { authClient } from '@/lib/auth-client';

import { ConsistencyBoard } from './home/components/consistency-board';
import { Navbar } from './home/components/navbar';
import { TodayWorkout } from './home/components/today-workout';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    redirect('/login');
  }

  const homeData = await getHomeInfoData();

  if (!homeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Failed to load home data</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white pb-24">
      {/* Banner Section */}
      <div className="relative flex h-72 min-h-[250px] max-h-[320px] w-full flex-col justify-between rounded-b-[20px] bg-cover bg-center p-4 sm:p-5">
        {/* Background image placeholder - would use actual image URL from user profile */}
        <div className="absolute inset-0 rounded-b-[20px] bg-gradient-to-b from-transparent to-black/60" />

        {/* Header with logo */}
        <div className="relative flex items-center justify-between">
          <span className="font-anton text-xl text-white sm:text-2xl">
            Fit.ai
          </span>
          <div className="flex items-center gap-2 rounded-full bg-blue-500 px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-xs font-medium text-white sm:text-sm">
              Premium
            </span>
          </div>
        </div>

        {/* Greeting */}
        <div className="relative flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            Olá, Paulo
          </h1>
          <p className="text-sm text-white/70">Bora treinar hoje?</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-5">
        {/* Consistency Section */}
        <div className="rounded-lg bg-neutral-50 p-4 sm:p-5">
          <ConsistencyBoard
            consistency={homeData.weekConsistency}
            fireSequence={homeData.fireSequence}
          />
        </div>

        {/* Treino de Hoje Section */}
        <TodayWorkout todayWorkoutDay={homeData.todayWorkoutDay} />
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

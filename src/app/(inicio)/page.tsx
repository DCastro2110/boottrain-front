import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/layout/navbar';
import { getHomeInfoData } from '@/data-fetch/get-home-info';
import { authClient } from '@/lib/auth-client';

import { Banner } from './_components/banner';
import { ConsistencyBoard } from './_components/consistency-board';
import { TodayWorkout } from './_components/today-workout';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/entrar');
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
    <div className="relative min-h-screen bg-white pb-24 container justify-center mx-auto">
      {/* Banner Section */}
      <Banner userName={session.data?.user?.name || 'Paulo'} />

      {/* Main Content */}
      <main className="flex w-full flex-col items-center px-4">
        {/* Consistency Section */}
        <div className="w-full pt-5">
          <ConsistencyBoard
            consistency={homeData.weekConsistency}
            fireSequence={homeData.fireSequence}
          />
        </div>

        {/* Treino de Hoje Section */}
        <div className="w-full pt-5">
          <TodayWorkout todayWorkoutDay={homeData.todayWorkoutDay} />
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

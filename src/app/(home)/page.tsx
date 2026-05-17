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
      <div className="flex justify-center">
        <Banner userName={session.data?.user?.name || 'Paulo'} />
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center">
        {/* Consistency Section */}
        <div className="w-full max-w-6xl px-4 pt-5 sm:px-6">
          <ConsistencyBoard
            consistency={homeData.weekConsistency}
            fireSequence={homeData.fireSequence}
          />
        </div>

        {/* Treino de Hoje Section */}
        <div className="w-full max-w-6xl px-4 pt-5 sm:px-6">
          <TodayWorkout todayWorkoutDay={homeData.todayWorkoutDay} />
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { getHomeInfoData } from '@/data-fetch/get-home-info';
import { authClient } from '@/lib/auth-client';

import { Banner } from './home/components/banner';
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
      <Banner userName={session.data?.user?.name || 'Paulo'} />

      {/* Main Content */}
      <main className="flex flex-col">
        {/* Consistency Section */}
        <div className="px-5 pt-5">
          <ConsistencyBoard
            consistency={homeData.weekConsistency}
            fireSequence={homeData.fireSequence}
          />
        </div>

        {/* Treino de Hoje Section */}
        <div className="p-5">
          <TodayWorkout todayWorkoutDay={homeData.todayWorkoutDay} />
        </div>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

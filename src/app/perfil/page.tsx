import { BicepsFlexed, Ruler, Scale, User } from 'lucide-react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { ErrorContainer } from '@/components/layout/error-container';
import { Navbar } from '@/components/layout/navbar';
import { getProfileData } from '@/data-fetch/get-profile-data';
import { authClient } from '@/lib/auth-client';

import { LogoutButton } from './_components/logout-button';
import { StatCard } from './_components/stat-card';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/login');
  }

  const userId = session.data.user.id;
  const profile = await getProfileData(userId);

  if (!profile) {
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar os dados do perfil."
        backHref="/"
        backLabel="Voltar para o menu"
      />
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      <main className="flex w-full max-w-6xl flex-col items-center px-4 sm:max-w-3xl md:max-w-5xl lg:max-w-6xl">
        <header className="flex h-14 w-full items-center px-4 sm:px-5">
          <span className="font-anton text-lg text-black sm:text-xl md:text-2xl">Fit.ai</span>
        </header>

        <section className="flex w-full flex-col gap-5 px-4 sm:px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-13 w-13 items-center justify-center rounded-full bg-gray-200"
              >
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <span className="text-lg font-semibold text-black">
                {profile.name}
              </span>
            </div>
            <LogoutButton />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={Scale} value={profile.weight} unit="Kg" />
            <StatCard icon={Ruler} value={profile.height} unit="Cm" />
            <StatCard icon={BicepsFlexed} value={profile.bodyFat} unit="Gc" />
            <StatCard icon={User} value={profile.age} unit="Anos" />
          </div>
        </section>
      </main>

      <Navbar />
    </div>
  );
}

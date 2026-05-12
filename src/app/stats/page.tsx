import { Calendar, CircleCheck, CirclePercent } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { ErrorContainer } from '@/components/layout/error-container';
import { Navbar } from '@/components/layout/navbar';
import { getHomeInfoData } from '@/data-fetch/get-home-info';
import { getStatsData } from '@/data-fetch/stats';
import { authClient } from '@/lib/auth-client';

import { InfoCard } from './_components/info-card';
import { PeriodConsistencyCard } from './_components/period-consistency-card';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/login');
  }

  // Calculate current year start and end dates for annual stats
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1)
    .toISOString()
    .split('T')[0];
  const endDate = new Date(now.getFullYear(), 11, 31)
    .toISOString()
    .split('T')[0];

  const stats = await getStatsData({ startDate, endDate });
  const homeInfo = await getHomeInfoData();

  if (!stats) {
    return (
      <ErrorContainer
        title="Ocorreu um erro ao carregar os dados de consistência."
        backHref="/"
        backLabel="Voltar para o menu"
      />
    );
  }

  const fireSequence = homeInfo?.fireSequence ?? 0;

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white pb-24">
      {/* Main Container */}
      <main className="flex w-full max-w-[393px] flex-col items-center">
        {/* Header */}
        <header className="flex h-14 w-full items-center px-5">
          <span className="font-anton text-[22px] text-black">Fit.ai</span>
        </header>

        {/* Section */}
        <section className="flex w-full flex-col gap-5 px-5">
          {/* Banner */}
          <div className="relative flex min-h-[190px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl px-5 py-10 shadow-sm">
            <Image
              src="/images/generated-1777503491583.png"
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 25 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.15571 7.323l-0.00201 0.002-0.004 0.003-0.01 0.008c-0.0434 0.03294-0.08543 0.06763-0.126 0.104-0.10469 0.09273-0.20545 0.18982-0.302 0.291-0.24 0.253-0.548 0.629-0.837 1.132-0.582 1.015-1.071 2.528-0.796 4.551 0.271 1.997 1.11 3.666 2.528 4.83 1.414 1.16 3.328 1.756 5.643 1.756 2.387 0 4.293-0.895 5.55401-2.43 1.25-1.521 1.808-3.596 1.67499-5.864-0.128-2.176-1.313-3.827-2.36-5.285l-0.299-0.417c-1.142-1.612-2.043-3.097-1.824-5.175 0.01108-0.10458 0.00004-0.21033-0.0324-0.31037-0.03244-0.10004-0.08557-0.19214-0.15592-0.27032-0.07035-0.07818-0.15635-0.14068-0.25243-0.18346-0.09608-0.04278-0.20008-0.06487-0.30525-0.06485-0.382 0-0.82 0.118-1.242 0.296-0.48866 0.20951-0.94977 0.47818-1.37299 0.8-0.925 0.698-1.85 1.75-2.34301 3.156-0.492 1.402-0.242 2.738 0.118 3.711 0.237 0.639-0.02 1.27-0.40699 1.454-0.16466 0.0779-0.35307 0.08914-0.52583 0.03137-0.17276-0.05777-0.3165-0.18008-0.40117-0.34137l-0.80601-1.531c-0.05045-0.09605-0.12113-0.18-0.20716-0.24608-0.08604-0.06608-0.18539-0.1127-0.2912-0.13666-0.10581-0.02396-0.21556-0.02467-0.32167-0.00211-0.10611 0.02257-0.20607 0.0679-0.29297 0.13285"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="flex flex-col items-center gap-1 text-white">
                <span className="text-5xl font-semibold leading-none">
                  {fireSequence} dias
                </span>
                <span className="text-base opacity-60">Sequência Atual</span>
              </div>
            </div>
          </div>

          {/* Consistency Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">
                Consistência
              </h2>
              <div className="flex items-center gap-2 rounded-full border border-[#f1f1f1] px-4 py-2">
                <Calendar className="h-4 w-4 text-black" />
                <span className="text-sm font-semibold text-black">
                  Anual
                </span>
              </div>
            </div>

            {/* Period Consistency Card (Grid) */}
            <PeriodConsistencyCard
              completionPercent={stats.completionPercent ?? 0}
              totalSessions={stats.totalSessions ?? 0}
              sessions={stats.sessions ?? []}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard>
              <InfoCard.Icon icon={CircleCheck} />
              <div className="flex flex-col items-center gap-1.5">
                <InfoCard.Value>{stats.totalSessions ?? 0}</InfoCard.Value>
                <InfoCard.Title>Treinos Feitos</InfoCard.Title>
              </div>
            </InfoCard>

            <InfoCard>
              <InfoCard.Icon icon={CirclePercent} />
              <div className="flex flex-col items-center gap-1.5">
                <InfoCard.Value>{stats.completionPercent ?? 0}%</InfoCard.Value>
                <InfoCard.Title>Meta atingida</InfoCard.Title>
              </div>
            </InfoCard>
          </div>
        </section>
      </main>

      {/* Bottom Navbar */}
      <Navbar />
    </div>
  );
}

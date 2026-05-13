import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { hasUserCompletedOnboarding } from '@/proxy';

import { OnboardingClient } from './_components/onboarding-client';

export default async function OnboardingPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect('/login');
  }

  const userId = session.data.user?.id;
  if (!userId) {
    redirect('/login');
  }

  const hasCompleted = await hasUserCompletedOnboarding(userId);
  if (hasCompleted) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1] p-4">
      <OnboardingClient userId={userId} />
    </div>
  );
}
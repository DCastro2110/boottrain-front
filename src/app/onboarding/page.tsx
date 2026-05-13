import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1] p-4">
      <OnboardingClient />
    </div>
  );
}
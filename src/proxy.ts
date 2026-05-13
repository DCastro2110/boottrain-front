import { headers } from 'next/headers';

import { getUsersUserId } from '@/lib/api/boo-train-api';

export interface UserProfile {
  height: number | null;
  weight: number | null;
  age: number | null;
  bodyFatPercentage: number | null;
}

export async function hasUserCompletedOnboarding(
  userId: string,
): Promise<boolean> {
  const response = await getUsersUserId(userId, {
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (response.status === 200 && response.data) {
    const user = response.data;
    return (
      user.height !== null &&
      user.weight !== null &&
      user.age !== null &&
      user.bodyFatPercentage !== null
    );
  }

  return false;
}
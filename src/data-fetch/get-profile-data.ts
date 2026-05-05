import type { GetUsersUserId200 } from '@/lib/api/boo-train-api';
import { getUsersUserId } from '@/lib/api/boo-train-api';

export interface ProfileData {
  name: string;
  level: string;
  weight: number;
  height: number;
  bodyFat: string;
  age: number;
}

const fitnessLevelMap: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

export async function getProfileData(
  userId: string,
): Promise<ProfileData | null> {
  try {
    const response = await getUsersUserId(userId);

    if (response.status === 200) {
      const data = response.data as GetUsersUserId200;
      return {
        name: data.name ?? 'Usuário',
        level:
          fitnessLevelMap[data.fitnessLevel ?? 'intermediate'] ??
          'Intermediário',
        weight: data.weight ?? 0,
        height: data.height ?? 0,
        bodyFat:
          data.bodyFatPercentage != null ? `${data.bodyFatPercentage}%` : '-',
        age: data.age ?? 0,
      };
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return null;
  }
}

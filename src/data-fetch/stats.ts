import type {
  GetStatsStats200,
  GetStatsStatsParams,
} from '@/lib/api/boo-train-api';
import { getStatsStats } from '@/lib/api/boo-train-api';

export async function getStatsData(
  params: GetStatsStatsParams,
): Promise<GetStatsStats200 | null> {
  try {
    const response = await getStatsStats(params);

    if (response.status === 200) {
      return response.data;
    }

    console.error(`Stats API returned status ${response.status}`);
    return null;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return null;
  }
}

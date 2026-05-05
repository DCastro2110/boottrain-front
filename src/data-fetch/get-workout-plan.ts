import type {
  GetWorkoutPlan200Item,
  getWorkoutPlanResponse,
  GetWorkoutPlanWorkoutPlanId200,
  getWorkoutPlanWorkoutPlanIdResponse,
} from '@/lib/api/boo-train-api';
import {
  getWorkoutPlan,
  getWorkoutPlanWorkoutPlanId,
} from '@/lib/api/boo-train-api';

export async function getWorkoutPlanData(): Promise<
  GetWorkoutPlan200Item[] | null
> {
  try {
    const response: getWorkoutPlanResponse = await getWorkoutPlan();

    if (response.status === 200) {
      return response.data;
    }

    console.error(`Workout plan API returned status ${response.status}`);
    return null;
  } catch (error) {
    console.error('Failed to fetch workout plan list:', error);
    return null;
  }
}

export async function getActiveWorkoutPlanId(): Promise<string | null> {
  const plans = await getWorkoutPlanData();
  if (!plans) return null;

  const activePlan = plans.find((plan) => plan.isActive);
  return activePlan?.id ?? null;
}

export async function getWorkoutPlanById(
  id: string,
): Promise<GetWorkoutPlanWorkoutPlanId200 | null> {
  try {
    const response: getWorkoutPlanWorkoutPlanIdResponse =
      await getWorkoutPlanWorkoutPlanId(id);

    if (response.status === 200) {
      return response.data;
    }

    console.error(`Workout plan API returned status ${response.status}`);
    return null;
  } catch (error) {
    console.error('Failed to fetch workout plan by id:', error);
    return null;
  }
}

import type { getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdResponse } from '@/lib/api/boo-train-api';
import { getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId } from '@/lib/api/boo-train-api';

export async function getWorkoutDayData(
  workoutPlanId: string,
  workoutDayId: string,
): Promise<getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdResponse> {
  const response = await getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId(
    workoutPlanId,
    workoutDayId,
  );

  return response;
}

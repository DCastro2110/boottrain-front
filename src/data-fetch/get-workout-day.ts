import { headers } from "next/headers";

import type { getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdResponse } from "@/lib/api/boo-train-api";
import { getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId } from "@/lib/api/boo-train-api";

export async function getWorkoutDayData(
  workoutPlanId: string,
  workoutDayId: string
): Promise<getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdResponse> {
  const h = await headers();
  const plainHeaders = Object.fromEntries(h.entries());

  const response = await getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId(
    workoutPlanId,
    workoutDayId,
    {
      headers: plainHeaders,
    }
  );

  return response;
}

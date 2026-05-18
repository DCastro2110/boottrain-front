'use server';

import { revalidatePath } from 'next/cache';

import {
  patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId,
  postWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessions,
} from '@/lib/api/boo-train-api';

export async function startWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
) {
  const response =
    await postWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessions(
      workoutPlanId,
      workoutDayId,
    );

  if (response.status === 409) {
    throw new Error('SESSION_ALREADY_ACTIVE');
  }

  if (response.status !== 201) {
    throw new Error('Failed to start workout');
  }

  revalidatePath('/');
  return response.data;
}

export async function finishWorkoutAction(
  workoutPlanId: string,
  workoutDayId: string,
  sessionId: string,
) {
  const response =
    await patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId(
      workoutPlanId,
      workoutDayId,
      sessionId,
    );

  if (response.status !== 201) {
    throw new Error('Failed to finish workout');
  }

  revalidatePath('/');
  return response.data;
}

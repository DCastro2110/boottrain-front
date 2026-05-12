'use client';

import { CircleHelp, Zap } from 'lucide-react';

import { useAIModal } from '@/context/ai-modal-context';
import type { GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200WorkoutExercisesItem } from '@/lib/api/boo-train-api';

interface ExerciseCardProps {
  exercise: GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200WorkoutExercisesItem;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { openAIModal } = useAIModal();

  return (
    <div className="w-full rounded-xl border border-[#f1f1f1] p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {exercise.name}
          </h3>
          <button
            onClick={() =>
              openAIModal(
                `Qual é a forma correta para o exercício ${exercise.name}?`
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2b54ff]/10 text-[#2b54ff] transition-colors hover:bg-[#2b54ff]/20"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-semibold text-gray-600">
            {exercise.sets} séries
          </span>
          <span className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-semibold text-gray-600">
            {exercise.reps} reps
          </span>
          <div className="flex items-center gap-1 rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[12px] font-semibold text-gray-600">
            <Zap className="h-3.5 w-3.5" />
            <span>{exercise.estimatedDurationInSeconds}S</span>
          </div>
        </div>
      </div>
    </div>
  );
}

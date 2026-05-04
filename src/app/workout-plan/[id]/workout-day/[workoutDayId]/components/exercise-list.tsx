import type { GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200WorkoutExercisesItem } from '@/lib/api/boo-train-api';

import { ExerciseCard } from './exercise-card';

interface ExerciseListProps {
  exercises: GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200WorkoutExercisesItem[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      {exercises.map((exercise, index) => (
        <ExerciseCard key={index} exercise={exercise} />
      ))}
    </div>
  );
}

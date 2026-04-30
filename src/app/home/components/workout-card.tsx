"use client";

import { Dumbbell, Timer } from "lucide-react";

interface IWorkoutCardProps {
  workout: {
    date: string;
    name: string;
    estimatedDurationInSeconds: number;
    numberOfExercises: number;
    coverImageUrl: string | null;
    isCompleted: boolean;
  };
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes}min`;
}

function getWeekdayAbbreviation(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
  return weekdays[date.getDay()];
}

export function WorkoutCard({ workout }: IWorkoutCardProps) {
  const weekdayBadge = getWeekdayAbbreviation(workout.date);

  return (
    <div
      className="relative flex h-44 min-h-[160px] w-full flex-col justify-between rounded-xl bg-cover bg-center p-4 sm:h-[200px] sm:p-5"
      style={{
        backgroundImage: workout.coverImageUrl
          ? `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${workout.coverImageUrl})`
          : "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/40" />

      <div className="relative flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs">
          <span>{weekdayBadge}</span>
        </span>
      </div>

      <div className="relative flex flex-col gap-1.5 sm:gap-2">
        <h3 className="text-lg font-semibold text-white sm:text-2xl">{workout.name}</h3>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 text-xs text-white/70 sm:text-sm sm:gap-1.5">
            <Timer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{formatDuration(workout.estimatedDurationInSeconds)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-white/70 sm:text-sm sm:gap-1.5">
            <Dumbbell className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>
              {workout.numberOfExercises}{" "}
              {workout.numberOfExercises === 1 ? "exercício" : "exercícios"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";

import { RestDayCard } from "./rest-day-card";
import { WorkoutCard } from "./workout-card";

interface ITodayWorkoutProps {
  todayWorkoutDay: {
    date: string;
    name: string;
    estimatedDurationInSeconds: number;
    numberOfExercises: number;
    coverImageUrl: string | null;
    isCompleted: boolean;
  } | null;
}

const WEEKDAY_NAMES: Record<string, string> = {
  SUNDAY: "Domingo",
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
};

function getWeekdayName(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  return WEEKDAY_NAMES[weekdays[date.getDay()]] || "Dia";
}

export function TodayWorkout({ todayWorkoutDay }: ITodayWorkoutProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold sm:text-lg">Treino de Hoje</span>
        <Link href="/treinos" className="text-xs text-blue-500 sm:text-sm">
          Ver treinos
        </Link>
      </div>

      {todayWorkoutDay ? (
        <WorkoutCard workout={todayWorkoutDay} />
      ) : (
        <RestDayCard weekday={getWeekdayName(new Date().toISOString())} />
      )}
    </div>
  );
}
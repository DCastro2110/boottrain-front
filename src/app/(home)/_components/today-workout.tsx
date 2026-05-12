import Link from 'next/link';

import { RestDayCard } from '@/components/workout/rest-day-card';
import { WorkoutCard } from '@/components/workout/workout-card';
import type { GetHomeInfo200TodayWorkoutDay } from '@/lib/api/boo-train-api';

interface ITodayWorkoutProps {
  todayWorkoutDay: GetHomeInfo200TodayWorkoutDay;
}

const WEEKDAY_NAMES: Record<string, string> = {
  SUNDAY: 'Domingo',
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
};

function getWeekdayName(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekdays = [
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];
  return WEEKDAY_NAMES[weekdays[date.getDay()]] || 'Dia';
}

export function TodayWorkout({ todayWorkoutDay }: ITodayWorkoutProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[18px] font-semibold text-black">
          Treino de Hoje
        </span>
        <Link href="/treinos" className="text-[12px] text-[#2b54ff]">
          Ver treinos
        </Link>
      </div>

      {todayWorkoutDay ? (
        <WorkoutCard
          planId={todayWorkoutDay.workoutPlanId}
          dayId={todayWorkoutDay.workoutDayId}
          workout={todayWorkoutDay}
        />
      ) : (
        <RestDayCard weekday={getWeekdayName(new Date().toISOString())} />
      )}
    </div>
  );
}

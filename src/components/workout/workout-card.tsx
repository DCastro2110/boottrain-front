import { Calendar, Dumbbell, Timer } from 'lucide-react';
import Link from 'next/link';

interface IWorkoutCardProps {
  planId: string;
  dayId: string;
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

function getFullWeekdayName(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekdays = [
    'DOMINGO',
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
  ];
  return weekdays[date.getDay()];
}

export function WorkoutCard({ planId, dayId, workout }: IWorkoutCardProps) {
  const weekdayName = getFullWeekdayName(workout.date);

  return (
    <Link href={`/workout-plan/${planId}/workout-day/${dayId}`}>
      <div
        className="relative flex min-h-48 w-full flex-col justify-between rounded-xl bg-cover bg-center p-4 sm:min-h-52 sm:p-5"
        style={{
          backgroundImage: workout.coverImageUrl
            ? `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${workout.coverImageUrl})`
            : 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
        }}
      >
        <div className="absolute inset-0 rounded-xl bg-black/40" />

        <div className="relative flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md sm:text-sm">
            <Calendar className="h-3.5 w-3.5" />
            <span>{weekdayName}</span>
          </span>
        </div>

        <div className="relative flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            {workout.name}
          </h3>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-white/70 sm:text-sm">
              <Timer className="h-3.5 w-3.5" />
              <span>{formatDuration(workout.estimatedDurationInSeconds)}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-white/70 sm:text-sm">
              <Dumbbell className="h-3.5 w-3.5" />
              <span>
                {workout.numberOfExercises}{' '}
                {workout.numberOfExercises === 1 ? 'exercício' : 'exercícios'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

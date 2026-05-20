'use client';

import { Calendar, Check, Dumbbell, Loader2, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { useToast } from '@/components/ui/toast';
import type { GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200 } from '@/lib/api/boo-train-api';

import { startWorkoutAction } from '../_actions';

interface HeroProps {
  workoutDay: GetWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId200;
  workoutPlanId: string;
  workoutDayId: string;
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes}min`;
}

function getFullWeekdayName(weekDay: string): string {
  const weekdays: Record<string, string> = {
    SUNDAY: 'DOMINGO',
    MONDAY: 'SEGUNDA',
    TUESDAY: 'TERÇA',
    WEDNESDAY: 'QUARTA',
    THURSDAY: 'QUINTA',
    FRIDAY: 'SEXTA',
    SATURDAY: 'SÁBADO',
  };
  return weekdays[weekDay] || weekDay;
}

export function Hero({ workoutDay, workoutPlanId, workoutDayId }: HeroProps) {
  const { addToast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStartWorkout = () => {
    startTransition(async () => {
      try {
        await startWorkoutAction(workoutPlanId, workoutDayId);
        addToast('Treino iniciado!', 'success');
        router.refresh();
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'SESSION_ALREADY_ACTIVE'
        ) {
          addToast('Já existe uma sessão ativa para este treino', 'info');
        } else {
          addToast('Erro ao iniciar treino', 'error');
        }
      }
    });
  };

  const weekdayName = getFullWeekdayName(workoutDay.weekDay);
  const isCompleted = workoutDay.isCompleted;

  return (
    <div
      className="relative flex h-[200px] w-full flex-col justify-between rounded-xl bg-cover bg-center p-5"
      style={{
        backgroundImage: workoutDay.coverImageUrl
          ? `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url(${workoutDay.coverImageUrl})`
          : 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
      }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/40" />

      <div className="relative flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md">
          <Calendar className="h-3.5 w-3.5" />
          <span>{weekdayName}</span>
        </span>
      </div>

      <div className="relative flex items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-white">
            {workoutDay.name}
          </h3>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[12px] text-white/70">
              <Timer className="h-3.5 w-3.5" />
              <span>
                {formatDuration(workoutDay.estimatedDurationInSeconds)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[12px] text-white/70">
              <Dumbbell className="h-3.5 w-3.5" />
              <span>
                {workoutDay.numberOfExercises}{' '}
                {workoutDay.numberOfExercises === 1
                  ? 'exercício'
                  : 'exercícios'}
              </span>
            </div>
          </div>
        </div>

        {isCompleted ? (
          <div className="flex h-10 items-center gap-2 rounded-full bg-green-500 px-4 text-sm font-semibold text-white">
            <Check className="h-4 w-4" />
            Treino concluído
          </div>
        ) : workoutDay.workoutSessionId ? (
          <div className="flex h-10 items-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white">
            Treino em andamento
          </div>
        ) : (
          <button
            onClick={handleStartWorkout}
            disabled={isPending}
            className="flex h-10 items-center gap-2 rounded-full bg-[#2b54ff] px-4 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Iniciar Treino
          </button>
        )}
      </div>
    </div>
  );
}

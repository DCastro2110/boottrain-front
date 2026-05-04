'use client';

import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId } from '@/lib/api/boo-train-api';

interface FinishButtonProps {
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string | null;
}

export function FinishButton({
  workoutPlanId,
  workoutDayId,
  sessionId,
}: FinishButtonProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: () => {
      if (!sessionId) throw new Error('No active session');
      return patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId(
        workoutPlanId,
        workoutDayId,
        sessionId
      );
    },
    onSuccess: () => {
      setShowSuccess(true);
    },
    onError: () => {
      addToast('Erro ao concluir treino', 'error');
    },
  });

  if (!sessionId) return null;

  return (
    <>
      <button
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending}
        className="flex h-12 w-full items-center justify-center rounded-full border border-[#f1f1f1] bg-white text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-50"
      >
        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Marcar como concluído
      </button>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
          <div className="flex w-full max-w-xs flex-col items-center rounded-3xl bg-white p-8 text-center shadow-xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Parabéns!
            </h2>
            <p className="mb-8 text-gray-600">
              Você concluiu o treino do dia!
            </p>
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              className="h-12 w-full rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
            >
              Voltar para o menu
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

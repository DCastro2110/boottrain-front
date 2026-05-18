'use client';

import { Calendar, Zap } from 'lucide-react';

interface IRestDayCardProps {
  weekday: string;
}

export function RestDayCard({ weekday }: IRestDayCardProps) {
  return (
    <div className="flex min-h-48 w-full flex-col items-center justify-between rounded-xl bg-[#f1f1f1] p-4 sm:min-h-52 sm:p-5">
      <div className="flex items-center justify-center">
        <span className="flex items-center gap-1 rounded-full bg-[#00000014] px-2 py-1 text-xs font-semibold text-black sm:text-sm">
          <Calendar className="h-3.5 w-3.5" />
          <span>{weekday}</span>
        </span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Zap className="h-5 w-5 fill-[#2b54ff] text-[#2b54ff]" />
        <h3 className="text-xl font-semibold text-black sm:text-2xl">Descanso</h3>
      </div>
    </div>
  );
}

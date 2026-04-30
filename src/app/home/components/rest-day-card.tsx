"use client";

import { Zap } from "lucide-react";

interface IRestDayCardProps {
  weekday: string;
}

export function RestDayCard({ weekday }: IRestDayCardProps) {
  return (
    <div className="flex h-28 min-h-[100px] w-full flex-col items-center justify-center gap-1.5 rounded-xl bg-neutral-100 p-4 sm:h-[110px] sm:gap-2 sm:p-5">
      <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-xs font-semibold text-black sm:px-3 sm:py-1.5 sm:text-xs">
        {weekday}
      </span>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Zap className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5" />
        <span className="text-lg font-semibold text-black sm:text-2xl">Descanso</span>
      </div>
    </div>
  );
}
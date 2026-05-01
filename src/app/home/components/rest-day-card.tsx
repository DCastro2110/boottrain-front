"use client";

import { Zap } from "lucide-react";
import { useState } from "react";

interface IRestDayCardProps {
  weekday: string;
  onComplete?: () => void;
}

export function RestDayCard({ weekday }: IRestDayCardProps) {
  const [status, setStatus] = useState<"pending" | "in_progress" | "completed">(
    "pending"
  );

  const handleAction = () => {
    if (status === "pending") {
      setStatus("in_progress");
    } else if (status === "in_progress") {
      setStatus("completed");
    }
  };

  const getButtonText = () => {
    if (status === "pending") return "Começar";
    if (status === "in_progress") return "Terminar";
    return "Descanso completo";
  };

  const isCompleted = status === "completed";

  return (
    <div
      className={`flex h-28 min-h-[100px] w-full flex-col items-center justify-center gap-1.5 rounded-xl p-4 sm:h-[110px] sm:gap-2 sm:p-5 ${
        isCompleted ? "bg-green-100" : "bg-neutral-100"
      }`}
    >
      <span className="flex items-center gap-1.5 rounded-full bg-black/10 px-2.5 py-1 text-xs font-semibold text-black sm:px-3 sm:py-1.5 sm:text-xs">
        {weekday}
      </span>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Zap
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            isCompleted ? "text-green-500" : "text-blue-500"
          }`}
        />
        <span
          className={`text-lg font-semibold sm:text-2xl ${
            isCompleted ? "text-green-700" : "text-black"
          }`}
        >
          {isCompleted ? "Descanso completo" : "Descanso"}
        </span>
      </div>

      {!isCompleted && (
        <button
          onClick={handleAction}
          className="mt-1 rounded-lg bg-blue-500 px-4 py-1.5 text-xs font-medium text-white sm:mt-2"
        >
          {getButtonText()}
        </button>
      )}
    </div>
  );
}
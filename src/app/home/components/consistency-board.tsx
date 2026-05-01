"use client";

import { Flame } from "lucide-react";

interface ConsistencyDay {
  day:
    | "SUNDAY"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY";
  status: "completed" | "not_completed" | "missed";
}

interface IConsistencyBoardProps {
  consistency: ConsistencyDay[];
  fireSequence: number;
}

const DAY_ABBREVIATIONS: Record<ConsistencyDay["day"], string> = {
  SUNDAY: "DOM",
  MONDAY: "SEG",
  TUESDAY: "TER",
  WEDNESDAY: "QUA",
  THURSDAY: "QUI",
  FRIDAY: "SEX",
  SATURDAY: "SÁB",
};

const STATUS_COLORS = {
  completed: "bg-blue-500",
  not_completed: "bg-blue-100",
  missed: "bg-neutral-200",
  future: "bg-neutral-100",
};

const DAY_ORDER: Record<ConsistencyDay["day"], number> = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

export function ConsistencyBoard({
  consistency,
  fireSequence,
}: IConsistencyBoardProps) {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const isFutureDay = (day: ConsistencyDay["day"]): boolean => {
    const dayIndex = DAY_ORDER[day];
    return dayIndex > currentDayOfWeek;
  };

  const getStatusColor = (dayInfo: ConsistencyDay): string => {
    if (isFutureDay(dayInfo.day)) {
      return STATUS_COLORS.future;
    }
    return STATUS_COLORS[dayInfo.status];
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold sm:text-lg">Consistência</span>
        <span className="text-xs text-blue-500 sm:text-sm">Ver histórico</span>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <div className="flex gap-1.5 sm:gap-3 rounded-xl bg-neutral-100 p-2.5 sm:p-5">
          {consistency.map((dayInfo) => (
            <div
              key={dayInfo.day}
              className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${getStatusColor(dayInfo)}`}
            >
              <span className="text-[10px] font-medium sm:text-xs">
                {DAY_ABBREVIATIONS[dayInfo.day]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 rounded-xl bg-orange-100 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
          <Flame className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5" />
          <span className="text-sm font-semibold sm:text-base">
            {fireSequence}
          </span>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Flame } from 'lucide-react';
import Link from 'next/link';

interface ConsistencyDay {
  day:
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
  status: 'completed' | 'not_completed' | 'missed';
}

interface IConsistencyBoardProps {
  consistency: ConsistencyDay[];
  fireSequence: number;
}

const DAY_ABBREVIATIONS: Record<ConsistencyDay['day'], string> = {
  SUNDAY: 'D',
  MONDAY: 'S',
  TUESDAY: 'T',
  WEDNESDAY: 'Q',
  THURSDAY: 'Q',
  FRIDAY: 'S',
  SATURDAY: 'S',
};

const STATUS_COLORS = {
  completed: 'bg-[#2b54ff]',
  not_completed: 'bg-transparent border border-[#f1f1f1]',
  missed: 'bg-[#d5dffe]',
  future: 'bg-transparent border border-[#f1f1f1]',
};

const DAY_ORDER: ConsistencyDay['day'][] = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export function ConsistencyBoard({
  consistency,
  fireSequence,
}: IConsistencyBoardProps) {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  const isFutureDay = (day: ConsistencyDay['day']): boolean => {
    // Corrected logic for Seg-Dom order
    const dayJsIndex = [0, 1, 2, 3, 4, 5, 6].find(
      (i) =>
        [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ][i] === day,
    );

    // Simplest is to compare with JS getDay()
    // But we need to handle Sunday as 7 if we are in a 1-7 (Seg-Dom) cycle
    const normalizedCurrent = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
    const normalizedDay = dayJsIndex === 0 ? 7 : dayJsIndex!;

    return normalizedDay > normalizedCurrent;
  };

  const isToday = (day: ConsistencyDay['day']): boolean => {
    const dayJsIndex = [0, 1, 2, 3, 4, 5, 6].find(
      (i) =>
        [
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ][i] === day,
    );
    return dayJsIndex === currentDayOfWeek;
  };

  const getStatusColor = (dayInfo: ConsistencyDay): string => {
    if (isFutureDay(dayInfo.day)) {
      return STATUS_COLORS.future;
    }
    return STATUS_COLORS[dayInfo.status];
  };

  const sortedConsistency = [...consistency].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day),
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-black sm:text-lg">
          Consistência
        </span>
        <Link href="/stats" className="text-xs text-[#2b54ff] sm:text-sm">
          Stats
        </Link>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 gap-2 rounded-xl border border-[#f1f1f1] p-4 sm:gap-3 sm:p-5">
          {sortedConsistency.map((dayInfo) => (
            <div
              key={dayInfo.day}
              className="flex flex-col items-center gap-1 sm:gap-1.5"
            >
              <div
                className={`h-5 w-5 rounded-[6px] ${getStatusColor(dayInfo)} ${
                  isToday(dayInfo.day)
                    ? 'ring-2 ring-[#2bff8a] ring-offset-0'
                    : ''
                }`}
              />
              <span className="text-xs font-normal text-[#656565] sm:text-sm">
                {DAY_ABBREVIATIONS[dayInfo.day]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex h-full items-center gap-2 rounded-xl bg-[#f0610014] px-3 py-2 sm:px-5">
          <Flame className="h-5 w-5 fill-[#f06100] text-[#f06100]" />
          <span className="text-base font-semibold text-black sm:text-lg">
            {fireSequence}
          </span>
        </div>
      </div>
    </div>
  );
}

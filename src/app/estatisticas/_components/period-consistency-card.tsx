'use client';

import { GetStatsStats200SessionsItem } from '@/lib/api/boo-train-api';

interface PeriodConsistencyCardProps {
  completionPercent: number;
  totalSessions: number;
  sessions: GetStatsStats200SessionsItem[];
}

export function PeriodConsistencyCard({
  sessions = [],
}: PeriodConsistencyCardProps) {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const currentYear = new Date().getFullYear();

  // Helper to check if a specific day has a session
  const hasSession = (monthIndex: number, dayOfMonth: number) => {
    if (dayOfMonth < 1 || dayOfMonth > 31) return false;

    // Create a date string in YYYY-MM-DD format for comparison
    const date = new Date(currentYear, monthIndex, dayOfMonth);

    // Ensure we don't count days from previous/next month due to Date overflow
    if (date.getMonth() !== monthIndex) return false;

    const dateStr = date.toISOString().split('T')[0];

    return sessions.some((s) => s.startedAt.startsWith(dateStr));
  };

  const getStatusColor = (monthIndex: number, dayOfMonth: number) => {
    const active = hasSession(monthIndex, dayOfMonth);
    if (!active) return 'bg-[#f1f1f1]';

    // Alternate between primary blue and light blue for variety like in design
    return (monthIndex + dayOfMonth) % 3 === 0
      ? 'bg-[#d5dffe]'
      : 'bg-[#2b54ff]';
  };

  return (
    <div className="flex w-full flex-col gap-3 overflow-x-auto rounded-xl border border-[#f1f1f1] p-3 sm:gap-4 sm:p-5">
      <div className="flex min-w-max gap-4 sm:gap-6">
        {months.map((month, mIdx) => (
          <div key={month} className="flex flex-col gap-1 sm:gap-1.5">
            <span className="text-xs font-normal text-[#656565] sm:text-sm">{month}</span>
            <div className="flex gap-0.5 sm:gap-1">
              {[0, 1, 2, 3, 4].map((col) => (
                <div key={col} className="flex flex-col gap-0.5 sm:gap-1">
                  {[0, 1, 2, 3, 4, 5, 6].map((row) => {
                    const dayOfMonth = col * 7 + row + 1;
                    const daysInMonth = new Date(
                      currentYear,
                      mIdx + 1,
                      0,
                    ).getDate();

                    // If the day is beyond the month's days, render a hidden or empty square to maintain grid
                    if (dayOfMonth > daysInMonth) {
                      return (
                        <div
                          key={row}
                          className="h-4 w-4 rounded-sm bg-transparent sm:h-5 sm:w-5"
                        />
                      );
                    }

                    return (
                      <div
                        key={row}
                        className={`h-4 w-4 rounded-sm sm:h-5 sm:w-5 ${getStatusColor(
                          mIdx,
                          dayOfMonth,
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PeriodConsistencyCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-[#f1f1f1] p-3 sm:gap-4 sm:p-5 animate-pulse">
      <div className="flex gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1 sm:gap-1.5">
            <div className="h-3 w-8 rounded bg-gray-200 sm:h-4" />
            <div className="flex gap-0.5 sm:gap-1">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex flex-col gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((k) => (
                    <div key={k} className="h-4 w-4 rounded-sm bg-gray-200 sm:h-5 sm:w-5" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

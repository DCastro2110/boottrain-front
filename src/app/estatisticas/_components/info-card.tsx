import { type LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface InfoCardProps {
  children: ReactNode;
}

export function InfoCard({ children }: InfoCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-[#f1f1f1] bg-[#2b54ff14] p-4 sm:gap-5 sm:p-5">
      {children}
    </div>
  );
}

interface InfoCardIconProps {
  icon: LucideIcon;
  colorClass?: string;
  bgClass?: string;
}

InfoCard.Icon = function InfoCardIcon({
  icon: Icon,
  colorClass = 'text-[#2b54ff]',
  bgClass = 'bg-[#2b54ff14]',
}: InfoCardIconProps) {
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full ${bgClass} sm:h-9 sm:w-9`}
    >
      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colorClass}`} />
    </div>
  );
};

interface InfoCardTitleProps {
  children: ReactNode;
}

InfoCard.Title = function InfoCardTitle({ children }: InfoCardTitleProps) {
  return <span className="font-normal text-[#656565]">{children}</span>;
};

interface InfoCardValueProps {
  children: ReactNode;
  unit?: string;
}

InfoCard.Value = function InfoCardValue({
  children,
  unit,
}: InfoCardValueProps) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-semibold text-black sm:text-xl">{children}</span>
      {unit && (
        <span className="text-xs font-medium text-gray-400 sm:text-sm">{unit}</span>
      )}
    </div>
  );
};

export function InfoCardSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl border border-[#f1f1f1] bg-[#2b54ff14] p-4 sm:gap-5 sm:p-5 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-200 sm:h-9 sm:w-9" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-5 w-16 rounded bg-gray-200 sm:h-6" />
        <div className="h-4 w-20 rounded bg-gray-200 sm:h-5" />
      </div>
    </div>
  );
}

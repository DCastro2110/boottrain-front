import { LucideIcon } from 'lucide-react';

interface IStatCardProps {
  icon: LucideIcon;
  value: string | number;
  unit: string;
}

export function StatCard({ icon: Icon, value, unit }: IStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-[#2b54ff14] p-4 sm:p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2b54ff14]">
        <Icon className="h-4 w-4 text-black" />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-xl font-semibold text-black sm:text-2xl">{value}</span>
        <span className="text-xs text-[#656565] sm:text-sm">{unit}</span>
      </div>
    </div>
  );
}

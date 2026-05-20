'use client';

import { useUser } from '@/hooks/use-user';

export function GreetingBanner() {
  const user = useUser();
  const userName = user?.name || 'Usuário';

  return (
    <div className="relative flex flex-col gap-1.5">
      <h1 className="text-2xl font-semibold text-white">Olá, {userName}</h1>
      <p className="text-sm text-white/70">Bora treinar hoje?</p>
    </div>
  );
}

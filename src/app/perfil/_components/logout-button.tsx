'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#ff3838]"
    >
      <span>Sair da conta</span>
      <LogOut className="h-4 w-4" />
    </button>
  );
}

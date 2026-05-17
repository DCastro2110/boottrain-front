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
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#ff3838] transition-colors hover:bg-red-50"
    >
      <LogOut className="h-5 w-5" />
    </button>
  );
}

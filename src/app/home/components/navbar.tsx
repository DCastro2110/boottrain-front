'use client';

import { BarChart3, Calendar, House, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[80px] w-full items-center justify-center rounded-t-[20px] border-t border-[#f1f1f1] bg-white px-6">
      <div className="flex w-full max-w-[393px] items-center justify-between">
        <Link
          href="/"
          className={`flex h-12 w-12 items-center justify-center ${
            isActive('/') ? 'text-black' : 'text-[#999999]'
          }`}
        >
          <House className="h-6 w-6" />
        </Link>

        <Link
          href="/workout-plan"
          className={`flex h-12 w-12 items-center justify-center ${
            isActive('/workout-plan') ? 'text-black' : 'text-[#999999]'
          }`}
        >
          <Calendar className="h-6 w-6" />
        </Link>

        <Link
          href="/ai"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2b54ff] text-white shadow-lg shadow-blue-200"
        >
          <Sparkles className="h-7 w-7" />
        </Link>

        <Link
          href="/stats"
          className={`flex h-12 w-12 items-center justify-center ${
            isActive('/stats') ? 'text-black' : 'text-[#999999]'
          }`}
        >
          <BarChart3 className="h-6 w-6" />
        </Link>

        <Link
          href="/perfil"
          className={`flex h-12 w-12 items-center justify-center ${
            isActive('/perfil') ? 'text-black' : 'text-[#999999]'
          }`}
        >
          <User className="h-6 w-6" />
        </Link>
      </div>
    </nav>
  );
}

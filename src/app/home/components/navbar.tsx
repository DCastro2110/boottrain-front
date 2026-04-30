import { BarChart3, Calendar, House, Sparkles, User } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-0">
      <div className="flex items-center gap-2 sm:gap-6 rounded-[20px] border border-neutral-200 bg-white px-3 py-3 sm:px-6 sm:py-4 shadow-sm">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center text-neutral-600 sm:h-12 sm:w-12"
        >
          <House className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        <Link
          href="/plano"
          className="flex h-11 w-11 items-center justify-center text-neutral-600 sm:h-12 sm:w-12"
        >
          <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        <Link
          href="/ai"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white sm:h-12 sm:w-12"
        >
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        <Link
          href="/evolucao"
          className="flex h-11 w-11 items-center justify-center text-neutral-600 sm:h-12 sm:w-12"
        >
          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        <Link
          href="/perfil"
          className="flex h-11 w-11 items-center justify-center text-neutral-600 sm:h-12 sm:w-12"
        >
          <User className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
      </div>
    </nav>
  );
}
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { authClient } from '@/lib/auth-client';

export default async function LoginPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session) {
    redirect('/');
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Background with overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content - centered on desktop, card at bottom on mobile */}
      <div className="relative z-10 flex flex-col items-center justify-end sm:justify-center min-h-screen sm:px-6">
        {/* Fit.ai Logo - visible on top for desktop */}
        <div className="hidden sm:block mb-8 absolute top-12">
          <span className="text-2xl font-bold text-white tracking-tight font-primary">
            Fit.ai
          </span>
        </div>

        {/* Login Card - 402px wide, positioned at bottom */}
        <div className="w-full max-w-[402px] rounded-t-[20px] bg-[#2b54ff] px-12 pt-12 pb-10 flex flex-col gap-14 items-center">
          {/* Hero Text - Inter Tight 32px semibold */}
          <div className="text-center">
            <h1 className="text-[32px] leading-[1.05] text-white font-primary font-semibold">
              O app que vai transformar a forma como você treina.
            </h1>
          </div>

          {/* Google Auth Button */}
          <GoogleAuthButton />

          {/* Copyright Footer - Inter Tight 12px normal */}
          <p className="text-xs text-white/70 font-primary">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </div>
      </div>
    </main>
  );
}

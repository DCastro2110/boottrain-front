import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { GoogleAuthButton } from '@/components/auth/google-auth-button';
import { authClient } from '@/lib/auth-client';

export default async function LoginPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data) {
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
        <div className="absolute inset-0 bg-black/66" />
      </div>

      {/* Content - centered on desktop, card at bottom on mobile */}
      <div className="relative z-10 flex flex-col items-center justify-end sm:justify-center min-h-screen">
        {/* Fit.ai Logo - visible on top */}
        <div className="mb-8 sm:absolute sm:top-12">
          <span className="text-[40px] font-anton text-white tracking-tight">
            Fit.ai
          </span>
        </div>

        {/* Login Card - 402px wide, positioned at bottom */}
        <div className="w-full max-w-[402px] rounded-t-[20px] bg-[#2b54ff] px-5 pt-12 pb-10 flex flex-col gap-[60px] items-center">
          {/* Hero Text and Button Container */}
          <div className="flex flex-col gap-6 items-center w-full">
            <h1 className="text-[32px] leading-[1.05] text-white font-primary font-semibold text-center">
              O app que vai transformar a forma como você treina.
            </h1>

            <GoogleAuthButton />
          </div>

          {/* Copyright Footer - Inter Tight 12px normal */}
          <p className="text-[12px] text-white/70 font-primary text-center">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </div>
      </div>
    </main>
  );
}

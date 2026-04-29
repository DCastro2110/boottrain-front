import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

export default function LoginPage() {
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Fit.ai Logo */}
        <div className="mb-8">
          <span className="text-2xl font-bold text-white tracking-tight">
            Fit.ai
          </span>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[402px] rounded-t-2xl bg-[#2b54ff] px-12 py-5 flex flex-col gap-16 items-center">
          {/* Hero Text */}
          <div className="text-center">
            <h1 className="text-[32px] font-semibold leading-[1.05] text-white">
              O app que vai transformar a forma como você treina.
            </h1>
          </div>

          {/* Google Auth Button */}
          <GoogleAuthButton />

          {/* Copyright Footer */}
          <p className="text-xs text-white/70">
            ©2026 Copyright FIT.AI. Todos os direitos reservados
          </p>
        </div>
      </div>
    </main>
  );
}
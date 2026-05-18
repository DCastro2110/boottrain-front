'use client';

interface IBannerProps {
  userName: string;
}

export function Banner({ userName }: IBannerProps) {
  return (
    <div className="container relative flex min-h-72 w-full flex-col justify-between rounded-b-[20px] bg-cover bg-center p-5 pb-10 gap-10 overflow-hidden shadow-sm sm:min-h-80 lg:min-h-96">
      <div
        className="absolute inset-0 bg-cover bg-center rounded-b-[20px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-b-[20px]" />

      {/* Header with logo */}
      <div className="relative flex items-center justify-between">
        <span className="font-anton text-[22px] text-white">Fit.ai</span>
        <div className="flex items-center gap-2 rounded-full bg-[#2b54ff] px-4 py-2">
          <span className="text-sm font-semibold text-white">Bora!</span>
        </div>
      </div>

      {/* Greeting */}
      <div className="relative flex flex-col gap-1.5">
        <h1 className="text-2xl font-semibold text-white">Olá, {userName}</h1>
        <p className="text-sm text-white/70">Bora treinar hoje?</p>
      </div>
    </div>
  );
}

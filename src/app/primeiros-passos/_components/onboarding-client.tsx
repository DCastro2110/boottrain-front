'use client';

import { useRouter } from 'next/navigation';

import { AIModal } from '@/components/ai/ai-modal';

const WELCOME_MESSAGES = [
  'Bem-vindo ao FIT.AI!',
  'O app que vai transformar a forma como você treina. Aqui você monta seu plano de treino personalizado, acompanha sua evolução com estatísticas detalhadas e conta com uma IA disponível 24h para te guiar em cada exercício.',
  'Tudo pensado para você alcançar seus objetivos de forma inteligente e consistente.',
  'Vamos configurar seu perfil?',
];

const FINISH_KEYWORDS = [
  'perfil configurado',
  'configuração concluída',
  'tudo pronto',
  'pronto para começar',
];

export function OnboardingClient() {
  const router = useRouter();

  const handleFinish = (text: string): boolean => {
    const isFinished = FINISH_KEYWORDS.some((keyword) =>
      text.toLowerCase().includes(keyword),
    );
    if (isFinished) {
      router.push('/');
    }
    return isFinished;
  };

  return (
    <AIModal
      variant="full"
      welcomeMessages={WELCOME_MESSAGES}
      onFinish={handleFinish}
    />
  );
}

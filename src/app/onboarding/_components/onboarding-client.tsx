'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ArrowUp, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SuggestedChips } from '@/components/ai/suggested-chips';

const INITIAL_MESSAGE = 'Vamos configurar meu perfil';

export function OnboardingClient() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai`,
      credentials: 'include',
    }),
    onFinish: (message) => {
      // AI handles saving data to profile via /ai endpoint
      // Check for completion indication in AI response
      if (message.role === 'assistant') {
        const text = message.parts
          .filter((p) => p.type === 'text')
          .map((p) => p.text)
          .join('');

        // Redirect after AI indicates onboarding completion
        if (
          text.includes('perfil configurado') ||
          text.includes('configuração concluída') ||
          text.includes('tudo pronto') ||
          text.includes('pronto para começar')
        ) {
          router.push('/');
        }
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && status === 'ready') {
      sendMessage({ text: trimmed });
      setInput('');
    }
  };

  const handleStartOnboarding = () => {
    if (status === 'ready') {
      sendMessage({ text: INITIAL_MESSAGE });
    }
  };

  const suggestedActions = [
    'Alterar plano de treino',
    'Mudar objetivo',
    'Atualizar informações',
  ];

  return (
    <div className="flex h-screen flex-col bg-white sm:h-[85vh] sm:w-[393px] sm:rounded-2xl sm:overflow-hidden sm:border sm:border-[#f1f1f1]">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#f1f1f1] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2b54ff]/10">
            <Sparkles className="h-5 w-5 text-[#2b54ff]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900">
              Coach AI
            </span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-[#2b54ff]">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden px-5 pt-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-3">
              {/* Welcome messages from design */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-[#f1f1f1] px-4 py-3">
                  <p className="text-sm text-gray-900">Bem-vindo ao FIT.AI! 🎉</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-[#f1f1f1] px-4 py-3">
                  <p className="text-sm text-gray-900">
                    O app que vai transformar a forma como você treina. Aqui você
                    monta seu plano de treino personalizado, acompanha sua
                    evolução com estatísticas detalhadas e conta com uma IA
                    disponível 24h para te guiar em cada exercício.
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-[#f1f1f1] px-4 py-3">
                  <p className="text-sm text-gray-900">
                    Tudo pensado para você alcançar seus objetivos de forma
                    inteligente e consistente.
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-[#f1f1f1] px-4 py-3">
                  <p className="text-sm text-gray-900">
                    Vamos configurar seu perfil?
                  </p>
                </div>
              </div>

              {/* Start Button */}
              <div className="mt-4 flex justify-start">
                <button
                  onClick={handleStartOnboarding}
                  disabled={status !== 'ready'}
                  className="rounded-full bg-[#2b54ff] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:bg-[#2b54ff]/90 disabled:opacity-50"
                >
                  Começar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#2b54ff] text-white'
                        : 'bg-[#f1f1f1] text-gray-900'
                    }`}
                  >
                    <p className="text-sm">
                      {message.parts
                        .filter((p) => p.type === 'text')
                        .map((p) => p.text)
                        .join('')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggested chips when no messages */}
        {messages.length === 0 && (
          <div className="mt-4 min-h-[48px]">
            <SuggestedChips
              chips={suggestedActions}
              onChipClick={(text) => {
                setInput(text);
              }}
            />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mb-6 mt-4 px-5">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2 rounded-full border border-[#f1f1f1] bg-white p-1.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem"
            disabled={status !== 'ready'}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2b54ff] text-white disabled:opacity-50"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
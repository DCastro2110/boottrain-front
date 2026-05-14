'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { ChatInput } from '@/components/ai/chat-input';
import { ChatMessages } from '@/components/ai/chat-messages';
import { SuggestedChips } from '@/components/ai/suggested-chips';

export interface IAIModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialMessage?: string;
  variant?: 'modal' | 'full';
  welcomeMessages?: string[];
  suggestedActions?: string[];
  onFinish?: (text: string) => boolean;
}

export function AIModal({
  isOpen = true,
  onClose,
  initialMessage: initialMessageProp,
  variant = 'modal',
  welcomeMessages,
  suggestedActions,
  onFinish,
}: IAIModalProps) {
  const initialMessage = initialMessageProp || '';
  const [input, setInput] = useState('');
  const prevOpenRef = useRef(false);
  const hasInitialMessageSentRef = useRef(false);

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai`,
      credentials: 'include',
    }),

    onFinish: (messages) => {
      if (!onFinish) return;
      const message = messages.message;
      if (message.role === 'assistant') {
        const text = message.parts
          .filter((p) => p.type === 'text')
          .map((p) => p.text)
          .join('');
        onFinish(text);
      }
    },
  });

  useEffect(() => {
    if (welcomeMessages && isOpen) {
      setMessages(
        welcomeMessages.map((msg) => ({
          id: crypto.randomUUID(),
          role: 'assistant',
          parts: [{ type: 'text', text: msg }],
        })),
      );
    }
  }, [setMessages, isOpen, welcomeMessages]);

  useEffect(() => {
    if (prevOpenRef.current && !isOpen) {
      setInput('');
      hasInitialMessageSentRef.current = false;
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (
      initialMessage &&
      status === 'ready' &&
      !hasInitialMessageSentRef.current
    ) {
      hasInitialMessageSentRef.current = true;
      sendMessage({ text: initialMessage });
    }
  }, [initialMessage, status, sendMessage]);

  if (!isOpen) return null;

  if (error) {
    console.error('Error in chat transport:', error);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed && status === 'ready') {
      sendMessage({ text: trimmed });
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const defaultSuggestedActions = [
    'Alterar plano de treino',
    'Mudar objetivo',
    'Atualizar informações',
  ];

  const actions = suggestedActions || defaultSuggestedActions;

  const isFullVariant = variant === 'full';
  const showWelcomeMessages =
    isFullVariant && welcomeMessages && messages.length === 0;

  const containerClasses = isFullVariant
    ? 'flex h-screen flex-col bg-white sm:h-[85vh] sm:w-[393px] sm:rounded-2xl sm:overflow-hidden sm:border sm:border-[#f1f1f1]'
    : 'relative flex w-full flex-col bg-white sm:w-[393px] sm:rounded-2xl sm:overflow-hidden';

  const containerStyles = isFullVariant
    ? undefined
    : { height: '85vh', maxHeight: '85vh' };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center ${isFullVariant ? '' : ''}`}
    >
      {!isFullVariant && (
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div className={containerClasses} style={containerStyles}>
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
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-5 pt-6">
          <div className="flex-1 overflow-y-auto">
            <ChatMessages
              isLoading={status === 'submitted'}
              messages={messages}
            />
          </div>
          <div className="mt-4 min-h-[48px]">
            {messages.length === 0 && !showWelcomeMessages && (
              <SuggestedChips
                chips={actions}
                onChipClick={(text) => {
                  setInput(text);
                }}
              />
            )}
          </div>
          <div className="mb-6 mt-4">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={status !== 'ready'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

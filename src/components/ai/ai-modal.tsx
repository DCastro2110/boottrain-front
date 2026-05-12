'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef,useState } from 'react';

import { ChatInput } from '@/components/ai/chat-input';
import { ChatMessages } from '@/components/ai/chat-messages';

interface IAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export function AIModal({ isOpen, onClose, initialMessage: initialMessageProp }: IAIModalProps) {
  const searchParams = useSearchParams();
  const initialMessageFromParams = searchParams.get('initialMessage') || '';
  const initialMessage = initialMessageProp || initialMessageFromParams;
  const [input, setInput] = useState('');
  const prevOpenRef = useRef(false);
  const hasInitialMessageSentRef = useRef(false);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai`,
      credentials: 'include',
    }),
  });

  useEffect(() => {
    if (prevOpenRef.current && !isOpen) {
      setInput('');
    }
    prevOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (initialMessage && status === 'ready' && !hasInitialMessageSentRef.current) {
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

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative flex w-full max-w-[393px] flex-col bg-white" style={{ maxHeight: '85vh' }}>
        <div className="flex h-14 w-full items-center justify-between border-b border-[#f1f1f1] px-5">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-900 transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Boo AI</h1>
          <div className="h-10 w-10" />
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 pt-6" style={{ maxHeight: 'calc(85vh - 120px)' }}>
          <ChatMessages messages={messages} />
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
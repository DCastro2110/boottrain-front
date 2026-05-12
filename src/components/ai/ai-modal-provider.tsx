'use client';

import { useState } from 'react';

import { AIModal } from '@/components/ai/ai-modal';
import { AIModalContext } from '@/context/ai-modal-context';

export function AIModalProvider({ children }: { children: React.ReactNode }) {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const openAIModal = (message?: string) => {
    setInitialMessage(message);
    setIsAIOpen(true);
  };

  return (
    <AIModalContext.Provider value={{ openAIModal }}>
      {children}
      <AIModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialMessage={initialMessage}
      />
    </AIModalContext.Provider>
  );
}
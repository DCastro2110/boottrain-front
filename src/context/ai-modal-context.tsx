'use client';

import { createContext, useContext } from 'react';

interface AIModalContextValue {
  openAIModal: (message?: string) => void;
}

export const AIModalContext = createContext<AIModalContextValue>({
  openAIModal: () => {},
});

export function useAIModal() {
  return useContext(AIModalContext);
}
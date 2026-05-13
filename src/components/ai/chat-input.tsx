'use client';

import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-full border border-[#f1f1f1] bg-white p-1.5"
    >
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Digite sua mensagem"
        disabled={isLoading}
        className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2b54ff] text-white disabled:opacity-50"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </form>
  );
}

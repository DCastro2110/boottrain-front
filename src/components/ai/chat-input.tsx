'use client';

import { ArrowUp, Square } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isStreaming: boolean;
  onStop?: () => void;
}

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isStreaming,
  onStop,
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
        disabled={isStreaming}
        className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"
        >
          <Square className="h-4 w-4" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2b54ff] text-white disabled:opacity-50"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </form>
  );
}

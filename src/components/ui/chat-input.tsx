'use client';

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
    <form onSubmit={handleSubmit} className="flex w-full items-center gap-3 rounded-xl border border-[#f1f1f1] bg-white p-4">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Pergunte ao Boo AI..."
        disabled={isLoading}
        className="flex-1 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2b54ff] text-white disabled:opacity-50"
      >
        <svg
          className="h-5 w-5 rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
}
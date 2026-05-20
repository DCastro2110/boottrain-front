'use client';

import type { UIMessage } from 'ai';
import { useEffect, useRef } from 'react';

interface IMessageContentProps {
  message: UIMessage;
}

function MessageContent({ message }: IMessageContentProps) {
  return (
    <div className="flex flex-col gap-3">
      {message.parts.map((part, index) => {
        if (part.type === 'text') {
          const paragraphs = part.text.split('\n\n');
          return paragraphs.map((text, pIndex) => (
            <p
              key={`${index}-${pIndex}`}
              className="text-sm leading-relaxed whitespace-pre-wrap"
            >
              {text}
            </p>
          ));
        }
      })}
    </div>
  );
}

interface IErrorMessageProps {
  message: UIMessage;
}

function ErrorMessage({ message }: IErrorMessageProps) {
  return (
    <div className="mt-2 flex items-start gap-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-red-600">
            Erro ao enviar mensagem! Tente novamente.
          </span>
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-gray-900">
            {message.parts[0]?.type === 'text' ? message.parts[0].text : ''}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
  isError?: boolean;
}

export function ChatMessages({
  messages,
  isLoading,
  isError,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2b54ff]/10">
          <svg
            className="h-10 w-10 text-[#2b54ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
            />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Boo AI</h3>
          <p className="text-sm text-gray-500">
            Pergunte sobre treino, nutrição, recuperação e muito mais.
          </p>
        </div>
      </div>
    );
  }

  const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
  const lastMessage = messages[messages.length - 1];
  const doesLastAssistantMessageHaveSomeText =
    lastMessage?.role === 'assistant' &&
    lastMessage.parts.some(
      (part) => part.type === 'text' && part.text.trim() !== '',
    );

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6">
      {messages.map((message) => {
        const isLastUserMessage =
          message.role === 'user' && message === lastUserMessage;
        return (
          <div key={message.id}>
            <div
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-[#2b54ff] text-white'
                    : 'bg-[#f1f1f1] text-gray-900'
                }`}
              >
                <MessageContent message={message} />
              </div>
            </div>
            {isError && isLastUserMessage && <ErrorMessage message={message} />}
          </div>
        );
      })}
      {isLoading && !doesLastAssistantMessageHaveSomeText && (
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div
            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

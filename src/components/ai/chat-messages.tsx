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

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
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

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6">
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
            <MessageContent message={message} />
            {isLoading && message.role === 'assistant' && (
              <div className="flex items-center gap-2">
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
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

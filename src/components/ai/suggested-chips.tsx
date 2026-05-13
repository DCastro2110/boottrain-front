'use client';

interface ISuggestedChipsProps {
  chips: string[];
  onChipClick: (text: string) => void;
}

export function SuggestedChips({ chips, onChipClick }: ISuggestedChipsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-4">
      {chips.map((text, index) => (
        <button
          key={index}
          onClick={() => onChipClick(text)}
          className="rounded-full border border-[#e2e9fe] bg-[#e2e9fe] px-4 py-2 text-sm text-gray-900 transition-colors hover:bg-[#d4dffa]"
        >
          {text}
        </button>
      ))}
    </div>
  );
}

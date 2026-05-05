import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface IErrorPageProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export function ErrorPage({ title, backHref, backLabel }: IErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-5 text-center">
      <h1 className="mb-6 text-xl font-bold text-gray-900">{title}</h1>
      <Button
        render={<Link href={backHref} />}
        nativeButton={false}
        className="h-12 w-full max-w-xs rounded-xl bg-[#2b54ff] text-base font-semibold text-white"
      >
        {backLabel}
      </Button>
    </div>
  );
}

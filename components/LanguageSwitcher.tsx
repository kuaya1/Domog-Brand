'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Determine current locale based on path
  const isMongolian = pathname.startsWith('/mn');
  const nextLocale = isMongolian ? 'en' : 'mn';

  const onSelectChange = () => {
    startTransition(() => {
      // Replace the current locale in the path with the next one
      const newPath = pathname.replace(`/${isMongolian ? 'mn' : 'en'}`, `/${nextLocale}`);
      
      // If path doesn't have locale yet (e.g. root), prepend it
      const finalPath = newPath === pathname ? `/${nextLocale}${pathname}` : newPath;
      
      router.replace(finalPath);
    });
  };

  return (
    <button
      onClick={onSelectChange}
      disabled={isPending}
      className="text-xs font-bold tracking-widest uppercase px-3 py-1 border border-red-500 text-red-600 hover:bg-red-50 transition-all mx-2"
    >
      {isMongolian ? 'MN' : 'EN'} / {isMongolian ? 'EN' : 'MN'}
    </button>
  );
}

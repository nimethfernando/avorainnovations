'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GoogleTranslateSync() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const activeLang = localStorage.getItem('avora_lang');
      if (activeLang && activeLang !== 'en') {
        const timer = setTimeout(() => {
          const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
          if (select) {
            select.value = activeLang;
            select.dispatchEvent(new Event('change'));
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Translate sync error:', e);
    }
  }, [pathname]);

  return null;
}

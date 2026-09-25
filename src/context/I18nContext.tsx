'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type SupportedLanguage =
  | 'en'
  | 'de'
  | 'ka'
  | 'es'
  | 'fr'
  | 'hi'
  | 'ar'
  | 'zh-CN'
  | 'ja'
  | 'it'
  | 'pt'
  | 'ru';

export interface Translations {
  nav: {
    services: string;
    industries: string;
    technologies: string;
    solutions: string;
    resources: string;
    about: string;
    contact: string;
    getConsultation: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  common: {
    readMore: string;
    exploreService: string;
    viewCaseStudy: string;
    scheduleCall: string;
    newsletterTitle: string;
    newsletterDesc: string;
    subscribe: string;
    contactUs: string;
    allRightsReserved: string;
  };
}

const BASE_EN_TRANSLATIONS: Translations = {
  nav: {
    services: 'Services',
    industries: 'Industries',
    technologies: 'Technologies',
    solutions: 'Solutions',
    resources: 'Resources',
    about: 'About',
    contact: 'Contact',
    getConsultation: 'Book Consultation',
  },
  hero: {
    badge: 'ENTERPRISE AI & DIGITAL ENGINEERING STUDIO',
    titleLine1: 'Engineering Next-Gen',
    titleHighlight: 'AI & Digital Products',
    subtitle: 'Avora Innovations designs, builds, and scales mission-critical software, custom AI systems, and cloud platforms for forward-thinking enterprises worldwide.',
    ctaPrimary: 'Explore Capabilities',
    ctaSecondary: 'Schedule Free Technical Discovery',
  },
  common: {
    readMore: 'Read More',
    exploreService: 'Explore Capabilities',
    viewCaseStudy: 'View Case Study',
    scheduleCall: 'Schedule a Call',
    newsletterTitle: 'Stay Ahead of Technology Waves',
    newsletterDesc: 'Join 15,000+ technology leaders receiving our bi-weekly insights on AI architectures, cloud performance, and software engineering.',
    subscribe: 'Subscribe',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
  },
};

const TRANSLATIONS: Partial<Record<SupportedLanguage, Translations>> = {
  en: BASE_EN_TRANSLATIONS,
};

export function syncGoogleTranslateCookie(lang: SupportedLanguage) {
  if (typeof window === 'undefined') return;
  const hostname = window.location.hostname;
  if (lang === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
    }
  } else {
    const val = `/en/${lang}`;
    document.cookie = `googtrans=${val}; path=/;`;
    document.cookie = `googtrans=${val}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=${val}; path=/; domain=.${hostname};`;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `googtrans=${val}; path=/; domain=.${rootDomain};`;
    }
  }
}

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('avora_lang') as SupportedLanguage | null;
      const validLangs: SupportedLanguage[] = [
        'en', 'de', 'ka', 'es', 'fr', 'hi', 'ar', 'zh-CN', 'ja', 'it', 'pt', 'ru'
      ];
      if (stored && validLangs.includes(stored)) {
        setLanguageState(stored);
        syncGoogleTranslateCookie(stored);
      }
    } catch (e) {
      console.warn('Could not read stored language:', e);
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('avora_lang', lang);
    } catch (e) {
      console.warn('Could not store language preference:', e);
    }

    syncGoogleTranslateCookie(lang);

    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = lang === 'en' ? '' : lang;
      select.dispatchEvent(new Event('change'));
    }

    // A smooth reload guarantees 100% of all static, server, and dynamic content
    // across the entire website is fully translated or cleanly reverted to original English
    if (lang === 'en' || !select) {
      window.location.reload();
    }
  };

  const currentTranslations = TRANSLATIONS[language] || BASE_EN_TRANSLATIONS;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: currentTranslations }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

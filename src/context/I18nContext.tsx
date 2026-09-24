'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type SupportedLanguage = 'en' | 'hi' | 'de';

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
    statsYears: string;
    statsProjects: string;
    statsExperts: string;
    statsSatisfaction: string;
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

const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
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
      statsYears: 'Years Engineering Excellence',
      statsProjects: 'Enterprise Deliveries',
      statsExperts: 'Staff Engineers & Researchers',
      statsSatisfaction: 'Client Retention Rate',
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
  },
  hi: {
    nav: {
      services: 'सेवाएं (Services)',
      industries: 'उद्योग (Industries)',
      technologies: 'तकनीक (Technologies)',
      solutions: 'समाधान (Solutions)',
      resources: 'संसाधन (Resources)',
      about: 'परिचय (About)',
      contact: 'संपर्क करें (Contact)',
      getConsultation: 'परामर्श बुक करें',
    },
    hero: {
      badge: 'एंटरप्राइज एआई और डिजिटल इंजीनियरिंग स्टूडियो',
      titleLine1: 'नेक्स्ट-जेन का निर्माण',
      titleHighlight: 'एआई और डिजिटल उत्पाद',
      subtitle: 'एवोरा इनोवेशन दुनिया भर के अग्रणी उद्यमों के लिए मिशन-महत्वपूर्ण सॉफ्टवेयर, कस्टम एआई सिस्टम और क्लाउड प्लेटफॉर्म डिजाइन और स्केल करता है।',
      ctaPrimary: 'क्षमताएं देखें',
      ctaSecondary: 'तकनीकी परामर्श बुक करें',
      statsYears: 'वर्षों की इंजीनियरिंग उत्कृष्टता',
      statsProjects: 'सफल एंटरप्राइज प्रोजेक्ट्स',
      statsExperts: 'वरिष्ठ इंजीनियर और शोधकर्ता',
      statsSatisfaction: 'क्लाइंट संतुष्टि दर',
    },
    common: {
      readMore: 'अधिक पढ़ें',
      exploreService: 'विस्तार से जानें',
      viewCaseStudy: 'केस स्टडी देखें',
      scheduleCall: 'कॉल शेड्यूल करें',
      newsletterTitle: 'तकनीकी नवाचारों से आगे रहें',
      newsletterDesc: 'एआई आर्किटेक्चर और सॉफ्टवेयर इंजीनियरिंग पर हमारे द्वि-साप्ताहिक इनसाइट्स प्राप्त करने वाले 15,000+ तकनीकी लीडर्स से जुड़ें।',
      subscribe: 'सदस्यता लें',
      contactUs: 'संपर्क करें',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    },
  },
  de: {
    nav: {
      services: 'Dienstleistungen',
      industries: 'Branchen',
      technologies: 'Technologien',
      solutions: 'Lösungen',
      resources: 'Ressourcen',
      about: 'Über Uns',
      contact: 'Kontakt',
      getConsultation: 'Beratung buchen',
    },
    hero: {
      badge: 'ENTERPRISE KI & DIGITAL ENGINEERING STUDIO',
      titleLine1: 'Entwicklung von Next-Gen',
      titleHighlight: 'KI & Digitalen Produkten',
      subtitle: 'Avora Innovations entwickelt und skaliert unternehmenskritische Software, maßgeschneiderte KI-Systeme und Cloud-Plattformen für visionäre Unternehmen weltweit.',
      ctaPrimary: 'Fähigkeiten erkunden',
      ctaSecondary: 'Technisches Erstgespräch vereinbaren',
      statsYears: 'Jahre technische Exzellenz',
      statsProjects: 'Erfolgreiche Unternehmensprojekte',
      statsExperts: 'Senior Ingenieure & Forscher',
      statsSatisfaction: 'Kundenbindungsrate',
    },
    common: {
      readMore: 'Mehr erfahren',
      exploreService: 'Fähigkeiten ansehen',
      viewCaseStudy: 'Fallstudie ansehen',
      scheduleCall: 'Gespräch vereinbaren',
      newsletterTitle: 'Technologischem Wandel voraus sein',
      newsletterDesc: 'Abonnieren Sie wertvolle Einblicke in KI-Architektur, Cloud-Performance und modernste Softwareentwicklung.',
      subscribe: 'Abonnieren',
      contactUs: 'Kontaktieren Sie uns',
      allRightsReserved: 'Alle Rechte vorbehalten.',
    },
  },
};

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
      if (stored && ['en', 'hi', 'de'].includes(stored)) {
        setLanguageState(stored);
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
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
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

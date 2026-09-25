import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { I18nProvider } from '@/context/I18nContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContactWidget from '@/components/common/FloatingContactWidget';
import GoogleTranslateSync from '@/components/common/GoogleTranslateSync';
import { constructMetadata, generateOrganizationSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var d = document.documentElement;
                var t = localStorage.getItem('avora_theme');
                if (t === 'light') {
                  d.classList.remove('dark');
                  d.classList.add('light');
                  d.style.colorScheme = 'light';
                } else {
                  d.classList.add('dark');
                  d.classList.remove('light');
                  d.style.colorScheme = 'dark';
                }
              } catch (e) {}

              try {
                var lang = localStorage.getItem('avora_lang');
                if (lang && lang !== 'en') {
                  if (!document.cookie.includes('googtrans=' + '/en/' + lang)) {
                    var val = '/en/' + lang;
                    document.cookie = 'googtrans=' + val + '; path=/;';
                    document.cookie = 'googtrans=' + val + '; domain=.' + window.location.hostname + '; path=/;';
                  }
                }
              } catch (e) {}

              // Polyfill Node.removeChild & Node.insertBefore to prevent React 19 reconciliation errors with Google Translate
              if (typeof Node === 'function' && Node.prototype) {
                var origRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) {
                    return child;
                  }
                  return origRemoveChild.apply(this, arguments);
                };
                var origInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, refNode) {
                  if (refNode && refNode.parentNode !== this) {
                    return newNode;
                  }
                  return origInsertBefore.apply(this, arguments);
                };
              }

              window.googleTranslateElementInit = function() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,de,ka,es,fr,hi,ar,zh-CN,ja,it,pt,ru',
                    autoDisplay: false
                  }, 'google_translate_element');
                }
              };
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white`}>
        {/* Hidden Google Translate container */}
        <div id="google_translate_element" className="notranslate" aria-hidden="true" />
        
        <ThemeProvider>
          <I18nProvider>
            <GoogleTranslateSync />
            <Header />
            <main className="flex-grow pt-28 lg:pt-32">
              {children}
            </main>
            <FloatingContactWidget />
            <Footer />
          </I18nProvider>
        </ThemeProvider>

        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

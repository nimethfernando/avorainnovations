import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { I18nProvider } from '@/context/I18nContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContactWidget from '@/components/common/FloatingContactWidget';
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
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white`}>
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main className="flex-grow pt-28 lg:pt-32">
              {children}
            </main>
            <FloatingContactWidget />
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

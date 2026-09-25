import type { Metadata } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://avorainnovations.com';

export function constructMetadata({
  title = 'AVORA Innovations | Enterprise AI & Digital Engineering',
  description = 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
  image = '/og-image.png',
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const url = canonical ? `${APP_URL}${canonical}` : APP_URL;

  return {
    title: {
      default: title,
      template: '%s | AVORA Innovations',
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AVORA Innovations',
      images: [
        {
          url: image.startsWith('http') ? image : `${APP_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.startsWith('http') ? image : `${APP_URL}${image}`],
      creator: '@avorainnovations',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AVORA Innovations',
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    description: 'Enterprise AI & Digital Engineering Company delivering transformative software, cloud, and machine learning products.',
    sameAs: [
      'https://twitter.com/avorainnovations',
      'https://linkedin.com/company/avorainnovations',
      'https://github.com/avorainnovations',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-512-2867',
      contactType: 'Sales and Technical Consultation',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'German', 'Hindi'],
    },
  };
}

export function generateServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'AVORA Innovations',
      url: APP_URL,
    },
    url: `${APP_URL}/services/${service.slug}`,
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  authorName: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    datePublished: article.publishedAt,
    image: article.image || `${APP_URL}/og-image.png`,
    url: `${APP_URL}/blog/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'AVORA Innovations',
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${APP_URL}${item.url}`,
    })),
  };
}

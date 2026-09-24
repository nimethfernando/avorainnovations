import { MetadataRoute } from 'next';
import { SERVICES_DATA, INDUSTRIES_DATA, CASE_STUDIES_DATA, BLOG_POSTS_DATA } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://avorainnovations.com';
  const now = new Date();

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/industries',
    '/technologies',
    '/solutions',
    '/case-studies',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Service pages
  const serviceRoutes = SERVICES_DATA.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Industry pages
  const industryRoutes = INDUSTRIES_DATA.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Case study pages
  const caseStudyRoutes = CASE_STUDIES_DATA.map((c) => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogRoutes = BLOG_POSTS_DATA.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...caseStudyRoutes, ...blogRoutes];
}

import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { constructMetadata } from '@/lib/seo';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import ServicesMatrix from '@/components/home/ServicesMatrix';
import TechStackSection from '@/components/home/TechStackSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import CaseStudiesSection from '@/components/home/CaseStudiesSection';
import ProcessSection from '@/components/home/ProcessSection';
import WhyAvoraSection from '@/components/home/WhyAvoraSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';
import FaqSection from '@/components/home/FaqSection';
import CtaBanner from '@/components/home/CtaBanner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await db.getPage(slug);
  if (!page) return {};

  return constructMetadata({
    title: page.metaTitle || page.title,
    description: page.metaDesc || page.description || 'AVORA Innovations custom digital engineering page.',
    canonical: `/${page.slug}`,
  });
}

export default async function DynamicCMSPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await db.getPage(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  let blocks: any[] = [];
  try {
    blocks = JSON.parse(page.sections || '[]');
  } catch {
    blocks = [];
  }

  return (
    <div className="flex flex-col">
      {/* Editorial Page Header if not a homepage block set */}
      {blocks.length === 0 && (
        <div className="py-24 max-w-4xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            {page.title}
          </h1>
          {page.description && (
            <p className="text-base text-slate-600 dark:text-slate-400">
              {page.description}
            </p>
          )}
        </div>
      )}

      {/* Render CMS Page Blocks dynamically */}
      {blocks
        .filter((b) => b.enabled !== false)
        .map((b, idx) => {
          switch (b.type) {
            case 'hero':
              return <HeroSection key={b.id || idx} />;
            case 'services':
              return <ServicesMatrix key={b.id || idx} />;
            case 'technologies':
              return <TechStackSection key={b.id || idx} />;
            case 'industries':
              return <IndustriesSection key={b.id || idx} />;
            case 'case-studies':
              return <CaseStudiesSection key={b.id || idx} />;
            case 'why-avora':
              return <WhyAvoraSection key={b.id || idx} />;
            case 'testimonials':
              return <TestimonialsSection key={b.id || idx} />;
            case 'blogs':
              return <BlogSection key={b.id || idx} />;
            case 'faqs':
              return <FaqSection key={b.id || idx} />;
            case 'cta':
              return <CtaBanner key={b.id || idx} />;
            case 'text':
              return (
                <section key={b.id || idx} className="py-16 max-w-4xl mx-auto px-6">
                  {b.title && (
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {b.title}
                    </h2>
                  )}
                  {b.content && (
                    <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                      {b.content}
                    </div>
                  )}
                </section>
              );
            default:
              return null;
          }
        })}
    </div>
  );
}

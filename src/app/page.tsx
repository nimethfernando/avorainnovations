import React from 'react';
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
import { constructMetadata } from '@/lib/seo';
import { db } from '@/lib/db';

export async function generateMetadata() {
  const page = await db.getPage('home');
  const seo = await db.getSEOSettings();

  return constructMetadata({
    title: page?.metaTitle || seo?.metaTitle || 'AVORA Innovations | Enterprise AI, Cloud & Digital Product Engineering',
    description: page?.metaDesc || seo?.metaDescription || 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
    canonical: '/',
  });
}

export default async function HomePage() {
  const page = await db.getPage('home');

  let blocks: any[] = [];
  if (page?.sections) {
    try {
      blocks = JSON.parse(page.sections);
    } catch {
      blocks = [];
    }
  }

  // If blocks are configured via Visual Page Builder, render them dynamically in order
  if (blocks.length > 0) {
    return (
      <div className="flex flex-col">
        {blocks
          .filter((b) => b.enabled !== false)
          .map((b, idx) => {
            switch (b.type) {
              case 'hero':
                return <HeroSection key={b.id || idx} />;
              case 'about':
                return <AboutSection key={b.id || idx} />;
              case 'services':
                return <ServicesMatrix key={b.id || idx} />;
              case 'technologies':
                return <TechStackSection key={b.id || idx} />;
              case 'industries':
                return <IndustriesSection key={b.id || idx} />;
              case 'case-studies':
                return <CaseStudiesSection key={b.id || idx} />;
              case 'process':
                return <ProcessSection key={b.id || idx} />;
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
              default:
                return null;
            }
          })}
      </div>
    );
  }

  // Default fallback layout if no blocks are saved
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <ServicesMatrix />
      <TechStackSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <WhyAvoraSection />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}

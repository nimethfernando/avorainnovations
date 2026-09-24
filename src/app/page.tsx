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

export const metadata = constructMetadata({
  title: 'AVORA Innovations | Enterprise AI, Cloud & Digital Product Engineering',
  description: 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
  canonical: '/',
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. About Narrative & Engineering Pillars */}
      <AboutSection />

      {/* 3. Services & Capabilities Matrix (Konstant Infosolutions Depth) */}
      <ServicesMatrix />

      {/* 4. Technology Stack (Frontend, Backend, Mobile, DB, Cloud, AI, DevOps) */}
      <TechStackSection />

      {/* 5. Industries (FinTech, Healthcare, Real Estate, E-Commerce, Logistics, etc.) */}
      <IndustriesSection />

      {/* 6. Case Studies with Challenge, Solution & Verified ROI */}
      <CaseStudiesSection />

      {/* 7. 6-Stage Agile Engineering Lifecycle (Konstant Signature Process) */}
      <ProcessSection />

      {/* 8. Why Avora (IP Ownership, Senior Only, 4-Week PoV) */}
      <WhyAvoraSection />

      {/* 9. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 10. Insights & Engineering Blog */}
      <BlogSection />

      {/* 11. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 12. Call to Action Banner */}
      <CtaBanner />
    </div>
  );
}

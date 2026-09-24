import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CASE_STUDIES_DATA, SERVICES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Quote,
  Layers,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES_DATA.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA.find((c) => c.slug === slug);
  if (!study) return constructMetadata({ title: 'Case Study Not Found' });

  return constructMetadata({
    title: `${study.title} | Case Study`,
    description: study.subtitle,
    canonical: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA.find((c) => c.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Case Studies', url: '/case-studies' },
            { name: study.client, url: `/case-studies/${study.slug}` },
          ]}
        />

        {/* Hero */}
        <div className="my-10 lg:my-16 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-8 sm:p-14 border border-emerald-500/20 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {study.industry}
              </span>
              <span className="text-slate-400 text-xs font-semibold">Client: {study.client}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {study.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {study.subtitle}
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-emerald-500/20">
              {study.results.map((res, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">{res.metric}</div>
                  <div className="text-xs text-slate-400 font-medium">{res.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1. Challenge & 2. Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider">
              The Architectural Challenge
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Initial Operational State
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">
              The Avora Solution
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Engineering Intervention
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* 3. Technology Stack */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-6 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-500">
              Technology Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Technologies & Infrastructure Stack
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {study.technologies.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* 4. Implementation Steps */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
              Technical Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Step-by-Step Implementation Roadmap
            </h2>
          </div>

          <div className="space-y-4">
            {study.implementation.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Results & ROI */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Verified Business ROI
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Production Metrics & Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {study.results.map((res, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-1"
              >
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {res.metric}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial if present */}
        {study.testimonial && (
          <div className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
            <Quote className="w-12 h-12 text-emerald-500/20 absolute top-6 right-6" />
            <p className="text-base sm:text-xl font-medium text-slate-900 dark:text-white italic leading-relaxed mb-6">
              &ldquo;{study.testimonial.quote}&rdquo;
            </p>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                {study.testimonial.author}
              </div>
              <div className="text-xs text-slate-500">
                {study.testimonial.role}, {study.testimonial.company}
              </div>
            </div>
          </div>
        )}

        {/* 6. Related Services */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-6 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-500">
              Related Capabilities
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Avora Services Leveraged in this Engagement
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {study.relatedServices.map((serviceName) => {
              const matched = SERVICES_DATA.find((s) => s.title === serviceName);
              return (
                <Link
                  key={serviceName}
                  href={matched ? `/services/${matched.slug}` : '/services'}
                  className="px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 text-xs sm:text-sm font-bold text-slate-900 dark:text-white transition-all inline-flex items-center gap-2"
                >
                  <span>{serviceName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <CtaBanner />
    </>
  );
}

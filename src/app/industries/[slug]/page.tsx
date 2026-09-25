import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { INDUSTRIES_DATA, SERVICES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  Landmark,
  HeartPulse,
  Building,
  ShoppingBag,
  GraduationCap,
  Truck,
  Compass,
  Factory,
  Film,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const INDUSTRY_ICONS: Record<string, any> = {
  Landmark,
  HeartPulse,
  Building,
  ShoppingBag,
  GraduationCap,
  Truck,
  Compass,
  Factory,
  Film,
};

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES_DATA.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const ind = INDUSTRIES_DATA.find((i) => i.slug === slug);
  if (!ind) return constructMetadata({ title: 'Industry Not Found' });

  return constructMetadata({
    title: `${ind.title} Digital Engineering & AI Solutions`,
    description: ind.overview,
    canonical: `/industries/${ind.slug}`,
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = INDUSTRIES_DATA.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const IconComponent = INDUSTRY_ICONS[industry.iconName] || Landmark;

  return (
    <>
      <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Industries', url: '/industries' },
            { name: industry.title, url: `/industries/${industry.slug}` },
          ]}
        />

        {/* 1. Industry Hero */}
        <div className="my-10 lg:my-16 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 p-8 sm:p-14 border border-purple-500/20 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Domain Specialization
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {industry.title}
                </h1>
                <p className="text-xs sm:text-sm text-purple-300 font-semibold mt-1">
                  {industry.subtitle}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {industry.overview}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-purple-500/20">
              {industry.keyStats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-black text-purple-400">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/20 transition-all flex items-center gap-2"
              >
                <span>Schedule Industry Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 1.5 Compliance & Regulatory Moat Proof Banner */}
        <section className="py-10 border-b border-slate-200 dark:border-slate-800/80">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-blue-950/40 border border-purple-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Regulatory Hardened</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Engineered in strict compliance with ISO 27001, end-to-end data encryption, and GDPR standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Domain-Trained AI Agents</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Autonomous agents pre-tuned on vertical terminologies, ontology schemas, and deterministic safety guardrails.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero-Downtime Rollout SLA</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Blue-green deployment strategies guaranteeing 99.99% system continuity for mission-critical workloads.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Solutions Section */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-12 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-500">
              Specialized Solutions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Tailored Solutions for {industry.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.solutions.map((sol, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 shadow-sm transition-all space-y-4"
              >
                <div className="text-purple-500 font-mono text-xs font-bold">Solution 0{i + 1}</div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {sol.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sol.desc}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Included Features:
                  </div>
                  {sol.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Services Offered */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
              Practices Deployed
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Core Avora Services Deployed in {industry.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {industry.servicesOffered.map((sTitle) => {
              const matched = SERVICES_DATA.find((s) => s.title === sTitle);
              return (
                <Link
                  key={sTitle}
                  href={matched ? `/services/${matched.slug}` : '/services'}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-between group"
                >
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-500">
                    {sTitle}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. Technologies Used */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-500">
              Technology Stack
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Preferred Technology Stacks
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {industry.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Production Use Cases */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Client Outcomes
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Real-World Outcomes in {industry.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.useCases.map((uc, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {uc.client}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {uc.outcome}
                </p>
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  Measured Metric: {uc.metrics}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQs */}
        <section className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {industry.title} FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {industry.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-4 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CtaBanner />
    </>
  );
}

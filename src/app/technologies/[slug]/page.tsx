import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { TECH_CATEGORIES, DEFAULT_TECH_PAGES, getTechSlug } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Scan,
  FileText,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
  Repeat,
  Award,
  Boxes,
  Code,
  Activity,
  Share2,
  Shield,
  Server,
  ShoppingCart,
  Database,
  Radio,
  CreditCard,
  CheckSquare,
  HelpCircle,
  Clock,
  Lock,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  TrendingUp,
  Scan,
  FileText,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
  Repeat,
  Award,
  Boxes,
  Code,
  Activity,
  Share2,
  Shield,
  Server,
  ShoppingCart,
  Database,
  Radio,
  CreditCard,
  CheckSquare,
  HelpCircle,
  Clock,
  Lock,
};

interface TechPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();

  DEFAULT_TECH_PAGES.forEach((p) => slugs.add(p.slug));

  TECH_CATEGORIES.forEach((cat) => {
    cat.items.forEach((item) => {
      slugs.add(getTechSlug(item.name));
    });
  });

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TechPageProps) {
  const { slug } = await params;
  const page = await db.getTechnologyPageBySlug(slug);

  if (!page) {
    return constructMetadata({ title: 'Technology Not Found | Avora Innovations' });
  }

  return constructMetadata({
    title: page.metaTitle || `${page.title} | Avora Innovations`,
    description: page.metaDesc || page.heroDescription,
    canonical: `/technologies/${page.slug}`,
  });
}

export default async function TechnologyDetailPage({ params }: TechPageProps) {
  const { slug } = await params;
  const page = await db.getTechnologyPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const HeroIcon = ICON_MAP[page.iconName] || Terminal;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.heroDescription,
    provider: {
      '@type': 'Organization',
      name: 'Avora Innovations',
      url: 'https://avorainnovations.com',
    },
    url: `https://avorainnovations.com/technologies/${page.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Technologies', url: '/technologies' },
            { name: page.name, url: `/technologies/${page.slug}` },
          ]}
        />

        {/* 1. HERO SECTION */}
        <div className="my-10 lg:my-16 rounded-3xl bg-slate-950 bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 p-8 sm:p-14 border border-blue-500/20 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                {page.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {page.badge}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                <HeroIcon className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {page.title}
              </h1>
            </div>

            <p className="text-sm sm:text-base font-medium text-blue-300">
              {page.subtitle}
            </p>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {page.heroDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Technical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/cost-calculator"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
              >
                Estimate Project Cost
              </Link>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            {page.keyStats.map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. WHAT AVORA DOES IN THIS TECHNOLOGY */}
        <div className="my-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> What We Build &amp; Engineer
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Engineering Rigor in {page.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {page.fullOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sub-Millisecond Execution</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Optimized memory management and non-blocking I/O routines.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Enterprise Code Ownership</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Full IP rights, strict documentation, and no proprietary vendor lock-in.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">24/7 Reliability &amp; SRE</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Continuous automated telemetry, log tracing, and automated canary rollbacks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CORE CAPABILITIES */}
        <div className="my-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Core {page.name} Development Capabilities
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              End-to-end engineering practices designed for reliability, scale, and high developer velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.capabilities.map((cap, i) => {
              const CapIcon = ICON_MAP[cap.icon] || Code;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <CapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. WHY CHOOSE AVORA */}
        <div className="my-16 rounded-3xl bg-slate-950 p-8 sm:p-12 border border-slate-800 space-y-8 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              The Avora Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Forward-Thinking Enterprises Choose Us for {page.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.whyChoose.map((item, i) => {
              const ItemIcon = ICON_MAP[item.icon] || Award;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. TECH STACK PAIRINGS */}
        {page.techStackPairings && page.techStackPairings.length > 0 && (
          <div className="my-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Architectural Ecosystem &amp; Tech Pairings
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Complementary frameworks, data layers, and cloud infrastructure we deploy alongside {page.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {page.techStackPairings.map((pairing, i) => (
                <div key={i} className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {pairing.category}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {pairing.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. OUR 5-STAGE ENGINEERING PROCESS */}
        {page.developmentProcess && page.developmentProcess.length > 0 && (
          <div className="my-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Proven Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Our 5-Stage {page.name} Engineering Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {page.developmentProcess.map((step, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 relative"
                >
                  <span className="text-2xl font-black text-blue-600/30 dark:text-blue-400/20">
                    {step.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. REAL-WORLD CASE STUDIES */}
        {page.useCases && page.useCases.length > 0 && (
          <div className="my-16 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Demonstrated Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Real-World {page.name} Case Studies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.useCases.map((cs, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                    Client Success Story
                  </div>
                  <h3 className="text-lg font-bold">{cs.client}</h3>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p><strong className="text-slate-100">Challenge:</strong> {cs.challenge}</p>
                    <p><strong className="text-slate-100">Solution:</strong> {cs.solution}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-500/30 text-xs text-blue-300 font-semibold">
                    {cs.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. FREQUENTLY ASKED QUESTIONS */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="my-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 shadow-xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions about {page.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Key questions answered regarding technology fit, project timelines, and engagement models.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {page.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 transition-colors"
                >
                  <summary className="font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-blue-600 dark:text-blue-400 text-lg group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <CtaBanner />
        </div>
      </div>
    </>
  );
}

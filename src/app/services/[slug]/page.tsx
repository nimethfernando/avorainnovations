import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA, INDUSTRIES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata, generateServiceSchema } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Scan,
  FileText,
  Sliders,
  Layers,
  ShieldCheck,
  Network,
  Terminal,
  UserCheck,
  Zap,
  Grid,
  FileCode,
  Repeat,
  WifiOff,
  Award,
  Boxes,
  Code,
  DollarSign,
  Activity,
  Share2,
  PieChart,
  Radio,
  Wrench,
  Box,
  Download,
  CheckSquare,
  FileSpreadsheet,
  Shield,
  Glasses,
  PlayCircle,
  Compass,
  LifeBuoy,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link: LinkIcon,
  Eye,
  TrendingUp,
  Scan,
  FileText,
  Sliders,
  Layers,
  ShieldCheck,
  Network,
  Terminal,
  UserCheck,
  Zap,
  Grid,
  FileCode,
  Repeat,
  WifiOff,
  Award,
  Boxes,
  Code,
  DollarSign,
  Activity,
  Share2,
  PieChart,
  Radio,
  Wrench,
  Box,
  Download,
  CheckSquare,
  FileSpreadsheet,
  Shield,
  Glasses,
  PlayCircle,
  Compass,
  LifeBuoy,
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return constructMetadata({ title: 'Service Not Found' });

  return constructMetadata({
    title: `${service.title} | Enterprise Services`,
    description: service.shortDesc,
    canonical: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = ICON_MAP[service.iconName] || Brain;
  const schema = generateServiceSchema({
    title: service.title,
    description: service.shortDesc,
    slug: service.slug,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${service.slug}` },
          ]}
        />

        {/* 1. Hero Section */}
        <div className="my-10 lg:my-16 rounded-3xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950 p-8 sm:p-14 border border-blue-500/20 relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                {service.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">
                {service.badge}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                <IconComponent className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {service.title}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {service.shortDesc}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <span>Schedule Technical Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#capabilities"
                className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition-all"
              >
                Explore Capabilities ↓
              </a>
            </div>
          </div>
        </div>

        {/* 2. Overview Section */}
        <section className="py-12 border-b border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
                Architectural Overview
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Engineered for High-Scale Enterprise Environments
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {service.fullDesc}
              </p>
            </div>
            <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Delivery Guarantees
              </div>
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Full source code & IP ownership transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sub-15ms latency & SLA guarantees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>SOC2 & HIPAA compliant infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Senior-only staff & dedicated squad</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Capabilities Section */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80" id="capabilities">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Core Capabilities & Specializations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Deep, proven competencies built over hundreds of enterprise production launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, i) => {
              const CapIcon = ICON_MAP[cap.icon] || CheckCircle2;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 shadow-sm hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <CapIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Sub-Services Breakdown */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
              Sub-Services Breakdown
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Modular Engagement Practices
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.subServices.map((sub, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="text-blue-500 font-mono text-xs font-bold">0{i + 1}.</div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {sub.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sub.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technology Stack */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-500">
              Tech Stack & Frameworks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Technologies Utilized in {service.title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* 6. Industries Served */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-500">
              Vertical Cross-Application
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Industries Served by this Practice
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {service.industries.map((indName) => {
              const matchedInd = INDUSTRIES_DATA.find((i) =>
                i.title.toLowerCase().includes(indName.toLowerCase())
              );
              return (
                <Link
                  key={indName}
                  href={matchedInd ? `/industries/${matchedInd.slug}` : '/industries'}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center hover:border-purple-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  {indName}
                </Link>
              );
            })}
          </div>
        </section>

        {/* 7. Real-World Use Cases */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="mb-10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Verified Production Deployments
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Real-World Use Cases & Measurable Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.useCases.map((uc, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {uc.title}
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-400 block mb-0.5">The Challenge:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{uc.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400 block mb-0.5">Our Solution:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{uc.solution}</p>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  Impact: {uc.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FAQs */}
        <section className="py-16 border-b border-slate-200 dark:border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {service.title} FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Technical answers to common engineering questions regarding this practice.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
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

      {/* 9. CTA Banner */}
      <CtaBanner />
    </>
  );
}

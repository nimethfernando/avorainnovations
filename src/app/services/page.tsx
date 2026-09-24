import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
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
  ArrowRight,
  CheckCircle2,
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
};

export const metadata = constructMetadata({
  title: 'Enterprise Services & Engineering Practices',
  description: 'Explore AVORA Innovations comprehensive service offerings: AI & Machine Learning, Generative AI, Mobile & Web Engineering, Cloud Infrastructure, and IoT.',
  canonical: '/services',
});

export default function ServicesPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Services', url: '/services' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Full-Spectrum Digital Engineering
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Enterprise Services & Core Capabilities
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          From experimental AI research to mission-critical distributed systems, we engineer resilient software architectures designed for high concurrency and measured business outcomes.
        </p>
      </div>

      {/* Services Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => {
          const Icon = ICON_MAP[service.iconName] || Brain;
          return (
            <div
              key={service.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mt-0.5">
                    {service.category}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{cap.title}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-blue-600 group-hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Deep Service Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

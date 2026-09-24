import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  RefreshCw,
  Cloud,
  Rocket,
  Search,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Targeted Enterprise Solutions | AVORA Innovations',
  description: 'Enterprise Digital Transformation, Custom AI Copilots, Legacy Modernization, Cloud Native Re-architecture, and Rapid MVP Sprints.',
  canonical: '/solutions',
});

const SOLUTIONS = [
  {
    slug: 'digital-transformation',
    icon: Layers,
    title: 'Enterprise Digital Transformation',
    desc: 'Systematically modernize organizational workflows, dismantle fragmented data silos, and replace manual operational bottlenecks with high-throughput cloud automation.',
    metrics: ['40% OPEX Reduction', '3x Deployment Velocity', 'Zero Downtime'],
  },
  {
    slug: 'custom-ai-copilot',
    icon: Cpu,
    title: 'Custom Enterprise AI Copilots & RAG',
    desc: 'Private, air-gapped Large Language Model assistants grounded in proprietary documentation, ERPs, and knowledge graphs with zero hallucination.',
    metrics: ['65% Faster Onboarding', 'Zero Public Cloud Leakage', 'Line-Item Citations'],
  },
  {
    slug: 'legacy-modernization',
    icon: RefreshCw,
    title: 'Legacy Monolith Modernization',
    desc: 'De-risk legacy migrations using the Strangler Fig pattern. Incrementally extract monoliths (PHP, ASP.NET, Java, Oracle) into Next.js 16 and microservices.',
    metrics: ['Sub-Second LCP', 'Modern TypeScript', 'No Service Interruption'],
  },
  {
    slug: 'cloud-modernization',
    icon: Cloud,
    title: 'Cloud Native & DevOps Engineering',
    desc: 'Kubernetes containerization on AWS EKS / GCP GKE with automated GitOps CI/CD pipelines, autoscaling, and 24/7 site reliability monitoring.',
    metrics: ['99.999% SLA', '100% Terraform IaC', 'FinOps Cost Optimization'],
  },
  {
    slug: 'rapid-mvp',
    icon: Rocket,
    title: 'Rapid MVP & Innovation Sprints',
    desc: 'From architectural discovery blueprint to production-grade MVP in 30 days for new ventures, spin-offs, and critical enterprise pilot programs.',
    metrics: ['30-Day Launch', 'Investor-Ready Code', 'Scalable Foundation'],
  },
  {
    slug: 'sales-intelligence',
    icon: Search,
    title: 'Automated B2B Revenue Intelligence',
    desc: 'Autonomous multi-agent crawlers and predictive lead scoring pipelines that enrich CRM databases and trigger contextual outreach.',
    metrics: ['2.8x Pipeline Velocity', 'Automated Lead Scoring', 'Real-time Enrichment'],
  },
];

export default function SolutionsPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Solutions', url: '/solutions' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Outcome-Focused Delivery
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Targeted Enterprise Solutions
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Pre-architected solution frameworks designed to solve specific operational, data, and technology transformation challenges with predictable speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {SOLUTIONS.map((sol) => {
          const Icon = sol.icon;
          return (
            <div
              key={sol.slug}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {sol.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {sol.desc}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  {sol.metrics.map((m) => (
                    <div key={m} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/solutions/${sol.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-emerald-600 group-hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Solution Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <CtaBanner />
    </div>
  );
}

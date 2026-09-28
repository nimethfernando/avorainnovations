import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SolutionDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SolutionDetailProps) {
  const { slug } = await params;
  const title = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  return constructMetadata({
    title: `${title} | Enterprise Solutions`,
    description: `Enterprise delivery architecture and implementation framework for ${title}.`,
    canonical: `/solutions/${slug}`,
  });
}

export default async function SolutionDetailPage({ params }: SolutionDetailProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Solutions', url: '/solutions' },
          { name: formattedTitle, url: `/solutions/${slug}` },
        ]}
      />

      <div className="my-10 lg:my-16 rounded-3xl bg-slate-950 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 p-8 sm:p-14 border border-emerald-500/20 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Turnkey Solution Framework
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {formattedTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Accelerate your organizational goals with Avora’s battle-tested architectural blueprints, automated deployment pipelines, and senior engineering squads.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Schedule Architecture Discovery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Konstantinfo-Style Proof Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-white to-blue-50/90 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-blue-950/40 border border-emerald-200/80 dark:border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm mb-12">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Deterministic Execution</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Strict delivery milestones governed by senior architects with full source code &amp; IP handover.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sub-15ms Latency Benchmarks</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Engineered on modern Next.js 16, MariaDB connection pooling, and low-latency inference pipelines.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Production-Ready in 30 Days</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Rapid Proof of Value deployments validating latency, security boundaries, and user adoption.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200/80 dark:border-emerald-500/20">Phase 1</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Discovery &amp; Blueprint</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Audit existing systems, define strict SLOs, establish security boundary parameters, and draft architecture schemas.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200/80 dark:border-emerald-500/20">Phase 2</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">4-Week Proof of Value</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Build and deploy a functional proof-of-value environment demonstrating latency benchmarks and business feasibility.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-200/80 dark:border-emerald-500/20">Phase 3</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hyperscale Rollout</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Production release with automated CI/CD, 24/7 observability, zero-downtime database migrations, and IP handover.
          </p>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}

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

      <div className="my-10 lg:my-16 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-8 sm:p-14 border border-emerald-500/20 relative overflow-hidden">
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Turnkey Solution Framework
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {formattedTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">Phase 1</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Discovery & Blueprint</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Audit existing systems, define strict SLOs, establish security boundary parameters, and draft architecture schemas.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">Phase 2</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">4-Week Proof of Value</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Build and deploy a functional proof-of-value environment demonstrating latency benchmarks and business feasibility.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">Phase 3</div>
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

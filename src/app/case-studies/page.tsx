import React from 'react';
import Link from 'next/link';
import { CASE_STUDIES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Enterprise Case Studies & Proven Results',
  description: 'Explore AVORA Innovations verified client case studies across banking, healthcare, global logistics, and headless retail.',
  canonical: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Case Studies', url: '/case-studies' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Proven Value Creation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Client Case Studies & Engineering Results
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Real enterprise challenges, production architectures, and measured business impact delivered by AVORA Innovations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CASE_STUDIES_DATA.map((study) => (
          <div
            key={study.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="p-8 space-y-5">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                  {study.industry}
                </span>
                <span className="text-slate-500 font-semibold">{study.client}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {study.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {study.challenge}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {study.results.slice(0, 2).map((res, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                    <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {res.metric}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {study.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <Link
                href={`/case-studies/${study.slug}`}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-emerald-600 group-hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Read Full Technical Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

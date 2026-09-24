'use client';

import React from 'react';
import Link from 'next/link';
import { CASE_STUDIES_DATA } from '@/lib/content';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function CaseStudiesSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Proven Client ROI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Enterprise Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore how we helped global organizations solve impossible architectural bottlenecks, train bespoke neural models, and capture tens of millions in enterprise value.
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 self-start md:self-end group"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES_DATA.slice(0, 3).map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <div className="p-6 sm:p-8 space-y-5">
                {/* Industry & Client */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                    {study.industry}
                  </span>
                  <span className="text-slate-500 font-semibold">{study.client}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {study.title}
                </h3>

                {/* Subtitle / Challenge preview */}
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {study.challenge}
                </p>

                {/* Quantified Results */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {study.results.slice(0, 2).map((res, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {res.metric}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
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

              {/* Read More Flow (Required by Brief) */}
              <div className="p-6 sm:p-8 pt-0 mt-auto">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 group-hover:border-emerald-500"
                >
                  <span>Explore Architecture & Implementation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

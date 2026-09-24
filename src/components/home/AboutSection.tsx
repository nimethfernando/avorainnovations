'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Users,
  Target,
  ArrowRight,
  Sparkles,
  Code2,
  Lock,
} from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Code2,
      title: 'Senior-Only Engineering Squads',
      desc: 'We do not staff projects with junior apprentices or outsourced brokers. Every team member assigned to your codebase is a senior software architect or machine learning researcher.',
    },
    {
      icon: Lock,
      title: '100% Intellectual Property Ownership',
      desc: 'All source code, trained neural model weights, custom dataset pipelines, and infrastructure configurations belong entirely to your company from day one.',
    },
    {
      icon: Zap,
      title: 'Extreme Velocity via Modern Stacks',
      desc: 'By standardizing on Next.js 16, React 19, Turbopack, and MariaDB 3.5+, we eliminate technical debt, speed up releases by 3x, and guarantee sub-second LCP globally.',
    },
    {
      icon: Target,
      title: 'Measurable Business ROI Guaranteed',
      desc: 'We tie our milestone delivery directly to business metrics: checkout conversion lift, fraud reduction percentages, latency thresholds, and infrastructure OPEX savings.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> About AVORA Innovations
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Pioneering Enterprise AI & High-Throughput Digital Engineering
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              AVORA Innovations was founded to bridge the critical gap between experimental computer science research and production-grade software engineering. While typical IT consultancies recycle commoditized templates, we design and construct custom computational systems designed for extreme concurrency, deterministic reliability, and bulletproof security.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              From Fortune 500 banks deploying real-time fraud detection neural networks to fast-scaling healthcare networks processing millions of telemedicine consultations, enterprise leaders rely on Avora to engineer their most critical competitive advantages.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
              >
                <span>Read Full Company Story & Leadership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Pillar Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

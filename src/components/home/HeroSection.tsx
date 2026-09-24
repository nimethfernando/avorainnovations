'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import ConsultationModal from '../common/ConsultationModal';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Zap,
} from 'lucide-react';

export default function HeroSection() {
  const { t } = useI18n();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'benchmark' | 'pipeline'>('architecture');

  const stats = [
    { value: '14+', label: t.hero.statsYears },
    { value: '450+', label: t.hero.statsProjects },
    { value: '180+', label: t.hero.statsExperts },
    { value: '99.4%', label: t.hero.statsSatisfaction },
  ];

  const clientLogos = [
    'CarePulse Health',
    'Apex Financial',
    'TransGlobal Logistics',
    'Velour Luxury',
    'Novatech Global',
    'Solargen Dynamics',
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-32 bg-grid-pattern">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase animate-in fade-in slide-in-from-bottom-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              {t.hero.titleLine1}{' '}
              <span className="text-gradient block sm:inline">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/services"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{t.hero.ctaPrimary}</span>
              </Link>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Client IP Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Sub-15ms Latency Benchmarks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Architecture Visualizer */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 pl-2">
                    avora-enterprise-engine.ts
                  </span>
                </div>
                <div className="flex gap-1">
                  {(['architecture', 'benchmark', 'pipeline'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[11px] px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 1: Architecture Visual */}
              {activeTab === 'architecture' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
                    <div className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> Core Inference Gateway
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-semibold">
                      Triton Multi-Model Server • PagedAttention vLLM
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1 flex justify-between">
                      <span>Throughput: 14,800 req/sec</span>
                      <span className="text-emerald-500">Latency: 9.4ms p99</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
                    <div className="text-[10px] text-purple-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3" /> High-Throughput Relational Storage
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-semibold">
                      MariaDB 3.5+ Cluster • Prisma Driver Adapter
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1 flex justify-between">
                      <span>Connection Pooling: Active</span>
                      <span className="text-emerald-500">Compression: On</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80">
                    <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Terminal className="w-3 h-3" /> Edge Delivery Network
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 font-semibold">
                      Next.js 16 App Router • React 19 Streaming SSR
                    </div>
                    <div className="text-slate-500 text-[11px] mt-1 flex justify-between">
                      <span>Global Edge PoPs: 310+</span>
                      <span className="text-emerald-500">LCP: 0.68s</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Benchmark Telemetry */}
              {activeTab === 'benchmark' && (
                <div className="space-y-4 py-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Core Web Vitals (Lighthouse)</span>
                      <span className="text-emerald-500 font-bold">100 / 100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[100%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Fraud Detection Neural Accuracy</span>
                      <span className="text-blue-500 font-bold">99.4%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[99.4%] h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Autonomous Agent Task Completion</span>
                      <span className="text-purple-500 font-bold">94.8%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="w-[94.8%] h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    * Benchmarked continuously across real enterprise client production workloads.
                  </p>
                </div>
              )}

              {/* Tab 3: Deployment Pipeline */}
              {activeTab === 'pipeline' && (
                <div className="p-2 space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>$ git push origin main</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Turbopack compilation: 148ms</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Automated unit & security fuzzing: PASS</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>✓ Edge canary deployment: 100% HEALTHY</span>
                  </div>
                  <div className="p-2 mt-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
                    Production status: 99.999% SLA • Zero Downtime Maintained
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Impact Numbers */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center md:text-left">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Logos Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/40 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Trusted by Engineering Leaders & Innovative Enterprises Worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 hover:opacity-100 transition-opacity">
            {clientLogos.map((client) => (
              <span
                key={client}
                className="font-extrabold text-sm sm:text-base tracking-tight text-slate-700 dark:text-slate-300"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

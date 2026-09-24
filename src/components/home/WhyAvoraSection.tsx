'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Clock,
  Award,
  Lock,
} from 'lucide-react';

export default function WhyAvoraSection() {
  const differentiators = [
    {
      icon: Lock,
      title: 'Full Intellectual Property Transfer',
      desc: 'You retain 100% legal ownership of every line of code, trained model weight, and deployment pipeline. Zero vendor lock-in or proprietary licensing handcuffs.',
    },
    {
      icon: Cpu,
      title: 'Senior-Only Architecture Staffing',
      desc: 'Our delivery teams consist strictly of principal software engineers and PhD machine learning researchers with decades of production experience.',
    },
    {
      icon: Clock,
      title: '4-Week Proof of Value Sprints',
      desc: 'We de-risk major technical investments by delivering interactive working prototypes and benchmark telemetry within 28 business days.',
    },
    {
      icon: ShieldCheck,
      title: 'Air-Gapped & Regulatory Compliance',
      desc: 'Every system is engineered from the first commit to pass SOC2 Type II, HIPAA, PCI-DSS Level 1, and GDPR data-isolation requirements.',
    },
    {
      icon: Layers,
      title: 'Extreme Concurrency & Performance',
      desc: 'Standardizing on modern Next.js 16, React 19, MariaDB 3.5+ connection pooling, and sub-15ms AI inference ensures unmatched scalability.',
    },
    {
      icon: GitBranch,
      title: 'Continuous GitOps Delivery Cadence',
      desc: 'Transparent sprint ceremonies, live staging environments updated on every git push, and bi-weekly executive demonstrations.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Why Choose AVORA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The Enterprise Digital Engineering Standard
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We operate as an elite extension of your executive and engineering leadership, transforming ambitious digital roadmaps into bulletproof operational reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:bg-white dark:hover:bg-slate-900/80 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

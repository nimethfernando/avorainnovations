import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  ShieldCheck,
  Zap,
  Target,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  Award,
  Globe2,
} from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About AVORA Innovations | Enterprise AI & Software Engineering',
  description: 'Learn about AVORA Innovations: our engineering DNA, executive leadership, delivery methodology, and global footprint.',
  canonical: '/about',
});

export default function AboutPage() {
  const leadership = [
    {
      name: 'Dr. Aris Thorne',
      role: 'Chief Executive Officer & Head of AI Research',
      bio: 'Former principal ML scientist with 18+ years leading foundational transformer and distributed inference research.',
    },
    {
      name: 'Siddharth Patel',
      role: 'Chief Technology Officer',
      bio: 'High-scale distributed systems architect specializing in Next.js, MariaDB connection topologies, and edge computing.',
    },
    {
      name: 'Elena Rostova, MD / PhD',
      role: 'Head of Clinical HealthTech Solutions',
      bio: 'Pioneered computer vision diagnostic pipelines across 40+ national hospital health systems.',
    },
    {
      name: 'Marcus Vance',
      role: 'VP of Financial Infrastructure',
      bio: 'Architected sub-15ms fraud detection engines processing over $45B in annual transactional volume.',
    },
  ];

  const methodology = [
    {
      step: '01',
      title: 'Architectural Discovery & Feasibility',
      desc: 'We inspect existing codebases, profile bottlenecks, evaluate API latencies, and define mathematical success criteria before writing code.',
    },
    {
      step: '02',
      title: '4-Week Proof of Value Sprint',
      desc: 'We build an interactive working prototype running on production-grade infrastructure to de-risk key architectural assumptions.',
    },
    {
      step: '03',
      title: 'Iterative Agile Squad Execution',
      desc: 'Senior-only squads ship incremental production features bi-weekly with 100% automated test coverage and live staging environments.',
    },
    {
      step: '04',
      title: 'Compliance, Security & Performance Hardening',
      desc: 'Formal third-party penetration testing, automated security vulnerability scanning, and Core Web Vitals optimization guaranteeing sub-second LCP.',
    },
    {
      step: '05',
      title: 'Full IP Handover & Production Handshake',
      desc: 'Complete legal transfer of all source code, models, documentation, and automated CI/CD pipelines to your internal staff.',
    },
  ];

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Company & Vision
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering the Future of Autonomous Enterprise Software
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          AVORA Innovations is an elite global engineering studio that builds mission-critical artificial intelligence, high-throughput web applications, and resilient cloud architectures.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-14 my-16 space-y-6 shadow-xl">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
          Our Heritage & Philosophy
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Why AVORA Was Built Differently
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            The software consulting industry has long been broken. Traditional consultancies win contracts using senior pitchmen, only to delegate implementation to inexperienced junior developers or third-party subcontractors. The resulting codebases are laden with technical debt, sluggish performance, and intellectual property ambiguities.
          </p>
          <p>
            At AVORA Innovations, we rejected this broken model. Every client engagement is staffed strictly with senior software architects and machine learning scientists who write production code daily. We treat our clients as partners: you retain 100% intellectual property ownership from day one, and every sprint is measured against verifiable business metrics.
          </p>
        </div>

        {/* Global Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">14+</div>
            <div className="text-xs text-slate-500 mt-1">Years Continuous Excellence</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-purple-600">450+</div>
            <div className="text-xs text-slate-500 mt-1">Enterprise Deliveries</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">180+</div>
            <div className="text-xs text-slate-500 mt-1">Senior Engineers & Researchers</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-cyan-600">99.4%</div>
            <div className="text-xs text-slate-500 mt-1">Client Retention Rate</div>
          </div>
        </div>
      </div>

      {/* Delivery Methodology */}
      <section className="my-20" id="methodology">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Engineering Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Our 5-Phase Delivery Methodology
          </h2>
          <p className="text-sm text-slate-500">
            A deterministic, milestone-driven framework that eliminates surprises and ensures flawless execution.
          </p>
        </div>

        <div className="space-y-4">
          {methodology.map((m) => (
            <div
              key={m.step}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono">
                {m.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="my-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Executive & Engineering Leadership
          </h2>
          <p className="text-sm text-slate-500">
            Guided by proven software architects and artificial intelligence researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((l) => (
            <div
              key={l.name}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-black text-xl flex items-center justify-center">
                {l.name[0]}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {l.name}
              </h3>
              <div className="text-xs font-semibold text-blue-500">{l.role}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {l.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

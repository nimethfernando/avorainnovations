'use client';

import React, { useState } from 'react';
import {
  Compass,
  Layout,
  Code2,
  ShieldCheck,
  Rocket,
  Activity,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Discovery & Blueprinting',
      icon: Compass,
      desc: 'We conduct rigorous architecture reviews, profile existing bottlenecks, define mathematical success metrics, and formulate non-functional SLAs.',
      deliverables: ['System Architecture Diagram', 'Security Threat Model', 'Milestone Delivery Roadmap', 'Cost-Benefit Analysis'],
    },
    {
      step: '02',
      title: 'Design & Prototyping',
      icon: Layout,
      desc: 'Interactive Figma design systems, component libraries, and end-to-end user journeys engineered for high conversion and WCAG 2.2 AA accessibility.',
      deliverables: ['Clickable Prototype', 'Component Design System', 'Information Architecture', 'User Journey Maps'],
    },
    {
      step: '03',
      title: 'Agile Sprint Engineering',
      icon: Code2,
      desc: 'Senior-only squads build modular microservices using Next.js 16, React 19, and MariaDB 3.5+. Live staging environments updated on every git push.',
      deliverables: ['Bi-Weekly Demo Builds', '100% Type-Safe TypeScript', 'Automated Unit Tests', 'Continuous Staging Deployment'],
    },
    {
      step: '04',
      title: 'QA & Security Hardening',
      icon: ShieldCheck,
      desc: 'Automated fuzzing, security penetration tests, database stress testing, and Core Web Vitals optimization guaranteeing sub-0.7s LCP.',
      deliverables: ['SOC2 / HIPAA Compliance Audit', 'Penetration Test Report', 'Load Testing Telemetry', 'Lighthouse 95+ Score'],
    },
    {
      step: '05',
      title: 'Zero-Downtime Deployment',
      icon: Rocket,
      desc: 'Canary releases, multi-region Kubernetes traffic switching, automated database migration scripts, and immutable infrastructure provisioning.',
      deliverables: ['Kubernetes Helm Charts', 'Terraform IaC Scripts', 'Zero-Downtime Migration', 'Production Health Checks'],
    },
    {
      step: '06',
      title: '24/7 SRE & Evolution',
      icon: Activity,
      desc: 'Prometheus & Datadog observability, automated self-healing clusters, continuous model retraining, and dedicated enterprise support squads.',
      deliverables: ['99.999% SLA Guarantee', 'Automated Model Drift Retraining', '24/7 Incident Response', 'Quarterly Architecture Reviews'],
    },
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Deterministic Execution
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our 6-Stage Agile Engineering Lifecycle
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            The proven development lifecycle that powers our 99.4% client retention rate and zero-surprise delivery guarantee.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shadow-md scale-105'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-mono font-bold mb-1">STAGE {s.step}</div>
                <div className="text-xs font-bold truncate">{s.title.split('&')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <CurrentIcon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-500 uppercase">
                    Stage {current.step} Architecture
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {current.desc}
              </p>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Stage Deliverables
              </div>
              <div className="space-y-2.5">
                {current.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

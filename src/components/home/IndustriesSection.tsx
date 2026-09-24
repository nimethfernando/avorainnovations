'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INDUSTRIES_DATA } from '@/lib/content';
import {
  Landmark,
  HeartPulse,
  Building,
  ShoppingBag,
  GraduationCap,
  Truck,
  Compass,
  Factory,
  Film,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const INDUSTRY_ICONS: Record<string, any> = {
  Landmark,
  HeartPulse,
  Building,
  ShoppingBag,
  GraduationCap,
  Truck,
  Compass,
  Factory,
  Film,
};

export default function IndustriesSection() {
  const [selectedSlug, setSelectedSlug] = useState('fintech');
  const activeIndustry =
    INDUSTRIES_DATA.find((i) => i.slug === selectedSlug) || INDUSTRIES_DATA[0];
  const ActiveIcon = INDUSTRY_ICONS[activeIndustry.iconName] || Landmark;

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Vertical Domain Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for High-Stakes Industries
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Generic software fails under strict regulatory constraints. We build domain-specialized platforms tailored to the compliance, latency, and operational nuances of your industry.
          </p>
        </div>

        {/* Interactive Industry Selector (Pills / Grid) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind.iconName] || Landmark;
            const isActive = selectedSlug === ind.slug;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedSlug(ind.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ind.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Industry Showcase Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative & Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {activeIndustry.title}
                  </h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold tracking-wide">
                    {activeIndustry.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeIndustry.overview}
              </p>

              {/* Key Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
                {activeIndustry.keyStats.map((stat, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Industry Solutions Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Specialized Solutions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeIndustry.solutions.slice(0, 2).map((sol, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="font-bold text-slate-900 dark:text-white mb-1">{sol.title}</div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{sol.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/industries/${activeIndustry.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-purple-500/20 transition-all group"
                >
                  <span>Explore Full {activeIndustry.title} Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Client Outcome Card */}
            <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">
                Verified Production Outcome
              </span>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeIndustry.useCases[0]?.client || 'Enterprise Client'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeIndustry.useCases[0]?.outcome}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200 text-xs">
                <span className="font-bold block mb-1">Measured Impact:</span>
                {activeIndustry.useCases[0]?.metrics}
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Relevant Technologies:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeIndustry.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Industries Link */}
        <div className="mt-12 text-center">
          <Link
            href="/industries"
            className="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1.5"
          >
            <span>Browse All 9 Dedicated Industry Verticals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

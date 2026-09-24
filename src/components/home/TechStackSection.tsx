'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TECH_CATEGORIES, TechCategory } from '@/lib/content';
import {
  Code2,
  Server,
  Smartphone,
  Database,
  Cloud,
  Brain,
  Rocket,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  frontend: Code2,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  cloud: Cloud,
  aiml: Brain,
  devops: Rocket,
};

export default function TechStackSection() {
  const [activeCategorySlug, setActiveCategorySlug] = useState('frontend');

  const activeCategory =
    TECH_CATEGORIES.find((c) => c.slug === activeCategorySlug) || TECH_CATEGORIES[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory.slug] || Code2;

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80" id="technologies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> High-Performance Tech Stack
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Battle-Tested Engineering Technologies
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            We reject bloated frameworks and fragile dependencies. Our stacks are selected for verified multi-threaded execution, memory safety, and sub-millisecond query execution.
          </p>
        </div>

        {/* Interactive Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] || Code2;
            const isActive = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategorySlug(cat.slug)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Grid */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-slate-100 dark:border-slate-800/80 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <ActiveIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeCategory.category} Architecture
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            <Link
              href="/technologies"
              className="text-xs sm:text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Full Tech Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.items.map((tech) => (
              <div
                key={tech.name}
                className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {tech.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

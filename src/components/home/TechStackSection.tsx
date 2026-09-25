'use client';

import React, { useState, useEffect } from 'react';
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
  Terminal,
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
  const [categories, setCategories] = useState<TechCategory[]>(TECH_CATEGORIES);
  const [activeCategorySlug, setActiveCategorySlug] = useState('frontend');

  useEffect(() => {
    async function loadTechs() {
      try {
        const res = await fetch('/api/technologies');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
            if (!data.some((c: any) => c.slug === activeCategorySlug)) {
              setActiveCategorySlug(data[0].slug);
            }
          }
        }
      } catch {
        // Fallback to static
      }
    }
    loadTechs();
  }, []);

  const activeCategory =
    categories.find((c) => c.slug === activeCategorySlug) || categories[0] || TECH_CATEGORIES[0];
  const ActiveIcon = CATEGORY_ICONS[activeCategory?.slug] || Terminal;

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
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug] || Terminal;
            const isActive = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategorySlug(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        {activeCategory && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {activeCategory.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {activeCategory.description}
                  </p>
                </div>
              </div>
              <Link
                href="/technologies"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View Full Technology Index <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Frameworks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(activeCategory.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

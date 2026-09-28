'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TECH_CATEGORIES, TechCategory, getTechSlug } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CtaBanner from '@/components/home/CtaBanner';
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
  ShoppingBag,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  frontend: Code2,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  cloud: Cloud,
  aiml: Brain,
  devops: Rocket,
  ecommerce: ShoppingBag,
};

export default function TechnologiesPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [categories, setCategories] = useState<TechCategory[]>(TECH_CATEGORIES);

  useEffect(() => {
    async function loadTechs() {
      try {
        const res = await fetch('/api/technologies');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          }
        }
      } catch {
        // Fallback
      }
    }
    loadTechs();
  }, []);

  const filteredCategories =
    selectedCat === 'all'
      ? categories
      : categories.filter((c) => c.slug === selectedCat);

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Technologies', url: '/technologies' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> High-Performance Stacks
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Technology Matrix & Architectural Stacks
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore the exact programming languages, frameworks, cloud native services, and neural tooling our senior engineering squads deploy in enterprise production.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedCat === 'all'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || Code2;
          const isActive = selectedCat === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCat(cat.slug)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Categories Content */}
      <div className="space-y-16">
        {filteredCategories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.slug] || Code2;
          return (
            <div
              key={cat.slug}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 shadow-xl space-y-8"
            >
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {cat.category} Engineering
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((tech) => (
                  <Link
                    key={tech.name}
                    href={`/technologies/${getTechSlug(tech.name)}`}
                    className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tech.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                          {tech.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>View {tech.name} Capabilities</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16">
        <CtaBanner />
      </div>
    </div>
  );
}

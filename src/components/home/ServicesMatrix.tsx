'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SERVICES_DATA, ServiceItem } from '@/lib/content';
import {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link as LinkIcon,
  Eye,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link: LinkIcon,
  Eye,
};

const CATEGORIES = [
  'All Practices',
  'Artificial Intelligence',
  'Software Engineering',
  'Cloud & Infrastructure',
  'Data Engineering',
  'Decentralized Tech',
  'Immersive Tech',
];

export default function ServicesMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('All Practices');

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedCategory === 'All Practices') return true;
    return s.category === selectedCategory;
  });

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Comprehensive Service Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            High-Performance Engineering & AI Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From foundation deep learning research to hyperscale cloud backbones, we architect and deploy software systems that power the world&apos;s most demanding enterprises.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid (Konstant Infosolutions Style Depth) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = ICON_MAP[service.iconName] || Brain;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-full blur-2xl transition-all" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title and Short Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Core Capabilities Bullets */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Key Capabilities:
                    </div>
                    {service.capabilities.slice(0, 3).map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{cap.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                        +{service.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Read More Flow (Required by Brief) */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    <span>Read More & Explore Architecture</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm transition-all"
          >
            <span>Explore All 10+ Enterprise Practices & Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { INDUSTRIES_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
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

export const metadata = constructMetadata({
  title: 'Industry Verticals & Specialized Solutions',
  description: 'Explore AVORA Innovations dedicated domain solutions across FinTech, Healthcare, PropTech, E-Commerce, Logistics, Smart Manufacturing, and Media.',
  canonical: '/industries',
});

export default function IndustriesPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Industries', url: '/industries' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Vertical Domain Mastery
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Specialized Industry Solutions
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          From resilient banking security and clinical medical imaging to high-throughput omnichannel retail, we engineer mission-critical systems designed for your industry&apos;s unique challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INDUSTRIES_DATA.map((ind) => {
          const Icon = INDUSTRY_ICONS[ind.iconName] || Landmark;
          return (
            <div
              key={ind.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 flex flex-col justify-between hover:shadow-2xl hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {ind.title}
                  </h2>
                  <p className="text-xs text-purple-500 font-semibold mt-0.5">
                    {ind.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed line-clamp-3">
                    {ind.overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {ind.keyStats.slice(0, 2).map((stat, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                      <div className="text-base font-extrabold text-purple-600 dark:text-purple-400">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 group-hover:bg-purple-600 group-hover:text-white text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Industry Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

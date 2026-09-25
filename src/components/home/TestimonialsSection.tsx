'use client';

import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_DATA } from '@/lib/content';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  project?: string;
}

export default function TestimonialsSection() {
  const [list, setList] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setList(data);
          }
        }
      } catch {
        // Fallback to static list
      }
    }
    loadTestimonials();
  }, []);

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? list.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p === list.length - 1 ? 0 : p + 1));
  };

  if (list.length === 0) return null;
  const current = list[currentIndex] || list[0];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Visionary Technology Leaders
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Read what CTOs, Chief Medical Officers, and VPs of Engineering say about partnering with AVORA Innovations.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-14 shadow-2xl relative">
          <Quote className="w-16 h-16 text-blue-500/15 absolute top-8 right-8 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(current.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-2xl font-medium text-slate-900 dark:text-slate-100 leading-relaxed italic">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author details */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {current.author}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {current.role}{current.company ? `, ${current.company}` : ''}
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

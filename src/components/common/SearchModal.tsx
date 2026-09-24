'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Brain, Building, Cpu, FileText } from 'lucide-react';
import { SERVICES_DATA, INDUSTRIES_DATA, TECH_CATEGORIES, BLOG_POSTS_DATA } from '@/lib/content';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingServices = q
    ? SERVICES_DATA.filter((s) => s.title.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q))
    : SERVICES_DATA.slice(0, 3);

  const matchingIndustries = q
    ? INDUSTRIES_DATA.filter((i) => i.title.toLowerCase().includes(q) || i.overview.toLowerCase().includes(q))
    : INDUSTRIES_DATA.slice(0, 3);

  const matchingBlogs = q
    ? BLOG_POSTS_DATA.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI practices, industries, tech stacks, or case studies..."
            className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Services */}
          {matchingServices.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Engineering Practices
              </div>
              {matchingServices.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500">
                      {s.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                </Link>
              ))}
            </div>
          )}

          {/* Industries */}
          {matchingIndustries.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Vertical Industries
              </div>
              {matchingIndustries.map((i) => (
                <Link
                  key={i.id}
                  href={`/industries/${i.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-purple-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-500">
                      {i.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-500" />
                </Link>
              ))}
            </div>
          )}

          {/* Blogs */}
          {matchingBlogs.length > 0 && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                Engineering Articles
              </div>
              {matchingBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 truncate max-w-sm">
                      {b.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

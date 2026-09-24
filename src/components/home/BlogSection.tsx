'use client';

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/content';
import { ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Engineering & AI Insights
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Thought Leadership & Technical Papers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore in-depth technical breakdowns written by Avora’s software architects and machine learning researchers.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 self-start md:self-end group"
          >
            <span>View All Engineering Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS_DATA.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {post.authorName}
                  </div>
                  <div className="text-[10px] text-slate-500">{post.authorRole}</div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  aria-label="Read full article"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

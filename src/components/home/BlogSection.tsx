'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/content';
import { ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>(BLOG_POSTS_DATA.slice(0, 3));

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const res = await fetch('/api/admin/blogs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const published = data.filter((b: any) => b.isPublished !== false);
            if (published.length > 0) {
              setPosts(published.slice(0, 3));
            }
          }
        }
      } catch {
        // Fallback to static data
      }
    }
    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16]" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Latest Blogs &amp; Insights
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Engineering Thought Leadership &amp; Papers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              In-depth technical papers, production blueprints, and architectural breakdowns written by Avora’s senior engineers and AI researchers.
            </p>
          </div>

          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-bold transition-all border border-blue-200/60 dark:border-slate-800 self-start md:self-end group shadow-xs cursor-pointer text-center"
          >
            <span>View All Engineering Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const rawTags = Array.isArray(post.tags)
              ? post.tags
              : typeof post.tags === 'string'
              ? (() => {
                  try {
                    return JSON.parse(post.tags);
                  } catch {
                    return post.tags.split(',').map((t: string) => t.trim());
                  }
                })()
              : [];

            return (
              <article
                key={post.id || post.slug}
                className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
              >
                <div>
                  {/* Cover Image Container */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Floating Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold tracking-wide shadow-md backdrop-blur-xs">
                        {post.category || 'Engineering'}
                      </span>
                    </div>

                    {/* Reading Time Badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7 space-y-3.5">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{formatDate(post.publishedAt || post.createdAt || '2026-09-20')}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tag Pills */}
                    {rawTags && rawTags.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {rawTags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-[10.5px] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer: Author Info & Read Link */}
                <div className="p-5 sm:p-7 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-2">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {post.authorName || 'Avora Engineering'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {post.authorRole || 'Senior Staff'}
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Engineering Blog & Architectural Papers',
  description: 'Deep technical articles on AI agent architectures, Next.js 16 performance engineering, MariaDB connection pooling, and distributed microservices.',
  canonical: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Engineering & AI Insights
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering Thought Leadership
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Deep technical breakdowns written directly by Avora’s principal software architects and machine learning researchers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS_DATA.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="p-8 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {post.authorName}
                </div>
                <div className="text-[10px] text-slate-500">{post.authorRole}</div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="p-2.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                aria-label="Read full article"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

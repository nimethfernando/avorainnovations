'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Search, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogListClientProps {
  initialPosts: any[];
  initialTag?: string;
}

export default function BlogListClient({ initialPosts, initialTag = '' }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>(initialTag);

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const rawPostTags: string[] = Array.isArray(post.tags)
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

      const matchesTag =
        !activeTag ||
        rawPostTags.some((t: string) => t.replace(/^#/, '').toLowerCase() === activeTag.toLowerCase().trim());

      const matchesQuery =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        rawPostTags.some((t: string) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery && matchesTag;
    });
  }, [initialPosts, selectedCategory, searchQuery, activeTag]);

  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.isFeatured) || initialPosts[0];
  }, [initialPosts]);

  return (
    <div className="space-y-12">
      {!searchQuery && selectedCategory === 'all' && featuredPost && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-950/80 via-slate-900 to-slate-950 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl bg-slate-900">
              <img
                src={featuredPost.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  Featured Research
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 text-white">
              <div className="flex items-center gap-3 text-xs text-blue-300">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold uppercase">
                  {featuredPost.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
                <span>•</span>
                <span>{formatDate(featuredPost.publishedAt || featuredPost.createdAt || '2026-09-20')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                <Link href={'/blog/' + featuredPost.slug} className="hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{featuredPost.authorName}</div>
                  <div className="text-xs text-slate-400">{featuredPost.authorRole}</div>
                </div>

                <Link
                  href={'/blog/' + featuredPost.slug}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/30 cursor-pointer"
                >
                  <span>Read Full Paper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Hashtag Banner */}
      {activeTag && (
        <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Filtering by hashtag:</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs">
              <span>#{activeTag}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTag('')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Clear tag filter ×
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No articles found matching your query.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
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
                className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
              >
                <div>
                  <Link
                    href={'/blog/' + post.slug}
                    className="block relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide shadow-md">
                        {post.category || 'Engineering'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-medium backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{post.readTime || '5 min read'}</span>
                    </div>
                  </Link>

                  <div className="p-6 sm:p-7 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{formatDate(post.publishedAt || post.createdAt || '2026-09-20')}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                      <Link href={'/blog/' + post.slug}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {rawTags && rawTags.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {rawTags.slice(0, 4).map((tag: string) => {
                          const cleanTag = tag.replace(/^#/, '').trim();
                          const isTagActive = activeTag.toLowerCase() === cleanTag.toLowerCase();
                          return (
                            <button
                              type="button"
                              key={tag}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveTag(isTagActive ? '' : cleanTag);
                              }}
                              className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium transition-colors cursor-pointer border ${
                                isTagActive
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                                  : 'bg-slate-100 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/50 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 border-slate-200 dark:border-slate-800'
                              }`}
                              title={`Filter articles by #${cleanTag}`}
                            >
                              #{cleanTag}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-7 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-2">
                  <div className="min-w-0 pr-3">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {post.authorName || 'Avora Engineering'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {post.authorRole || 'Senior Staff'}
                    </div>
                  </div>

                  <Link
                    href={'/blog/' + post.slug}
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
      )}
    </div>
  );
}
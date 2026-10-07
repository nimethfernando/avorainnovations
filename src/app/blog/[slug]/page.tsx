import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata, generateArticleSchema } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await db.getBlogBySlug(slug);
  } catch {}
  if (!post) {
    post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  }

  if (!post) return constructMetadata({ title: 'Post Not Found | Avora Innovations' });

  return constructMetadata({
    title: `${post.title} | Engineering Blog`,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    image: post.coverImage && !post.coverImage.startsWith('data:') ? post.coverImage : '/logo-horizontal-dark.png',
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await db.getBlogBySlug(slug);
  } catch {}
  if (!post) {
    post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  }

  if (!post) {
    notFound();
  }

  const rawTags: string[] = Array.isArray(post.tags)
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

  const schema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt || post.createdAt,
    authorName: post.authorName,
  });

  let relatedPosts: any[] = [];
  try {
    const all = await db.getAllBlogs({ publishedOnly: true });
    relatedPosts = (all.length > 0 ? all : BLOG_POSTS_DATA)
      .filter((p: any) => p.slug !== slug)
      .slice(0, 2);
  } catch {
    relatedPosts = BLOG_POSTS_DATA.filter((p) => p.slug !== slug).slice(0, 2);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="py-8 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Post Header */}
        <div className="my-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-bold uppercase tracking-wider text-[11px] shadow-sm">
              {post.category || 'Engineering'}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" /> {post.readTime || '5 min read'}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" /> {formatDate(post.publishedAt || post.createdAt || '2026-09-20')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                {post.authorName ? post.authorName[0] : 'A'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {post.authorName || 'Avora Engineering'}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole || 'Senior Staff'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        {post.coverImage && (
          <div className="my-8 rounded-3xl overflow-hidden aspect-[16/9] w-full shadow-2xl bg-slate-900 border border-slate-200 dark:border-slate-800">
            <img
              src={post.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose dark:prose-invert max-w-none py-8 border-y border-slate-200 dark:border-slate-800 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags / Hashtags */}
        {rawTags && rawTags.length > 0 && (
          <div className="pt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Topics:
            </span>
            {rawTags.map((t: string) => {
              const cleanTag = t.replace(/^#/, '').trim();
              if (!cleanTag) return null;
              return (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(cleanTag)}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-900 dark:hover:bg-blue-950/40 text-xs text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 font-semibold border border-slate-200 dark:border-slate-800 transition-colors inline-flex items-center gap-1 shadow-2xs group"
                >
                  <span className="text-blue-600 dark:text-blue-400 font-bold">#</span>
                  <span>{cleanTag}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Related Engineering Papers
              </h3>
              <Link
                href="/blog"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel: any) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {rel.category}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 pt-2">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <CtaBanner />
    </>
  );
}

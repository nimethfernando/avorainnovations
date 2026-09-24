import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata, generateArticleSchema } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);
  if (!post) return constructMetadata({ title: 'Post Not Found' });

  return constructMetadata({
    title: `${post.title} | Engineering Blog`,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
  });
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS_DATA.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const schema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt,
    authorName: post.authorName,
  });

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
        <div className="my-10 space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">
              {post.category}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-2">
            {post.excerpt}
          </p>

          {/* Author Card */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                {post.authorName[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {post.authorName}
                </div>
                <div className="text-xs text-slate-500">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Articles
              </Link>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div
          className="prose dark:prose-invert max-w-none py-8 border-y border-slate-200 dark:border-slate-800 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="pt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 font-medium"
            >
              #{t}
            </span>
          ))}
        </div>
      </article>

      <CtaBanner />
    </>
  );
}

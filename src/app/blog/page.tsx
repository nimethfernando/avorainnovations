import React from 'react';
import { BLOG_POSTS_DATA } from '@/lib/content';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { Sparkles } from 'lucide-react';
import { db } from '@/lib/db';
import BlogListClient from '@/components/blog/BlogListClient';
import CtaBanner from '@/components/home/CtaBanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = constructMetadata({
  title: 'Engineering Blog & Technical Insights | Avora Innovations',
  description: 'Deep technical breakdowns on autonomous AI agents, Next.js 16 performance engineering, MariaDB scalability, and distributed cloud microservices.',
  canonical: '/blog',
});

interface BlogIndexPageProps {
  searchParams?: Promise<{ tag?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialTag = resolvedParams.tag || '';

  let posts: any[] = [];
  try {
    const dbPosts = await db.getAllBlogs({ publishedOnly: true });
    if (Array.isArray(dbPosts) && dbPosts.length > 0) {
      posts = dbPosts;
    } else {
      posts = BLOG_POSTS_DATA;
    }
  } catch {
    posts = BLOG_POSTS_DATA;
  }

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Engineering &amp; AI Research
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Thought Leadership &amp; Technical Papers
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Deep technical breakdowns, architectural blueprints, and production post-mortems written by Avora’s software architects and AI researchers.
        </p>
      </div>

      {/* Interactive Blog List Component */}
      <BlogListClient initialPosts={posts} initialTag={initialTag} />

      {/* Call to Action Banner */}
      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}

import React from 'react';

export default function BlogDetailLoading() {
  return (
    <article className="py-8 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
        <span className="text-slate-400">/</span>
        <div className="h-4 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Header Skeleton */}
      <div className="my-10 space-y-5">
        <div className="flex items-center gap-3">
          <div className="h-6 w-28 bg-blue-500/20 rounded-full" />
          <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-10 sm:h-12 w-11/12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="h-10 sm:h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        </div>

        <div className="space-y-2 pt-2">
          <div className="h-5 w-full bg-slate-100 dark:bg-slate-900 rounded" />
          <div className="h-5 w-5/6 bg-slate-100 dark:bg-slate-900 rounded" />
        </div>

        {/* Author skeleton */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5">
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-24 bg-slate-100 dark:bg-slate-900 rounded" />
            </div>
          </div>
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <div className="my-8 rounded-3xl aspect-[16/9] w-full bg-slate-200 dark:bg-slate-800 shadow-xl" />

      {/* Content Skeleton */}
      <div className="space-y-4 py-8 border-y border-slate-200 dark:border-slate-800">
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="h-4 w-11/12 bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="h-4 w-4/5 bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-900 rounded" />
      </div>
    </article>
  );
}


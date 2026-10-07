import React from 'react';

export default function BlogListLoading() {
  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded mb-8" />

      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="h-6 w-48 bg-blue-500/20 rounded-full mx-auto" />
        <div className="h-10 sm:h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl mx-auto" />
        <div className="h-5 w-5/6 bg-slate-100 dark:bg-slate-900 rounded mx-auto" />
      </div>

      {/* Featured Card Skeleton */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 aspect-[16/10] bg-slate-800 rounded-2xl" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-4 w-32 bg-slate-800 rounded" />
            <div className="h-8 w-11/12 bg-slate-800 rounded-xl" />
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-3/4 bg-slate-800 rounded" />
            <div className="h-10 w-36 bg-blue-600/30 rounded-xl mt-4" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="aspect-[16/9] bg-slate-200 dark:bg-slate-800" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-28 bg-slate-100 dark:bg-slate-900 rounded" />
              <div className="h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-900 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


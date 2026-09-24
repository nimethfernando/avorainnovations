'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Layers, Plus, ExternalLink, Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/pages');
        if (res.ok) setPages(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Dynamic Page Manager" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">All Site Pages</h2>
            <p className="text-xs text-slate-500">
              Create and customize landing pages using the visual page builder.
            </p>
          </div>

          <Link
            href="/admin/pages/builder"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading pages...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Slug</th>
                    <th className="pb-3">Sections</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Last Updated</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {pages.map((p) => {
                    let secCount = 0;
                    try {
                      secCount = JSON.parse(p.sections || '[]').length;
                    } catch {}
                    return (
                      <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                          {p.title}
                        </td>
                        <td className="py-3.5 font-mono text-blue-500">/{p.slug}</td>
                        <td className="py-3.5 text-slate-500">{secCount} blocks</td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                            Published
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-400">{formatDate(p.updatedAt)}</td>
                        <td className="py-3.5 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href="/admin/pages/builder"
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-blue-500"
                              title="Edit in Visual Builder"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href={p.slug === 'home' ? '/' : `/${p.slug}`}
                              target="_blank"
                              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-blue-500"
                              title="View Live"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

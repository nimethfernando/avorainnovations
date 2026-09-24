'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, ExternalLink, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) setBlogs(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      loadBlogs();
    } catch {
      alert('Failed to delete blog.');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Blog & Thought Leadership Manager" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Published Articles</h2>
            <p className="text-xs text-slate-500">
              Manage technical papers, AI architecture write-ups, and engineering articles.
            </p>
          </div>

          <Link
            href="/admin/blogs/create"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading articles...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Author</th>
                    <th className="pb-3">Read Time</th>
                    <th className="pb-3">Published</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        {b.title}
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-300">{b.authorName}</td>
                      <td className="py-3.5 text-slate-500">{b.readTime}</td>
                      <td className="py-3.5 text-slate-400">{formatDate(b.createdAt)}</td>
                      <td className="py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/blog/${b.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-blue-500"
                            title="Preview Article"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/blogs/${b.id}`}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-blue-500"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-rose-400 hover:text-rose-500"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

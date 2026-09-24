'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Inbox,
  Layers,
  FileText,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  PlusCircle,
  Sliders,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [inqRes, pageRes, blogRes] = await Promise.all([
          fetch('/api/admin/inquiries'),
          fetch('/api/admin/pages'),
          fetch('/api/admin/blogs'),
        ]);

        if (inqRes.ok) setInquiries(await inqRes.json());
        if (pageRes.ok) setPages(await pageRes.json());
        if (blogRes.ok) setBlogs(await blogRes.json());
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const newLeadsCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Executive Overview Dashboard" />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">New Inbound Leads</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {newLeadsCount}
            </div>
            <div className="text-xs text-blue-500 font-medium">
              {inquiries.length} total leads received
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">Dynamic Pages</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {pages.length}
            </div>
            <div className="text-xs text-purple-500 font-medium">
              Managed via Visual Builder
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">Published Articles</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">
              {blogs.length}
            </div>
            <div className="text-xs text-emerald-500 font-medium">
              Live in Insights & Blog
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold uppercase tracking-wider">Database Status</span>
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              MariaDB / Prisma
            </div>
            <div className="text-xs text-slate-400">
              Connection Pooling & Adapter
            </div>
          </div>
        </div>

        {/* Quick Launch Actions */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Fast CMS Actions
            </div>
            <h3 className="text-xl font-bold text-white">Visual Dynamic Page Builder</h3>
            <p className="text-xs text-slate-300">
              Compose and re-order Hero, Services, Tech Stacks, Industries, FAQs, and CTAs visually.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/pages/builder"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Open Visual Builder</span>
            </Link>
            <Link
              href="/admin/blogs/create"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Write Blog Post</span>
            </Link>
            <Link
              href="/admin/settings"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Branding & SEO</span>
            </Link>
          </div>
        </div>

        {/* Recent Inquiries Lead Table */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Consultation Leads
              </h2>
              <p className="text-xs text-slate-500">
                Inbound consultation booking requests and client inquiries.
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All Pipeline Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading leads...</div>
          ) : inquiries.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">No leads submitted yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Budget Scope</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {inquiries.slice(0, 5).map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        {inq.name}
                        {inq.company && (
                          <span className="block text-[11px] font-normal text-slate-500">
                            {inq.company}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-300">
                        <div>{inq.email}</div>
                        {inq.phone && <div className="text-slate-400">{inq.phone}</div>}
                      </td>
                      <td className="py-3.5 font-semibold text-blue-500">
                        {inq.service || 'General'}
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-400">
                        {inq.budget || 'N/A'}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            inq.status === 'new'
                              ? 'bg-blue-500/10 text-blue-500'
                              : inq.status === 'contacting'
                              ? 'bg-amber-500/10 text-amber-500'
                              : inq.status === 'qualified'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-slate-500/10 text-slate-400'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-400">{formatDate(inq.createdAt)}</td>
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

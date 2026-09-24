'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/industries');
      if (res.ok) setIndustries(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete industry "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/industries?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Industry Verticals CMS" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Vertical Domains</h2>
            <p className="text-xs text-slate-500">
              Manage vertical compliance parameters, stats, solutions, and industry landing pages.
            </p>
          </div>

          <button
            onClick={() => {
              const title = prompt('Enter New Industry Name (e.g. Aerospace & Defense):');
              if (!title) return;
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              fetch('/api/admin/industries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: slug,
                  slug,
                  title,
                  subtitle: `Mission-Critical Digital Engineering for ${title}`,
                  iconName: 'Shield',
                  overview: `Avora Innovations delivers high-compliance software architectures for ${title}.`,
                  keyStats: [
                    { value: '99.999%', label: 'Mission Reliability' },
                    { value: '<10ms', label: 'Telemetry Latency' },
                  ],
                  solutions: [
                    { title: 'Core Systems', desc: 'Secure fault-tolerant systems', features: ['Encryption', 'Audit logs'] },
                  ],
                  servicesOffered: ['AI & Machine Learning', 'Cloud & DevOps'],
                  technologies: ['Next.js', 'Go', 'MariaDB', 'PyTorch'],
                  useCases: [
                    { client: 'Enterprise Leader', outcome: 'Autonomous monitoring', metrics: 'Zero downtime' },
                  ],
                  faqs: [
                    { question: 'What compliance standards are supported?', answer: 'We engineer compliance into code from day one.' },
                  ],
                }),
              }).then(() => load());
            }}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Industry Vertical</span>
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading industries...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Industry Name</th>
                    <th className="pb-3">Solutions</th>
                    <th className="pb-3">Key Metrics</th>
                    <th className="pb-3">Technologies</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {industries.map((ind) => (
                    <tr key={ind.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        <div>{ind.title}</div>
                        <div className="text-[10px] font-mono text-purple-500">/industries/{ind.slug}</div>
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-400">
                        {ind.solutions?.length || 0} solutions
                      </td>
                      <td className="py-3.5 text-purple-500 font-bold">
                        {ind.keyStats?.[0]?.value || 'N/A'} {ind.keyStats?.[0]?.label || ''}
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {ind.technologies?.slice(0, 3).join(', ')}...
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/industries/${ind.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-purple-500"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(ind.slug)}
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

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Trash2, ExternalLink } from 'lucide-react';

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/case-studies');
      if (res.ok) setStudies(await res.json());
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
    if (!confirm(`Delete case study "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/case-studies?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Enterprise Case Studies CMS" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Client Success Stories</h2>
            <p className="text-xs text-slate-500">
              Manage client portfolio, challenges, solutions, and quantified business metrics.
            </p>
          </div>

          <button
            onClick={() => {
              const title = prompt('Enter Case Study Title:');
              if (!title) return;
              const client = prompt('Enter Client Name (e.g. Apex Global Corp):') || 'Enterprise Client';
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              fetch('/api/admin/case-studies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: slug,
                  slug,
                  title,
                  subtitle: `Production Scaling and Automation for ${client}`,
                  client,
                  industry: 'FinTech & Banking',
                  heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
                  challenge: 'High legacy latency and manual processing bottlenecks.',
                  solution: 'Constructed an event-driven microservices architecture on Next.js 16 and MariaDB.',
                  implementation: [
                    'Decomposed monolithic codebase into microservices.',
                    'Deployed MariaDB connection pooling and sub-15ms AI inference.',
                  ],
                  results: [
                    { metric: '75%', label: 'OPEX Cost Savings' },
                    { metric: '99.999%', label: 'Uptime SLA' },
                  ],
                  technologies: ['Next.js', 'MariaDB', 'PyTorch'],
                  relatedServices: ['AI & Machine Learning', 'Enterprise Web Development'],
                }),
              }).then(() => load());
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Case Study</span>
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading case studies...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Title / Client</th>
                    <th className="pb-3">Industry</th>
                    <th className="pb-3">Primary Metric</th>
                    <th className="pb-3">Technologies</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {studies.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                        <div>{c.title}</div>
                        <div className="text-[10px] font-semibold text-slate-400">{c.client}</div>
                      </td>
                      <td className="py-3.5 text-slate-500">{c.industry}</td>
                      <td className="py-3.5 font-bold text-emerald-500">
                        {c.results?.[0]?.metric} {c.results?.[0]?.label}
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {c.technologies?.slice(0, 3).join(', ')}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/case-studies/${c.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-emerald-500"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(c.slug)}
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

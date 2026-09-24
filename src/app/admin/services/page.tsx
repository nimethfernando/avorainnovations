'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, ExternalLink, Brain, Layers } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) setServices(await res.json());
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
    if (!confirm(`Delete service practice "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/services?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Services & Sub-Services CMS" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Engineering Practices</h2>
            <p className="text-xs text-slate-500">
              Manage core practices, sub-services, capabilities, and SEO detail pages without developer involvement.
            </p>
          </div>

          <button
            onClick={() => {
              const title = prompt('Enter New Service Title (e.g. Quantum Computing Solutions):');
              if (!title) return;
              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: slug,
                  slug,
                  title,
                  category: 'Emerging Technologies',
                  badge: 'New Practice',
                  iconName: 'Cpu',
                  shortDesc: `${title} engineered for enterprise scale and zero latency.`,
                  fullDesc: `Avora Innovations delivers production-ready ${title}.`,
                  capabilities: [
                    { title: 'Enterprise Architecture', desc: 'Custom pipeline implementation', icon: 'Cpu' },
                  ],
                  subServices: [
                    { title: 'Advisory & Strategy', desc: 'Executive architecture assessment' },
                  ],
                  technologies: ['Next.js', 'Python', 'MariaDB'],
                  industries: ['FinTech', 'Healthcare'],
                  useCases: [
                    { title: 'Enterprise Pilot', challenge: 'Legacy limitations', solution: 'Custom architecture', impact: '3x efficiency' },
                  ],
                  faqs: [
                    { question: 'What is the deployment timeline?', answer: 'Typical pilot runs in 4 weeks.' },
                  ],
                }),
              }).then(() => load());
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service Practice</span>
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading services...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Practice Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Badge</th>
                    <th className="pb-3">Capabilities</th>
                    <th className="pb-3">Technologies</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        <div>{s.title}</div>
                        <div className="text-[10px] font-mono text-blue-500">/services/{s.slug}</div>
                      </td>
                      <td className="py-3.5 text-slate-500">{s.category}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
                          {s.badge}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-600 dark:text-slate-400">
                        {s.capabilities?.length || 0} specializations
                      </td>
                      <td className="py-3.5 text-slate-500">
                        {s.technologies?.slice(0, 3).join(', ')}...
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={`/services/${s.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:text-blue-500"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(s.slug)}
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

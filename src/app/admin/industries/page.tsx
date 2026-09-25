'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, ExternalLink, Building, Save, X, Loader2 } from 'lucide-react';

interface KeyStat {
  value: string;
  label: string;
}

interface Solution {
  title: string;
  desc: string;
}

interface IndustryData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  iconName: string;
  keyStats: KeyStat[];
  solutions: Solution[];
  servicesOffered: string[];
  technologies: string[];
  useCases?: any[];
  faqs?: any[];
}

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<IndustryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndustry, setEditingIndustry] = useState<IndustryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sub-items
  const [newStatVal, setNewStatVal] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newSolTitle, setNewSolTitle] = useState('');
  const [newSolDesc, setNewSolDesc] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [techInput, setTechInput] = useState('');

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

  const handleOpenCreate = () => {
    setEditingIndustry({
      id: '',
      slug: '',
      title: '',
      subtitle: 'Mission-Critical Digital Engineering',
      overview: '',
      iconName: 'Building',
      keyStats: [
        { value: '99.99%', label: 'Uptime SLA' },
        { value: '<25ms', label: 'Processing Latency' },
      ],
      solutions: [],
      servicesOffered: ['AI & Machine Learning', 'Cloud & DevOps'],
      technologies: ['Next.js', 'MariaDB', 'Python'],
    });
    setServicesInput('AI & Machine Learning, Cloud & DevOps');
    setTechInput('Next.js, MariaDB, Python');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ind: IndustryData) => {
    setEditingIndustry({
      ...ind,
      keyStats: [...(ind.keyStats || [])],
      solutions: [...(ind.solutions || [])],
      servicesOffered: [...(ind.servicesOffered || [])],
      technologies: [...(ind.technologies || [])],
    });
    setServicesInput((ind.servicesOffered || []).join(', '));
    setTechInput((ind.technologies || []).join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete industry vertical "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/industries?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleAddStat = () => {
    if (!newStatVal.trim() || !editingIndustry) return;
    setEditingIndustry({
      ...editingIndustry,
      keyStats: [
        ...editingIndustry.keyStats,
        { value: newStatVal.trim(), label: newStatLabel.trim() || 'Metric' },
      ],
    });
    setNewStatVal('');
    setNewStatLabel('');
  };

  const handleRemoveStat = (index: number) => {
    if (!editingIndustry) return;
    setEditingIndustry({
      ...editingIndustry,
      keyStats: editingIndustry.keyStats.filter((_, i) => i !== index),
    });
  };

  const handleAddSolution = () => {
    if (!newSolTitle.trim() || !editingIndustry) return;
    setEditingIndustry({
      ...editingIndustry,
      solutions: [
        ...editingIndustry.solutions,
        { title: newSolTitle.trim(), desc: newSolDesc.trim() || 'Domain-specific enterprise architecture solution.' },
      ],
    });
    setNewSolTitle('');
    setNewSolDesc('');
  };

  const handleRemoveSolution = (index: number) => {
    if (!editingIndustry) return;
    setEditingIndustry({
      ...editingIndustry,
      solutions: editingIndustry.solutions.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry?.title) {
      alert('Industry title is required.');
      return;
    }

    const slug =
      editingIndustry.slug ||
      editingIndustry.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      ...editingIndustry,
      id: slug,
      slug,
      servicesOffered: servicesInput.split(',').map((s) => s.trim()).filter(Boolean),
      technologies: techInput.split(',').map((t) => t.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/industries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');
      setIsModalOpen(false);
      setEditingIndustry(null);
      load();
    } catch {
      alert('Error saving industry vertical.');
    } finally {
      setSaving(false);
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
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Industry Vertical</span>
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
                    <th className="pb-3">Industry Vertical</th>
                    <th className="pb-3">Subtitle</th>
                    <th className="pb-3">Key Stats</th>
                    <th className="pb-3">Solutions</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {industries.map((ind) => (
                    <tr key={ind.slug} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{ind.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">/{ind.slug}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500 truncate max-w-xs">{ind.subtitle}</td>
                      <td className="py-3 text-slate-500">{ind.keyStats?.length || 0} stats</td>
                      <td className="py-3 text-slate-500">{ind.solutions?.length || 0} solutions</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(ind)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Industry"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/industries/${ind.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(ind.slug)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800"
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

      {/* Rich Industry Modal */}
      {isModalOpen && editingIndustry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingIndustry.slug ? `Edit "${editingIndustry.title}"` : 'New Industry Vertical'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Industry Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingIndustry.title}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, title: e.target.value })}
                    placeholder="e.g. FinTech & Neobanking"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingIndustry.slug}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, slug: e.target.value })}
                    placeholder="fintech"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={editingIndustry.subtitle}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, subtitle: e.target.value })}
                  placeholder="e.g. Mission-Critical Financial Infrastructure"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Overview Narrative
                </label>
                <textarea
                  rows={3}
                  value={editingIndustry.overview}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, overview: e.target.value })}
                  placeholder="Detailed vertical domain summary..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              {/* Key Stats Management */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Compliance & Scale Metrics ({editingIndustry.keyStats?.length || 0})
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {editingIndustry.keyStats?.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-blue-500 mr-2">{stat.value}</span>
                        <span className="text-slate-600 dark:text-slate-400">{stat.label}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStat(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    value={newStatVal}
                    onChange={(e) => setNewStatVal(e.target.value)}
                    placeholder="Value (e.g. 99.999%)"
                    className="col-span-4 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newStatLabel}
                    onChange={(e) => setNewStatLabel(e.target.value)}
                    placeholder="Label (e.g. Uptime Reliability)"
                    className="col-span-7 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddStat}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Stat"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Solutions Management */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Vertical Solutions ({editingIndustry.solutions?.length || 0})
                </h4>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {editingIndustry.solutions?.map((sol, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white mr-2">{sol.title}:</span>
                        <span className="text-slate-400">{sol.desc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSolution(idx)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    value={newSolTitle}
                    onChange={(e) => setNewSolTitle(e.target.value)}
                    placeholder="Solution title"
                    className="col-span-5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newSolDesc}
                    onChange={(e) => setNewSolDesc(e.target.value)}
                    placeholder="Solution description"
                    className="col-span-6 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSolution}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Solution"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Associated Tags */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Services Offered (comma separated)
                  </label>
                  <input
                    type="text"
                    value={servicesInput}
                    onChange={(e) => setServicesInput(e.target.value)}
                    placeholder="AI & Machine Learning, Cloud & DevOps"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Next.js, Python, MariaDB, Go"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Industry Vertical</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

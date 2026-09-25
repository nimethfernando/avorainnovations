'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, ExternalLink, CheckCircle, Save, X, Loader2 } from 'lucide-react';

interface ResultMetric {
  metric: string;
  label: string;
}

interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  heroImage: string;
  challenge: string;
  solution: string;
  results: ResultMetric[];
  technologies: string[];
  relatedServices: string[];
}

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudy, setEditingStudy] = useState<CaseStudyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sub-items
  const [newMetricVal, setNewMetricVal] = useState('');
  const [newMetricLabel, setNewMetricLabel] = useState('');
  const [techInput, setTechInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');

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

  const handleOpenCreate = () => {
    setEditingStudy({
      id: '',
      slug: '',
      title: '',
      subtitle: 'Quantified Enterprise Engineering Success',
      client: '',
      industry: 'FinTech',
      heroImage: '/images/case-study-hero.jpg',
      challenge: '',
      solution: '',
      results: [
        { metric: '+320%', label: 'Throughput Growth' },
        { metric: '-68%', label: 'Infrastructure Overhead' },
      ],
      technologies: ['Next.js', 'MariaDB', 'PyTorch'],
      relatedServices: ['AI & Machine Learning'],
    });
    setTechInput('Next.js, MariaDB, PyTorch');
    setServiceInput('AI & Machine Learning');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (study: CaseStudyData) => {
    setEditingStudy({
      ...study,
      results: [...(study.results || [])],
      technologies: [...(study.technologies || [])],
      relatedServices: [...(study.relatedServices || [])],
    });
    setTechInput((study.technologies || []).join(', '));
    setServiceInput((study.relatedServices || []).join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete case study "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/case-studies?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleAddMetric = () => {
    if (!newMetricVal.trim() || !editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      results: [
        ...editingStudy.results,
        { metric: newMetricVal.trim(), label: newMetricLabel.trim() || 'Improvement' },
      ],
    });
    setNewMetricVal('');
    setNewMetricLabel('');
  };

  const handleRemoveMetric = (index: number) => {
    if (!editingStudy) return;
    setEditingStudy({
      ...editingStudy,
      results: editingStudy.results.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudy?.title || !editingStudy?.client) {
      alert('Title and client name are required.');
      return;
    }

    const slug =
      editingStudy.slug ||
      editingStudy.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      ...editingStudy,
      id: slug,
      slug,
      technologies: techInput.split(',').map((t) => t.trim()).filter(Boolean),
      relatedServices: serviceInput.split(',').map((s) => s.trim()).filter(Boolean),
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');
      setIsModalOpen(false);
      setEditingStudy(null);
      load();
    } catch {
      alert('Error saving case study.');
    } finally {
      setSaving(false);
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
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
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
                    <th className="pb-3">Case Study Title</th>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Industry</th>
                    <th className="pb-3">ROI Metrics</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {studies.map((cs) => (
                    <tr key={cs.slug} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{cs.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">/{cs.slug}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-700 dark:text-slate-300 font-semibold">{cs.client}</td>
                      <td className="py-3 text-slate-500">{cs.industry}</td>
                      <td className="py-3 text-slate-500">{cs.results?.length || 0} metrics</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(cs)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Case Study"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/case-studies/${cs.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="View Public Case Study"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(cs.slug)}
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

      {/* Rich Case Study Modal */}
      {isModalOpen && editingStudy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingStudy.slug ? `Edit "${editingStudy.title}"` : 'New Case Study'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Case Study Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStudy.title}
                    onChange={(e) => setEditingStudy({ ...editingStudy, title: e.target.value })}
                    placeholder="e.g. Scaling Real-Time Risk Engine to 50M Events/Sec"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingStudy.slug}
                    onChange={(e) => setEditingStudy({ ...editingStudy, slug: e.target.value })}
                    placeholder="scaling-risk-engine"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingStudy.client}
                    onChange={(e) => setEditingStudy({ ...editingStudy, client: e.target.value })}
                    placeholder="e.g. Apex Global Bank"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editingStudy.industry}
                    onChange={(e) => setEditingStudy({ ...editingStudy, industry: e.target.value })}
                    placeholder="e.g. FinTech, Healthcare, Logistics"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  The Client Challenge
                </label>
                <textarea
                  rows={3}
                  value={editingStudy.challenge}
                  onChange={(e) => setEditingStudy({ ...editingStudy, challenge: e.target.value })}
                  placeholder="Describe the technical bottleneck, architectural limitations, or business challenge..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Avora's Engineering Solution
                </label>
                <textarea
                  rows={3}
                  value={editingStudy.solution}
                  onChange={(e) => setEditingStudy({ ...editingStudy, solution: e.target.value })}
                  placeholder="Detail the distributed systems architecture, microservices, and AI pipeline deployed..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              {/* Quantified Metrics Management */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Quantified ROI Metrics ({editingStudy.results?.length || 0})
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {editingStudy.results?.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-emerald-500 mr-2">{res.metric}</span>
                        <span className="text-slate-600 dark:text-slate-400">{res.label}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMetric(idx)}
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
                    value={newMetricVal}
                    onChange={(e) => setNewMetricVal(e.target.value)}
                    placeholder="Metric (e.g. +340%)"
                    className="col-span-4 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-500"
                  />
                  <input
                    type="text"
                    value={newMetricLabel}
                    onChange={(e) => setNewMetricLabel(e.target.value)}
                    placeholder="Label (e.g. Throughput Velocity)"
                    className="col-span-7 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddMetric}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Metric"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Technologies & Services */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Next.js, Python, MariaDB, PyTorch"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Related Services (comma separated)
                  </label>
                  <input
                    type="text"
                    value={serviceInput}
                    onChange={(e) => setServiceInput(e.target.value)}
                    placeholder="AI & Machine Learning, Cloud & DevOps"
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
                  <span>Save Case Study</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Cpu,
  Layers,
  Save,
  X,
  Loader2,
  Sparkles,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';

interface SubService {
  title: string;
  desc: string;
}

interface Capability {
  title: string;
  desc: string;
  icon?: string;
}

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServiceData {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: Capability[];
  subServices: SubService[];
  technologies: string[];
  industries: string[];
  useCases?: any[];
  faqs: ServiceFAQ[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sub-items temporary state
  const [newSubTitle, setNewSubTitle] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');
  const [newCapTitle, setNewCapTitle] = useState('');
  const [newCapDesc, setNewCapDesc] = useState('');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [techInput, setTechInput] = useState('');
  const [indInput, setIndInput] = useState('');

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

  const handleOpenCreate = () => {
    setEditingService({
      id: '',
      slug: '',
      title: '',
      category: 'Artificial Intelligence',
      badge: 'Core Practice',
      iconName: 'Brain',
      shortDesc: '',
      fullDesc: '',
      capabilities: [],
      subServices: [],
      technologies: ['Python', 'Next.js', 'MariaDB'],
      industries: ['FinTech', 'Healthcare'],
      faqs: [],
    });
    setTechInput('Python, Next.js, MariaDB');
    setIndInput('FinTech, Healthcare');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceData) => {
    setEditingService({
      ...srv,
      capabilities: [...(srv.capabilities || [])],
      subServices: [...(srv.subServices || [])],
      faqs: [...(srv.faqs || [])],
      technologies: [...(srv.technologies || [])],
      industries: [...(srv.industries || [])],
    });
    setTechInput((srv.technologies || []).join(', '));
    setIndInput((srv.industries || []).join(', '));
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete service practice "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/services?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleAddSubService = () => {
    if (!newSubTitle.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      subServices: [
        ...editingService.subServices,
        { title: newSubTitle.trim(), desc: newSubDesc.trim() || 'Comprehensive architecture assessment and execution.' },
      ],
    });
    setNewSubTitle('');
    setNewSubDesc('');
  };

  const handleRemoveSubService = (index: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      subServices: editingService.subServices.filter((_, i) => i !== index),
    });
  };

  const handleAddCapability = () => {
    if (!newCapTitle.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      capabilities: [
        ...editingService.capabilities,
        { title: newCapTitle.trim(), desc: newCapDesc.trim() || 'Production deployment with enterprise governance.', icon: 'CheckCircle' },
      ],
    });
    setNewCapTitle('');
    setNewCapDesc('');
  };

  const handleRemoveCapability = (index: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      capabilities: editingService.capabilities.filter((_, i) => i !== index),
    });
  };

  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !editingService) return;
    setEditingService({
      ...editingService,
      faqs: [
        ...editingService.faqs,
        { question: newFaqQ.trim(), answer: newFaqA.trim() || 'Typical discovery to rollout runs in 4 weeks.' },
      ],
    });
    setNewFaqQ('');
    setNewFaqA('');
  };

  const handleRemoveFaq = (index: number) => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      faqs: editingService.faqs.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title) {
      alert('Service title is required.');
      return;
    }

    const slug =
      editingService.slug ||
      editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const techs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const inds = indInput
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    const payload = {
      ...editingService,
      id: slug,
      slug,
      technologies: techs,
      industries: inds,
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');
      setIsModalOpen(false);
      setEditingService(null);
      load();
    } catch {
      alert('Error saving service.');
    } finally {
      setSaving(false);
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
            onClick={handleOpenCreate}
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
                    <th className="pb-3">Sub-Services</th>
                    <th className="pb-3">Capabilities</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {services.map((srv) => (
                    <tr key={srv.slug} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{srv.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">/{srv.slug}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500">{srv.category}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-semibold">
                          {srv.badge || 'Practice'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{srv.subServices?.length || 0} items</td>
                      <td className="py-3 text-slate-500">{srv.capabilities?.length || 0} items</td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(srv)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Edit Service & Sub-services"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/services/${srv.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(srv.slug)}
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

      {/* Rich Service & Sub-Services Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-3xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingService.slug ? `Edit "${editingService.title}"` : 'New Engineering Practice'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Practice Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    placeholder="e.g. AI & Machine Learning"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingService.slug}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    placeholder="ai-machine-learning"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    placeholder="e.g. Artificial Intelligence"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingService.badge}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    placeholder="e.g. Flagship Core"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    placeholder="Brain, Cpu, Cloud, Smartphone"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description (Cards & Megamenu)
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  placeholder="Concise 1-2 sentence overview..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Description (Landing Page Hero)
                </label>
                <textarea
                  rows={3}
                  value={editingService.fullDesc}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  placeholder="Detailed technical overview..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              {/* Sub-Services Management */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Sub-Services ({editingService.subServices?.length || 0})
                </h4>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {editingService.subServices?.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white mr-2">{sub.title}:</span>
                        <span className="text-slate-400">{sub.desc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubService(idx)}
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
                    value={newSubTitle}
                    onChange={(e) => setNewSubTitle(e.target.value)}
                    placeholder="Sub-service title"
                    className="col-span-5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newSubDesc}
                    onChange={(e) => setNewSubDesc(e.target.value)}
                    placeholder="Sub-service description"
                    className="col-span-6 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubService}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Sub-service"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Capabilities Management */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Capabilities & Pillars ({editingService.capabilities?.length || 0})
                </h4>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {editingService.capabilities?.map((cap, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white mr-2">{cap.title}:</span>
                        <span className="text-slate-400">{cap.desc}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCapability(idx)}
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
                    value={newCapTitle}
                    onChange={(e) => setNewCapTitle(e.target.value)}
                    placeholder="Capability title"
                    className="col-span-5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newCapDesc}
                    onChange={(e) => setNewCapDesc(e.target.value)}
                    placeholder="Capability details"
                    className="col-span-6 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCapability}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Capability"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Technologies & Industries Tags */}
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
                    Industry Verticals (comma separated)
                  </label>
                  <input
                    type="text"
                    value={indInput}
                    onChange={(e) => setIndInput(e.target.value)}
                    placeholder="FinTech, Healthcare, Logistics"
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
                  <span>Save Service Practice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

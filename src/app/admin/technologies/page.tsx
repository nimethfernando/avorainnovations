'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, Cpu, Save, X, Loader2, Sparkles, Terminal } from 'lucide-react';

interface TechItem {
  name: string;
  icon?: string;
  description: string;
  badge?: string;
}

interface TechCategory {
  id?: string;
  slug: string;
  category: string;
  description: string;
  items: TechItem[];
}

export default function AdminTechnologiesPage() {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<TechCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sub-item form inside modal
  const [newItemName, setNewItemName] = useState('');
  const [newItemBadge, setNewItemBadge] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  const load = async () => {
    try {
      const res = await fetch('/api/admin/technologies');
      if (res.ok) setCategories(await res.json());
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
    setEditingCategory({
      id: 'tech-' + Date.now(),
      slug: '',
      category: '',
      description: '',
      items: [],
    });
    setNewItemName('');
    setNewItemBadge('');
    setNewItemDesc('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: TechCategory) => {
    setEditingCategory({ ...cat, items: [...(cat.items || [])] });
    setNewItemName('');
    setNewItemBadge('');
    setNewItemDesc('');
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete technology domain "${slug}"?`)) return;
    try {
      await fetch(`/api/admin/technologies?slug=${slug}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleAddItemToEditing = () => {
    if (!newItemName.trim() || !editingCategory) return;
    const items = [...editingCategory.items, {
      name: newItemName.trim(),
      badge: newItemBadge.trim() || 'Production',
      description: newItemDesc.trim() || 'Enterprise grade technology stack.',
    }];
    setEditingCategory({ ...editingCategory, items });
    setNewItemName('');
    setNewItemBadge('');
    setNewItemDesc('');
  };

  const handleRemoveItem = (index: number) => {
    if (!editingCategory) return;
    const items = editingCategory.items.filter((_, i) => i !== index);
    setEditingCategory({ ...editingCategory, items });
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.category) {
      alert('Category name is required.');
      return;
    }

    const slug = editingCategory.slug || editingCategory.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const payload = {
      ...editingCategory,
      slug,
      id: editingCategory.id || slug,
    };

    setSaving(true);
    try {
      const res = await fetch('/api/admin/technologies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');
      setIsModalOpen(false);
      setEditingCategory(null);
      load();
    } catch {
      alert('Error saving technology category.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Technology Stacks & Engineering Domains CMS" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Engineering Stacks</h2>
            <p className="text-xs text-slate-500">
              Manage technology categories, framework matrices, and skill badges showcased across the platform.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Technology Domain</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading technology domains...
            </div>
          ) : categories.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No technology domains found. Click "Add Technology Domain" to create one.
            </div>
          ) : (
            categories.map((cat, idx) => (
              <div
                key={cat.slug || idx}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{cat.category}</span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 text-[10px] font-mono">
                          /{cat.slug}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">{cat.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                      <span>Edit Domain</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.slug)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Stacks Pills */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-900 flex flex-wrap gap-2">
                  {(cat.items || []).map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-2"
                    >
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-400">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                  {(!cat.items || cat.items.length === 0) && (
                    <span className="text-xs text-slate-400 italic">No frameworks added yet.</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingCategory.slug ? `Edit "${editingCategory.category}"` : 'New Technology Domain'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.category}
                    onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })}
                    placeholder="e.g. AI & Machine Learning"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                    placeholder="e.g. ai-machine-learning"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Domain Description
                </label>
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="e.g. Production neural networks, model training, and inferencing architectures."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              {/* Technologies Sub-items Builder */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Frameworks & Tools in this Domain ({editingCategory.items.length})</span>
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {editingCategory.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white mr-2">{item.name}</span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] mr-2">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-slate-400 text-[11px]">{item.description}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
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
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Framework / Tool (e.g. PyTorch)"
                    className="col-span-4 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newItemBadge}
                    onChange={(e) => setNewItemBadge(e.target.value)}
                    placeholder="Badge (e.g. Core AI)"
                    className="col-span-3 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <input
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="Brief description"
                    className="col-span-4 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddItemToEditing}
                    className="col-span-1 p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    title="Add Item"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
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
                  <span>Save Technology Domain</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

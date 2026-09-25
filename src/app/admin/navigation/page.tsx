'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Menu,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  CheckCircle,
  Loader2,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  type: 'mega' | 'link' | 'button';
  badge?: string;
  enabled: boolean;
  order: number;
}

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/navigation');
      if (res.ok) {
        const data = await res.json();
        setNavItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = (id: string) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;

    const updated = [...navItems];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setNavItems(updated.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  const handleChange = (id: string, field: keyof NavItem, value: any) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this navigation item?')) return;
    setNavItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const newItem: NavItem = {
      id: 'nav-' + Date.now(),
      label: 'New Link',
      href: '/new-page',
      type: 'link',
      badge: '',
      enabled: true,
      order: navItems.length + 1,
    };
    setNavItems([...navItems, newItem]);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(navItems),
      });

      if (!res.ok) throw new Error('Save failed');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert('Error updating navigation menus.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Navigation Menus & Header Architecture CMS" />

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Header & Mega Menu Items</h2>
            <p className="text-xs text-slate-500">
              Customize primary navigation tabs, order, mega menus, badges, and quick CTA buttons.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-blue-500" />
              <span>Add Navigation Link</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Navigation</span>
            </button>
          </div>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Navigation menus saved and published live!</span>
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading navigation structure...
            </div>
          ) : (
            navItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                  item.enabled
                    ? 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    : 'bg-slate-50 dark:bg-slate-900/50 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                {/* Reorder Arrows */}
                <div className="flex flex-col gap-0.5">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === navItems.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Status Toggle */}
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => handleToggle(item.id)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  title="Enable or disable item"
                />

                {/* Label */}
                <div className="flex-1 grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-3">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Label
                    </label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleChange(item.id, 'label', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />
                  </div>

                  <div className="col-span-4">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Target Path / URL
                    </label>
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => handleChange(item.id, 'href', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Behavior
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                    >
                      <option value="mega">Mega Menu</option>
                      <option value="link">Direct Link</option>
                      <option value="button">CTA Button</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={item.badge || ''}
                      onChange={(e) => handleChange(item.id, 'badge', e.target.value)}
                      placeholder="e.g. Core"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg"
                      title="Delete link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

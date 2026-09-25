'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Megaphone, Plus, Trash2, Edit3, Save, CheckCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface CTAItem {
  id: string;
  title: string;
  subtitle?: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  badgeText?: string;
  enabled: boolean;
}

export default function AdminCtasPage() {
  const [ctas, setCtas] = useState<CTAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/ctas');
      if (res.ok) {
        const data = await res.json();
        setCtas(data);
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

  const handleChange = (id: string, field: keyof CTAItem, value: any) => {
    setCtas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleToggle = (id: string) => {
    setCtas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const handleSaveCTA = async (item: CTAItem) => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/ctas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error('Save failed');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      load();
    } catch {
      alert('Error updating CTA.');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    const newItem: CTAItem = {
      id: 'cta-' + Date.now(),
      title: 'Partner with Elite Software Engineers',
      subtitle: 'Accelerate your digital roadmap with zero friction.',
      primaryButtonText: 'Start Consultation',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'View Case Studies',
      secondaryButtonLink: '/case-studies',
      badgeText: 'Immediate Availability',
      enabled: true,
    };
    setCtas([...ctas, newItem]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Call-to-Action?')) return;
    try {
      await fetch(`/api/admin/ctas?id=${id}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Call-to-Actions (CTAs) & High-Conversion Banners CMS" />

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Conversion Prompts</h2>
            <p className="text-xs text-slate-500">
              Control the messaging, buttons, and destinations for site-wide consultation triggers and footer banners.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New CTA Banner</span>
          </button>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Call-to-Action saved and active across public views!</span>
          </div>
        )}

        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">
              Loading CTAs...
            </div>
          ) : (
            ctas.map((cta) => (
              <div
                key={cta.id}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {cta.id === 'global-banner' ? 'Global Footer Banner CTA' : cta.id === 'floating-cta' ? 'Floating Widget CTA' : `Custom CTA (${cta.id})`}
                      </h3>
                      <p className="text-[11px] text-slate-400">ID: {cta.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={cta.enabled}
                        onChange={() => handleToggle(cta.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Active</span>
                    </label>

                    {cta.id !== 'global-banner' && cta.id !== 'floating-cta' && (
                      <button
                        onClick={() => handleDelete(cta.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Headline / Title *
                    </label>
                    <input
                      type="text"
                      value={cta.title}
                      onChange={(e) => handleChange(cta.id, 'title', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Subtitle / Narrative
                    </label>
                    <textarea
                      rows={2}
                      value={cta.subtitle || ''}
                      onChange={(e) => handleChange(cta.id, 'subtitle', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        value={cta.badgeText || ''}
                        onChange={(e) => handleChange(cta.id, 'badgeText', e.target.value)}
                        placeholder="e.g. Zero-Risk Discovery"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Primary Button Text
                      </label>
                      <input
                        type="text"
                        value={cta.primaryButtonText}
                        onChange={(e) => handleChange(cta.id, 'primaryButtonText', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Primary Button Link
                      </label>
                      <input
                        type="text"
                        value={cta.primaryButtonLink}
                        onChange={(e) => handleChange(cta.id, 'primaryButtonLink', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Secondary Button Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={cta.secondaryButtonText || ''}
                        onChange={(e) => handleChange(cta.id, 'secondaryButtonText', e.target.value)}
                        placeholder="e.g. Calculate Project Cost"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Secondary Button Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={cta.secondaryButtonLink || ''}
                        onChange={(e) => handleChange(cta.id, 'secondaryButtonLink', e.target.value)}
                        placeholder="e.g. /cost-calculator"
                        className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => handleSaveCTA(cta)}
                      disabled={saving}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      <span>Save This CTA</span>
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

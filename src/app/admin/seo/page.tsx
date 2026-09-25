'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Search, Save, CheckCircle, Loader2, Globe, Share2, ShieldCheck, Eye } from 'lucide-react';

export default function AdminSeoPage() {
  const [seo, setSeo] = useState({
    metaTitle: 'AVORA Innovations | Enterprise AI, Cloud & Digital Product Engineering',
    metaDescription: 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
    siteName: 'AVORA Innovations',
    ogImage: '/logo-horizontal-dark.png',
    twitterHandle: '@avorainnovations',
    twitterCard: 'summary_large_image',
    keywords: 'AI Engineering, Next.js 16, MariaDB, Enterprise Software, Cloud Architecture, Digital Transformation',
    canonicalBase: 'https://avorainnovations.com',
    robotsIndex: true,
    robotsFollow: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/seo');
        if (res.ok) {
          const data = await res.json();
          setSeo((prev) => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo),
      });

      if (!res.ok) throw new Error('Save failed');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert('Error updating SEO settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Search Engine Optimization (SEO) & OpenGraph CMS" />

      <div className="p-8 max-w-6xl space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Global Search & Social Metadata</h2>
          <p className="text-xs text-slate-500">
            Control search crawler indexing, Google SERP appearance, OpenGraph social previews, and canonical domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main SEO Form */}
          <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Search Indexing & SERP Snippets</span>
              </h3>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Default Meta Title *
                  </label>
                  <span className="text-[10px] text-slate-400">{seo.metaTitle.length} / 60 chars</span>
                </div>
                <input
                  type="text"
                  required
                  value={seo.metaTitle}
                  onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Default Meta Description *
                  </label>
                  <span className="text-[10px] text-slate-400">{seo.metaDescription.length} / 160 chars</span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={seo.metaDescription}
                  onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Canonical Base URL
                </label>
                <input
                  type="url"
                  value={seo.canonicalBase}
                  onChange={(e) => setSeo({ ...seo, canonicalBase: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Meta Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={seo.keywords}
                  onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seo.robotsIndex}
                    onChange={(e) => setSeo({ ...seo, robotsIndex: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Index Site (Googlebot allow)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={seo.robotsFollow}
                    onChange={(e) => setSeo({ ...seo, robotsFollow: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Follow Links (PageRank flow)</span>
                </label>
              </div>
            </div>

            {/* Social Sharing & OpenGraph */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>OpenGraph & Social Sharing</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Social Preview Image URL (og:image)
                </label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  placeholder="/logo-horizontal-dark.png or full image URL"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Twitter / X Handle
                  </label>
                  <input
                    type="text"
                    value={seo.twitterHandle}
                    onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Twitter Card Format
                  </label>
                  <select
                    value={seo.twitterCard}
                    onChange={(e) => setSeo({ ...seo, twitterCard: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <option value="summary_large_image">Large Image Card (Recommended)</option>
                    <option value="summary">Standard Summary</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {success ? (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> SEO settings updated live!
                </span>
              ) : (
                <span className="text-xs text-slate-400">
                  Settings take immediate effect across public metadata.
                </span>
              )}

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save SEO Config</span>
              </button>
            </div>
          </form>

          {/* Live Preview Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Google Search Result Preview</span>
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span>{seo.canonicalBase || 'https://avorainnovations.com'}</span>
                </div>
                <h4 className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer line-clamp-1">
                  {seo.metaTitle}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {seo.metaDescription}
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Social Card Preview (LinkedIn / Twitter)</span>
              </h3>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900/60">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={seo.ogImage}
                    alt="Social preview"
                    className="max-h-full max-w-full object-contain p-4"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    {seo.canonicalBase?.replace(/^https?:\/\//, '') || 'avorainnovations.com'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {seo.metaTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2">
                    {seo.metaDescription}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

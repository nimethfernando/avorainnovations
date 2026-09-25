'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Image as ImageIcon,
  Upload,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  Filter,
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type?: string;
  size?: string;
  dimensions?: string;
  category?: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual URL modal
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [manualCategory, setManualCategory] = useState('External Assets');

  const load = async () => {
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) setMediaList(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'Uploaded Media');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      load();
    } catch {
      alert('File upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleManualAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualUrl) return;

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: manualName,
          url: manualUrl,
          category: manualCategory,
        }),
      });

      if (!res.ok) throw new Error('Failed to register media asset');
      setIsUrlModalOpen(false);
      setManualName('');
      setManualUrl('');
      load();
    } catch {
      alert('Error registering media asset.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    try {
      await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = ['all', ...Array.from(new Set(mediaList.map((m) => m.category || 'General')))];
  const filteredList =
    filterCategory === 'all'
      ? mediaList
      : mediaList.filter((m) => m.category === filterCategory);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Media Library & Image Assets CMS" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Brand Assets & Media</h2>
            <p className="text-xs text-slate-500">
              Upload logos, diagrams, blog covers, and case study hero graphics. Copy URLs to paste into any editor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>Upload Image</span>
            </button>
            <button
              onClick={() => setIsUrlModalOpen(true)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-blue-500" />
              <span>Link External URL</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Assets' : cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-500">
              Loading media library...
            </div>
          ) : filteredList.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs text-slate-500">
              No media found in this category. Click "Upload Image" to upload one.
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
              >
                {/* Image Preview Box */}
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-900/80 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-900">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  {item.category && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-white font-medium">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Info & Actions */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate font-mono mt-0.5" title={item.url}>
                      {item.url}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-900">
                    <button
                      onClick={() => handleCopyUrl(item)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        copiedId === item.id
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                        title="View Full Asset"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Manual Link Modal */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Link External Media Asset</h3>
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="e.g. Cloud Infrastructure Infographic"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL / Path *
                </label>
                <input
                  type="text"
                  required
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="e.g. /images/hero-graphic.png or https://..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  placeholder="e.g. Blog Graphics, Architecture, Case Studies"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUrlModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Register Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Artificial Intelligence',
    excerpt: '',
    content: '',
    authorName: '',
    authorRole: '',
    readTime: '',
    tags: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          let tagStr = '';
          try {
            const parsed = typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags;
            tagStr = Array.isArray(parsed) ? parsed.join(', ') : '';
          } catch {
            tagStr = data.tags || '';
          }

          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            category: data.category || 'Artificial Intelligence',
            excerpt: data.excerpt || '',
            content: data.content || '',
            authorName: data.authorName || '',
            authorRole: data.authorRole || '',
            readTime: data.readTime || '5 min read',
            tags: tagStr,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const tagArray = formData.tags.split(',').map((t) => t.trim());
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagArray,
        }),
      });

      if (!res.ok) throw new Error('Failed to update article');
      router.push('/admin/blogs');
    } catch {
      alert('Error updating article.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <AdminHeader title="Edit Article" />
        <div className="p-12 text-center text-xs text-slate-500">Loading article...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Edit Engineering Article" />

      <div className="p-8 max-w-4xl space-y-6">
        <Link
          href="/admin/blogs"
          className="text-xs font-semibold text-slate-500 hover:text-blue-500 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </Link>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
              >
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Engineering">Engineering</option>
                <option value="Database & Cloud">Database & Cloud</option>
                <option value="Mobile & IoT">Mobile & IoT</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Full Content (HTML / Markdown)
            </label>
            <textarea
              rows={14}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-4 rounded-xl font-mono text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Update Article</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

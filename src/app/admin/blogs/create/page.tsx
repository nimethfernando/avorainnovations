'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Save,
  ArrowLeft,
  Loader2,
  Upload,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon,
  PlusCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function CreateBlogPage() {
  const router = useRouter();
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Artificial Intelligence',
    coverImage: '',
    excerpt: '',
    content: "<h2>Introduction</h2>\n<p>Write your technical breakdown here...</p>",
    authorName: 'Dr. Aris Thorne',
    authorRole: 'Head of AI Research',
    readTime: '6 min read',
    tags: 'AI, Architecture, Performance',
  });

  const [customUrl, setCustomUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle Cover Image Upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('category', 'Blog Cover');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Upload failed');
      const uploaded = await res.json();
      setFormData((prev) => ({ ...prev, coverImage: uploaded.url }));
    } catch {
      alert('Failed to upload cover image. Please check image format and size.');
    } finally {
      setUploadingCover(false);
      if (coverFileInputRef.current) coverFileInputRef.current.value = '';
    }
  };

  // Handle Inline Content Image Upload
  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBodyImage(true);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('category', 'Blog Content');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Upload failed');
      const uploaded = await res.json();
      
      const snippet = `
<figure class="my-8">
  <img src="${uploaded.url}" alt="${file.name.replace(/\.[^/.]+$/, '')}" class="rounded-2xl w-full border border-slate-200 dark:border-slate-800 shadow-lg object-cover" />
  <figcaption class="text-xs text-center text-slate-400 mt-2">${file.name.replace(/\.[^/.]+$/, '')}</figcaption>
</figure>
`;

      setFormData((prev) => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return { ...prev, content: prev.content + snippet };
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = prev.content.substring(0, start) + snippet + prev.content.substring(end);
        return { ...prev, content: newContent };
      });
    } catch {
      alert('Failed to upload image for content.');
    } finally {
      setUploadingBodyImage(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    setFormData((prev) => ({ ...prev, coverImage: customUrl.trim() }));
    setShowUrlInput(false);
    setCustomUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const tagArray = formData.tags.split(',').map((t) => t.trim());
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagArray,
        }),
      });

      if (!res.ok) throw new Error('Failed to create article');
      router.push('/admin/blogs');
    } catch {
      alert('Error creating blog post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Write New Engineering Article" />

      <div className="p-8 max-w-4xl space-y-6">
        <Link
          href="/admin/blogs"
          className="text-xs font-semibold text-slate-500 hover:text-blue-500 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </Link>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Article Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Article Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Scaling Neural Inference with PagedAttention and vLLM"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cover Image Section */}
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                  Hero Cover Image
                </label>
                <p className="text-[11px] text-slate-500">
                  Featured banner displayed at the top of the article and on the blog index card (Recommended: 16:9 ratio, min 1200x675px).
                </p>
              </div>
              {formData.coverImage && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, coverImage: '' })}
                  className="px-2.5 py-1 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>

            {formData.coverImage ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/8] max-h-64 bg-slate-900">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Active Image
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={coverFileInputRef}
                    onChange={handleCoverUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingCover}
                    onClick={() => coverFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {uploadingCover ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>Upload Replacement Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Change Image URL</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-3 hover:border-blue-500/50 transition-colors bg-white/50 dark:bg-slate-950/50">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">
                    No cover image selected
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Upload an image file from your device (PNG, JPG, WebP) or paste an external URL.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <input
                    type="file"
                    ref={coverFileInputRef}
                    onChange={handleCoverUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingCover}
                    onClick={() => coverFileInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>Upload Image from Device</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Paste Image URL</span>
                  </button>
                </div>
              </div>
            )}

            {/* Manual URL input modal / toggle */}
            {showUrlInput && (
              <div className="pt-2 flex items-center gap-2 animate-in fade-in">
                <input
                  type="url"
                  placeholder="Paste external image URL (e.g. https://images.unsplash.com/...)"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(false)}
                  className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
              </div>
            )}
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
              placeholder="One or two sentences summarizing the key architectural takeaways..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
            />
          </div>

          {/* Content with Image Insert Helper */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-slate-400">
                Full Content (HTML / Markdown) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={contentImageInputRef}
                  onChange={handleContentImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={uploadingBodyImage}
                  onClick={() => contentImageInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Upload and insert an image tag into the article body"
                >
                  {uploadingBodyImage ? <Loader2 className="w-3 h-3 animate-spin" /> : <PlusCircle className="w-3 h-3" />}
                  <span>+ Insert Image into Body</span>
                </button>
              </div>
            </div>
            <textarea
              ref={contentTextareaRef}
              rows={14}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-4 rounded-xl font-mono text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Tip: You can insert headings (&lt;h2&gt;), paragraphs (&lt;p&gt;), code blocks, or use the &quot;+ Insert Image into Body&quot; button above to embed diagrams and screenshots directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                Author Title / Role
              </label>
              <input
                type="text"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. AI Agents, LLM, Performance, Architecture"
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Publish Article Live</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

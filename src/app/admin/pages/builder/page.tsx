'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Layers,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Save,
  CheckCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Move,
  Type,
  HelpCircle,
  Cpu,
  Star,
  FileText,
} from 'lucide-react';

interface PageBlock {
  id: string;
  type:
    | 'hero'
    | 'text'
    | 'services'
    | 'technologies'
    | 'industries'
    | 'case-studies'
    | 'why-avora'
    | 'testimonials'
    | 'faqs'
    | 'blogs'
    | 'cta';
  title?: string;
  subtitle?: string;
  content?: string;
  ctaText?: string;
  ctaLink?: string;
  enabled: boolean;
}

const AVAILABLE_BLOCKS = [
  { type: 'hero', label: 'Hero Section', desc: 'Main headline, badge, and primary action buttons', icon: Sparkles },
  { type: 'text', label: 'Rich Text / Narrative', desc: 'Custom editorial text, Markdown or company story', icon: Type },
  { type: 'services', label: 'Services Showcase', desc: 'Interactive capabilities cards with Read More flow', icon: Layers },
  { type: 'technologies', label: 'Technology Stacks', desc: 'Interactive category switcher (Frontend, Backend, AI)', icon: Cpu },
  { type: 'industries', label: 'Industry Verticals', desc: 'Domain compliance metrics and tailored solutions', icon: Layers },
  { type: 'case-studies', label: 'Case Studies Grid', desc: 'Client challenges, architecture, and measured ROI', icon: CheckCircle },
  { type: 'why-avora', label: 'Why Avora Pillars', desc: '100% IP ownership, senior staff, and 4-week PoV', icon: Star },
  { type: 'testimonials', label: 'Client Testimonials', desc: 'Executive reviews and verified rating cards', icon: Star },
  { type: 'blogs', label: 'Engineering Blog Highlights', desc: 'Latest technical papers and engineering insights', icon: FileText },
  { type: 'faqs', label: 'FAQ Accordion', desc: 'Interactive expand/collapse questions and answers', icon: HelpCircle },
  { type: 'cta', label: 'Conversion CTA Banner', desc: 'High-converting consultation booking callout', icon: ArrowRight },
];

export default function PageBuilder() {
  const [slug, setSlug] = useState('home');
  const [title, setTitle] = useState('AVORA Innovations — Enterprise AI');
  const [metaTitle, setMetaTitle] = useState('AVORA Innovations | Enterprise AI & Digital Engineering');
  const [metaDesc, setMetaDesc] = useState('Avora Innovations designs and engineers production-grade AI systems and cloud products.');
  const [blocks, setBlocks] = useState<PageBlock[]>([
    { id: 'b-1', type: 'hero', title: 'Engineering Next-Gen AI & Digital Products', subtitle: 'Avora Innovations designs and scales mission-critical software.', enabled: true },
    { id: 'b-2', type: 'services', title: 'Comprehensive Service Capabilities', enabled: true },
    { id: 'b-3', type: 'technologies', title: 'High-Performance Stacks', enabled: true },
    { id: 'b-4', type: 'industries', title: 'Engineered for High-Stakes Industries', enabled: true },
    { id: 'b-5', type: 'case-studies', title: 'Enterprise Case Studies', enabled: true },
    { id: 'b-6', type: 'why-avora', title: 'Why Choose AVORA', enabled: true },
    { id: 'b-7', type: 'testimonials', title: 'Trusted by Visionary Leaders', enabled: true },
    { id: 'b-8', type: 'blogs', title: 'Engineering Insights Blog', enabled: true },
    { id: 'b-9', type: 'faqs', title: 'Frequently Asked Questions', enabled: true },
    { id: 'b-10', type: 'cta', title: 'Ready to Build Production-Grade AI?', enabled: true },
  ]);

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Load existing page if available
  useEffect(() => {
    async function loadPage() {
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setMetaTitle(data.metaTitle || '');
          setMetaDesc(data.metaDesc || '');
          if (data.sections) {
            try {
              const parsed = JSON.parse(data.sections);
              if (Array.isArray(parsed) && parsed.length > 0) {
                setBlocks(
                  parsed.map((item: any, i: number) => ({
                    id: item.id || `b-${i}-${Date.now()}`,
                    type: item.type,
                    title: item.title,
                    subtitle: item.subtitle,
                    content: item.content,
                    ctaText: item.ctaText,
                    ctaLink: item.ctaLink,
                    enabled: item.enabled !== undefined ? item.enabled : true,
                  }))
                );
              }
            } catch (e) {
              console.warn('Could not parse sections JSON:', e);
            }
          }
        }
      } catch (err) {
        console.warn('Page not loaded:', err);
      }
    }
    loadPage();
  }, [slug]);

  const addBlock = (type: any) => {
    const newBlock: PageBlock = {
      id: 'b-' + Date.now(),
      type,
      title: `New ${type.toUpperCase()} Section`,
      subtitle: 'Configure section properties in CMS',
      enabled: true,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  };

  const updateBlock = (id: string, updates: Partial<PageBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const handleSavePage = async () => {
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          metaTitle,
          metaDesc,
          sections: JSON.stringify(blocks),
          isPublished: true,
        }),
      });

      if (!res.ok) throw new Error('Save failed');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save dynamic page. Check console.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Dynamic Visual Page Builder" />

      {/* Builder Toolbar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400">Page Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-blue-500"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-2.5 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              previewMode
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Exit Preview' : 'Preview Layout'}</span>
          </button>

          <button
            onClick={handleSavePage}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" /> Saved Live!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Page to CMS
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl">
        {/* Left: Reusable Blocks Palette */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Add Section Block
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Click any block to insert it into this page&apos;s dynamic layout.
            </p>

            <div className="space-y-2 pt-2 max-h-[65vh] overflow-y-auto">
              {AVAILABLE_BLOCKS.map((blk) => {
                const Icon = blk.icon;
                return (
                  <button
                    key={blk.type}
                    onClick={() => addBlock(blk.type)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-left transition-all flex items-center gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {blk.label}
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{blk.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Page Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Composed Page Sections ({blocks.length} blocks)
            </h2>
            <span className="text-xs text-slate-500">
              Arrange and configure sections below
            </span>
          </div>

          <div className="space-y-4">
            {blocks.map((block, idx) => (
              <div
                key={block.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                {/* Block header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 text-xs font-mono font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      [{block.type}]
                    </span>
                    <input
                      type="text"
                      value={block.title || ''}
                      onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                      placeholder="Section Title"
                      className="px-2 py-1 text-xs font-bold bg-transparent text-slate-900 dark:text-white border-b border-transparent focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveBlock(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveBlock(idx, 'down')}
                      disabled={idx === blocks.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-1 rounded text-rose-400 hover:text-rose-500"
                      title="Remove Block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtitle / Description edit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                      Section Subtitle / Description
                    </label>
                    <input
                      type="text"
                      value={block.subtitle || ''}
                      onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
                      placeholder="Optional descriptive subtext..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {block.type === 'hero' || block.type === 'cta' ? (
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                        Call-to-Action Text
                      </label>
                      <input
                        type="text"
                        value={block.ctaText || ''}
                        onChange={(e) => updateBlock(block.id, { ctaText: e.target.value })}
                        placeholder="e.g. Schedule Discovery"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

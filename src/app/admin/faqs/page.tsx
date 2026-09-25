'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Edit3, Trash2, HelpCircle, Save, X, Loader2 } from 'lucide-react';

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/faqs');
      if (res.ok) setFaqs(await res.json());
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
    setEditingFaq({
      id: 'faq-' + Date.now(),
      question: '',
      answer: '',
      category: 'General',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq({ ...faq });
    setIsModalOpen(true);
  };

  const handleDelete = async (question: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await fetch(`/api/admin/faqs?question=${encodeURIComponent(question)}`, {
        method: 'DELETE',
      });
      load();
    } catch {
      alert('Delete failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question || !editingFaq?.answer) {
      alert('Question and answer are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });

      if (!res.ok) throw new Error('Save failed');
      setIsModalOpen(false);
      setEditingFaq(null);
      load();
    } catch {
      alert('Error saving FAQ.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Frequently Asked Questions (FAQs) CMS" />

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Site FAQs & Accordions</h2>
            <p className="text-xs text-slate-500">
              Manage enterprise FAQs displayed on the homepage, service pages, and cost calculator.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No FAQs found. Click "Add FAQ Item" to create one.
            </div>
          ) : (
            faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {faq.question}
                      </h3>
                      {faq.category && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-500 text-[10px] font-semibold">
                          {faq.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(faq)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.question)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 pl-11">
                  {faq.answer}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-900">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingFaq.id?.startsWith('faq-') ? 'Add FAQ Item' : 'Edit FAQ Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="e.g. How does Avora guarantee 100% IP ownership?"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingFaq.category || 'General'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  placeholder="e.g. Engagement & Pricing, Security & IP, Timeline"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Answer *
                </label>
                <textarea
                  required
                  rows={5}
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  placeholder="Enter the comprehensive technical or business answer..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
                />
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
                  <span>Save FAQ Item</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

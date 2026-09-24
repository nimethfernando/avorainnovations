'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleAddFaq = async () => {
    const question = prompt('Enter FAQ Question:');
    if (!question) return;
    const answer = prompt('Enter FAQ Answer:');
    if (!answer) return;

    await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer }),
    });
    load();
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Frequently Asked Questions CMS" />

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Site FAQs</h2>
            <p className="text-xs text-slate-500">
              Manage questions, answers, and accordions displayed across the site.
            </p>
          </div>

          <button
            onClick={handleAddFaq}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {f.question}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pl-4 leading-relaxed">
                {f.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

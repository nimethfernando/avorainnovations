'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Calculator, Phone, X, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import ConsultationModal from './ConsultationModal';

export default function FloatingContactWidget() {
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        {/* Expanded options */}
        {expanded && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 space-y-2 mb-2 animate-in fade-in slide-in-from-bottom-2 text-xs font-semibold">
            <Link
              href="/cost-calculator"
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Calculator className="w-4 h-4 text-blue-500" />
              <span>Project Cost Estimator</span>
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-left"
            >
              <MessageSquare className="w-4 h-4 text-purple-500" />
              <span>Book Discovery Call</span>
            </button>

            <a
              href="https://wa.me/18005122867"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 transition-colors"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-500" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        )}

        {/* Primary floating trigger button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl hover:scale-105 transition-all flex items-center justify-center cursor-pointer border border-white/20"
          aria-label="Quick Connect"
        >
          {expanded ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
        </button>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

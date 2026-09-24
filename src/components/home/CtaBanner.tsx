'use client';

import React, { useState } from 'react';
import ConsultationModal from '../common/ConsultationModal';
import { ArrowRight, Sparkles, Phone, Mail, ShieldCheck } from 'lucide-react';

export default function CtaBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Start Your Innovation Journey
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Build Production-Grade AI & Scalable Digital Products?
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
              Book a confidential 45-minute technical discovery session with our senior solutions architects. We will assess your architecture, benchmark your bottlenecks, and outline a concrete roadmap.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Schedule Technical Discovery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="tel:+18005122867"
                className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>+1 (800) 512-AVORA</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Strict Bilateral NDA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Zero Sales Fluff Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Architect-Led Discovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ConsultationModal from '../common/ConsultationModal';
import { ArrowRight, Sparkles, Phone, ShieldCheck } from 'lucide-react';

interface CTAData {
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

export default function CtaBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cta, setCta] = useState<CTAData>({
    id: 'global-banner',
    title: 'Ready to Build Production-Grade AI & Scalable Digital Products?',
    subtitle: 'Book a confidential 45-minute technical discovery session with our senior solutions architects. We will assess your architecture, benchmark your bottlenecks, and outline a concrete roadmap.',
    primaryButtonText: 'Schedule Technical Discovery',
    primaryButtonLink: '/contact',
    secondaryButtonText: '+1 (800) 512-AVORA',
    secondaryButtonLink: 'tel:+18005122867',
    badgeText: 'Start Your Innovation Journey',
    enabled: true,
  });

  useEffect(() => {
    async function loadCta() {
      try {
        const res = await fetch('/api/ctas');
        if (res.ok) {
          const list: CTAData[] = await res.json();
          const banner = list.find((c) => c.id === 'global-banner' && c.enabled !== false);
          if (banner) setCta(banner);
        }
      } catch {
        // Fallback to initial state
      }
    }
    loadCta();
  }, []);

  if (cta.enabled === false) return null;

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#090d16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            {cta.badgeText && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> {cta.badgeText}
              </div>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {cta.title}
            </h2>

            {cta.subtitle && (
              <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
                {cta.subtitle}
              </p>
            )}

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {cta.primaryButtonLink === '/contact' ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{cta.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href={cta.primaryButtonLink}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{cta.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {cta.secondaryButtonText && (
                cta.secondaryButtonLink?.startsWith('tel:') ? (
                  <a
                    href={cta.secondaryButtonLink}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{cta.secondaryButtonText}</span>
                  </a>
                ) : (
                  <Link
                    href={cta.secondaryButtonLink || '/cost-calculator'}
                    className="w-full sm:w-auto px-7 py-4 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>{cta.secondaryButtonText}</span>
                  </Link>
                )
              )}
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

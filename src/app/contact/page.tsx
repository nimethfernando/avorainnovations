'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { SERVICES_DATA } from '@/lib/content';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Loader2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'AI & Machine Learning',
    budget: '$50,000 - $100,000',
    timeline: '1-3 months',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setError('Unable to send inquiry. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    { city: 'Tbilisi, Georgia', role: 'Global HQ & AI Research Lab', address: '17 Ioane Shavteli St, Tbilisi, Georgia', phone: '+995 555433091' },
    { city: 'London, United Kingdom', role: 'European Delivery Center', address: '25 Bank Street, Canary Wharf, London E14 5JP', phone: '+44 20 7946 0912' },
    { city: 'Berlin, Germany', role: 'Industrial AI & IoT Hub', address: 'Potsdamer Platz 1, 10785 Berlin', phone: '+49 30 2000 8910' },
    { city: 'Singapore', role: 'APAC Operations & Cloud Hub', address: '1 Marina Boulevard, Singapore 018989', phone: '+65 6712 3400' },
  ];

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />

      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Direct Technical Consultation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Let’s Engineer Your Next Competitive Advantage
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Reach our senior architecture team. Every inquiry is reviewed directly by an enterprise solutions architect—not a junior salesperson.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-12">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-12 shadow-xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Technical Discovery Request Received!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. A senior solutions architect is reviewing your requirements and will reach out within 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Schedule a 45-Minute Discovery Session
              </h2>

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@enterprise.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Apex Global Corp"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Enterprise Digital Transformation">Enterprise Digital Transformation</option>
                    <option value="Legacy Modernization">Legacy Modernization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                    <option value="$250,000+">$250,000+ (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Deployment
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="Exploratory / Discovery">Exploratory / Discovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Context & Requirements *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current tech stack, key operational bottlenecks, desired timeline, or architectural objectives..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  🔒 Bilateral NDA signed upon request prior to discovery.
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <span>Submit Discovery Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Direct Contact & Global Offices */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Direct Technical Line
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href="tel:+995555433091" className="font-semibold text-slate-900 dark:text-white hover:text-blue-500">
                  +995 555433091
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:avorainnovations@gmail.com" className="font-semibold text-slate-900 dark:text-white hover:text-blue-500">
                  avorainnovations@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-slate-500">
                  Guaranteed Discovery Response: &lt; 4 Hours
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
              Global Engineering Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {offices.map((off) => (
                <div
                  key={off.city}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {off.city}
                  </h4>
                  <div className="text-[11px] text-blue-500 font-medium">{off.role}</div>
                  <p className="text-[11px] text-slate-500">{off.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

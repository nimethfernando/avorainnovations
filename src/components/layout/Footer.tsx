'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { SERVICES_DATA, INDUSTRIES_DATA } from '@/lib/content';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa6';

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [services, setServices] = useState<any[]>(SERVICES_DATA);
  const [industries, setIndustries] = useState<any[]>(INDUSTRIES_DATA);

  React.useEffect(() => {
    async function loadFooterData() {
      try {
        const [srvRes, indRes] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/industries'),
        ]);
        if (srvRes.ok) {
          const s = await srvRes.json();
          if (Array.isArray(s) && s.length > 0) setServices(s);
        }
        if (indRes.ok) {
          const i = await indRes.json();
          if (Array.isArray(i) && i.length > 0) setIndustries(i);
        }
      } catch {
        // Fallback
      }
    }
    loadFooterData();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setSubscribed(true);
      setEmail('');
    } catch {
      setError('Could not subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Executive Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Executive Engineering Briefing
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.common.newsletterTitle}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                {t.common.newsletterDesc}
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Welcome aboard! You have been enrolled in the Avora Engineering Briefing.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your corporate email..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg flex items-center gap-1.5 flex-shrink-0 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{t.common.subscribe}</span>}
                    </button>
                  </div>
                  {error && <p className="text-xs text-rose-400 pl-1">{error}</p>}
                  <p className="text-[11px] text-slate-500">
                    No marketing spam. Unsubscribe at any time with one click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Global Multi-Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 border-b border-slate-900 text-sm">
          {/* Col 1: Brand & Contact Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group mb-1">
              <img
                src="/logo-horizontal-dark.png"
                alt="AVORA Innovations"
                className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              AVORA Innovations is an elite global digital engineering and artificial intelligence studio. We architect and deploy high-performance software, deep neural networks, and cloud infrastructures for enterprise leaders.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>100 Innovation Way, Suite 400, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+18005122867" className="hover:text-white transition-colors">
                  +1 (800) 512-AVORA (Toll-Free Global)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@avorainnovations.com" className="hover:text-white transition-colors">
                  contact@avorainnovations.com
                </a>
              </div>
            </div>

            {/* Compliance badges */}
            <div className="pt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> ISO 27001 Certified
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> SOC2 Type II
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> HIPAA Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 7).map((s: any) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                  View All Services <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-xs">
              {industries.slice(0, 7).map((i: any) => (
                <li key={i.id}>
                  <Link href={`/industries/${i.slug}`} className="hover:text-white transition-colors">
                    {i.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/industries" className="text-purple-400 hover:underline inline-flex items-center gap-1">
                  View All Industries <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Solutions & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Avora
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies & Results
                </Link>
              </li>
              <li>
                <Link href="/technologies" className="hover:text-white transition-colors">
                  Technology Stack
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  Targeted Solutions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Insights Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Admin CMS Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Locations Bar */}
        <div className="py-8 border-b border-slate-900 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
          <div>
            <h6 className="font-semibold text-slate-300">San Francisco, USA</h6>
            <p className="text-slate-500 text-[11px]">HQ & AI Lab</p>
          </div>
          <div>
            <h6 className="font-semibold text-slate-300">London, UK</h6>
            <p className="text-slate-500 text-[11px]">European Operations</p>
          </div>
          <div>
            <h6 className="font-semibold text-slate-300">Berlin, Germany</h6>
            <p className="text-slate-500 text-[11px]">Industrial AI Center</p>
          </div>
          <div>
            <h6 className="font-semibold text-slate-300">Singapore</h6>
            <p className="text-slate-500 text-[11px]">APAC Engineering Hub</p>
          </div>
          <div>
            <h6 className="font-semibold text-slate-300">Dubai, UAE</h6>
            <p className="text-slate-500 text-[11px]">Middle East Delivery</p>
          </div>
        </div>

        {/* Bottom Copyright & Social Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} AVORA Innovations Inc. {t.common.allRightsReserved} Built with Next.js 16, React 19, MariaDB & TypeScript.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X Twitter"
              className="hover:text-white transition-colors"
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-white transition-colors"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-white transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

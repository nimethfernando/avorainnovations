'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Smartphone,
  Globe,
  Brain,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Loader2,
  DollarSign,
  Clock,
  Layers,
} from 'lucide-react';
import { CostCalculatorConfig, DEFAULT_COST_CONFIG } from '@/lib/calculator-types';

const ICON_MAP: Record<string, any> = {
  Brain,
  Globe,
  Smartphone,
  Cloud,
  Layers,
  Sparkles,
  Calculator,
};

export default function ProjectCostEstimator() {
  const [config, setConfig] = useState<CostCalculatorConfig>(DEFAULT_COST_CONFIG);
  const [platform, setPlatform] = useState<string>('ai');
  const [scale, setScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [features, setFeatures] = useState<string[]>([
    'Custom Neural Inference',
    'Enterprise Authentication & RBAC',
  ]);
  const [timeline, setTimeline] = useState('1-3 months');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/cost-calculator');
        if (res.ok) {
          const data = await res.json();
          if (data && data.platforms && data.scaleMultipliers && data.features) {
            setConfig(data);
          }
        }
      } catch (err) {
        console.warn('Could not fetch dynamic pricing, using defaults:', err);
      }
    }
    fetchPricing();
  }, []);

  const platforms = config.platforms;
  const scaleMultipliers = config.scaleMultipliers;
  const featureList = config.features.filter((f) => f.enabled !== false);
  const currency = config.currency || '$';

  const toggleFeature = (feat: string) => {
    if (features.includes(feat)) {
      setFeatures(features.filter((f) => f !== feat));
    } else {
      setFeatures([...features, feat]);
    }
  };

  // Calculate dynamic price estimate
  const currentPlatform = platforms.find((p) => p.id === platform) || platforms[0];
  const scaleObj = scaleMultipliers[scale] || scaleMultipliers.growth;
  const featureSum = features.reduce((acc, fName) => {
    const f = featureList.find((item) => item.label === fName);
    return acc + (f ? f.cost : 0);
  }, 0);
  const totalBase = (currentPlatform.base + featureSum) * scaleObj.mult;
  const lowMultiplier = config.lowMultiplier ?? 0.9;
  const highMultiplier = config.highMultiplier ?? 1.2;
  const lowRange = Math.round((totalBase * lowMultiplier) / 1000) * 1000;
  const highRange = Math.round((totalBase * highMultiplier) / 1000) * 1000;

  const handleSubmitEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          service: currentPlatform.label,
          budget: `${currency}${lowRange.toLocaleString()} - ${currency}${highRange.toLocaleString()}`,
          timeline,
          message: `[Interactive Cost Estimator Result]\nPlatform: ${currentPlatform.label}\nScale: ${scaleObj.label}\nSelected Features: ${features.join(', ')}\nEstimated Budget: ${currency}${lowRange.toLocaleString()} - ${currency}${highRange.toLocaleString()}`,
        }),
      });
      setSubmitted(true);
    } catch {
      alert('Error submitting estimate.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-12 shadow-2xl space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Interactive Project Cost & Timeline Estimator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Configure your technical specifications to calculate architectural scope and budget estimates in real-time.
          </p>
        </div>
      </div>

      {/* Step 1: Select Platform */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 1: Primary Technology Platform
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platforms.map((p) => {
            const Icon = (p.icon && ICON_MAP[p.icon]) || Globe;
            const isSelected = platform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    From {currency}{p.base.toLocaleString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Project Scale */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 2: Operational Scale & Deployment Tier
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(scaleMultipliers) as (keyof typeof scaleMultipliers)[]).map((key) => {
            const item = scaleMultipliers[key];
            if (!item) return null;
            const isSelected = scale === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setScale(key)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 shadow-md'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Feature Architecture */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Step 3: Core Architectural Capabilities & Features
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {featureList.map((f) => {
            const isChecked = features.includes(f.label);
            return (
              <button
                key={f.id || f.label}
                type="button"
                onClick={() => toggleFeature(f.label)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                  isChecked
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{f.label}</span>
                {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Calculation Output Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border border-blue-500/20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
            Estimated Engineering Scope
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">
            {currency}{lowRange.toLocaleString()} – {currency}{highRange.toLocaleString()}
          </div>
          <p className="text-xs text-slate-300">
            Estimated Delivery Timeline: <strong>{timeline}</strong> • Includes full IP ownership, automated testing, and CI/CD pipelines.
          </p>
        </div>

        <div className="lg:col-span-5">
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center space-y-1">
              <div className="font-bold">✓ Scope Breakdown Sent!</div>
              <p>Our solutions architect will email you a formal line-item breakdown.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitEstimate} className="space-y-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={contactData.name}
                onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Corporate Email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs whitespace-nowrap shadow-md flex items-center gap-1 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Lock Estimate</span>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

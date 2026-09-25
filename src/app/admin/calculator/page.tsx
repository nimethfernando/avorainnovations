'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  Calculator,
  Save,
  CheckCircle,
  Loader2,
  DollarSign,
  Plus,
  Trash2,
  Sliders,
  Layers,
  Sparkles,
  Eye,
} from 'lucide-react';
import { CostCalculatorConfig, DEFAULT_COST_CONFIG } from '@/lib/calculator-types';

export default function AdminCalculatorPage() {
  const [config, setConfig] = useState<CostCalculatorConfig>(DEFAULT_COST_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // New feature input state
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureCost, setNewFeatureCost] = useState('');

  // Simulator state
  const [simPlatform, setSimPlatform] = useState('ai');
  const [simScale, setSimScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [simFeatures, setSimFeatures] = useState<string[]>(['Custom Neural Inference']);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/cost-calculator');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (e) {
        console.error('Failed to load calculator configuration:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/cost-calculator', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error('Failed to save');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert('Error updating calculator pricing.');
    } finally {
      setSaving(false);
    }
  };

  const handlePlatformBaseChange = (id: string, base: number) => {
    setConfig((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => (p.id === id ? { ...p, base } : p)),
    }));
  };

  const handleScaleMultiplierChange = (
    key: 'mvp' | 'growth' | 'enterprise',
    mult: number
  ) => {
    setConfig((prev) => ({
      ...prev,
      scaleMultipliers: {
        ...prev.scaleMultipliers,
        [key]: {
          ...prev.scaleMultipliers[key],
          mult,
        },
      },
    }));
  };

  const handleFeatureCostChange = (id: string, cost: number) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.map((f) => (f.id === id ? { ...f, cost } : f)),
    }));
  };

  const handleFeatureToggle = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.map((f) =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      ),
    }));
  };

  const handleDeleteFeature = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f.id !== id),
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureName.trim() || !newFeatureCost.trim()) return;
    const costNum = parseInt(newFeatureCost.replace(/[^0-9]/g, ''), 10) || 5000;
    const newFeat = {
      id: 'feat-' + Date.now(),
      label: newFeatureName.trim(),
      cost: costNum,
      enabled: true,
    };
    setConfig((prev) => ({
      ...prev,
      features: [...prev.features, newFeat],
    }));
    setNewFeatureName('');
    setNewFeatureCost('');
  };

  // Simulator calculation
  const curPlatform =
    config.platforms.find((p) => p.id === simPlatform) || config.platforms[0];
  const curScale =
    config.scaleMultipliers[simScale] || config.scaleMultipliers.growth;
  const featSum = simFeatures.reduce((acc, fName) => {
    const f = config.features.find((item) => item.label === fName);
    return acc + (f ? f.cost : 0);
  }, 0);
  const totalBase = (curPlatform.base + featSum) * curScale.mult;
  const simLow = Math.round((totalBase * (config.lowMultiplier || 0.9)) / 1000) * 1000;
  const simHigh = Math.round((totalBase * (config.highMultiplier || 1.2)) / 1000) * 1000;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Cost Calculator & Scope Pricing Manager" />

      <div className="p-8 max-w-5xl space-y-8">
        {/* Top Title & Save Button Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-500" />
              Live Pricing & Multiplier Controls
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Changes saved here instantly update the public interactive cost calculator at <code className="text-blue-500">/cost-calculator</code>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Pricing Changes</span>
          </button>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">
              Cost calculator pricing updated and deployed live across the site!
            </span>
          </div>
        )}

        {/* 1. Global Currency & Variance Margins */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-500 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <DollarSign className="w-4 h-4" /> Global Currency & Spread Margins
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                value={config.currency || '$'}
                onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400">e.g. $, €, £, AED</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Low-Range Multiplier (Def: 0.9 = -10%)
              </label>
              <input
                type="number"
                step="0.05"
                value={config.lowMultiplier}
                onChange={(e) =>
                  setConfig({ ...config, lowMultiplier: parseFloat(e.target.value) || 0.9 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400">Calculates minimum baseline price</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                High-Range Multiplier (Def: 1.2 = +20%)
              </label>
              <input
                type="number"
                step="0.05"
                value={config.highMultiplier}
                onChange={(e) =>
                  setConfig({ ...config, highMultiplier: parseFloat(e.target.value) || 1.2 })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
              />
              <span className="text-[10px] text-slate-400">Calculates maximum upper bound price</span>
            </div>
          </div>
        </div>

        {/* 2. Platform Base Costs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-500 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Layers className="w-4 h-4" /> Primary Technology Platforms (Base Cost)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            The starting baseline cost before architectural features and scale multipliers are applied.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.platforms.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {p.label}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{p.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{config.currency}</span>
                  <input
                    type="number"
                    step="1000"
                    value={p.base}
                    onChange={(e) =>
                      handlePlatformBaseChange(p.id, parseInt(e.target.value, 10) || 0)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Scale Tier Multipliers */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Sliders className="w-4 h-4" /> Operational Scale & Deployment Tier Multipliers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A multiplier applied across the sum of the platform base and selected architectural features.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(
              ['mvp', 'growth', 'enterprise'] as (keyof typeof config.scaleMultipliers)[]
            ).map((key) => {
              const item = config.scaleMultipliers[key];
              return (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">Multiplier:</span>
                    <input
                      type="number"
                      step="0.1"
                      value={item.mult}
                      onChange={(e) =>
                        handleScaleMultiplierChange(key, parseFloat(e.target.value) || 1.0)
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold text-emerald-600 dark:text-emerald-400"
                    />
                    <span className="text-xs text-slate-400">x</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Architectural Features & Line Items */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Architectural Features & Line-Item Add-ons
            </h3>
            <span className="text-[11px] text-slate-400">{config.features.length} Features Active</span>
          </div>

          <div className="space-y-2.5">
            {config.features.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={f.enabled !== false}
                    onChange={() => handleFeatureToggle(f.id)}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                    title="Toggle feature visibility"
                  />
                  <span
                    className={`text-xs font-semibold ${
                      f.enabled === false ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs font-bold text-slate-400">{config.currency}</span>
                  <input
                    type="number"
                    step="500"
                    value={f.cost}
                    onChange={(e) =>
                      handleFeatureCostChange(f.id, parseInt(e.target.value, 10) || 0)
                    }
                    className="w-28 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold text-amber-600 dark:text-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(f.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete feature"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Feature Row */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="New Feature Name (e.g. Fine-Tuned LLaMA Deployment)"
              value={newFeatureName}
              onChange={(e) => setNewFeatureName(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
            />
            <input
              type="number"
              placeholder="Cost (e.g. 7500)"
              value={newFeatureCost}
              onChange={(e) => setNewFeatureCost(e.target.value)}
              className="w-36 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>
        </div>

        {/* 5. Live Simulator & Test Calculation */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-indigo-950/40 border border-blue-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Eye className="w-4 h-4" /> Live Calculation Test Simulator
            </h3>
            <span className="text-[10px] text-slate-400">Verifies formula output in real-time</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Simulate Platform</label>
              <select
                value={simPlatform}
                onChange={(e) => setSimPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
              >
                {config.platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} ({config.currency}
                    {p.base.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Simulate Scale</label>
              <select
                value={simScale}
                onChange={(e) => setSimScale(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
              >
                <option value="mvp">MVP (x{config.scaleMultipliers.mvp.mult})</option>
                <option value="growth">Growth (x{config.scaleMultipliers.growth.mult})</option>
                <option value="enterprise">
                  Enterprise (x{config.scaleMultipliers.enterprise.mult})
                </option>
              </select>
            </div>
            <div className="sm:col-span-1 p-3 rounded-xl bg-slate-900/90 border border-blue-500/30 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Simulated Scope</span>
              <div className="text-lg font-black text-white">
                {config.currency}
                {simLow.toLocaleString()} – {config.currency}
                {simHigh.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Pricing Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

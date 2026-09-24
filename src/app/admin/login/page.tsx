'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('admin@avorainnovations.com');
  const [password, setPassword] = useState('AvoraAdmin2026!Secure');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-2xl space-y-6 backdrop-blur-xl">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 mx-auto shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
              A
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            AVORA Executive Portal
          </h1>
          <p className="text-xs text-slate-400">
            Sign in to manage dynamic pages, lead pipeline, and CMS content.
          </p>
        </div>

        {/* Demo credentials helper pill */}
        <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Initial Admin Credentials Preloaded:
          </div>
          <div>Email: <span className="font-mono text-white">admin@avorainnovations.com</span></div>
          <div>Password: <span className="font-mono text-white">AvoraAdmin2026!Secure</span></div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
              </>
            ) : (
              <>
                <span>Sign In to Executive Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500 pt-2">
          Protected by Stateless JWT • PBKDF2 Cryptographic Salting • HttpOnly Security
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-xs">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}

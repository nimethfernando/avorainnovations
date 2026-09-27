'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, ArrowRight, Loader2, CheckCircle2, ShieldAlert, KeyRound, RefreshCw } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Step 1: 'email' -> Step 2: 'otp' -> Step 3: 'success'
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');

  const [email, setEmail] = useState('avorainnovations@gmail.com');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Request 6-digit OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP verification code.');

      setInfoMessage(`A 6-digit OTP verification code was sent to ${email}. Valid for 15 minutes.`);
      if (data.otp) {
        // Pre-fill or provide hint for local testing
        console.log('[DEBUG] OTP Generated:', data.otp);
      }
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setResending(true);
    setError('');

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend code.');

      setInfoMessage(`A new 6-digit OTP code has been dispatched to ${email}.`);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  // Verify OTP and Save New Password
  const handleVerifyOtpAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanOtp = otp.trim().replace(/\s+/g, '');
    if (!cleanOtp || cleanOtp.length !== 6) {
      setError('Please enter the 6-digit OTP verification code.');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: cleanOtp,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed.');

      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Error verifying OTP and updating password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 sm:p-10 shadow-2xl space-y-6 backdrop-blur-xl">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dark.png"
              alt="AVORA Innovations"
              className="h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            {step === 'otp' ? 'Enter Security OTP' : step === 'success' ? 'Password Reset Complete' : 'Reset Master Password'}
          </h1>
          <p className="text-xs text-slate-400">
            {step === 'otp'
              ? 'Enter the 6-digit verification code sent to your email along with your new password.'
              : step === 'success'
              ? 'Your master administrator password has been updated and salted with PBKDF2.'
              : 'Enter your administrator email to receive a 6-digit OTP verification code.'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Enter Email to Send OTP */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="avorainnovations@gmail.com"
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching OTP Code...</span>
                </>
              ) : (
                <>
                  <span>Send 6-Digit OTP Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                href="/admin/login"
                className="text-xs font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}

        {/* STEP 2: Enter OTP & New Password */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
            {infoMessage && (
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
                <span>{infoMessage}</span>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="text-blue-400 underline font-semibold hover:text-blue-300 ml-2"
                >
                  Edit
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                6-Digit OTP Verification Code *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 834921"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base tracking-[6px] font-mono text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                New Master Password (Min 8 characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password to confirm"
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code &amp; Updating...</span>
                </>
              ) : (
                <>
                  <span>Verify OTP &amp; Reset Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-2 text-xs">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resending}
                className="text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                <span>{resending ? 'Resending Code...' : 'Resend OTP Code'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Use Different Email
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Success State */}
        {step === 'success' && (
          <div className="space-y-5 text-center">
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs space-y-2">
              <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
              <div className="font-bold text-base text-emerald-300">Password Changed Successfully!</div>
              <p className="text-slate-300 leading-relaxed">
                Your new master password is now active. You can immediately log in to the AVORA Executive Portal.
              </p>
            </div>

            <button
              onClick={() => router.push('/admin/login')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Portal Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
          AVORA Executive Security Layer • 6-Digit OTP Expires in 15 Minutes
        </div>
      </div>
    </div>
  );
}

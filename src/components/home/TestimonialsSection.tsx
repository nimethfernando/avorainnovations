'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS_DATA } from '@/lib/content';
import ConsultationModal from '../common/ConsultationModal';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  X,
  Play,
  Pause,
  Grid,
  Layers,
  ArrowRight,
  TrendingUp,
  Tag,
} from 'lucide-react';

interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  avatar?: string;
  project?: string;
  metric?: string;
  tags?: string[];
  fullReview?: string;
}

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export default function TestimonialsSection() {
  const [list, setList] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedReview, setSelectedReview] = useState<TestimonialItem | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch verified CMS testimonials with fallback
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setList(data);
          }
        }
      } catch {
        // Fallback to static list
      }
    }
    loadTestimonials();
  }, []);

  const total = list.length;

  const goToSlide = useCallback((newIndex: number) => {
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setProgress(0);
    setTimeout(() => setIsAnimating(false), 400);
  }, []);

  const prev = useCallback(() => {
    goToSlide((currentIndex - 1 + total) % total);
  }, [currentIndex, total, goToSlide]);

  const next = useCallback(() => {
    goToSlide((currentIndex + 1) % total);
  }, [currentIndex, total, goToSlide]);

  // Autoplay countdown timer
  useEffect(() => {
    if (isPaused || viewMode !== 'carousel' || total <= 1 || selectedReview !== null) {
      return;
    }

    const stepMs = 50;
    const progressIncrement = (stepMs / AUTOPLAY_INTERVAL) * 100;

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          next();
          return 0;
        }
        return prevProgress + progressIncrement;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPaused, viewMode, total, selectedReview, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedReview) {
        if (e.key === 'Escape') setSelectedReview(null);
        return;
      }
      if (viewMode === 'carousel') {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReview, viewMode, prev, next]);

  if (list.length === 0) return null;
  const current = list[currentIndex] || list[0];

  return (
    <section
      className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800/80 relative overflow-hidden"
      id="testimonials"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Client Endorsements &amp; Peer Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Trusted by Visionary Technology Leaders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Read how engineering leaders, CTOs, and digital executives partner with AVORA Innovations to build mission-critical AI platforms and scalable cloud systems.
            </p>
          </div>

          {/* Interactive Mode & Play Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            {/* View Mode Switcher */}
            <div className="p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700/60 flex items-center gap-1 text-xs font-semibold">
              <button
                onClick={() => setViewMode('carousel')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Carousel View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Spotlight</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Reviews ({total})</span>
              </button>
            </div>

            {/* Carousel Navigation Buttons (only in carousel view) */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
                  title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
                  aria-label={isPaused ? 'Play' : 'Pause'}
                >
                  {isPaused ? <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" /> : <Pause className="w-4 h-4" />}
                </button>
                <button
                  onClick={prev}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-sm cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* -------------------- VIEW 1: SPOTLIGHT CAROUSEL -------------------- */}
        {viewMode === 'carousel' && (
          <div
            className="space-y-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Featured Card */}
            <div
              className={`max-w-4xl mx-auto rounded-3xl border border-blue-500/20 dark:border-blue-500/30 bg-white dark:bg-slate-950/90 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
                isAnimating ? 'opacity-70 scale-[0.99]' : 'opacity-100 scale-100'
              }`}
            >
              {/* Top Animated Progress Bar */}
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Decorative Background Quote Icon */}
              <Quote className="w-28 h-28 text-blue-500/10 dark:text-blue-500/15 absolute -top-4 right-6 pointer-events-none" />

              <div className="p-8 sm:p-12 lg:p-14 space-y-7 relative z-10">
                {/* Meta Badges Row */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(current.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {(current.rating || 5).toFixed(1)} / 5.0
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Client</span>
                    </span>

                    {current.project && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <Tag className="w-3 h-3" />
                        <span>{current.project}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlight Quote */}
                <div className="space-y-4">
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-900 dark:text-slate-100 leading-snug tracking-tight italic">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>

                  {/* Impact Metric Highlight Pill */}
                  {current.metric && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 border border-blue-500/20 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Key Outcome: {current.metric}</span>
                    </div>
                  )}
                </div>

                {/* Author Block & Full Review Trigger */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {current.avatar ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-md relative flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={current.avatar}
                          alt={current.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md flex-shrink-0">
                        {current.author.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{current.author}</span>
                        <CheckCircle2 className="w-4 h-4 text-blue-500 inline-block" />
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {current.role}
                        {current.company ? <span className="font-semibold text-slate-800 dark:text-slate-200"> • {current.company}</span> : ''}
                      </p>
                    </div>
                  </div>

                  {/* Read Full Review Button */}
                  <button
                    onClick={() => setSelectedReview(current)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all cursor-pointer group"
                  >
                    <span>Read Full Review</span>
                    <Maximize2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation Selector */}
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
              {list.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => goToSlide(idx)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? 'border-blue-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-blue-500/20 scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.avatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {item.author.charAt(0)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                          {item.author}
                        </div>
                        <div className="text-[10px] truncate text-slate-500 dark:text-slate-400">
                          {item.company || item.role}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Indicator Dots & Counter */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <span className="text-xs font-mono text-slate-400">
                0{currentIndex + 1} / 0{total}
              </span>
              <div className="flex items-center gap-1.5">
                {list.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentIndex
                        ? 'w-8 bg-blue-600 dark:bg-blue-400'
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW 2: ALL REVIEWS GRID -------------------- */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {list.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Top: Rating + Verified Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {item.project && (
                    <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg inline-block">
                      {item.project}
                    </div>
                  )}

                  {/* Quote */}
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Metric */}
                  {item.metric && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{item.metric}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Author & CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.avatar ? (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {item.author.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.author}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {item.role}{item.company ? ` • ${item.company}` : ''}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedReview(item)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
                    title="Read full review"
                    aria-label={`Read full review from ${item.author}`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------- FULL REVIEW MODAL -------------------- */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedReview(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Author Profile Header */}
            <div className="flex items-center gap-4 pr-10">
              {selectedReview.avatar ? (
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-md flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedReview.avatar}
                    alt={selectedReview.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                  {selectedReview.author.substring(0, 2).toUpperCase()}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {selectedReview.author}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {selectedReview.role}
                  {selectedReview.company ? ` • ${selectedReview.company}` : ''}
                </p>
                <div className="flex items-center gap-1 text-amber-400 mt-1">
                  {[...Array(selectedReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-1.5">
                    {(selectedReview.rating || 5).toFixed(1)} / 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Project & Key Outcome Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              {selectedReview.project && (
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Engagement:</span> {selectedReview.project}
                </div>
              )}
              {selectedReview.metric && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Key Result: {selectedReview.metric}</span>
                </div>
              )}
            </div>

            {/* In-depth Review Body */}
            <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Executive Review Statement
              </div>
              <p className="italic font-medium text-slate-900 dark:text-slate-100 border-l-4 border-blue-500 pl-4 py-1">
                &ldquo;{selectedReview.quote}&rdquo;
              </p>
              {selectedReview.fullReview && selectedReview.fullReview !== selectedReview.quote && (
                <p className="text-slate-600 dark:text-slate-300">
                  {selectedReview.fullReview}
                </p>
              )}
            </div>

            {/* Technology Tags */}
            {selectedReview.tags && selectedReview.tags.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technologies Deployed
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedReview.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom CTAs */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                100% Client Code &amp; IP Ownership Guaranteed
              </div>
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setIsConsultationOpen(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discuss a Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Award, Sparkles, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { LeadershipMember } from '@/lib/content';

interface LeadershipSectionProps {
  initialData?: LeadershipMember[];
}

export default function LeadershipSection({ initialData = [] }: LeadershipSectionProps) {
  const [leaders, setLeaders] = useState<LeadershipMember[]>(initialData);

  useEffect(() => {
    async function fetchFreshLeadership() {
      try {
        const res = await fetch('/api/leadership');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setLeaders(data);
          }
        }
      } catch (err) {
        // Fallback to initialData on network or SSR glitch
      }
    }
    fetchFreshLeadership();
  }, []);

  if (!leaders || leaders.length === 0) return null;

  return (
    <section className="my-20" id="leadership">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> Leadership & Vision
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Executive & Strategic Leadership
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Guided by proven technology visionaries, enterprise architects, and artificial intelligence pioneers.
        </p>
      </div>

      {leaders.length === 1 ? (
        /* Executive Spotlight Showcase (Featured Single Leader) */
        <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 dark:bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Executive Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/4.8] sm:aspect-[4/4.6] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group bg-slate-100 dark:bg-slate-900">
                {leaders[0].image ? (
                  <Image
                    src={leaders[0].image}
                    alt={leaders[0].name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                    <Award className="w-16 h-16" />
                  </div>
                )}
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Experience Badge */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{leaders[0].experience || '18+ Years Experience'}</span>
                </div>

                {/* Direct LinkedIn Badge */}
                {leaders[0].linkedin && (
                  <a
                    href={leaders[0].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    aria-label={`${leaders[0].name} LinkedIn Profile`}
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Executive Bio & Leadership Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> Founder & Executive Leadership
                  </span>

                  {leaders[0].linkedin && (
                    <a
                      href={leaders[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                      <FaLinkedin className="w-4 h-4" />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  )}
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {leaders[0].name}
                </h3>
                <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                  {leaders[0].role}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {leaders[0].bio}
              </p>

              {/* Key Highlights Strip */}
              {leaders[0].highlights && leaders[0].highlights.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
                  {leaders[0].highlights.map((h, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                        {h.value}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {h.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Competencies & Strategic Domains */}
              {Array.isArray(leaders[0].expertise) && leaders[0].expertise.length > 0 && (
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Strategic Domains & Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {leaders[0].expertise.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Multi-Leader Responsive Grid (Extensible when more leaders are added) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id || leader.name}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/4.5] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                {leader.image ? (
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                    <Award className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{leader.experience || '10+ Years'}</span>
                </div>
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label={`${leader.name} LinkedIn Profile`}
                  >
                    <FaLinkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {leader.role}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                    {leader.bio}
                  </p>
                </div>

                {Array.isArray(leader.expertise) && leader.expertise.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-900">
                    <div className="flex flex-wrap gap-1.5">
                      {leader.expertise.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

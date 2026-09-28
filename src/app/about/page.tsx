import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import CtaBanner from '@/components/home/CtaBanner';
import {
  ShieldCheck,
  Zap,
  Target,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  Award,
  Globe2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';

export const metadata = constructMetadata({
  title: 'About AVORA Innovations | Enterprise AI & Software Engineering',
  description: 'Learn about AVORA Innovations: our engineering DNA, executive leadership, delivery methodology, and global footprint.',
  canonical: '/about',
});

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
  linkedin?: string;
  location?: string;
  expertise: string[];
  highlights?: { label: string; value: string }[];
}

// Extensible leadership roster. Add additional leaders to this array in the future.
const leadershipTeam: TeamMember[] = [
  {
    name: 'Amit Batra',
    role: 'Founder & Technology Innovation Leader',
    image: '/images/team/amit-batra.png',
    experience: '18+ Years Experience',
    location: 'Romania & Global',
    bio: 'Amit Batra brings 18 years of experience in technology, innovation and building technology-driven businesses. His expertise spans AI, blockchain, Web3 and digital infrastructure, with a strong focus on turning emerging technologies into practical, scalable and real-world solutions. At Avora Innovations, he brings strategic vision, product thinking and execution expertise to build future-ready technology products.',
    linkedin: 'https://www.linkedin.com/in/amit-batra-romania/',
    expertise: [
      'Artificial Intelligence & Deep Tech',
      'Blockchain & Web3 Architectures',
      'Digital Infrastructure & Cloud Systems',
      'Enterprise Scalability & Execution',
      'Strategic Product Thinking',
    ],
    highlights: [
      { label: 'Industry Track Record', value: '18+ Years' },
      { label: 'Core Expertise', value: 'AI & Web3' },
      { label: 'Strategic Focus', value: 'Global Scale' },
    ],
  },
];

export default function AboutPage() {

  const methodology = [
    {
      step: '01',
      title: 'Architectural Discovery & Feasibility',
      desc: 'We inspect existing codebases, profile bottlenecks, evaluate API latencies, and define mathematical success criteria before writing code.',
    },
    {
      step: '02',
      title: '4-Week Proof of Value Sprint',
      desc: 'We build an interactive working prototype running on production-grade infrastructure to de-risk key architectural assumptions.',
    },
    {
      step: '03',
      title: 'Iterative Agile Squad Execution',
      desc: 'Senior-only squads ship incremental production features bi-weekly with 100% automated test coverage and live staging environments.',
    },
    {
      step: '04',
      title: 'Compliance, Security & Performance Hardening',
      desc: 'Formal third-party penetration testing, automated security vulnerability scanning, and Core Web Vitals optimization guaranteeing sub-second LCP.',
    },
    {
      step: '05',
      title: 'Full IP Handover & Production Handshake',
      desc: 'Complete legal transfer of all source code, models, documentation, and automated CI/CD pipelines to your internal staff.',
    },
  ];

  return (
    <div className="py-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'About Us', url: '/about' }]} />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto my-12 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Company & Vision
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering the Future of Autonomous Enterprise Software
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          AVORA Innovations is an elite global engineering studio that builds mission-critical artificial intelligence, high-throughput web applications, and resilient cloud architectures.
        </p>
      </div>

      {/* Narrative Section */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 sm:p-14 my-16 space-y-6 shadow-xl">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-500">
          Our Heritage & Philosophy
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Why AVORA Was Built Differently
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            The software consulting industry has long been broken. Traditional consultancies win contracts using senior pitchmen, only to delegate implementation to inexperienced junior developers or third-party subcontractors. The resulting codebases are laden with technical debt, sluggish performance, and intellectual property ambiguities.
          </p>
          <p>
            At AVORA Innovations, we rejected this broken model. Every client engagement is staffed strictly with senior software architects and machine learning scientists who write production code daily. We treat our clients as partners: you retain 100% intellectual property ownership from day one, and every sprint is measured against verifiable business metrics.
          </p>
        </div>

      </div>

      {/* Delivery Methodology */}
      <section className="my-20" id="methodology">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Engineering Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Our 5-Phase Delivery Methodology
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A deterministic, milestone-driven framework that eliminates surprises and ensures flawless execution.
          </p>
        </div>

        <div className="space-y-4">
          {methodology.map((m) => (
            <div
              key={m.step}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-black text-blue-600 font-mono">
                {m.step}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
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

        {leadershipTeam.length === 1 ? (
          /* Executive Spotlight Showcase (Featured Leader) */
          <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Executive Portrait Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-[4/4.8] sm:aspect-[4/4.6] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={leadershipTeam[0].image}
                    alt={leadershipTeam[0].name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 420px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{leadershipTeam[0].experience}</span>
                  </div>

                  {/* Direct LinkedIn Badge */}
                  {leadershipTeam[0].linkedin && (
                    <a
                      href={leadershipTeam[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      aria-label={`${leadershipTeam[0].name} LinkedIn Profile`}
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

                    {leadershipTeam[0].linkedin && (
                      <a
                        href={leadershipTeam[0].linkedin}
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
                    {leadershipTeam[0].name}
                  </h3>
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {leadershipTeam[0].role}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {leadershipTeam[0].bio}
                </p>

                {/* Key Highlights Strip */}
                {leadershipTeam[0].highlights && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
                    {leadershipTeam[0].highlights.map((h, idx) => (
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
                <div className="space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Strategic Domains & Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {leadershipTeam[0].expertise.map((tag) => (
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
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Leader Responsive Grid (Extensible for when more leaders are added) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[4/4.5] w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{leader.experience}</span>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CtaBanner />
    </div>
  );
}

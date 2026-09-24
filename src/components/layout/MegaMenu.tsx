'use client';

import React from 'react';
import Link from 'next/link';
import {
  SERVICES_DATA,
  INDUSTRIES_DATA,
  TECH_CATEGORIES,
  CASE_STUDIES_DATA,
} from '@/lib/content';
import {
  ArrowRight,
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link as LinkIcon,
  Eye,
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Users,
  Compass,
} from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string | null;
  closeMenu: () => void;
  openConsultation: () => void;
}

const ICON_MAP: Record<string, any> = {
  Brain,
  Sparkles,
  Bot,
  Globe,
  Smartphone,
  Cloud,
  BarChart3,
  Cpu,
  Link: LinkIcon,
  Eye,
};

export default function MegaMenu({ activeMenu, closeMenu, openConsultation }: MegaMenuProps) {
  if (!activeMenu) return null;

  return (
    <div
      onMouseLeave={closeMenu}
      className="absolute top-full left-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 shadow-2xl transition-all duration-200 z-40 max-h-[80vh] overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* --- SERVICES MEGA MENU --- */}
        {activeMenu === 'services' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 grid grid-cols-2 gap-4">
              <div className="col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Core Engineering & AI Practices
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enterprise-grade capabilities engineered for scale, resilience, and security.
                  </p>
                </div>
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="text-xs font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1"
                >
                  View All Services <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {SERVICES_DATA.slice(0, 8).map((srv) => {
                const IconComponent = ICON_MAP[srv.iconName] || Brain;
                return (
                  <Link
                    key={srv.id}
                    href={`/services/${srv.slug}`}
                    onClick={closeMenu}
                    className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {srv.title}
                        </span>
                        {srv.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {srv.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {srv.shortDesc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Featured Box on Right */}
            <div className="col-span-4 rounded-2xl bg-gradient-to-br from-blue-900/40 via-indigo-950/40 to-slate-900 p-6 border border-blue-500/20 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> High-Demand Architecture
                </div>
                <h5 className="text-lg font-bold text-white mb-2">Autonomous Multi-Agent AI Systems</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Deploy deterministic AI agent workforces capable of coordinating multi-step customer operations, fraud inspection, and cloud infrastructure remediation.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sub-second tool execution</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Air-gapped enterprise privacy</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Human-in-the-loop approval gates</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  closeMenu();
                  openConsultation();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Discuss AI Strategy <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* --- INDUSTRIES MEGA MENU --- */}
        {activeMenu === 'industries' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-9 grid grid-cols-3 gap-4">
              <div className="col-span-3 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Vertical Industry Solutions
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Domain-tailored compliance, data pipelines, and workflow automation.
                  </p>
                </div>
                <Link
                  href="/industries"
                  onClick={closeMenu}
                  className="text-xs font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 inline-flex items-center gap-1"
                >
                  View All Industries <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {INDUSTRIES_DATA.map((ind) => (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  onClick={closeMenu}
                  className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {ind.title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {ind.subtitle}
                  </p>
                </Link>
              ))}
            </div>

            <div className="col-span-3 rounded-2xl bg-gradient-to-br from-purple-900/30 via-slate-900 to-slate-950 p-6 border border-purple-500/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Compliance & Security
                </span>
                <h5 className="text-base font-bold text-white mt-1 mb-2">Enterprise Grade Compliance</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  All solutions adhere to strict industry protocols including HIPAA, PCI-DSS Level 1, SOC2 Type II, and GDPR.
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Zero Data Leakage Guarantees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Immutable Audit Logging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>KMS Hardware-Backed Encryption</span>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                onClick={closeMenu}
                className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
              >
                Learn About Our Standards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* --- TECHNOLOGIES MEGA MENU --- */}
        {activeMenu === 'technologies' && (
          <div>
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Technology Stack & Frameworks
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Battle-tested, modern engineering stacks selected for extreme concurrency and low latency.
                </p>
              </div>
              <Link
                href="/technologies"
                onClick={closeMenu}
                className="text-xs font-semibold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 inline-flex items-center gap-1"
              >
                Explore Full Tech Matrix <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {TECH_CATEGORIES.slice(0, 4).map((cat) => (
                <div key={cat.slug} className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1.5">
                    {cat.category}
                  </h5>
                  <div className="space-y-2">
                    {cat.items.slice(0, 4).map((tech) => (
                      <Link
                        key={tech.name}
                        href="/technologies"
                        onClick={closeMenu}
                        className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-xs transition-colors"
                      >
                        <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          {tech.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {tech.badge}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SOLUTIONS MEGA MENU --- */}
        {activeMenu === 'solutions' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 grid grid-cols-2 gap-4">
              <div className="col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Targeted Business Solutions
                </h4>
              </div>

              {[
                { title: 'Enterprise Digital Transformation', desc: 'End-to-end modernization of core systems, automated workflows, and data silos.', link: '/solutions/digital-transformation' },
                { title: 'Custom AI Copilots & RAG', desc: 'Secure retrieval-augmented enterprise assistants grounded on internal documentation.', link: '/solutions/custom-ai-copilot' },
                { title: 'Legacy Monolith Modernization', desc: 'Incremental decoupling using the Strangler Fig pattern with zero downtime.', link: '/solutions/legacy-modernization' },
                { title: 'Cloud Native & DevOps Overhaul', desc: 'Kubernetes containerization, automated GitOps CI/CD, and cost optimization.', link: '/solutions/cloud-modernization' },
                { title: 'Rapid MVP & Innovation Sprints', desc: 'From architecture blueprint to production MVP in 30 days for new ventures.', link: '/solutions/rapid-mvp' },
                { title: 'Automated Lead & Sales Intelligence', desc: 'AI agents that enrich B2B pipeline data and trigger automated followups.', link: '/solutions/sales-intelligence' },
              ].map((sol) => (
                <Link
                  key={sol.title}
                  href={sol.link}
                  onClick={closeMenu}
                  className="group p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
                >
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {sol.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {sol.desc}
                  </p>
                </Link>
              ))}
            </div>

            <div className="col-span-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Delivery Speed
                </span>
                <h5 className="text-base font-bold text-white mt-1 mb-2">4-Week Proof of Value</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Validate complex technology decisions before major capital deployment with our structured 4-week architectural discovery and pilot proof-of-value.
                </p>
              </div>
              <button
                onClick={() => {
                  closeMenu();
                  openConsultation();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Request Pilot Scope <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* --- RESOURCES MEGA MENU --- */}
        {activeMenu === 'resources' && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 grid grid-cols-2 gap-4">
              <div className="col-span-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Insights & Engineering Thought Leadership
                </h4>
              </div>

              <Link
                href="/blog"
                onClick={closeMenu}
                className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-500">
                    Engineering Insights & Blog
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Deep dives on AI agent architectures, Next.js 16 performance, and database scaling.
                </p>
              </Link>

              <Link
                href="/case-studies"
                onClick={closeMenu}
                className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-500">
                    Enterprise Case Studies
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real client challenges, production architectures, and measured business ROI.
                </p>
              </Link>

              <Link
                href="/about#methodology"
                onClick={closeMenu}
                className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-500">
                    Delivery Methodology
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Our 5-phase agile framework for predictable, zero-surprise software delivery.
                </p>
              </Link>

              <Link
                href="/contact#faq"
                onClick={closeMenu}
                className="group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-purple-500">
                    Frequently Asked Questions
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clear answers on IP ownership, security audits, pricing, and sprint cadence.
                </p>
              </Link>
            </div>

            {/* Featured Case Study Preview */}
            <div className="col-span-5 rounded-2xl bg-slate-100 dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Featured Case Study
              </span>
              <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {CASE_STUDIES_DATA[0].title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                {CASE_STUDIES_DATA[0].subtitle}
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {CASE_STUDIES_DATA[0].results.slice(0, 2).map((res) => (
                  <div key={res.label} className="p-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-base font-extrabold text-blue-600 dark:text-blue-400">{res.metric}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{res.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href={`/case-studies/${CASE_STUDIES_DATA[0].slug}`}
                onClick={closeMenu}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 inline-flex items-center gap-1 hover:underline"
              >
                Read Full Case Study <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';
import ConsultationModal from '../common/ConsultationModal';
import SearchModal from '../common/SearchModal';
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Layers,
  Search,
} from 'lucide-react';

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle Cmd+K search shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click to close mega menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [navItems, setNavItems] = useState([
    { key: 'services', label: t.nav.services, hasMega: true, href: '/services' },
    { key: 'industries', label: t.nav.industries, hasMega: true, href: '/industries' },
    { key: 'technologies', label: t.nav.technologies, hasMega: true, href: '/technologies' },
    { key: 'solutions', label: t.nav.solutions, hasMega: true, href: '/solutions' },
    { key: 'resources', label: t.nav.resources, hasMega: true, href: '/case-studies' },
    { key: 'about', label: t.nav.about, hasMega: false, href: '/about' },
    { key: 'contact', label: t.nav.contact, hasMega: false, href: '/contact' },
  ]);

  useEffect(() => {
    async function fetchNav() {
      try {
        const res = await fetch('/api/navigation');
        if (res.ok) {
          const cmsNav = await res.json();
          if (Array.isArray(cmsNav) && cmsNav.length > 0) {
            setNavItems(
              cmsNav
                .filter((item: any) => item.enabled !== false)
                .map((item: any) => ({
                  key: item.id?.replace(/^nav-/, '') || item.href.replace(/^\//, ''),
                  label: item.label,
                  hasMega: item.type === 'mega',
                  href: item.href,
                }))
            );
          }
        }
      } catch {
        // Fallback to defaults
      }
    }
    fetchNav();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80'
            : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200/40 dark:border-slate-800/40'
        }`}
      >
        {/* Top Announcement / Quick Contact Bar */}
        <div className="hidden lg:block bg-slate-950 text-slate-300 text-[11px] py-1.5 px-6 border-b border-slate-800/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-blue-400 font-medium">
                <Sparkles className="w-3 h-3" /> ISO 27001 & SOC2 Type II Certified Global Delivery
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Primary Reference Standard: Enterprise-Grade Architecture</span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="mailto:contact@avorainnovations.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3 text-blue-400" /> contact@avorainnovations.com
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="tel:+18005122867"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-blue-400" /> +1 (800) 512-AVORA
              </a>
              <span className="text-slate-700">|</span>
              <Link href="/admin" className="text-slate-400 hover:text-blue-400 transition-colors">
                CMS Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center group py-1">
                {/* Light Mode Logo */}
                <img
                  src="/logo-horizontal.png"
                  alt="AVORA Innovations"
                  className="h-10 sm:h-11 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
                />
                {/* Dark Mode Logo */}
                <img
                  src="/logo-horizontal-dark.png"
                  alt="AVORA Innovations"
                  className="h-10 sm:h-11 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
                />
              </Link>

              {/* Signature "EXPLORE AI AGENT LAB" Glowing Capsule (Konstant's "STEP INTO AI" equivalent) */}
              <Link
                href="/cost-calculator"
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide relative overflow-hidden group shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all border border-purple-500/30 bg-gradient-to-r from-blue-950/60 via-purple-950/60 to-indigo-950/60 text-white backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse relative z-10" />
                <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent font-extrabold text-[11px]">
                  EXPLORE AI AGENT LAB
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.key} className="relative">
                  {item.hasMega ? (
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.key ? null : item.key)}
                      onMouseEnter={() => setActiveMenu(item.key)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors ${
                        activeMenu === item.key
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-900'
                          : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeMenu === item.key ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onMouseEnter={() => setActiveMenu(null)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions: Search, Theme Toggle, Language Switcher, Consultation CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden xl:inline">Search...</span>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  ⌘K
                </kbd>
              </button>

              <ThemeToggle />
              <LanguageSwitcher />

              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-1.5 group"
              >
                <span>{t.nav.getConsultation}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                aria-label="Toggle Mobile Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <MegaMenu
          activeMenu={activeMenu}
          closeMenu={() => setActiveMenu(null)}
          openConsultation={() => setModalOpen(true)}
        />

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-6 max-h-[85vh] overflow-y-auto space-y-4 animate-in slide-in-from-top-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase text-slate-400">Navigation</span>
              <LanguageSwitcher />
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.key} className="py-1">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-900"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <span>{t.nav.getConsultation}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex justify-between text-xs text-slate-500 pt-2">
                <a href="tel:+18005122867" className="hover:text-blue-500">+1 (800) 512-AVORA</a>
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="hover:text-blue-500">
                  Admin CMS
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Consultation Modal Dialog */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Global Instant Search Modal (Cmd+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}

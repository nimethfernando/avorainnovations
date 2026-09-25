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
                .map((item: any) => {
                  const cleanKey = item.id?.replace(/^nav-/, '') || item.href.replace(/^\//, '');
                  const isMega =
                    item.type === 'mega' ||
                    ['services', 'industries', 'technologies', 'solutions', 'resources'].includes(cleanKey);
                  return {
                    key: cleanKey,
                    label: item.label,
                    hasMega: isMega,
                    href: item.href,
                  };
                })
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
                <Sparkles className="w-3 h-3" /> Enterprise AI & Digital Product Engineering Studio
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Enterprise AI • Cloud Platforms • Digital Products</span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="mailto:avorainnovations@gmail.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors notranslate"
              >
                <Mail className="w-3 h-3 text-blue-400" /> avorainnovations@gmail.com
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="tel:+995555433091"
                className="flex items-center gap-1.5 hover:text-white transition-colors notranslate"
              >
                <Phone className="w-3 h-3 text-blue-400" /> +995 555433091
              </a>
              <span className="text-slate-700">|</span>
              <Link href="/admin" className="text-slate-400 hover:text-blue-400 transition-colors">
                CMS Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 xl:gap-8">
            {/* Brand Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center group py-1 notranslate">
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

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
              {navItems.map((item) => (
                <div key={item.key} className="relative">
                  {item.hasMega ? (
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.key ? null : item.key)}
                      onMouseEnter={() => setActiveMenu(item.key)}
                      className={`px-3 py-2 rounded-xl text-[13.5px] font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                        activeMenu === item.key
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-900 shadow-xs'
                          : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <span>{item.label}</span>
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
                      className="px-3 py-2 rounded-xl text-[13.5px] font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-900/60 transition-all whitespace-nowrap block"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions: Search, Theme Toggle, Language Switcher, Consultation CTA */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 flex-shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-white bg-slate-50 dark:bg-slate-900/70 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-center"
                title="Search (⌘K)"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <ThemeToggle />
              <LanguageSwitcher />

              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-1.5 whitespace-nowrap group flex-shrink-0"
              >
                <span>{t.nav.getConsultation}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <LanguageSwitcher />
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
                <a href="tel:+995555433091" className="hover:text-blue-500">+995 555433091</a>
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

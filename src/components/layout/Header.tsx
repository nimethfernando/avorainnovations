'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/context/I18nContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';
import ConsultationModal from '../common/ConsultationModal';
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
} from 'lucide-react';

export default function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [pathname]);

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

  const navItems = [
    { key: 'services', label: t.nav.services, hasMega: true, href: '/services' },
    { key: 'industries', label: t.nav.industries, hasMega: true, href: '/industries' },
    { key: 'technologies', label: t.nav.technologies, hasMega: true, href: '/technologies' },
    { key: 'solutions', label: t.nav.solutions, hasMega: true, href: '/solutions' },
    { key: 'resources', label: t.nav.resources, hasMega: true, href: '/case-studies' },
    { key: 'about', label: t.nav.about, hasMega: false, href: '/about' },
    { key: 'contact', label: t.nav.contact, hasMega: false, href: '/contact' },
  ];

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
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    A
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                    AVORA
                  </span>
                  <span className="font-medium text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    INNOVATIONS
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                  Enterprise AI & Engineering
                </span>
              </div>
            </Link>

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

            {/* Actions: Theme Toggle, Language Switcher, Consultation CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-1.5"
              >
                <span>{t.nav.getConsultation}</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
    </>
  );
}

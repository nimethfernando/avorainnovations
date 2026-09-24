'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Inbox,
  Sliders,
  User,
  LogOut,
  ExternalLink,
  Cpu,
  Building,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const nav = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Visual Page Builder', href: '/admin/pages/builder', icon: Layers },
    { label: 'All Pages', href: '/admin/pages', icon: Layers },
    { label: 'Services CMS', href: '/admin/services', icon: Cpu },
    { label: 'Industries CMS', href: '/admin/industries', icon: Building },
    { label: 'Case Studies CMS', href: '/admin/case-studies', icon: CheckCircle },
    { label: 'Blog Manager', href: '/admin/blogs', icon: FileText },
    { label: 'Site FAQs', href: '/admin/faqs', icon: HelpCircle },
    { label: 'Leads & Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'Global Branding', href: '/admin/settings', icon: Sliders },
    { label: 'Admin Profile', href: '/admin/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <img src="/icon.png" alt="Avora Logo" className="w-8 h-8 object-contain" />
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight">AVORA CMS</div>
              <div className="text-[10px] text-blue-400 font-medium">Enterprise Suite</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>View Public Website</span>
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

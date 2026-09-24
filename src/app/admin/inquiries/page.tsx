'use client';

import React, { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Inbox, Mail, Phone, Building, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) setInquiries(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      loadInquiries();
    } catch {
      alert('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      loadInquiries();
    } catch {
      alert('Failed to delete');
    }
  };

  const filtered = inquiries.filter((inq) => {
    if (filter === 'all') return true;
    return inq.status === filter;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Client Leads & Consultation Pipeline" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Inbound Lead Pipeline</h2>
            <p className="text-xs text-slate-500">
              Review and manage technical consultation bookings and enterprise requests.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {['all', 'new', 'contacting', 'qualified', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === st
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading leads...</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No inquiries found under status &ldquo;{filter}&rdquo;.
            </div>
          ) : (
            filtered.map((inq) => (
              <div
                key={inq.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      {inq.name}
                    </span>
                    {inq.company && (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-semibold">
                        {inq.company}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {formatDate(inq.createdAt)}
                    </span>
                    <select
                      value={inq.status}
                      onChange={(e) => updateStatus(inq.id, e.target.value)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 uppercase"
                    >
                      <option value="new">New</option>
                      <option value="contacting">Contacting</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={() => deleteInquiry(inq.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-rose-400 hover:text-rose-500"
                      title="Delete Lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Email</span>
                    <a href={`mailto:${inq.email}`} className="text-blue-500 hover:underline font-medium">
                      {inq.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Phone</span>
                    <span className="text-slate-700 dark:text-slate-300">{inq.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Service Interest</span>
                    <span className="font-semibold text-purple-500">{inq.service || 'General'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Budget & Timeline</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {inq.budget || 'N/A'} • {inq.timeline || 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Project Scope / Requirements</span>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {inq.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

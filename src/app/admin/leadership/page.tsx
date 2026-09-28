'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import Image from 'next/image';
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Loader2,
  Award,
  Upload,
  ExternalLink,
  Sparkles,
  User,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpDown,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';

interface LeadershipMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  bio: string;
  linkedin?: string;
  expertise: string[];
  highlights?: { label: string; value: string }[];
  order?: number;
  isActive?: boolean;
}

export default function AdminLeadershipPage() {
  const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<LeadershipMember | null>(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/leadership');
      if (res.ok) {
        const data = await res.json();
        setLeaders(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load leadership data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    const nextOrder = leaders.length > 0 ? Math.max(...leaders.map((l) => l.order || 0)) + 1 : 1;
    setEditingItem({
      name: '',
      role: '',
      image: '/images/team/amit-batra.png',
      experience: '10+ Years Experience',
      bio: '',
      linkedin: '',
      expertise: ['Artificial Intelligence', 'Digital Infrastructure', 'Enterprise Architecture'],
      order: nextOrder,
      isActive: true,
    });
    setExpertiseInput('Artificial Intelligence, Digital Infrastructure, Enterprise Architecture');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: LeadershipMember) => {
    setEditingItem({ ...item });
    setExpertiseInput(Array.isArray(item.expertise) ? item.expertise.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm('Are you sure you want to remove this leader from the leadership roster?')) return;

    try {
      const res = await fetch(`/api/admin/leadership?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      loadData();
    } catch {
      alert('Failed to delete leader.');
    }
  };

  const processImageFile = async (file: File) => {
    if (!editingItem) return;

    // 1. Instant local preview directly from the user's device
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setEditingItem((prev) => (prev ? { ...prev, image: event.target!.result as string } : null));
      }
    };
    reader.readAsDataURL(file);

    // 2. Upload file to server media library
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'Leadership');

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setEditingItem((prev) => (prev ? { ...prev, image: data.url } : null));
        }
      }
    } catch (err) {
      console.error('Upload to server failed, retained device preview:', err);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name?.trim() || !editingItem?.role?.trim()) {
      alert('Leader name and role/title are required.');
      return;
    }

    setSaving(true);
    try {
      const expertiseArray = expertiseInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...editingItem,
        expertise: expertiseArray,
      };

      const res = await fetch('/api/admin/leadership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save failed');

      setIsModalOpen(false);
      setEditingItem(null);
      loadData();
    } catch {
      alert('Error saving leadership member.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader title="Executive Leadership & Team CMS" />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> About Page Roster
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Executive Leadership Roster
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Manage leaders displayed on the About page. Add portraits directly from your device, configure bios, experience badges, and LinkedIn links.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Leader</span>
          </button>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-xs text-slate-500">Loading leadership roster...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Leaders Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Get started by adding your first executive leader.
            </p>
            <button
              onClick={handleOpenAdd}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Executive Leader
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((leader) => (
              <div
                key={leader.id || leader.name}
                className={`bg-white dark:bg-slate-900 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                  leader.isActive === false
                    ? 'border-slate-200 dark:border-slate-800 opacity-60'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  {/* Photo Banner with Badges */}
                  <div className="relative aspect-[4/4.2] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden group">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />

                    {/* Experience Badge */}
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-semibold backdrop-blur-sm border border-white/20">
                      <Award className="w-3 h-3 text-amber-400" />
                      <span>{leader.experience || '10+ Years'}</span>
                    </div>

                    {/* Order Pill */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-mono border border-white/10">
                      Order: {leader.order ?? 1}
                    </div>

                    {/* LinkedIn badge */}
                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        title="LinkedIn Profile"
                      >
                        <FaLinkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Leader Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {leader.name}
                        </h3>
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {leader.role}
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          leader.isActive !== false
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {leader.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {leader.bio}
                    </p>

                    {/* Expertise Pills */}
                    {Array.isArray(leader.expertise) && leader.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {leader.expertise.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {leader.expertise.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                            +{leader.expertise.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEdit(leader)}
                    className="p-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs inline-flex items-center gap-1 font-semibold"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(leader.id)}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors text-xs inline-flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal Drawer */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {editingItem.id ? 'Edit Executive Leader' : 'Add New Executive Leader'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure leader profile, upload portrait, and set credentials.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Photo Upload Zone Directly From Device */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Leader Portrait Photo (Upload from Device)
                </label>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                      processImageFile(file);
                    }
                  }}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors"
                >
                  {/* Portrait Thumbnail Preview */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to select image from your device"
                    className="relative w-24 h-28 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    {editingItem.image ? (
                      <img
                        src={editingItem.image}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    )}
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                      <Upload className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Upload Actions & Direct URL */}
                  <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Select Photo from Device</span>
                          </>
                        )}
                      </button>

                      <span className="text-xs text-slate-400">or drop image file here</span>
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        value={editingItem.image}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, image: e.target.value })
                        }
                        placeholder="Or enter direct image URL (/images/team/amit-batra.png)"
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Name and Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Amit Batra"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Role / Executive Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    placeholder="e.g. Founder & Technology Innovation Leader"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Experience and LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Experience Badge
                  </label>
                  <input
                    type="text"
                    value={editingItem.experience}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, experience: e.target.value })
                    }
                    placeholder="e.g. 18+ Years Experience"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    LinkedIn Profile URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={editingItem.linkedin || ''}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, linkedin: e.target.value })
                      }
                      placeholder="https://www.linkedin.com/in/amit-batra-romania/"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white font-mono"
                    />
                    <FaLinkedin className="w-4 h-4 text-[#0A66C2] absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Executive Biography
                </label>
                <textarea
                  rows={4}
                  value={editingItem.bio}
                  onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
                  placeholder="Detailed leadership background, technical accomplishments, and strategic vision..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white leading-relaxed resize-y"
                />
              </div>

              {/* Expertise Tags */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Domains & Core Competencies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  placeholder="e.g. Artificial Intelligence, Blockchain & Web3, Digital Infrastructure, Scalable Architecture"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                />
                <span className="text-[11px] text-slate-400">
                  Separate multiple tags with commas. These appear as domain pills on the About page.
                </span>
              </div>

              {/* Order & Active Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Display Order / Sequence
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingItem.order ?? 1}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        order: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white"
                  />
                  <span className="text-[11px] text-slate-400">
                    Lower numbers appear first (e.g. 1 is featured foremost).
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingItem.isActive !== false}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Visible on Website (Active)
                  </label>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Leader</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

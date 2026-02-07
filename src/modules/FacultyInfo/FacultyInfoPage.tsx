"use client";

import SpotlightCard from '@/components/ui/SpotlightCard';
import { TeacherDesignation, TeacherWithAuth } from '@/lib/supabase';
import { addTeacher, getAllTeachers, deleteTeacher } from '@/services/teacherService';
import { motion } from 'framer-motion';
import { Plus, UserCog, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FacultyInfoPage() {
  const [teachers, setTeachers] = useState<TeacherWithAuth[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDesignation, setFilterDesignation] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'view' | 'add'>('view');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    designation: 'LECTURER' as TeacherDesignation,
  });

  // Load teachers on mount
  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    const data = await getAllTeachers();
    setTeachers(data);
    setLoading(false);
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.profile.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDesignation = filterDesignation === 'all' || t.designation === filterDesignation;
    return matchesSearch && matchesDesignation;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const result = await addTeacher(formData);

    if (result.success) {
      setSuccess('Teacher added successfully!');
      setFormData({ full_name: '', email: '', phone: '', designation: 'LECTURER' });
      setActiveTab('view'); // Switch to view tab
      await loadTeachers();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to add teacher');
    }

    setLoading(false);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to deactivate this teacher?')) return;

    setLoading(true);
    const result = await deleteTeacher(userId);

    if (result.success) {
      setSuccess('Teacher deactivated successfully!');
      await loadTeachers();
      setTimeout(() => setSuccess(null), 3000);
    } else {
      setError(result.error || 'Failed to deactivate teacher');
    }

    setLoading(false);
  };

  const getDesignationColor = (designation: TeacherDesignation) => {
    switch (designation) {
      case 'PROFESSOR': return 'bg-[#8400ff]/20 text-[#a855f7] border border-[#8400ff]/30';
      case 'ASSOCIATE_PROFESSOR': return 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30';
      case 'ASSISTANT_PROFESSOR': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'LECTURER': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      default: return 'bg-white/10 text-white/70 border border-white/20';
    }
  };

  const getDesignationLabel = (designation: TeacherDesignation) => {
    switch (designation) {
      case 'PROFESSOR': return 'Professor';
      case 'ASSOCIATE_PROFESSOR': return 'Associate Professor';
      case 'ASSISTANT_PROFESSOR': return 'Assistant Professor';
      case 'LECTURER': return 'Lecturer';
      default: return designation;
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Header with Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#5D4E37] dark:text-white">Faculty Management</h1>
          <p className="text-[#8B7355] dark:text-white/60 mt-1">View and manage faculty members</p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-[#F0E4D3] dark:bg-[#0d0d1a] border border-[#DCC5B2] dark:border-[#392e4e] rounded-full p-1">
          <button
            onClick={() => setActiveTab('view')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'view' 
                ? 'bg-[#D9A299] text-white shadow-lg shadow-[#D9A299]/25' 
                : 'text-[#8B7355] dark:text-white/60 hover:text-[#5D4E37] dark:hover:text-white'
            }`}
          >
            <UserCog className="w-4 h-4" />
            View Faculty
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'add' 
                ? 'bg-[#D9A299] text-white shadow-lg shadow-[#D9A299]/25' 
                : 'text-[#8B7355] dark:text-white/60 hover:text-[#5D4E37] dark:hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add Faculty
          </button>
        </div>
      </motion.div>

      {/* Content based on active tab */}
      {activeTab === 'view' ? (
        <>
          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#DCC5B2] dark:border-[#392e4e] rounded-lg bg-[#FAF7F3] dark:bg-[#0d0d1a] text-[#5D4E37] dark:text-white placeholder:text-[#8B7355] dark:placeholder:text-white/40 focus:border-[#D9A299] dark:focus:border-[#8400ff] focus:outline-none focus:ring-1 focus:ring-[#D9A299] dark:focus:ring-[#8400ff]"
              />
            </div>
            <select
              value={filterDesignation}
              onChange={(e) => setFilterDesignation(e.target.value)}
              className="px-4 py-2 border border-[#DCC5B2] dark:border-[#392e4e] rounded-lg bg-[#FAF7F3] dark:bg-[#0d0d1a] text-[#5D4E37] dark:text-white focus:border-[#D9A299] dark:focus:border-[#8400ff] focus:outline-none"
            >
              <option value="all">All Designations</option>
              <option value="PROFESSOR">Professor</option>
              <option value="ASSOCIATE_PROFESSOR">Associate Professor</option>
              <option value="ASSISTANT_PROFESSOR">Assistant Professor</option>
              <option value="LECTURER">Lecturer</option>
            </select>
          </motion.div>

          {/* Faculty Grid */}
          {loading && teachers.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#D9A299] dark:text-[#8400ff]" />
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="text-center py-12 text-[#8B7355] dark:text-white/60">
              No teachers found. {filterDesignation !== 'all' || searchTerm ? 'Try adjusting your filters.' : 'Add your first teacher to get started.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeachers.map((teacher, index) => (
                <motion.div
                  key={teacher.user_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SpotlightCard className="rounded-xl p-5 border border-[#DCC5B2] dark:border-[#392e4e] h-full" spotlightColor="rgba(217, 162, 153, 0.2)">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D9A299] to-[#DCC5B2] flex items-center justify-center text-white text-xl font-bold">
                        {teacher.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#5D4E37] dark:text-white">{teacher.full_name}</h3>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getDesignationColor(teacher.designation)}`}>
                          {getDesignationLabel(teacher.designation)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#8B7355] dark:text-white/60">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{teacher.profile.email}</span>
                      </div>
                      {teacher.phone && (
                        <div className="flex items-center gap-2 text-[#8B7355] dark:text-white/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{teacher.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-[#8B7355] dark:text-white/60">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span className="font-mono text-xs">{teacher.teacher_uid}</span>
                      </div>
                      {teacher.profile.is_active ? (
                        <div className="flex items-center gap-2 text-emerald-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs">Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs">Inactive</span>
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Add Faculty Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <SpotlightCard className="p-6" spotlightColor="rgba(132, 0, 255, 0.15)">
            <h2 className="text-xl font-bold text-white mb-6">Add New Faculty Member</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-[#392e4e] rounded-lg bg-[#060010] text-white focus:border-[#8400ff] focus:outline-none focus:ring-1 focus:ring-[#8400ff]"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@cse.kuet.ac.bd"
                  className="w-full px-4 py-2 border border-[#392e4e] rounded-lg bg-[#060010] text-white placeholder:text-white/40 focus:border-[#8400ff] focus:outline-none focus:ring-1 focus:ring-[#8400ff]"
                  required
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g., 01712345678"
                    className="w-full px-4 py-2 border border-[#392e4e] rounded-lg bg-[#060010] text-white placeholder:text-white/40 focus:border-[#8400ff] focus:outline-none focus:ring-1 focus:ring-[#8400ff]"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Designation</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value as TeacherDesignation })}
                    className="w-full px-4 py-2 border border-[#392e4e] rounded-lg bg-[#060010] text-white focus:border-[#8400ff] focus:outline-none focus:ring-1 focus:ring-[#8400ff]"
                    disabled={loading}
                  >
                    <option value="PROFESSOR">Professor</option>
                    <option value="ASSOCIATE_PROFESSOR">Associate Professor</option>
                    <option value="ASSISTANT_PROFESSOR">Assistant Professor</option>
                    <option value="LECTURER">Lecturer</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setFormData({ full_name: '', email: '', phone: '', designation: 'LECTURER' })}
                  className="flex-1 px-4 py-2 border border-[#392e4e] rounded-full text-white/70 hover:bg-white/5"
                  disabled={loading}
                >
                  Reset
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#8400ff] to-[#a855f7] text-white rounded-full flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Faculty'
                  )}
                </motion.button>
              </div>
            </form>
          </SpotlightCard>
        </motion.div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock4, 
  AlertCircle,
  Database,
  RefreshCw,
  Search,
  Filter,
  Mail,
  GraduationCap,
  Settings,
  Send,
  Youtube,
  Linkedin,
  Instagram,
  ExternalLink,
  Save,
  Check,
  Copy,
  Globe2
} from 'lucide-react';
import { ConsultationBooking, WaitlistEntry, SiteSettings } from '../types';
import { INITIAL_BOOKINGS, INITIAL_WAITLIST, DEFAULT_SITE_SETTINGS } from '../data/siteData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: ConsultationBooking[];
  waitlist: WaitlistEntry[];
  onUpdateBookingStatus: (id: string, status: ConsultationBooking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onAddManualBooking?: (booking: ConsultationBooking) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  bookings,
  waitlist,
  onUpdateBookingStatus,
  onDeleteBooking,
  onAddManualBooking
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'waitlist' | 'settings'>('bookings');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Site controls & socials state
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('gwp_site_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('gwp_site_settings', JSON.stringify(siteSettings));
      setSettingsSavedToast(true);
      setTimeout(() => setSettingsSavedToast(false), 3000);
    } catch (e) {
      console.error('Failed saving site settings', e);
    }
  };

  const handleResetSettings = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.setItem('gwp_site_settings', JSON.stringify(DEFAULT_SITE_SETTINGS));
      setSettingsSavedToast(true);
      setTimeout(() => setSettingsSavedToast(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Manual booking form state
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualService, setManualService] = useState('1-on-1 Germany Strategy Call');
  const [manualPrice, setManualPrice] = useState('€49');
  const [manualDate, setManualDate] = useState('Mon, 21 Sep');
  const [manualTime, setManualTime] = useState('16:00 CET');
  const [manualTarget, setManualTarget] = useState('M.Sc. Computer Science');

  if (!isOpen) return null;

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => {
      const priceNum = parseInt(b.price.replace('€', ''), 10) || 0;
      return sum + priceNum;
    }, 0);

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  const handleExportBookingsCsv = () => {
    const headers = 'ID,Client Name,Client Email,Service,Price,Date,Time,Status,Background,Created At\n';
    const rows = bookings.map(b => 
      `"${b.id}","${b.clientName}","${b.clientEmail}","${b.serviceTitle}","${b.price}","${b.scheduledDate}","${b.scheduledTime}","${b.status}","${(b.background || '').replace(/"/g, '""')}","${b.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `germanywithprakhar_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportWaitlistCsv = () => {
    const headers = 'ID,Email,Course Title,Background,Joined At\n';
    const rows = waitlist.map(w => 
      `"${w.id}","${w.email}","${w.courseTitle}","${(w.background || '').replace(/"/g, '""')}","${w.createdAt}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `germanywithprakhar_waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualEmail) return;

    const newBooking: ConsultationBooking = {
      id: `bk-${Date.now()}`,
      serviceId: 'strategy-call',
      serviceTitle: manualService,
      price: manualPrice,
      clientName: manualName,
      clientEmail: manualEmail,
      targetDegree: manualTarget,
      scheduledDate: manualDate,
      scheduledTime: manualTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    if (onAddManualBooking) {
      onAddManualBooking(newBooking);
    }
    setIsAddingBooking(false);
    setManualName('');
    setManualEmail('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-5xl bg-[#0B0D15] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 z-10 my-6 overflow-hidden text-left flex flex-col max-h-[90vh]"
        >
          {/* Top Bar with Accent */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shrink-0" />

          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 bg-[#0E111C]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    germanywithprakhar Admin Portal
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Live Control
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Lead pipeline, consulting appointments & waitlist data collection
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors"
                aria-label="Close Admin Portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 border-b border-white/[0.06] bg-[#090A10] shrink-0">
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-gray-400 block">Total Bookings</span>
              <span className="text-2xl font-bold font-mono text-white mt-1 block">
                {bookings.length}
              </span>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">
                {confirmedCount} confirmed • {pendingCount} pending
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-gray-400 block">Consulting Volume</span>
              <span className="text-2xl font-bold font-mono text-indigo-300 mt-1 block">
                €{totalRevenue}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                Direct client revenue
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-gray-400 block">Course Waitlist</span>
              <span className="text-2xl font-bold font-mono text-cyan-300 mt-1 block">
                {waitlist.length}
              </span>
              <span className="text-[10px] text-cyan-400/80 mt-0.5 block">
                High-intent students
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-gray-400 block">Database Sync</span>
              <span className="text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active (Local + Cloud)
              </span>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                Auto-saved in browser state
              </span>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-[#0D0F18] shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'bookings'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('waitlist')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'waitlist'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Course Waitlist ({waitlist.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Site &amp; Socials</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 shrink-0">
              {activeTab === 'bookings' && (
                <>
                  <button
                    onClick={() => setIsAddingBooking(!isAddingBooking)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Booking</span>
                  </button>
                  <button
                    onClick={handleExportBookingsCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-medium text-indigo-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>
                </>
              )}
              {activeTab === 'waitlist' && (
                <button
                  onClick={handleExportWaitlistCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-medium text-indigo-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              )}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
            {/* MANUAL BOOKING CREATION ACCORDION */}
            {isAddingBooking && (
              <form
                onSubmit={handleCreateManualBooking}
                className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3 mb-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Add Offline or Direct Client Booking
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddingBooking(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Student Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Target Degree</label>
                    <input
                      type="text"
                      placeholder="M.Sc. Computer Science"
                      value={manualTarget}
                      onChange={(e) => setManualTarget(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Package</label>
                    <select
                      value={manualService}
                      onChange={(e) => setManualService(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="1-on-1 Germany Strategy Call">1-on-1 Strategy Call (€49)</option>
                      <option value="SOP & Tech Portfolio Audit">SOP & Tech Audit (€75)</option>
                      <option value="Quick Q&A & Reality Check">Quick Q&A (€25)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Fee</label>
                    <input
                      type="text"
                      value={manualPrice}
                      onChange={(e) => setManualPrice(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Date</label>
                    <input
                      type="text"
                      value={manualDate}
                      onChange={(e) => setManualDate(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Time</label>
                    <input
                      type="text"
                      value={manualTime}
                      onChange={(e) => setManualTime(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                  >
                    Save Booking
                  </button>
                </div>
              </form>
            )}

            {/* TAB 1: CONSULTING BOOKINGS */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search student or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#121524] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
                    {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] capitalize font-medium transition-colors whitespace-nowrap ${
                            statusFilter === st
                              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                              : 'bg-white/[0.02] text-gray-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-2.5">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-gray-400 text-xs">
                      No consultation bookings found matching your filter.
                    </div>
                  ) : (
                    filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-2xl bg-[#0E111D] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        {/* Student Details */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-white text-sm">
                              {b.clientName}
                            </span>
                            <span className="text-xs font-mono text-gray-400 break-all">
                              ({b.clientEmail})
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : b.status === 'completed'
                                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                                : b.status === 'pending'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            }`}>
                              {b.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                            <span className="text-indigo-300 font-medium">{b.serviceTitle}</span>
                            <span>•</span>
                            <span className="text-white font-mono font-bold">{b.price}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-gray-300">
                              <Calendar className="w-3 h-3 text-indigo-400" />
                              {b.scheduledDate} @ {b.scheduledTime}
                            </span>
                          </div>

                          {b.background && (
                            <p className="text-[11px] text-gray-400 italic bg-white/[0.02] p-2 rounded-lg mt-1 border border-white/[0.04]">
                              Notes: {b.background}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                          <select
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                            className="bg-[#141828] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => onDeleteBooking(b.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                            title="Delete booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: COURSE WAITLIST */}
            {activeTab === 'waitlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Students on Masterclass Priority List
                    </h3>
                    <p className="text-xs text-gray-400">
                      These leads will receive automated pre-launch discounts upon course rollout.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
                    {waitlist.length} Subscribers
                  </span>
                </div>

                <div className="space-y-2.5">
                  {waitlist.map((w) => (
                    <div
                      key={w.id}
                      className="p-4 rounded-2xl bg-[#0E111D] border border-white/[0.08] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-sm font-semibold text-white">{w.email}</span>
                          <span className="text-[10px] font-mono text-gray-500">
                            {new Date(w.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Course: <span className="text-indigo-300 font-medium">{w.courseTitle}</span>
                        </div>
                        {w.background && (
                          <div className="text-[11px] text-gray-400">
                            Profile: {w.background}
                          </div>
                        )}
                      </div>

                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono">
                        Early Bird VIP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SITE & SOCIALS CONTROLS */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Status Notice */}
                {settingsSavedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-emerald-300 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Settings &amp; Social URLs successfully updated in database!</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Auto-saved</span>
                  </motion.div>
                )}

                {/* Section 1: Official Channels & Social Links */}
                <div className="p-5 rounded-2xl bg-[#0E111D] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-cyan-400" />
                        <span>Official Channels &amp; Community Links</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Manage your verified public links, YouTube channel, Telegram community, and Instagram pages.
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400">Live on Site</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* YouTube Channel */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Youtube className="w-3.5 h-3.5 text-red-500" />
                        <span>YouTube Channel</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.youtubeUrl}
                          onChange={(e) => setSiteSettings({ ...siteSettings, youtubeUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-red-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Telegram Community */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Send className="w-3.5 h-3.5 text-sky-400" />
                        <span>Telegram Community Group</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.telegramUrl}
                          onChange={(e) => setSiteSettings({ ...siteSettings, telegramUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-sky-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.telegramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* LinkedIn Profile */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                        <span>LinkedIn Profile</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.linkedinUrl}
                          onChange={(e) => setSiteSettings({ ...siteSettings, linkedinUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-blue-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Brand Instagram */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Brand Instagram (@germanywithprakhar)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.brandInstagram}
                          onChange={(e) => setSiteSettings({ ...siteSettings, brandInstagram: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.brandInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Personal Instagram */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>Personal Instagram (@whoisprakharrr)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.personalInstagram}
                          onChange={(e) => setSiteSettings({ ...siteSettings, personalInstagram: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.personalInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Topmate URL */}
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Topmate Booking Page</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={siteSettings.topmateUrl}
                          onChange={(e) => setSiteSettings({ ...siteSettings, topmateUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500 text-white font-mono text-xs focus:outline-none"
                        />
                        <a
                          href={siteSettings.topmateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 hover:text-white transition-colors flex items-center justify-center shrink-0"
                          title="Open link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Profile & Academic Information */}
                <div className="p-5 rounded-2xl bg-[#0E111D] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                        <span>Persona &amp; Academic Credentials</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Control your displayed degree, university affiliation, German proficiency, and success metrics.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono">Full Name</label>
                      <input
                        type="text"
                        value={siteSettings.name}
                        onChange={(e) => setSiteSettings({ ...siteSettings, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono">Academic Title / Degree</label>
                      <input
                        type="text"
                        value={siteSettings.title}
                        onChange={(e) => setSiteSettings({ ...siteSettings, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1.5 font-mono">German Language Level</label>
                      <input
                        type="text"
                        value={siteSettings.germanLevel}
                        onChange={(e) => setSiteSettings({ ...siteSettings, germanLevel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleResetSettings}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-gray-400 hover:text-white transition-colors"
                  >
                    Reset Defaults
                  </button>

                  <button
                    onClick={handleSaveSettings}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Site Controls</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0A0C14] flex items-center justify-between text-xs text-gray-500 shrink-0">
            <span>Logged in as Prakhar Rajput (Superadmin)</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 transition-colors"
            >
              Close Portal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

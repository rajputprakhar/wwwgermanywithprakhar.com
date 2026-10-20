import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCheck, 
  Printer, 
  Download, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  RotateCcw, 
  FileText, 
  ExternalLink, 
  Search,
  Check,
  Calendar,
  User,
  GraduationCap,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { ESSENTIAL_DOCUMENTS, CHECKLIST_CATEGORIES, ChecklistItem } from '../data/checklistData';

const STORAGE_KEY = 'gwp_essential_documents_checklist_v1';
const USER_META_KEY = 'gwp_checklist_user_meta_v1';

export const EssentialDocumentsChecklist: React.FC = () => {
  // Local state for completed item IDs
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['doc-passport'];
    } catch {
      return ['doc-passport'];
    }
  });

  // User meta for print/PDF template
  const [applicantName, setApplicantName] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_META_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.name || '';
      }
    } catch {}
    return '';
  });

  const [targetProgram, setTargetProgram] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_META_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.program || 'M.Sc. Computer Science';
      }
    } catch {}
    return 'M.Sc. Computer Science';
  });

  const [targetIntake, setTargetIntake] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_META_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.intake || 'Winter Semester 2025/26';
      }
    } catch {}
    return 'Winter Semester 2025/26';
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

  // Form input IDs for accessibility
  const searchInputId = useId();
  const applicantNameId = useId();
  const targetProgramId = useId();
  const targetIntakeId = useId();

  // Save completion state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.warn('Failed to save checklist state', e);
    }
  }, [completedIds]);

  // Save user meta
  useEffect(() => {
    try {
      localStorage.setItem(USER_META_KEY, JSON.stringify({
        name: applicantName,
        program: targetProgram,
        intake: targetIntake
      }));
    } catch (e) {
      console.warn('Failed to save checklist user meta', e);
    }
  }, [applicantName, targetProgram, targetIntake]);

  const toggleItem = (id: string) => {
    setCompletedIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setCompletedIds(ESSENTIAL_DOCUMENTS.map(d => d.id));
  };

  const handleReset = () => {
    setCompletedIds([]);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter items
  const filteredItems = ESSENTIAL_DOCUMENTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mandatoryFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCount = ESSENTIAL_DOCUMENTS.length;
  const completedCount = completedIds.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const getBadgeStyle = (badge: ChecklistItem['badge']) => {
    switch (badge) {
      case 'Mandatory':
        return 'bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30';
      case 'Critical':
        return 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
      case 'Visa Standard':
        return 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
      default:
        return 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';
    }
  };

  return (
    <section 
      id="checklist" 
      className="relative py-24 bg-[#FAF8F5] dark:bg-[#08090E] overflow-hidden border-t border-slate-200 dark:border-white/[0.06] transition-colors duration-200"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/25 text-xs font-mono text-indigo-700 dark:text-indigo-300 mb-4 shadow-xs">
            <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Application Dossier</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Essential Documents Checklist
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Interactive, exportable preparation suite covering every mandatory certificate for German university admissions, APS audits, Expatrio Sperrkonto proof, and TK statutory health insurance.
          </p>
        </div>

        {/* Global Progress & Quick Action Bar */}
        <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Progress Metrics */}
            <div className="w-full lg:w-1/2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    Dossier Completion:
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    {completedCount} of {totalCount} Ready ({progressPercentage}%)
                  </span>
                </div>
                {progressPercentage === 100 && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Visa &amp; Uni Ready!
                  </span>
                )}
              </div>

              {/* Progress Bar Track */}
              <div className="w-full h-3 bg-slate-100 dark:bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full transition-colors ${
                    progressPercentage === 100
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : progressPercentage >= 50
                      ? 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400'
                      : 'bg-gradient-to-r from-amber-500 to-indigo-500'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-gray-400">
                <span>Phase 1: APS &amp; Academics</span>
                <span>Phase 2: Uni-Assist &amp; SOP</span>
                <span>Phase 3: Sperrkonto &amp; Visa</span>
              </div>
            </div>

            {/* Print & Bulk Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
              <button
                onClick={handlePrint}
                id="checklist-print-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                title="Print or Save PDF checklist template"
              >
                <Printer className="w-4 h-4 text-cyan-400 dark:text-cyan-600" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                onClick={() => setIsPdfPreviewOpen(true)}
                id="checklist-preview-template-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
                title="Preview printable PDF sheet"
              >
                <FileText className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>PDF Template View</span>
              </button>

              <button
                onClick={handleSelectAll}
                className="px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-gray-300 text-xs font-mono border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                title="Mark all as completed"
              >
                Check All
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-gray-400 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                title="Reset checklist progress"
                aria-label="Reset checklist progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {CHECKLIST_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:text-white dark:border-white/[0.08]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-70 font-mono text-[11px]">
                  ({cat.count})
                </span>
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <label htmlFor={searchInputId} className="sr-only">Search essential documents</label>
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search document, APS, TK..."
              className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Document Cards List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isCompleted = completedIds.includes(item.id);
            const isExpanded = expandedItemId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  isCompleted
                    ? 'bg-emerald-50/40 dark:bg-[#0B1516]/50 border-emerald-300/80 dark:border-emerald-500/30 shadow-xs'
                    : 'bg-white dark:bg-[#0E111C]/90 border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/15 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Main Row */}
                <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    
                    {/* Interactive Checkbox */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-slate-50 dark:bg-white/[0.05] border-slate-300 dark:border-white/20 hover:border-indigo-500 text-transparent'
                      }`}
                      title={isCompleted ? 'Mark as incomplete' : 'Mark as ready'}
                      aria-label={`Toggle ${item.title}`}
                    >
                      <Check className={`w-3.5 h-3.5 stroke-[3] ${isCompleted ? 'opacity-100' : 'opacity-0'}`} />
                    </button>

                    {/* Title & Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getBadgeStyle(item.badge)}`}>
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                          {item.issuingAuthority}
                        </span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                        isCompleted
                          ? 'text-slate-800 dark:text-gray-200'
                          : 'text-slate-900 dark:text-white'
                      }`}>
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Expand Chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    {item.officialLink && (
                      <a
                        href={item.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-[11px] font-mono text-slate-700 dark:text-gray-300 transition-colors"
                        title={`Open official portal for ${item.title}`}
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    )}

                    <button
                      onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                      title={isExpanded ? 'Collapse instructions' : 'Expand full instructions'}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-indigo-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-slate-200 dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#0A0C16] px-5 sm:px-6 py-4"
                    >
                      <div className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                            Full Requirement Overview:
                          </span>
                          <p className="leading-relaxed">{item.description}</p>
                        </div>

                        {/* Pro-Tip Box */}
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Prakhar&apos;s Strategy Tip: </span>
                            <span>{item.proTip}</span>
                          </div>
                        </div>

                        {/* Metadata row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                          <div className="text-slate-500 dark:text-gray-400">
                            <span className="font-semibold text-slate-700 dark:text-gray-300">Mandatory For: </span>
                            {item.mandatoryFor}
                          </div>
                          <div className="text-slate-500 dark:text-gray-400">
                            <span className="font-semibold text-slate-700 dark:text-gray-300">Timeline / Window: </span>
                            {item.deadlineNote}
                          </div>
                        </div>

                        {item.officialLink && (
                          <div className="pt-1">
                            <a
                              href={item.officialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              <span>Open Official Issuing Portal ({item.issuingAuthority})</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* PDF-Ready Printable Sheet Preview Modal */}
        <AnimatePresence>
          {isPdfPreviewOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white text-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Printable PDF Dossier Preview
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        A4 Print Ready • Ready to print or export as PDF via browser
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Document</span>
                    </button>
                    <button
                      onClick={() => setIsPdfPreviewOpen(false)}
                      className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      aria-label="Close modal"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Printable Document Body */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900">
                  
                  {/* Student Dossier Header (Print-optimized) */}
                  <div className="border-b-2 border-slate-900 pb-5 text-center">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block mb-1">
                      Federal Republic of Germany • Higher Education &amp; Visa Preparatory Suite
                    </span>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                      Essential Documents Checklist &amp; Verification Dossier
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 font-mono">
                      Curated by Prakhar Rajput (germanywithprakhar • University of Bremen CS)
                    </p>
                  </div>

                  {/* Student Metadata Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <label htmlFor={applicantNameId} className="font-mono text-[10px] text-slate-500 uppercase block mb-1">
                        Applicant Full Name:
                      </label>
                      <input
                        id={applicantNameId}
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Prakhar Rajput"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-900 text-xs focus:outline-none focus:border-indigo-500 bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={targetProgramId} className="font-mono text-[10px] text-slate-500 uppercase block mb-1">
                        Target Degree / Program:
                      </label>
                      <input
                        id={targetProgramId}
                        type="text"
                        value={targetProgram}
                        onChange={(e) => setTargetProgram(e.target.value)}
                        placeholder="e.g. M.Sc. Computer Science"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-900 text-xs focus:outline-none focus:border-indigo-500 bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={targetIntakeId} className="font-mono text-[10px] text-slate-500 uppercase block mb-1">
                        Intake Semester:
                      </label>
                      <input
                        id={targetIntakeId}
                        type="text"
                        value={targetIntake}
                        onChange={(e) => setTargetIntake(e.target.value)}
                        placeholder="e.g. Winter 2025/26"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-900 text-xs focus:outline-none focus:border-indigo-500 bg-white"
                      />
                    </div>
                  </div>

                  {/* Clean Tabular Checklist for PDF Output */}
                  <div className="space-y-6">
                    {CHECKLIST_CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
                      const itemsInCat = ESSENTIAL_DOCUMENTS.filter(d => d.category === cat.id);
                      return (
                        <div key={cat.id} className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 flex items-center justify-between font-mono">
                            <span>{cat.label}</span>
                            <span className="text-[11px] text-slate-500">
                              {itemsInCat.filter(i => completedIds.includes(i.id)).length} of {itemsInCat.length} Verified
                            </span>
                          </h4>

                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200 text-[10px] font-mono text-slate-500 uppercase">
                                <th className="py-2 px-1 w-12 text-center">Status</th>
                                <th className="py-2 px-3">Document Title</th>
                                <th className="py-2 px-3">Issuing Authority</th>
                                <th className="py-2 px-3">Mandatory For</th>
                              </tr>
                            </thead>
                            <tbody>
                              {itemsInCat.map((item) => {
                                const checked = completedIds.includes(item.id);
                                return (
                                  <tr 
                                    key={item.id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                  >
                                    <td className="py-2 px-1 text-center font-mono">
                                      <input 
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleItem(item.id)}
                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                                      />
                                    </td>
                                    <td className="py-2 px-3 font-semibold text-slate-900">
                                      {item.title}
                                    </td>
                                    <td className="py-2 px-3 text-slate-600 text-[11px]">
                                      {item.issuingAuthority}
                                    </td>
                                    <td className="py-2 px-3 text-slate-500 font-mono text-[11px]">
                                      {item.mandatoryFor}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>

                  {/* Declaration & Signature Block */}
                  <div className="pt-6 border-t-2 border-slate-200 text-xs text-slate-600 space-y-4">
                    <p className="italic text-[11px] leading-relaxed">
                      Statutory Directive: Blocked account balance proof must conform to the current Federal Foreign Office standard (€11,904 / €992 per month). Health insurance proof requires electronic reporting (M10 certificate) to the admitted university.
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                      <div>
                        <div className="border-b border-slate-400 h-8" />
                        <span className="text-[10px] font-mono uppercase text-slate-500 mt-1 block">
                          Applicant Signature &amp; Date
                        </span>
                      </div>
                      <div>
                        <div className="border-b border-slate-400 h-8" />
                        <span className="text-[10px] font-mono uppercase text-slate-500 mt-1 block">
                          Document Verification Reviewer
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Modal Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 text-[11px]">
                    Tip: Select &quot;Save as PDF&quot; in the destination dropdown of your print dialog.
                  </span>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / Print Now</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

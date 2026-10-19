import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  TrendingUp, 
  ShieldCheck, 
  ExternalLink,
  Globe2,
  Building,
  Check,
  AlertTriangle,
  Layers,
  Sparkles,
  Search,
  Scale,
  Train,
  GraduationCap,
  FileText
} from 'lucide-react';
import { 
  CITIES_DATA, 
  CITIES_LIST, 
  HIGH_TIER_CITIES, 
  MID_TIER_CITIES, 
  BUDGET_CITIES,
  OFFICIAL_SPERRKONTO_MONTHLY,
  TK_INSURANCE_MONTHLY,
  CityCostData
} from '../data/citiesData';

interface StudentToolsProps {
  onBookCallClick: () => void;
}

export const StudentTools: React.FC<StudentToolsProps> = ({ onBookCallClick }) => {
  const [activeTab, setActiveTab] = useState<'grade' | 'cost' | 'portals'>('grade');

  // Accessibility IDs
  const maxScoreId = useId();
  const minScoreId = useId();
  const actualScoreId = useId();
  const citySelectId = useId();

  // =========================================================================
  // 1. GERMAN GRADE CONVERTER (MODIFIED BAVARIAN FORMULA / KMK STANDARD)
  // Mathematical Formula: Z = 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin))
  // Where:
  // - Nmax = Maximum possible score in the foreign system
  // - Nmin = Minimum passing benchmark in the foreign system
  // - Nd   = Obtained grade/score to convert
  // - Z    = Resulting German university grade (1.0 = Outstanding, 4.0 = Minimum Pass, 5.0 = Fail)
  // =========================================================================
  const [scaleType, setScaleType] = useState<'cgpa10' | 'percentage' | 'gpa4' | 'custom'>('cgpa10');
  const [maxScore, setMaxScore] = useState<number>(10);
  const [minPassScore, setMinPassScore] = useState<number>(4);
  const [actualScore, setActualScore] = useState<number>(8.4);

  const calculateGermanGrade = () => {
    if (maxScore <= minPassScore) {
      return null;
    }
    // Edge case: Obtained score is strictly below passing mark
    if (actualScore < minPassScore) {
      return 5.0; // In German higher education (uni-assist/KMK), failing marks map to 5.0 (Nicht bestanden)
    }
    // Edge case: Obtained score exceeds maximum scale
    if (actualScore >= maxScore) {
      return 1.0;
    }
    // Modified Bavarian Formula
    const grade = 1 + 3 * ((maxScore - actualScore) / (maxScore - minPassScore));
    return parseFloat(grade.toFixed(2));
  };

  const germanGrade = calculateGermanGrade();

  const getGermanGradeVerdict = (grade: number | null) => {
    if (grade === null) return { 
      text: 'Invalid Score Parameters', 
      color: 'text-rose-600 dark:text-rose-400', 
      badge: 'Configuration Error', 
      advice: 'Ensure maximum possible score (Nmax) is strictly greater than the minimum passing benchmark (Nmin).' 
    };
    if (grade >= 4.1) return {
      text: 'Nicht Bestanden (Fail / 5.0 • Below Passing)',
      color: 'text-rose-600 dark:text-rose-400',
      badge: 'Below Pass Benchmark',
      advice: 'The entered grade is below the minimum passing threshold (Nmin). German university admissions and uni-assist require a completed, passing degree for equivalence.'
    };
    if (grade <= 1.5) return { 
      text: 'Sehr Gut (Very Good / Outstanding • 1.0 – 1.5)', 
      color: 'text-emerald-600 dark:text-emerald-400', 
      badge: 'TU9 Top Contender', 
      advice: 'Exceptional academic profile. High eligibility for top TU9 flagships including TU Munich, RWTH Aachen, KIT, and TU Berlin. SOP alignment and ECTS curriculum matching will be your deciding factor.' 
    };
    if (grade <= 2.0) return { 
      text: 'Gut (Good / Highly Competitive • 1.6 – 2.0)', 
      color: 'text-cyan-600 dark:text-cyan-400', 
      badge: 'Strong Admission Odds', 
      advice: 'Very competitive standing across major German public research universities like University of Bremen, University of Stuttgart, FAU Erlangen, and University of Bonn.' 
    };
    if (grade <= 2.5) return { 
      text: 'Befriedigend (Satisfactory / Target Range • 2.1 – 2.5)', 
      color: 'text-amber-600 dark:text-amber-400', 
      badge: 'Target University Range', 
      advice: 'Eligible for many open-admission and moderate NC master programs, plus top-ranked Universities of Applied Sciences (HAW/FH) with strong industry integration.' 
    };
    return { 
      text: 'Ausreichend (Sufficient / Pass • 2.6 – 4.0)', 
      color: 'text-orange-600 dark:text-orange-400', 
      badge: 'Strategic Selection Required', 
      advice: 'Focus on universities with aptitude entrance assessments (Eignungsfeststellung), universities with high intake in eastern Germany (e.g. Chemnitz, Magdeburg), or programs evaluating GRE / practical portfolio.' 
    };
  };

  const gradeVerdict = getGermanGradeVerdict(germanGrade);

  // =========================================================================
  // 2. EXPANDED MULTI-CITY LIVING COST & SPERRKONTO CALCULATOR
  // =========================================================================
  const [costMode, setCostMode] = useState<'compare' | 'single'>('compare');
  const [selectedSingleCity, setSelectedSingleCity] = useState<string>('Bremen');
  const [housingType, setHousingType] = useState<'wg' | 'studio' | 'dorm'>('wg');

  // Multi-city comparison state (compare 2 or 3 cities)
  const [comparisonCities, setComparisonCities] = useState<string[]>(['Bremen', 'Munich', 'Leipzig']);

  const toggleCityInComparison = (cityName: string) => {
    if (comparisonCities.includes(cityName)) {
      if (comparisonCities.length > 2) {
        setComparisonCities(comparisonCities.filter(c => c !== cityName));
      }
    } else {
      if (comparisonCities.length < 3) {
        setComparisonCities([...comparisonCities, cityName]);
      } else {
        // replace the last one
        setComparisonCities([comparisonCities[0], comparisonCities[1], cityName]);
      }
    }
  };

  const calculateCityMonthlyCost = (city: CityCostData, accommodation: 'wg' | 'studio' | 'dorm') => {
    const rent = accommodation === 'wg' ? city.rentWg : accommodation === 'studio' ? city.rentStudio : city.rentDorm;
    const monthlySemesterbeitrag = Math.round(city.semesterContribution / 6);
    const total = rent + TK_INSURANCE_MONTHLY + city.groceries + city.leisure + city.phoneWifiMisc + monthlySemesterbeitrag;
    const surplusOrDeficit = OFFICIAL_SPERRKONTO_MONTHLY - total;
    return {
      rent,
      monthlySemesterbeitrag,
      total,
      surplusOrDeficit,
      isCovered: surplusOrDeficit >= 0
    };
  };

  const singleCityData = CITIES_DATA[selectedSingleCity] || CITIES_DATA['Bremen'];
  const singleCityCalc = calculateCityMonthlyCost(singleCityData, housingType);

  return (
    <section id="tools" className="relative py-24 bg-slate-50 dark:bg-[#08090E] overflow-hidden max-w-[100vw] border-t border-slate-200 dark:border-white/[0.06] transition-colors duration-200">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25 text-xs font-mono text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Admissions &amp; Financial Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Germany Admissions &amp; Cost Calculators
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
            Free, mathematically precise tools engineered specifically for international students planning their degree in Germany.
          </p>

          {/* Navigation Tabs (Responsive Flex-Wrap, Clean 3-Tab Architecture) */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#0F121F] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('grade')}
              id="tab-btn-grade-converter"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'grade'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
              }`}
            >
              <Calculator className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Grade Converter</span>
            </button>

            <button
              onClick={() => setActiveTab('cost')}
              id="tab-btn-cost-calculator"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'cost'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Living Cost &amp; Sperrkonto</span>
            </button>

            <button
              onClick={() => setActiveTab('portals')}
              id="tab-btn-official-portals"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'portals'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
              }`}
            >
              <Globe2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Official Portals</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: GERMAN GRADE CONVERTER (FEDERAL KMK STANDARD)                     */}
        {/* ========================================================================= */}
        {activeTab === 'grade' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Input Column */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl transition-colors duration-200">
                <div>
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        German Grade Converter (Modified Bavarian Formula)
                      </h3>
                    </div>
                    {/* Explanatory Sub-Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono text-indigo-700 dark:text-indigo-300 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span>Statutory KMK &amp; uni-assist formula applied across all 16 German federal states.</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 leading-relaxed">
                      Resolutions established by the Standing Conference of the Ministers of Education (<strong className="text-slate-800 dark:text-gray-200">Kultusministerkonferenz - KMK</strong>) enforce this mathematical model for converting international Bachelor transcripts to the German 1.0 – 5.0 academic grading scale.
                    </p>
                  </div>

                  {/* Grading Scale Preset Selector */}
                  <div className="mb-6">
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400 mb-2.5 block">Select Grading System:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => {
                          setScaleType('cgpa10');
                          setMaxScore(10);
                          setMinPassScore(4);
                          setActualScore(8.4);
                        }}
                        id="scale-btn-cgpa10"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                          scaleType === 'cgpa10'
                            ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                            : 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        10-Point CGPA
                      </button>

                      <button
                        onClick={() => {
                          setScaleType('percentage');
                          setMaxScore(100);
                          setMinPassScore(40);
                          setActualScore(82);
                        }}
                        id="scale-btn-percentage"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                          scaleType === 'percentage'
                            ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                            : 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        Percentage %
                      </button>

                      <button
                        onClick={() => {
                          setScaleType('gpa4');
                          setMaxScore(4);
                          setMinPassScore(2);
                          setActualScore(3.6);
                        }}
                        id="scale-btn-gpa4"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                          scaleType === 'gpa4'
                            ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                            : 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        4.0 Scale GPA
                      </button>

                      <button
                        onClick={() => setScaleType('custom')}
                        id="scale-btn-custom"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center cursor-pointer ${
                          scaleType === 'custom'
                            ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                            : 'bg-slate-100 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        Custom Limits
                      </button>
                    </div>
                  </div>

                  {/* Numeric Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={maxScoreId} className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-1.5 font-medium">
                          Maximum Possible (Nmax)
                        </label>
                        <input
                          id={maxScoreId}
                          type="number"
                          step="0.1"
                          value={maxScore}
                          onChange={(e) => setMaxScore(parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
                        />
                      </div>
                      <div>
                        <label htmlFor={minScoreId} className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-1.5 font-medium">
                          Minimum Pass (Nmin)
                        </label>
                        <input
                          id={minScoreId}
                          type="number"
                          step="0.1"
                          value={minPassScore}
                          onChange={(e) => setMinPassScore(parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor={actualScoreId} className="text-xs font-mono text-slate-600 dark:text-gray-400 font-medium">
                          Your Actual Obtained Score (Nd)
                        </label>
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-cyan-300">
                          {actualScore}
                        </span>
                      </div>
                      <input
                        id={actualScoreId}
                        type="number"
                        step="0.05"
                        value={actualScore}
                        onChange={(e) => setActualScore(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Mathematical Formula Footnote */}
                <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#0B0D15] border border-slate-200 dark:border-white/[0.06] flex items-start gap-3">
                  <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-600 dark:text-gray-400 font-mono space-y-1">
                    <div className="text-slate-900 dark:text-white font-semibold">Exact Modified Bavarian Formula:</div>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300">Z = 1 + 3 × [(Nmax - Nd) ÷ (Nmax - Nmin)]</div>
                    <div className="text-slate-500 dark:text-gray-500">1.0 is highest distinction (Sehr Gut); 4.0 is minimum pass (Ausreichend); &gt; 4.0 is Fail (5.0).</div>
                  </div>
                </div>
              </div>

              {/* Results & Admission Competitiveness Column */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-2xl transition-colors duration-200">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-2 font-medium">
                    Official German Conversion Result
                  </span>

                  <div className="flex items-baseline gap-4 mb-4">
                    <div className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-200 dark:to-cyan-300 font-mono tracking-tight">
                      {germanGrade !== null ? germanGrade.toFixed(2) : '—'}
                    </div>
                    {germanGrade !== null && (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                        {gradeVerdict.badge}
                      </span>
                    )}
                  </div>

                  <div className={`text-base font-bold ${gradeVerdict.color} mb-3`}>
                    {gradeVerdict.text}
                  </div>

                  <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    {gradeVerdict.advice}
                  </p>

                  {/* University Tier Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700 dark:text-gray-300 font-mono">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 1.9 ? 'bg-emerald-500 dark:bg-emerald-400 shadow-xs' : 'bg-slate-400 dark:bg-gray-600'}`} />
                        <span className="font-medium text-slate-900 dark:text-white">TU9 Flagships (TUM, RWTH Aachen, KIT):</span>
                      </div>
                      <span className="text-cyan-700 dark:text-cyan-300 sm:text-slate-500 dark:sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 1.9</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 2.5 ? 'bg-emerald-500 dark:bg-emerald-400 shadow-xs' : 'bg-slate-400 dark:bg-gray-600'}`} />
                        <span className="font-medium text-slate-900 dark:text-white">Major Research Universities (Uni Bremen, Stuttgart, Bonn):</span>
                      </div>
                      <span className="text-cyan-700 dark:text-cyan-300 sm:text-slate-500 dark:sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 2.5</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 2.9 ? 'bg-emerald-500 dark:bg-emerald-400 shadow-xs' : 'bg-slate-400 dark:bg-gray-600'}`} />
                        <span className="font-medium text-slate-900 dark:text-white">Universities of Applied Sciences (Fachhochschulen / HAW):</span>
                      </div>
                      <span className="text-cyan-700 dark:text-cyan-300 sm:text-slate-500 dark:sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 2.9</span>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                    Need ECTS curriculum mapping or guidance for your target program?
                  </div>
                  <button
                    onClick={onBookCallClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/25 cursor-pointer"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EXPANDED MULTI-CITY LIVING COST & SPERRKONTO CALCULATOR           */}
        {/* ========================================================================= */}
        {activeTab === 'cost' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Top Control Bar: Mode Toggle & Accommodation Selector */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-xl transition-colors duration-200">
              <div>
                <div className="flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Multi-City Living Cost &amp; Sperrkonto Comparison
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                  Compare student costs across 19 major German cities against the official monthly Blocked Account payout of <strong className="text-emerald-700 dark:text-emerald-400 font-mono">€{OFFICIAL_SPERRKONTO_MONTHLY}/mo</strong> (€11,904/yr).
                </p>
              </div>

              {/* View Modes & Housing Selector */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
                {/* Mode Selector */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#090B12] border border-slate-200 dark:border-white/10 text-xs font-medium">
                  <button
                    onClick={() => setCostMode('compare')}
                    id="cost-mode-compare"
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      costMode === 'compare'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Compare 2-3 Cities
                  </button>
                  <button
                    onClick={() => setCostMode('single')}
                    id="cost-mode-single"
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      costMode === 'single'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Single City Simulator
                  </button>
                </div>

                {/* Accommodation type */}
                <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#090B12] border border-slate-200 dark:border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setHousingType('wg')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      housingType === 'wg' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    WG Room
                  </button>
                  <button
                    onClick={() => setHousingType('dorm')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      housingType === 'dorm' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Dorm
                  </button>
                  <button
                    onClick={() => setHousingType('studio')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      housingType === 'studio' ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Studio
                  </button>
                </div>
              </div>
            </div>

            {/* Quick City Filter Tags for Side-by-Side Comparison */}
            {costMode === 'compare' && (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0E111C]/60 border border-slate-200 dark:border-white/[0.06] backdrop-blur-xl shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="text-xs font-mono text-slate-700 dark:text-gray-300 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Select 2 or 3 Cities to Compare (Active: {comparisonCities.join(', ')}):</span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="text-slate-500 dark:text-gray-500">Presets:</span>
                    <button
                      onClick={() => setComparisonCities(['Bremen', 'Munich', 'Leipzig'])}
                      className="text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer font-medium"
                    >
                      Bremen / Munich / Leipzig
                    </button>
                    <span className="text-slate-400 dark:text-gray-600 hidden sm:inline">•</span>
                    <button
                      onClick={() => setComparisonCities(['Aachen', 'Berlin', 'Dresden'])}
                      className="text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer font-medium"
                    >
                      Aachen / Berlin / Dresden
                    </button>
                  </div>
                </div>

                {/* Tier Groups Filter Buttons */}
                <div className="space-y-2.5">
                  {/* High-tier row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 mr-1.5">
                      High-Tier Hubs:
                    </span>
                    {HIGH_TIER_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-600 text-white font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                          }`}
                        >
                          {city} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mid-tier row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20 mr-1.5">
                      Mid-Tier Balanced:
                    </span>
                    {MID_TIER_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-cyan-600 text-white font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                          }`}
                        >
                          {city} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Budget row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 mr-1.5">
                      High Affordability:
                    </span>
                    {BUDGET_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                          }`}
                        >
                          {city} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* COMPARISON CARDS MATRIX (2 or 3 Columns) */}
            {costMode === 'compare' ? (
              <div className={`grid grid-cols-1 ${comparisonCities.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'} gap-6 items-stretch`}>
                {comparisonCities.map(cityName => {
                  const city = CITIES_DATA[cityName] || CITIES_DATA['Bremen'];
                  const calc = calculateCityMonthlyCost(city, housingType);
                  const isSurplus = calc.surplusOrDeficit >= 0;

                  return (
                    <div
                      key={city.id}
                      className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/25 transition-all"
                    >
                      <div>
                        {/* City Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-gradient-to-r ${city.tierColor}`}>
                              {city.tierLabel}
                            </span>
                            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1.5">
                              {city.name}
                            </h4>
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                              State: {city.state}
                            </span>
                          </div>

                          {/* Quick remove/swap badge */}
                          {comparisonCities.length > 2 && (
                            <button
                              onClick={() => toggleCityInComparison(city.name)}
                              className="text-[11px] font-mono text-slate-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 p-1 cursor-pointer"
                              title="Remove city from comparison"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* Total Monthly Cost Display */}
                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090B12] border border-slate-200 dark:border-white/[0.06] mb-5">
                          <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 block mb-1">
                            Estimated Monthly Cost ({housingType.toUpperCase()}):
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                              €{calc.total}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">/ mo</span>
                          </div>

                          {/* Sperrkonto Delta */}
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-600 dark:text-gray-400">Blocked Account Delta:</span>
                            <span className={`font-bold px-2 py-0.5 rounded ${
                              isSurplus 
                                ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' 
                                : 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30'
                            }`}>
                              {isSurplus ? `+€${calc.surplusOrDeficit} Surplus` : `-€${Math.abs(calc.surplusOrDeficit)} Deficit`}
                            </span>
                          </div>

                          {/* Progress Meter against €992 */}
                          <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isSurplus ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, (calc.total / OFFICIAL_SPERRKONTO_MONTHLY) * 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="space-y-2.5 text-xs font-mono mb-6">
                          <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-600 dark:text-gray-400">Average WG Rent (Warm):</span>
                            <span className="text-slate-900 dark:text-white font-bold">€{city.rentWg}/mo</span>
                          </div>

                          <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-600 dark:text-gray-400">Dorm / Studio Rent:</span>
                            <span className="text-slate-700 dark:text-gray-300">€{city.rentDorm} / €{city.rentStudio}</span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-600 dark:text-gray-400 shrink-0">Semesterbeitrag:</span>
                            <span className="text-slate-900 dark:text-white font-bold text-right">€{city.semesterContribution}/sem <span className="text-slate-500 dark:text-gray-400 font-normal text-[11px]">(~€{calc.monthlySemesterbeitrag}/mo)</span></span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-600 dark:text-gray-400 shrink-0">Transit Pass:</span>
                            <span className="text-cyan-700 dark:text-cyan-300 text-right font-medium text-[11px] max-w-[190px]">{city.semesterTicketStatus}</span>
                          </div>

                          <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-600 dark:text-gray-400">Public Health Insurance (TK):</span>
                            <span className="text-slate-900 dark:text-white font-semibold">€{TK_INSURANCE_MONTHLY}/mo</span>
                          </div>

                          <div className="flex justify-between py-1.5">
                            <span className="text-slate-600 dark:text-gray-400">Groceries &amp; Leisure:</span>
                            <span className="text-slate-900 dark:text-white font-semibold">€{city.groceries + city.leisure}/mo</span>
                          </div>
                        </div>

                        {/* Transit note & Unis */}
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-[11px] space-y-1.5 mb-4">
                          <div className="text-slate-700 dark:text-gray-300 flex items-start gap-1.5">
                            <Train className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                            <span>{city.transitNote}</span>
                          </div>
                          <div className="text-slate-500 dark:text-gray-400 text-[10px]">
                            Key Unis: {city.notableUnis.join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* City Commentary */}
                      <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] text-xs">
                        {isSurplus ? (
                          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                            <Check className="w-4 h-4 shrink-0" />
                            <span>Sperrkonto covers living with €{calc.surplusOrDeficit} monthly buffer.</span>
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1.5 font-medium">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>Exceeds Sperrkonto by €{Math.abs(calc.surplusOrDeficit)}. 10h/week Werkstudent job needed.</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* SINGLE CITY SIMULATOR VIEW */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-6 bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Select German Hub &amp; Customize Budget
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400 mb-5">
                    Choose from all 19 cities across high-tier, mid-tier, and high-affordability regions.
                  </p>

                  <div className="mb-6">
                    <label htmlFor={citySelectId} className="block text-xs font-mono text-slate-600 dark:text-gray-400 mb-2 font-medium">
                      Select University City:
                    </label>
                    <select
                      id={citySelectId}
                      value={selectedSingleCity}
                      onChange={(e) => setSelectedSingleCity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#141824] border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono shadow-xs"
                    >
                      <optgroup label="High-Tier Cost Cities">
                        {HIGH_TIER_CITIES.map(c => (
                          <option key={c} value={c}>{c} ({CITIES_DATA[c].state})</option>
                        ))}
                      </optgroup>
                      <optgroup label="Mid-Tier Balanced Cities">
                        {MID_TIER_CITIES.map(c => (
                          <option key={c} value={c}>{c} ({CITIES_DATA[c].state})</option>
                        ))}
                      </optgroup>
                      <optgroup label="Budget-Friendly Cities">
                        {BUDGET_CITIES.map(c => (
                          <option key={c} value={c}>{c} ({CITIES_DATA[c].state})</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Accommodation selector */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    <button
                      onClick={() => setHousingType('wg')}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        housingType === 'wg' ? 'bg-indigo-50 dark:bg-indigo-600/25 border-indigo-500 text-indigo-900 dark:text-white shadow-xs' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">WG Flatshare</div>
                      <div className="text-[10px] text-slate-500 dark:text-gray-400">€{singleCityData.rentWg}/mo</div>
                    </button>
                    <button
                      onClick={() => setHousingType('dorm')}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        housingType === 'dorm' ? 'bg-indigo-50 dark:bg-indigo-600/25 border-indigo-500 text-indigo-900 dark:text-white shadow-xs' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Student Dorm</div>
                      <div className="text-[10px] text-slate-500 dark:text-gray-400">€{singleCityData.rentDorm}/mo</div>
                    </button>
                    <button
                      onClick={() => setHousingType('studio')}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        housingType === 'studio' ? 'bg-indigo-50 dark:bg-indigo-600/25 border-indigo-500 text-indigo-900 dark:text-white shadow-xs' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Studio Flat</div>
                      <div className="text-[10px] text-slate-500 dark:text-gray-400">€{singleCityData.rentStudio}/mo</div>
                    </button>
                  </div>

                  {/* Detailed Table */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090B12] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">Warm Rent ({housingType.toUpperCase()}):</span>
                      <span className="text-slate-900 dark:text-white font-bold">€{singleCityCalc.rent}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">Semesterbeitrag (Pro-rated):</span>
                      <span className="text-slate-900 dark:text-white font-bold">€{singleCityCalc.monthlySemesterbeitrag}/mo (€{singleCityData.semesterContribution}/sem)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">Transit Pass:</span>
                      <span className="text-cyan-700 dark:text-cyan-300 font-medium">{singleCityData.semesterTicketStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">TK Health Insurance:</span>
                      <span className="text-slate-900 dark:text-white font-semibold">€{TK_INSURANCE_MONTHLY}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">Groceries &amp; Cooking:</span>
                      <span className="text-slate-900 dark:text-white font-semibold">€{singleCityData.groceries}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-gray-400">Leisure, Mobile SIM &amp; GEZ:</span>
                      <span className="text-slate-900 dark:text-white font-semibold">€{singleCityData.leisure + singleCityData.phoneWifiMisc}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl">
                  <div>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-2 font-medium">
                      Total Monthly Budget for {singleCityData.name}
                    </span>

                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="text-5xl font-extrabold text-slate-900 dark:text-white font-mono">
                        €{singleCityCalc.total}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">/ month</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-500/20 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">German Sperrkonto Monthly Payout:</span>
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">€{OFFICIAL_SPERRKONTO_MONTHLY}/mo</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${singleCityCalc.isCovered ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, (singleCityCalc.total / OFFICIAL_SPERRKONTO_MONTHLY) * 100)}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[11px] font-mono">
                        <span className={singleCityCalc.isCovered ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}>
                          {singleCityCalc.isCovered
                            ? `✓ Blocked account payout comfortably covers your ${singleCityData.name} expenses with €${singleCityCalc.surplusOrDeficit} surplus.`
                            : `Expenses exceed blocked account payout by €${Math.abs(singleCityCalc.surplusOrDeficit)}. Recommended: 10-15h/week Werkstudent job.`}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-gray-300 space-y-2 font-mono">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Annual Sperrkonto Requirement: <strong className="text-slate-900 dark:text-white">€11,904</strong> (mandatory for German student visa).</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span>{singleCityData.description}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 dark:text-gray-400 font-mono">
                      Need help opening your Blocked Account &amp; TK Insurance?
                    </span>
                    <a
                      href="#toolkit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-600/25"
                    >
                      <span>Open Student Toolkit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: OFFICIAL VERIFICATION & APPLICATION PORTALS                        */}
        {/* ========================================================================= */}
        {activeTab === 'portals' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Portals Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 backdrop-blur-xl text-center max-w-4xl mx-auto shadow-sm dark:shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/30 text-xs font-mono text-cyan-800 dark:text-cyan-300 mb-3 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>German Federal &amp; Institutional Authorities</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                Official German Government Portals &amp; Verification Suite
              </h3>
              <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Every legitimate German university application, visa dossier, and degree accreditation relies on these 5 federally recognized platforms. Bookmark and consult them before submitting.
              </p>
            </div>

            {/* The 5 Official Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {/* CARD 1: DAAD */}
              <div className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-xs">
                      <Search className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-bold">
                      daad.de · study-in-germany.de
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    DAAD (German Academic Exchange Service)
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    The premier German public agency for international student exchange. Discover 2,000+ English-taught degree programs, tuition rules, and official scholarship opportunities.
                  </p>

                  <div className="space-y-2 text-xs font-mono mb-6 bg-slate-50 dark:bg-[#090B12] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>2,000+ English-taught programs</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Tuition-free public university filters</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Scholarship &amp; research funding database</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.daad.de/en/studying-in-germany/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-daad"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-emerald-600/25 group-hover:scale-[1.02]"
                >
                  <span>Open DAAD Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 2: MAKE IT IN GERMANY */}
              <div className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 flex items-center justify-center text-amber-700 dark:text-amber-400 shadow-xs">
                      <Globe2 className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold">
                      make-it-in-germany.com
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Make it in Germany (Federal Government Portal)
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    The Federal Government’s official multi-lingual portal for international qualified professionals, student researchers, and skilled graduates settling in Germany.
                  </p>

                  <div className="space-y-2 text-xs font-mono mb-6 bg-slate-50 dark:bg-[#090B12] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Federal immigration regulations</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Working student &amp; 18-month job seeker visa</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>EU Blue Card &amp; permanent residency guide</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.make-it-in-germany.com/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-make-it-in-germany"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-amber-600/25 group-hover:scale-[1.02]"
                >
                  <span>Open Make it in Germany</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 3: ANABIN DATABASE */}
              <div className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-300 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shadow-xs">
                      <Scale className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/30 font-bold">
                      anabin.kmk.org
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Anabin (Qualification Recognition Portal)
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    Operated by the Standing Conference of the Ministers of Education (KMK). Verify if your home university holds 'H+' institutional accreditation and Bachelor equivalency.
                  </p>

                  <div className="space-y-2 text-xs font-mono mb-6 bg-slate-50 dark:bg-[#090B12] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>H+ status = Fully accredited institute</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Verify degree equivalency ('Entspricht')</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Required for German student visa &amp; APS</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://anabin.kmk.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-anabin"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-indigo-600/25 group-hover:scale-[1.02]"
                >
                  <span>Open Anabin Database</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 4: UNI-ASSIST */}
              <div className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shadow-xs">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-bold">
                      uni-assist.de
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Uni-Assist (Application Service)
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    The centralized evaluation service for international applications. Audits foreign certificates, converts grades, and issues your Vorprüfungsdokumentation (VPD).
                  </p>

                  <div className="space-y-2 text-xs font-mono mb-6 bg-slate-50 dark:bg-[#090B12] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>VPD (Vorprüfungsdokumentation)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Mandated by 180+ public German universities</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Processing window: 4 to 6 weeks</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.uni-assist.de/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-uni-assist"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-cyan-600/25 group-hover:scale-[1.02]"
                >
                  <span>Open Uni-Assist Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 5: GERMAN FEDERAL FOREIGN OFFICE */}
              <div className="bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group transition-all md:col-span-2 lg:col-span-2">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/15 border border-blue-300 dark:border-blue-500/30 flex items-center justify-center text-blue-700 dark:text-blue-400 shadow-xs">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30 font-bold">
                      auswaertiges-amt.de
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    German Federal Foreign Office (Auswärtiges Amt - Visa Info)
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                    The supreme statutory authority on German National Visas (Category D). Review official blocked account thresholds (€992/month / €11,904/year), health insurance mandates, and embassy appointment scheduling.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono mb-6 bg-slate-50 dark:bg-[#090B12] p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04]">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>Statutory €992/mo Blocked Account</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>National D-Visa official checklists</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Embassy &amp; VFS consular jurisdiction</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-auswaertiges-amt"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-blue-600/25 group-hover:scale-[1.01]"
                >
                  <span>Open Auswärtiges Amt Visa Service</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Action Assistance Strip */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0D15] border border-slate-200 dark:border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-600 dark:text-gray-400 font-mono shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-900 dark:text-white font-semibold block text-sm">Need help verifying your University status or submitting via Uni-Assist?</span>
                  <span>Prakhar provides step-by-step document audits and deadline roadmaps during 1-on-1 strategy sessions.</span>
                </div>
              </div>

              <button
                onClick={onBookCallClick}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 font-semibold shadow-md shadow-indigo-600/20 transition-all"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Global Footer Quick Portal Strip (visible across tabs to ensure persistent accessibility) */}
        {activeTab !== 'portals' && (
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#0E111C]/60 border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-gray-300 font-mono">
              <Globe2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>
                Looking for official verification? Access <strong className="text-slate-900 dark:text-white">DAAD</strong>, <strong className="text-slate-900 dark:text-white">Make it in Germany</strong>, <strong className="text-slate-900 dark:text-white">Anabin</strong>, <strong className="text-slate-900 dark:text-white">Uni-Assist</strong>, and <strong className="text-slate-900 dark:text-white">Auswärtiges Amt</strong>.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('portals')}
              className="text-xs font-mono text-cyan-700 dark:text-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 shrink-0"
            >
              <span>View Official Portals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

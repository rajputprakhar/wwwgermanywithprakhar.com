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
  Train
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
  // 1. GERMAN GRADE CONVERTER (FEDERAL KMK STANDARD)
  // Formula: German Grade = 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin))
  // =========================================================================
  const [scaleType, setScaleType] = useState<'cgpa10' | 'percentage' | 'gpa4' | 'custom'>('cgpa10');
  const [maxScore, setMaxScore] = useState<number>(10);
  const [minPassScore, setMinPassScore] = useState<number>(4);
  const [actualScore, setActualScore] = useState<number>(8.4);

  const calculateGermanGrade = () => {
    if (maxScore <= minPassScore || actualScore < minPassScore || actualScore > maxScore) {
      return null;
    }
    const grade = 1 + 3 * ((maxScore - actualScore) / (maxScore - minPassScore));
    return Math.min(4.0, Math.max(1.0, parseFloat(grade.toFixed(2))));
  };

  const germanGrade = calculateGermanGrade();

  const getGermanGradeVerdict = (grade: number | null) => {
    if (grade === null) return { 
      text: 'Invalid Score Range', 
      color: 'text-rose-400', 
      badge: 'Error', 
      advice: 'Ensure your obtained score is between the minimum passing mark and maximum possible score.' 
    };
    if (grade <= 1.5) return { 
      text: 'Sehr Gut (Very Good / Outstanding)', 
      color: 'text-emerald-400', 
      badge: 'TU9 Top Contender', 
      advice: 'Exceptional profile. High eligibility for TU Munich, RWTH Aachen, KIT, and TU Berlin. SOP alignment and subject-specific ECTS curriculum matching will be your deciding factor.' 
    };
    if (grade <= 2.0) return { 
      text: 'Gut (Good / High Competitiveness)', 
      color: 'text-cyan-400', 
      badge: 'Strong Admission Odds', 
      advice: 'Very competitive standing across major German public research universities like Uni Bremen, Uni Stuttgart, FAU Erlangen, and Uni Bonn.' 
    };
    if (grade <= 2.5) return { 
      text: 'Befriedigend (Satisfactory / Target Range)', 
      color: 'text-amber-400', 
      badge: 'Target University Range', 
      advice: 'Eligible for many open-admission and moderate NC master programs, plus top-ranked Universities of Applied Sciences (HAW/FH) with strong industry integration.' 
    };
    return { 
      text: 'Ausreichend (Sufficient / Strict Selection)', 
      color: 'text-orange-400', 
      badge: 'Strategic Selection Required', 
      advice: 'Focus on universities with aptitude entrance tests (Eignungsfeststellung), universities in eastern Germany (e.g. Chemnitz, Magdeburg), or programs evaluating GRE / practical portfolio.' 
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
    <section id="tools" className="relative py-24 bg-[#08090E] overflow-hidden max-w-[100vw] border-t border-white/[0.06]">
      {/* Ambient Lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono text-blue-300 mb-4">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admissions &amp; Financial Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Germany Admissions &amp; Cost Calculators
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Free, mathematically precise tools engineered specifically for international students planning their degree in Germany.
          </p>

          {/* Navigation Tabs (Responsive Flex-Wrap, No Horizontal Scroll) */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#0F121F] border border-white/10 shadow-xl max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTab('grade')}
              id="tab-btn-grade-converter"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'grade'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Grade Converter</span>
            </button>

            <button
              onClick={() => setActiveTab('cost')}
              id="tab-btn-cost-calculator"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'cost'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Living Cost &amp; Sperrkonto</span>
            </button>

            <button
              onClick={() => setActiveTab('portals')}
              id="tab-btn-official-portals"
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'portals'
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-4 h-4 text-indigo-400 shrink-0" />
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
              <div className="lg:col-span-6 bg-[#0E111C]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        German Grade Converter (Federal KMK Standard)
                      </h3>
                    </div>
                    {/* Explanatory Sub-Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs font-mono text-indigo-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Standardized 1.0 – 4.0 conversion formula utilized across all public universities in Germany.</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Resolutions established by the Standing Conference of the Ministers of Education and Cultural Affairs (<strong className="text-gray-200">Kultusministerkonferenz - KMK</strong>) enforce this mathematical model across all 16 German federal states (Bavaria, Baden-Württemberg, Berlin, NRW, Saxony, etc.).
                    </p>
                  </div>

                  {/* Grading Scale Preset Selector */}
                  <div className="mb-6">
                    <span className="text-xs font-mono text-gray-400 mb-2.5 block">Select Grading System:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => {
                          setScaleType('cgpa10');
                          setMaxScore(10);
                          setMinPassScore(4);
                          setActualScore(8.4);
                        }}
                        id="scale-btn-cgpa10"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                          scaleType === 'cgpa10'
                            ? 'bg-indigo-600/25 border-indigo-500 text-white font-semibold shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
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
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                          scaleType === 'percentage'
                            ? 'bg-indigo-600/25 border-indigo-500 text-white font-semibold shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
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
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                          scaleType === 'gpa4'
                            ? 'bg-indigo-600/25 border-indigo-500 text-white font-semibold shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        4.0 Scale GPA
                      </button>

                      <button
                        onClick={() => setScaleType('custom')}
                        id="scale-btn-custom"
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                          scaleType === 'custom'
                            ? 'bg-indigo-600/25 border-indigo-500 text-white font-semibold shadow-sm'
                            : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white'
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
                        <label htmlFor={maxScoreId} className="block text-xs font-mono text-gray-400 mb-1.5">
                          Maximum Possible (Nmax)
                        </label>
                        <input
                          id={maxScoreId}
                          type="number"
                          step="0.1"
                          value={maxScore}
                          onChange={(e) => setMaxScore(parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#141824] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                      <div>
                        <label htmlFor={minScoreId} className="block text-xs font-mono text-gray-400 mb-1.5">
                          Minimum Pass (Nmin)
                        </label>
                        <input
                          id={minScoreId}
                          type="number"
                          step="0.1"
                          value={minPassScore}
                          onChange={(e) => setMinPassScore(parseFloat(e.target.value) || 0)}
                          className="w-full bg-[#141824] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor={actualScoreId} className="text-xs font-mono text-gray-400">
                          Your Actual Obtained Score (Nd)
                        </label>
                        <span className="text-xs font-mono font-bold text-cyan-300">
                          {actualScore}
                        </span>
                      </div>
                      <input
                        id={actualScoreId}
                        type="number"
                        step="0.05"
                        min={minPassScore}
                        max={maxScore}
                        value={actualScore}
                        onChange={(e) => setActualScore(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#141824] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Mathematical Formula Footnote */}
                <div className="mt-6 p-4 rounded-xl bg-[#0B0D15] border border-white/[0.06] flex items-start gap-3">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-gray-400 font-mono space-y-1">
                    <div className="text-white font-semibold">Binding KMK Resolution Formula:</div>
                    <div>German Grade = 1 + 3 × [(Nmax - Nd) ÷ (Nmax - Nmin)]</div>
                    <div className="text-gray-500">1.0 is the highest distinction (Sehr Gut); 4.0 is minimum passing (Ausreichend).</div>
                  </div>
                </div>
              </div>

              {/* Results & Admission Competitiveness Column */}
              <div className="lg:col-span-6 bg-[#0E111C]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                    Official German Conversion Result
                  </span>

                  <div className="flex items-baseline gap-4 mb-4">
                    <div className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-cyan-300 font-mono tracking-tight">
                      {germanGrade !== null ? germanGrade.toFixed(2) : '—'}
                    </div>
                    {germanGrade !== null && (
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {gradeVerdict.badge}
                      </span>
                    )}
                  </div>

                  <div className={`text-base font-bold ${gradeVerdict.color} mb-3`}>
                    {gradeVerdict.text}
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {gradeVerdict.advice}
                  </p>

                  {/* University Tier Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-gray-300 font-mono">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 1.9 ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-gray-600'}`} />
                        <span className="font-medium text-white">TU9 Flagships (TUM, RWTH Aachen, KIT):</span>
                      </div>
                      <span className="text-cyan-300 sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 1.9</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 2.5 ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-gray-600'}`} />
                        <span className="font-medium text-white">Major Research Universities (Uni Bremen, Stuttgart, Bonn):</span>
                      </div>
                      <span className="text-cyan-300 sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 2.5</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${germanGrade && germanGrade <= 2.9 ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-gray-600'}`} />
                        <span className="font-medium text-white">Universities of Applied Sciences (Fachhochschulen / HAW):</span>
                      </div>
                      <span className="text-cyan-300 sm:text-gray-400 sm:ml-auto shrink-0 font-semibold sm:font-normal">Target: ≤ 2.9</span>
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-gray-400">
                    Need ECTS curriculum mapping or guidance for your target program?
                  </div>
                  <button
                    onClick={onBookCallClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-600/30"
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
            <div className="p-5 sm:p-6 rounded-3xl bg-[#0E111C]/90 border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="flex items-center gap-2.5">
                  <Coins className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    Multi-City Living Cost &amp; Sperrkonto Comparison
                  </h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Compare student costs across 19 major German cities against the official monthly Blocked Account payout of <strong className="text-emerald-400 font-mono">€{OFFICIAL_SPERRKONTO_MONTHLY}/mo</strong> (€11,904/yr).
                </p>
              </div>

              {/* View Modes & Housing Selector */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
                {/* Mode Selector */}
                <div className="inline-flex p-1 rounded-xl bg-[#090B12] border border-white/10 text-xs font-medium">
                  <button
                    onClick={() => setCostMode('compare')}
                    id="cost-mode-compare"
                    className={`px-3.5 py-1.5 rounded-lg transition-all ${
                      costMode === 'compare'
                        ? 'bg-blue-600 text-white font-semibold shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Compare 2-3 Cities
                  </button>
                  <button
                    onClick={() => setCostMode('single')}
                    id="cost-mode-single"
                    className={`px-3.5 py-1.5 rounded-lg transition-all ${
                      costMode === 'single'
                        ? 'bg-blue-600 text-white font-semibold shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Single City Simulator
                  </button>
                </div>

                {/* Accommodation type */}
                <div className="inline-flex p-1 rounded-xl bg-[#090B12] border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setHousingType('wg')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      housingType === 'wg' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    WG Room
                  </button>
                  <button
                    onClick={() => setHousingType('dorm')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      housingType === 'dorm' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Dorm
                  </button>
                  <button
                    onClick={() => setHousingType('studio')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      housingType === 'studio' ? 'bg-indigo-600 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Studio
                  </button>
                </div>
              </div>
            </div>

            {/* Quick City Filter Tags for Side-by-Side Comparison */}
            {costMode === 'compare' && (
              <div className="p-5 rounded-2xl bg-[#0E111C]/60 border border-white/[0.06] backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="text-xs font-mono text-gray-300 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Select 2 or 3 Cities to Compare (Active: {comparisonCities.join(', ')}):</span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="text-gray-500">Presets:</span>
                    <button
                      onClick={() => setComparisonCities(['Bremen', 'Munich', 'Leipzig'])}
                      className="text-cyan-400 hover:underline"
                    >
                      Bremen / Munich / Leipzig
                    </button>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <button
                      onClick={() => setComparisonCities(['Aachen', 'Berlin', 'Dresden'])}
                      className="text-cyan-400 hover:underline"
                    >
                      Aachen / Berlin / Dresden
                    </button>
                  </div>
                </div>

                {/* Tier Groups Filter Buttons */}
                <div className="space-y-2.5">
                  {/* High-tier row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 mr-1.5">
                      High-Tier Hubs:
                    </span>
                    {HIGH_TIER_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-900/50'
                              : 'bg-white/[0.04] text-gray-300 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {city} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mid-tier row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mr-1.5">
                      Mid-Tier Balanced:
                    </span>
                    {MID_TIER_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-900/50'
                              : 'bg-white/[0.04] text-gray-300 hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {city} {isSelected && '✓'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Budget row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mr-1.5">
                      High Affordability:
                    </span>
                    {BUDGET_CITIES.map(city => {
                      const isSelected = comparisonCities.includes(city);
                      return (
                        <button
                          key={city}
                          onClick={() => toggleCityInComparison(city)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-900/50'
                              : 'bg-white/[0.04] text-gray-300 hover:bg-white/10 border border-white/10'
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
                      className="bg-[#0E111C]/90 border border-white/10 rounded-3xl p-5 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-white/25 transition-all"
                    >
                      <div>
                        {/* City Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-gradient-to-r ${city.tierColor}`}>
                              {city.tierLabel}
                            </span>
                            <h4 className="text-2xl font-extrabold text-white tracking-tight mt-1.5">
                              {city.name}
                            </h4>
                            <span className="text-xs text-gray-400 font-mono">
                              State: {city.state}
                            </span>
                          </div>

                          {/* Quick remove/swap badge */}
                          {comparisonCities.length > 2 && (
                            <button
                              onClick={() => toggleCityInComparison(city.name)}
                              className="text-[11px] font-mono text-gray-500 hover:text-rose-400 p-1"
                              title="Remove city from comparison"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        {/* Total Monthly Cost Display */}
                        <div className="p-4 rounded-2xl bg-[#090B12] border border-white/[0.06] mb-5">
                          <span className="text-[11px] font-mono text-gray-400 block mb-1">
                            Estimated Monthly Cost ({housingType.toUpperCase()}):
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
                              €{calc.total}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">/ mo</span>
                          </div>

                          {/* Sperrkonto Delta */}
                          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                            <span className="text-gray-400">Blocked Account Delta:</span>
                            <span className={`font-bold px-2 py-0.5 rounded ${
                              isSurplus 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {isSurplus ? `+€${calc.surplusOrDeficit} Surplus` : `-€${Math.abs(calc.surplusOrDeficit)} Deficit`}
                            </span>
                          </div>

                          {/* Progress Meter against €992 */}
                          <div className="w-full bg-white/10 rounded-full h-1.5 mt-3 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isSurplus ? 'bg-emerald-400' : 'bg-amber-500'}`}
                              style={{ width: `${Math.min(100, (calc.total / OFFICIAL_SPERRKONTO_MONTHLY) * 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="space-y-2.5 text-xs font-mono mb-6">
                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-400">Average WG Rent (Warm):</span>
                            <span className="text-white font-bold">€{city.rentWg}/mo</span>
                          </div>

                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-400">Dorm / Studio Rent:</span>
                            <span className="text-gray-300">€{city.rentDorm} / €{city.rentStudio}</span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-400 shrink-0">Semesterbeitrag:</span>
                            <span className="text-white font-bold text-right">€{city.semesterContribution}/sem <span className="text-gray-400 font-normal text-[11px]">(~€{calc.monthlySemesterbeitrag}/mo)</span></span>
                          </div>

                          <div className="flex items-center justify-between gap-2 py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-400 shrink-0">Transit Pass:</span>
                            <span className="text-cyan-300 text-right font-medium text-[11px] max-w-[190px]">{city.semesterTicketStatus}</span>
                          </div>

                          <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-400">Public Health Insurance (TK):</span>
                            <span className="text-white">€{TK_INSURANCE_MONTHLY}/mo</span>
                          </div>

                          <div className="flex justify-between py-1.5">
                            <span className="text-gray-400">Groceries &amp; Leisure:</span>
                            <span className="text-white">€{city.groceries + city.leisure}/mo</span>
                          </div>
                        </div>

                        {/* Transit note & Unis */}
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] space-y-1.5 mb-4">
                          <div className="text-gray-300 flex items-start gap-1.5">
                            <Train className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{city.transitNote}</span>
                          </div>
                          <div className="text-gray-400 text-[10px]">
                            Key Unis: {city.notableUnis.join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* City Commentary */}
                      <div className="pt-3 border-t border-white/[0.06] text-xs text-gray-400">
                        {isSurplus ? (
                          <span className="text-emerald-400 flex items-center gap-1.5">
                            <Check className="w-4 h-4 shrink-0" />
                            <span>Sperrkonto covers living with €{calc.surplusOrDeficit} monthly buffer.</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1.5">
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
                <div className="lg:col-span-6 bg-[#0E111C]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
                  <h4 className="text-lg font-bold text-white mb-2">
                    Select German Hub &amp; Customize Budget
                  </h4>
                  <p className="text-xs text-gray-400 mb-5">
                    Choose from all 19 cities across high-tier, mid-tier, and high-affordability regions.
                  </p>

                  <div className="mb-6">
                    <label htmlFor={citySelectId} className="block text-xs font-mono text-gray-400 mb-2">
                      Select University City:
                    </label>
                    <select
                      id={citySelectId}
                      value={selectedSingleCity}
                      onChange={(e) => setSelectedSingleCity(e.target.value)}
                      className="w-full bg-[#141824] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
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
                      className={`p-3 rounded-xl text-left border transition-all ${
                        housingType === 'wg' ? 'bg-indigo-600/25 border-indigo-500 text-white' : 'bg-white/[0.02] border-white/10 text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">WG Flatshare</div>
                      <div className="text-[10px] text-gray-400">€{singleCityData.rentWg}/mo</div>
                    </button>
                    <button
                      onClick={() => setHousingType('dorm')}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        housingType === 'dorm' ? 'bg-indigo-600/25 border-indigo-500 text-white' : 'bg-white/[0.02] border-white/10 text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Student Dorm</div>
                      <div className="text-[10px] text-gray-400">€{singleCityData.rentDorm}/mo</div>
                    </button>
                    <button
                      onClick={() => setHousingType('studio')}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        housingType === 'studio' ? 'bg-indigo-600/25 border-indigo-500 text-white' : 'bg-white/[0.02] border-white/10 text-gray-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Studio Flat</div>
                      <div className="text-[10px] text-gray-400">€{singleCityData.rentStudio}/mo</div>
                    </button>
                  </div>

                  {/* Detailed Table */}
                  <div className="p-4 rounded-2xl bg-[#090B12] border border-white/[0.06] space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Warm Rent ({housingType.toUpperCase()}):</span>
                      <span className="text-white">€{singleCityCalc.rent}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Semesterbeitrag (Pro-rated):</span>
                      <span className="text-white">€{singleCityCalc.monthlySemesterbeitrag}/mo (€{singleCityData.semesterContribution}/sem)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transit Pass:</span>
                      <span className="text-cyan-300">{singleCityData.semesterTicketStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">TK Health Insurance:</span>
                      <span className="text-white">€{TK_INSURANCE_MONTHLY}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Groceries &amp; Cooking:</span>
                      <span className="text-white">€{singleCityData.groceries}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leisure, Mobile SIM &amp; GEZ:</span>
                      <span className="text-white">€{singleCityData.leisure + singleCityData.phoneWifiMisc}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-[#0E111C]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">
                      Total Monthly Budget for {singleCityData.name}
                    </span>

                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="text-5xl font-extrabold text-white font-mono">
                        €{singleCityCalc.total}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">/ month</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border border-blue-500/20 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-200">German Sperrkonto Monthly Payout:</span>
                        <span className="font-mono text-xs font-bold text-white">€{OFFICIAL_SPERRKONTO_MONTHLY}/mo</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${singleCityCalc.isCovered ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, (singleCityCalc.total / OFFICIAL_SPERRKONTO_MONTHLY) * 100)}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[11px] font-mono">
                        <span className={singleCityCalc.isCovered ? 'text-emerald-300' : 'text-amber-300'}>
                          {singleCityCalc.isCovered
                            ? `✓ Blocked account payout comfortably covers your ${singleCityData.name} expenses with €${singleCityCalc.surplusOrDeficit} surplus.`
                            : `Expenses exceed blocked account payout by €${Math.abs(singleCityCalc.surplusOrDeficit)}. Recommended: 10-15h/week Werkstudent job.`}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-300 space-y-2 font-mono">
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Annual Sperrkonto Requirement: <strong className="text-white">€11,904</strong> (mandatory for German student visa).</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{singleCityData.description}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-gray-400">
                      Need help opening your Blocked Account &amp; TK Insurance?
                    </span>
                    <a
                      href="#toolkit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-lg shadow-cyan-600/30"
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
        {/* TAB 3: EMBED OFFICIAL DEGREE VERIFICATION & PORTAL SUITE                 */}
        {/* ========================================================================= */}
        {activeTab === 'portals' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Portals Header */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E111C]/90 border border-white/10 backdrop-blur-xl text-center max-w-4xl mx-auto shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Federal Portals</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Official Verification &amp; Application Portals
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Every legitimate German university application relies on these three federally mandated public portals. Bookmark and consult them before applying.
              </p>
            </div>

            {/* The 3 Core Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {/* CARD 1: ANABIN DATABASE */}
              <div className="bg-[#0E111C]/90 border border-white/10 hover:border-indigo-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-md">
                      <Scale className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                      KMK ACCREDITATION
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white tracking-tight mb-2">
                    University &amp; Degree Recognition (Anabin)
                  </h4>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    Check if your home university holds 'H+' institutional status and verify if your Bachelor's degree qualifies for direct German university admission.
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs text-gray-400 font-mono mb-6 bg-[#090B12] p-3.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>H+ status = Fully accredited</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Verify degree equivalency ('Entspricht')</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Required for German visa &amp; APS</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://anabin.kmk.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-anabin"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-indigo-600/30 group-hover:scale-[1.02]"
                >
                  <span>Open Anabin Database</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 2: UNI-ASSIST */}
              <div className="bg-[#0E111C]/90 border border-white/10 hover:border-cyan-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
                      <Building className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      CENTRAL APPLICATION
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white tracking-tight mb-2">
                    Uni-Assist Application Portal
                  </h4>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    The central service for international student applications. Evaluates foreign certificates and calculates your Preliminary Review Documentation (VPD).
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs text-gray-400 font-mono mb-6 bg-[#090B12] p-3.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-2 text-cyan-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>VPD (Vorprüfungsdokumentation)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Used by 180+ public German unis</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Processing time: 4 to 6 weeks</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.uni-assist.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-uni-assist"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-cyan-600/30 group-hover:scale-[1.02]"
                >
                  <span>Open Uni-Assist Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* CARD 3: DAAD PORTAL */}
              <div className="bg-[#0E111C]/90 border border-white/10 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
                      <Search className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      PROGRAM DATABASE
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white tracking-tight mb-2">
                    DAAD International Programmes &amp; Scholarships
                  </h4>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    The official German Academic Exchange Service database to discover English-taught Bachelor's and Master's programs and funding opportunities.
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 text-xs text-gray-400 font-mono mb-6 bg-[#090B12] p-3.5 rounded-xl border border-white/[0.04]">
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>2,000+ English-taught degree programs</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Filter 100% tuition-free public degrees</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Info className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Scholarship &amp; grant funding database</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.daad.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="portal-link-daad"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-emerald-600/30 group-hover:scale-[1.02]"
                >
                  <span>Open DAAD Database</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Action Assistance Strip */}
            <div className="p-6 rounded-2xl bg-[#0B0D15] border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-white font-semibold block text-sm">Need help verifying your University status or submitting via Uni-Assist?</span>
                  <span>Prakhar provides step-by-step document audits and deadline roadmaps during 1-on-1 strategy sessions.</span>
                </div>
              </div>

              <button
                onClick={onBookCallClick}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 shrink-0 font-medium"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Global Footer Quick Portal Strip (visible across tabs to ensure persistent accessibility) */}
        {activeTab !== 'portals' && (
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-[#0E111C]/60 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-300 font-mono">
              <Globe2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Looking for official verification? Access <strong className="text-white">Anabin</strong>, <strong className="text-white">Uni-Assist</strong>, and <strong className="text-white">DAAD</strong> directly.
              </span>
            </div>
            <button
              onClick={() => setActiveTab('portals')}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1.5 shrink-0"
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

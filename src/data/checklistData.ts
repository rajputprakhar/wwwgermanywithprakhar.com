export interface ChecklistItem {
  id: string;
  title: string;
  category: 'aps-academics' | 'applications-sop' | 'visa-finance';
  issuingAuthority: string;
  mandatoryFor: string;
  deadlineNote: string;
  description: string;
  proTip: string;
  officialLink?: string;
  badge: 'Mandatory' | 'Critical' | 'Visa Standard' | 'Faculty Dependent';
}

export const ESSENTIAL_DOCUMENTS: ChecklistItem[] = [
  // -------------------------------------------------------------
  // 1. APS & ACADEMIC DOSSIER
  // -------------------------------------------------------------
  {
    id: 'doc-aps',
    title: 'APS Certificate (Akademische Prüfstelle)',
    category: 'aps-academics',
    issuingAuthority: 'German Embassy / APS India / China / Vietnam',
    mandatoryFor: 'German National Visa & Uni Admissions',
    deadlineNote: 'Apply 3-5 months before university application deadlines',
    description: 'Mandatory verification document authenticating your academic credentials, school certificates, and Bachelor transcripts for Indian, Chinese, and Vietnamese applicants.',
    proTip: 'Submit digital DigiLocker / professor official email verification to speed up processing from 12 weeks to under 4 weeks.',
    officialLink: 'https://aps-india.info',
    badge: 'Mandatory'
  },
  {
    id: 'doc-degree-certificate',
    title: 'Bachelor / Provisional Degree Certificate',
    category: 'aps-academics',
    issuingAuthority: 'Home University / Examination Board',
    mandatoryFor: 'Uni-Assist, Direct Applications & Enrollment',
    deadlineNote: 'Required at visa interview or upon university matriculation',
    description: 'Official degree convocation certificate or Bonafide Provisional Degree Certificate stating completion of your qualifying program with cumulative CGPA.',
    proTip: 'If your degree was not issued in English or German, obtain a certified, notarized English translation with official apostille.',
    badge: 'Mandatory'
  },
  {
    id: 'doc-transcripts',
    title: 'Consolidated Marksheet & Semester Transcripts',
    category: 'aps-academics',
    issuingAuthority: 'Autonomous College / University Registrar',
    mandatoryFor: 'All University Admissions & APS Verification',
    deadlineNote: 'All completed semesters (1 through 8 for 4-year B.Tech / B.E.)',
    description: 'Complete breakdown of all courses, credit hours, semester grades, and backlogs (or 0-backlog clearance summary).',
    proTip: 'Ensure the reverse side contains the official grading scale legend (formula converting credit points to percentage or GPA).',
    badge: 'Mandatory'
  },
  {
    id: 'doc-module-handbook',
    title: 'Official Curriculum Syllabus & Module Handbook',
    category: 'aps-academics',
    issuingAuthority: 'Academic Department / Faculty Board',
    mandatoryFor: 'Subject Specific Prerequisites & ECTS Equivalency',
    deadlineNote: 'Crucial for TU9 and Uni Bremen Computer Science admissions',
    description: 'Comprehensive course catalogue listing topics taught, lecture hours, practical laboratory credits, and textbook references for each passed subject.',
    proTip: 'German admission commissions strictly check ECTS compatibility (e.g. minimum 18 ECTS in Theoretical CS / Math). Highlight relevant modules clearly.',
    badge: 'Critical'
  },
  {
    id: 'doc-language-proof',
    title: 'Language Proficiency Certificate (IELTS / TOEFL / Goethe)',
    category: 'aps-academics',
    issuingAuthority: 'IDP / British Council / ETS / Goethe-Institut',
    mandatoryFor: 'University Matriculation & Embassy Visa Interview',
    deadlineNote: 'Validity is 2 years from test examination date',
    description: 'Standardized proof of language competence: Minimum 6.5–7.0 IELTS for English-taught Master programs, or TestDaF 4x4 / Goethe C1 for German tracks.',
    proTip: 'Most German universities do NOT accept "Medium of Instruction (MOI)" certificates for competitive master degrees; take IELTS Academic early.',
    badge: 'Mandatory'
  },
  {
    id: 'doc-school-leaving',
    title: 'Secondary & Higher Secondary Certificates (10th & 12th Board)',
    category: 'aps-academics',
    issuingAuthority: 'State Board / CBSE / ICSE / IB Board',
    mandatoryFor: 'APS Certification & Hochschulzugangsberechtigung (HZB)',
    deadlineNote: 'Required for foundational equivalence audit',
    description: 'Standard 10th and 12th passing certificates proving completion of primary-secondary education (Abitur equivalence).',
    proTip: 'Color scans of original certificates must be uploaded; never submit black-and-white xerox copies to APS.',
    badge: 'Mandatory'
  },

  // -------------------------------------------------------------
  // 2. UNIVERSITY APPLICATION & STRATEGY DOSSIER
  // -------------------------------------------------------------
  {
    id: 'doc-sop',
    title: 'Academic Statement of Purpose (Motivationsschreiben)',
    category: 'applications-sop',
    issuingAuthority: 'Applicant (Tailored to Specific Chair / Faculty)',
    mandatoryFor: 'All German University Admission Portals',
    deadlineNote: '1–2 pages maximum (approx. 800–1,200 words)',
    description: 'Formal academic justification detailing research interests, thesis alignment, previous software projects, and exact modules you plan to take at the university.',
    proTip: 'Avoid generic storytelling. German professors evaluate technical rigor, matching your bachelor coursework directly to their master curriculum labs.',
    badge: 'Critical'
  },
  {
    id: 'doc-cv',
    title: 'German / Europass-Format Curriculum Vitae (Lebenslauf)',
    category: 'applications-sop',
    issuingAuthority: 'Applicant',
    mandatoryFor: 'All Applications, APS & Visa Dossiers',
    deadlineNote: 'Structured tabular reverse-chronological format',
    description: 'Professional CV with exact dates (MM/YYYY - MM/YYYY), high school, university grades, tech stack, open-source projects, and internships without temporal gaps.',
    proTip: 'Explain any gap months transparently (e.g. "Full-time GRE/IELTS Preparation" or "Freelance Engineering").',
    badge: 'Mandatory'
  },
  {
    id: 'doc-lors',
    title: 'Letters of Recommendation (Academic & Professional LORs)',
    category: 'applications-sop',
    issuingAuthority: 'University Professors / HOD / Workplace Supervisors',
    mandatoryFor: 'Selective Master Programs & DAAD Scholarships',
    deadlineNote: 'Typically 2 academic LORs on official university letterhead',
    description: 'Detailed evaluation of your analytical acumen, project contributions, lab work ethic, and class ranking from recommending faculty members.',
    proTip: 'Must include referee official institutional email, phone number, and physical institutional seal/stamp.',
    badge: 'Faculty Dependent'
  },
  {
    id: 'doc-uni-assist-vpd',
    title: 'Uni-Assist VPD (Vorprüfungsdokumentation)',
    category: 'applications-sop',
    issuingAuthority: 'uni-assist e.V. (Berlin)',
    mandatoryFor: '180+ German Universities (e.g. TUM, Uni Bremen, RWTH)',
    deadlineNote: 'Process takes 4 to 6 weeks; apply weeks before uni deadline',
    description: 'Centralized preliminary evaluation document converting your foreign grading benchmarks into the official German grading scale (1.0 to 4.0).',
    proTip: 'You can apply for your VPD as soon as you have your 7th/8th semester marksheet, even before university portals open their winter intake.',
    officialLink: 'https://www.uni-assist.de/en/',
    badge: 'Mandatory'
  },
  {
    id: 'doc-gate-gre',
    title: 'GRE / GATE Scorecard & Portfolio (if applicable)',
    category: 'applications-sop',
    issuingAuthority: 'ETS / IIT GATE Authority / GitHub Repository',
    mandatoryFor: 'Mandatory for select programs (e.g. RWTH CS, TUM Informatics)',
    deadlineNote: 'Check exact institute requirements (GRE Quantitative > 164)',
    description: 'Standardized aptitude test scores or verified software engineering portfolio for high-NC computer science programs.',
    proTip: 'At universities like RWTH Aachen or TU Munich, GRE Quantitative score is an absolute hard eligibility filter for international CS applicants.',
    badge: 'Faculty Dependent'
  },

  // -------------------------------------------------------------
  // 3. VISA, FINANCIAL & HEALTH INSURANCE DOSSIER
  // -------------------------------------------------------------
  {
    id: 'doc-blocked-account',
    title: 'Official Sperrkonto (Blocked Account Proof - €11,904)',
    category: 'visa-finance',
    issuingAuthority: 'German Federal Foreign Office Approved Provider (Expatrio)',
    mandatoryFor: 'German National Student Visa (Category D)',
    deadlineNote: 'Statutory Requirement: €992/month (€11,904 for 1 year)',
    description: 'Official 06-Blocking Confirmation letter confirming the statutory living cost amount is deposited in an escrow blocked account under your name.',
    proTip: 'Use Expatrio Value Package for zero setup friction and instant digital blocking confirmation accepted by 100% of German consulates.',
    officialLink: 'https://www.expatrio.com?f=prakharr2',
    badge: 'Mandatory'
  },
  {
    id: 'doc-health-insurance',
    title: 'Statutory Health Insurance (TK) & M10 Notification',
    category: 'visa-finance',
    issuingAuthority: 'Techniker Krankenkasse (TK) / German Statutory Health Fund',
    mandatoryFor: 'University Matriculation & National Visa Interview',
    deadlineNote: 'M10 electronic cert sent directly to your German university',
    description: 'Statutory health coverage proof fulfilling Section 5 Para 1 No. 9 SGB V, providing comprehensive EU healthcare, dental, and emergency medical coverage.',
    proTip: 'Universities cannot finalize your enrollment (Immatrikulation) without the automated M10 digital reporting from TK.',
    officialLink: 'https://tk.de/studenten-service',
    badge: 'Mandatory'
  },
  {
    id: 'doc-passport',
    title: 'Valid International Passport',
    category: 'visa-finance',
    issuingAuthority: 'Passport Office / Ministry of External Affairs',
    mandatoryFor: 'APS, Flight Transit & Visa Stamping',
    deadlineNote: 'Minimum 12 months validity beyond intended date of arrival',
    description: 'Machine-readable international travel passport with minimum 2-3 clean facing blank pages for visa affixation and entry stamps.',
    proTip: 'Ensure your given name and surname match your academic degree certificates exactly to avoid bureaucratic affidavit hassles.',
    badge: 'Mandatory'
  },
  {
    id: 'doc-visa-form',
    title: 'National Visa Application (Videx Form D & Checklist)',
    category: 'visa-finance',
    issuingAuthority: 'German Federal Foreign Office / VFS Global Portal',
    mandatoryFor: 'German Visa Appointment & Consulate Interview',
    deadlineNote: 'Completed online via Videx portal with generated barcode',
    description: 'Fully completed, printed, and signed Category D National Student Visa application dossier in two complete duplicate sets.',
    proTip: 'Always prepare 2 identical physical folders: 1 folder for originals, 2 folders for photocopies arranged in the exact order requested by VFS.',
    officialLink: 'https://videx.diplo.de',
    badge: 'Mandatory'
  },
  {
    id: 'doc-biometric-photos',
    title: 'German Biometric Passport Photographs (35mm x 45mm)',
    category: 'visa-finance',
    issuingAuthority: 'Certified Professional Studio',
    mandatoryFor: 'Visa Application & German Residence Permit (eAT)',
    deadlineNote: 'Photos must not be older than 6 months',
    description: 'Standard 35mm x 45mm photographs with face occupying 70-80% of image, neutral facial expression, closed mouth, and light grey/white background.',
    proTip: 'Ask the photographer specifically for "German Visa Biometric Specification" (ICAO compliant). Do not submit US-visa sized (2x2 inch) photos.',
    badge: 'Mandatory'
  },
  {
    id: 'doc-accommodation-proof',
    title: 'Proof of Accommodation / Provisional Stay in Germany',
    category: 'visa-finance',
    issuingAuthority: 'Landlord / Studierendenwerk Dormitory / Hostel Booking',
    mandatoryFor: 'Visa Interview & City Registration (Anmeldung)',
    deadlineNote: 'Required for initial visa issuance and city registration',
    description: 'Formal room tenancy contract (Mietvertrag), student dorm offer letter, or temporary confirmed accommodation for your first 30 days in Germany.',
    proTip: 'For your visa appointment, a flexible 30-day booking or official Studierendenwerk waitlist confirmation is accepted by consulates.',
    badge: 'Visa Standard'
  }
];

export const CHECKLIST_CATEGORIES = [
  { id: 'all', label: 'All Documents', count: ESSENTIAL_DOCUMENTS.length },
  { 
    id: 'aps-academics', 
    label: 'APS & Academic Dossier', 
    count: ESSENTIAL_DOCUMENTS.filter(d => d.category === 'aps-academics').length 
  },
  { 
    id: 'applications-sop', 
    label: 'University & SOP Portfolio', 
    count: ESSENTIAL_DOCUMENTS.filter(d => d.category === 'applications-sop').length 
  },
  { 
    id: 'visa-finance', 
    label: 'Visa, Blocked Account & Health', 
    count: ESSENTIAL_DOCUMENTS.filter(d => d.category === 'visa-finance').length 
  }
] as const;

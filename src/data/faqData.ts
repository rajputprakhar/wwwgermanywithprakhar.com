export type FaqCategory = 'Admissions' | 'Visa & APS' | 'Financial & Sperrkonto' | 'Jobs & Tech';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  layer: 'evergreen' | 'policy-update';
  question: string;
  answer: string;
  badge?: string; // e.g. "Verified Policy Update"
  timestamp?: string; // e.g. "Updated: August 2026"
  source?: {
    name: string;
    url?: string;
  };
  keyTakeaway?: string;
}

export const EVERGREEN_FAQS: FaqItem[] = [
  // -------------------------------------------------------------
  // 1. ADMISSIONS (Layer A: Evergreen Core)
  // -------------------------------------------------------------
  {
    id: 'adm-core-1',
    category: 'Admissions',
    layer: 'evergreen',
    question: 'How does the Bavarian Formula convert my foreign GPA to the German 1.0–4.0 scale?',
    answer: 'The modified Bavarian Formula is the official standard mandated by the Standing Conference of the Ministers of Education and Cultural Affairs (KMK). It calculates: German Grade = 1 + 3 × [(Nmax - Nd) / (Nmax - Nmin)], where Nmax is maximum possible grade, Nmin is minimum passing grade, and Nd is your obtained grade. In Germany, 1.0 to 1.5 is "Sehr Gut" (Excellent), 1.6 to 2.5 is "Gut" (Good), 2.6 to 3.5 is "Befriedigend" (Satisfactory), and 4.0 is minimum pass. Many competitive CS programs (TUM, RWTH Aachen, TU Berlin) benchmark admission cutoff around 2.0 or better.',
    keyTakeaway: 'In the German system, lower numbers are better (1.0 is highest, 4.0 is pass).'
  },
  {
    id: 'adm-core-2',
    category: 'Admissions',
    layer: 'evergreen',
    question: 'What are ECTS credit equivalence requirements and why do so many applications get rejected on credit match?',
    answer: 'German consecutive Master’s programs require rigorous subject-specific curriculum congruence measured in ECTS credits (usually 180 ECTS for a 3-year Bachelor or 240 ECTS for a 4-year Bachelor). For instance, a Master in Computer Science typically demands at least 18–24 ECTS in pure Theoretical Computer Science and Mathematics (Calculus, Linear Algebra, Discrete Math) and 30+ ECTS in core Software Systems. If your Bachelor transcript lacks required theoretical foundations, German admission committees cannot substitute work experience for missing academic credits.',
    keyTakeaway: 'Always map your university syllabus directly against the specific department module handbook (Modulhandbuch) before applying.'
  },
  {
    id: 'adm-core-3',
    category: 'Admissions',
    layer: 'evergreen',
    question: 'What are the standard application windows for Winter and Summer Semesters in Germany?',
    answer: 'The majority of English-taught degree programs start in the Winter Semester (October to March). Applications typically open between April 15 and May 1, with strict hard deadlines on July 15 (or June 15 for non-EU applicants at universities like Uni Stuttgart or KIT). Summer Semester (April to September) applications typically run from November 15 to January 15. Because Uni-Assist preliminary evaluation (VPD) and APS certificate processing require 4–8 weeks, you should start your paperwork at least 4 months before deadline.',
    keyTakeaway: 'Winter Semester deadline is typically July 15; Summer Semester deadline is typically January 15.'
  },
  {
    id: 'adm-core-4',
    category: 'Admissions',
    layer: 'evergreen',
    question: 'Can I apply for a Master’s degree while still in my final semester of Bachelor studies?',
    answer: 'Yes, almost all public German universities accept provisional applications. You submit an official provisional transcript showing all completed semesters (e.g. Semesters 1 through 7 of an 8-semester degree) along with an official bonafide letter stating your expected graduation date and current cumulative GPA. Upon receiving conditional admission, you will be granted time until enrollment (Immatrikulation) or mid-first semester to submit your final degree diploma and consolidated marksheets.',
    keyTakeaway: 'Apply with 7 semesters of grades and an official graduation expectation certificate from your registrar.'
  },

  // -------------------------------------------------------------
  // 2. VISA & APS (Layer A: Evergreen Core)
  // -------------------------------------------------------------
  {
    id: 'visa-core-1',
    category: 'Visa & APS',
    layer: 'evergreen',
    question: 'What is an APS Certificate and why is it mandatory for students from India, China, and Vietnam?',
    answer: 'The Akademische Prüfstelle (APS) is a joint verification body run by the German Embassy and DAAD. It authenticates your secondary and post-secondary educational credentials directly with your school boards and universities before you can receive university admission or submit a German National Student Visa application (§ 16b AufenthG). It prevents counterfeit diplomas and verifies that your home institution is accredited (H+ on Anabin). Once issued, your digital APS certificate is valid indefinitely.',
    keyTakeaway: 'Mandatory prerequisite for visa filing and university enrollment; apply early as university verification takes time.'
  },
  {
    id: 'visa-core-2',
    category: 'Visa & APS',
    layer: 'evergreen',
    question: 'What documents are universally required for the German National Student Visa (Type D)?',
    answer: 'The core dossier includes: valid biometric passport (minimum 12 months validity), printed Videx application form, 2 biometric passport photos, official University Admission Letter (or conditional admission / VPD), digital APS Certificate, Blocked Account confirmation (Sperrkonto) proving full financial subsistence, incoming travel health insurance plus statutory German health insurance letter (TK, Barmer, etc.), English language score certificate, certified academic transcripts, and a detailed motivation letter / study plan.',
    keyTakeaway: 'Incomplete applications trigger consulate delays; keep physical originals and notarized color copies organized.'
  },
  {
    id: 'visa-core-3',
    category: 'Visa & APS',
    layer: 'evergreen',
    question: 'Can I travel to Germany on a tourist visa (Schengen Type C) and convert it to a student visa?',
    answer: 'No. German immigration law strictly prohibits converting a short-stay Schengen Tourist or Visit Visa (Type C) into a long-term Student Residence Permit (§ 16b AufenthG) inside Germany. You MUST apply for and enter Germany with a National Long-Term Visa (Type D) issued specifically for study purposes or prospective student study preparation (Studienbewerbervisum) through the German diplomatic mission in your home country.',
    keyTakeaway: 'Always enter with a National Student Visa (Category D). Type C cannot be converted locally.'
  },
  {
    id: 'visa-core-4',
    category: 'Visa & APS',
    layer: 'evergreen',
    question: 'Is German language proficiency required if my university degree is taught 100% in English?',
    answer: 'Legally, if your university admission letter explicitly confirms that the medium of instruction is 100% English and that you satisfied all linguistic prerequisites (via IELTS, TOEFL, or university degree verification), the German consulate cannot deny your student visa on German language grounds. However, for everyday bureaucratic registration (Anmeldung, Ausländerbehörde), tenancy agreements, grocery shopping, and finding working student (Werkstudent) tech jobs, conversational German (A2–B1) is practically indispensable.',
    keyTakeaway: 'Not mandatory for English-taught visa approval, but fundamentally essential for German job market mobility.'
  },

  // -------------------------------------------------------------
  // 3. FINANCIAL & SPERRKONTO (Layer A: Evergreen Core)
  // -------------------------------------------------------------
  {
    id: 'fin-core-1',
    category: 'Financial & Sperrkonto',
    layer: 'evergreen',
    question: 'What is a Sperrkonto (Blocked Account) and how does the monthly disbursement work?',
    answer: 'A Sperrkonto is a legally escrowed German bank account that guarantees to the German government that an international student has sufficient funds to cover subsistence, accommodation, and healthcare for at least one year without relying on public social welfare. Once you arrive in Germany, register your address (Anmeldung), and open a standard German current checking account (Girokonto like N26, Sparkasse, or Deutsche Bank), your blocked account releases one fixed monthly installment directly into your checking account on the first of every month.',
    keyTakeaway: 'You cannot withdraw the entire balance at once; it pays out strictly in equal monthly disbursements.'
  },
  {
    id: 'fin-core-2',
    category: 'Financial & Sperrkonto',
    layer: 'evergreen',
    question: 'Which Blocked Account providers are officially recognized by the German Federal Foreign Office?',
    answer: 'The German Federal Foreign Office (Auswärtiges Amt) officially recognizes major regulated fintech escrow providers including Coracle, Expatrio, and Fintiba, as well as traditional German commercial banks like Deutsche Bank. Leading student providers offer complete package solutions bundling the Sperrkonto with free incoming travel insurance and direct enrollment with statutory German health insurance funds (Techniker Krankenkasse, Barmer).',
    keyTakeaway: 'Coracle, Expatrio, and Fintiba are 100% recognized by German consulates worldwide.'
  },
  {
    id: 'fin-core-3',
    category: 'Financial & Sperrkonto',
    layer: 'evergreen',
    question: 'What is the difference between tuition fees and the Semester Contribution (Semesterbeitrag)?',
    answer: 'At public universities across 15 of 16 German federal states, undergraduate and consecutive master’s degrees charge zero tuition fees for all students, domestic and international alike. Instead, students pay a nominal administrative Semesterbeitrag (typically €250–€420 per semester). This contribution covers student union services (Studierendenwerk), university sports and facilities, and in almost all universities includes the official Deutschlandticket / Semesterticket providing unlimited regional train, subway, and bus transit across Germany.',
    keyTakeaway: 'Zero tuition fees at public universities; the €250–€420 semester fee includes extensive public transit.'
  },
  {
    id: 'fin-core-4',
    category: 'Financial & Sperrkonto',
    layer: 'evergreen',
    question: 'Why is statutory health insurance (Gesetzliche Krankenversicherung) compulsory for students?',
    answer: 'Under § 5 para. 1 no. 9 SGB V of German social security law, all enrolled university students under age 30 are legally mandated to maintain comprehensive statutory health insurance (such as Techniker Krankenkasse, Barmer, or DAK). You cannot formally matriculate or receive your student ID card without an electronic insurance confirmation (M10 certificate) sent directly from the health insurer to your university registrar. It covers 100% of doctor visits, prescription medicine, and hospital stays across Germany and the EU.',
    keyTakeaway: 'Matriculation is legally impossible without statutory health insurance confirmation.'
  },

  // -------------------------------------------------------------
  // 4. JOBS & TECH (Layer A: Evergreen Core)
  // -------------------------------------------------------------
  {
    id: 'jobs-core-1',
    category: 'Jobs & Tech',
    layer: 'evergreen',
    question: 'What is a Werkstudent (Working Student) position and how does it differ from a standard minijob?',
    answer: 'A Werkstudent role is a specialized employment status under German social law for full-time enrolled students. You can work up to 20 hours per week during semester terms (and full-time 40 hours during official semester vacations). Unlike standard employees, working students are exempt from paying unemployment and health insurance payroll contributions (since you already maintain student health insurance), only paying the standard 9.3% pension contribution. Software engineering and data Werkstudent roles pay between €14 to €25 per hour.',
    keyTakeaway: 'Werkstudent jobs offer lower tax deductions, industry experience, and pay typically €1,100–€1,900/month.'
  },
  {
    id: 'jobs-core-2',
    category: 'Jobs & Tech',
    layer: 'evergreen',
    question: 'Can I support my living expenses entirely through part-time work in Germany?',
    answer: 'Yes, once settled, many students cover their ongoing monthly expenses through a Werkstudent contract or HiWi (Hilfswissenschaftler / university research assistant) role. A 15–20 hour/week software developer position at €16/hour yields approximately €1,000–€1,350 net monthly income, which comfortably covers monthly rent, groceries, and student health insurance in cities like Bremen, Leipzig, Aachen, or Dresden. However, during your first semester, rely on your Sperrkonto while adjusting to academic workload and finding a position.',
    keyTakeaway: 'Covering living costs via part-time tech work is feasible from semester 2 onwards.'
  },
  {
    id: 'jobs-core-3',
    category: 'Jobs & Tech',
    layer: 'evergreen',
    question: 'What are the post-study job seeker visa and EU Blue Card pathways for international graduates?',
    answer: 'Upon graduating from a recognized German higher education institution, you are entitled to an 18-month Jobseeker Residence Permit (§ 20 para. 3 no. 1 AufenthG). During these 18 months, you have unrestricted work permission in any field. Once you secure a permanent employment contract matching your academic qualification with a salary meeting the minimum threshold, you can transition directly into an EU Blue Card (§ 18g AufenthG), granting permanent residency (Niederlassungserlaubnis) in as few as 21 to 27 months with German B1/A1 proficiency.',
    keyTakeaway: '18-month post-study visa allows unrestricted work, with fast-track permanent residency via EU Blue Card.'
  },
  {
    id: 'jobs-core-4',
    category: 'Jobs & Tech',
    layer: 'evergreen',
    question: 'Are there English-speaking tech and software engineering jobs in Germany?',
    answer: 'Yes. Major hubs like Berlin, Munich, Hamburg, and Frankfurt—as well as countless tech scaleups and multinational enterprise engineering teams (SAP, Amazon, Microsoft, Delivery Hero, Siemens, BMW Tech)—operate with English as their primary team and code base language. While English gets you hired for software development, cloud infrastructure, and ML engineering roles, learning intermediate German (B1) vastly expands your promotion potential and enables roles in medium-sized German enterprises (Mittelstand).',
    keyTakeaway: 'Tech engineering teams readily hire in English, but German proficiency multiplies leadership opportunities.'
  }
];

export const INITIAL_POLICY_UPDATES: FaqItem[] = [
  // -------------------------------------------------------------
  // 1. ADMISSIONS (Layer B: Verified Policy Updates)
  // -------------------------------------------------------------
  {
    id: 'adm-policy-1',
    category: 'Admissions',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: August 2026',
    source: {
      name: 'DAAD / Bavarian State Ministry of Science and Arts',
      url: 'https://www.daad.de'
    },
    question: 'Are German universities beginning to charge non-EU international tuition fees (e.g. TUM and Baden-Württemberg)?',
    answer: 'While public higher education remains 100% tuition-free across the vast majority of German federal states (including North Rhine-Westphalia, Lower Saxony, Hesse, Berlin, and Hamburg), two specific regions maintain non-EU tuition models. The state of Baden-Württemberg (KIT, Uni Stuttgart, Heidelberg) levies €1,500/semester for non-EU students. In Bavaria, following the Higher Education Innovation Act, TU Munich (TUM) charges €2,000–€6,000/semester for select programs. However, premier public research universities like RWTH Aachen, TU Berlin, Uni Bremen, FAU Erlangen-Nürnberg, and TU Dresden remain completely tuition-free.',
    keyTakeaway: 'Check specific state regulations; 14 out of 16 German states continue to offer 100% tuition-free public degrees.'
  },
  {
    id: 'adm-policy-2',
    category: 'Admissions',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: July 2026',
    source: {
      name: 'Uni-Assist e.V. Digital Directive',
      url: 'https://www.uni-assist.de'
    },
    question: 'How has the Uni-Assist preliminary evaluation (VPD) shifted with paperless digital uploads?',
    answer: 'Uni-Assist has transitioned over 85% of partner member universities away from requiring physically certified paper dossiers sent via postal mail to Berlin. For most applicants possessing digital verification records (including Indian CBSE Digilocker and digital APS certificates with cryptographic QR signatures), you only need to upload clear color PDF scans through the MyAssist portal. Physical paper attestations are now only requested for specific flagged institutions or manual audit checks.',
    keyTakeaway: 'Saves international postal courier fees; ensure your scanned PDF certificates are high resolution and uncropped.'
  },
  {
    id: 'adm-policy-3',
    category: 'Admissions',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: June 2026',
    source: {
      name: 'DAAD Higher Education Compass / KMK Guidelines',
      url: 'https://www.hochschulkompass.de'
    },
    question: 'What is the updated stance on online English tests (Duolingo English Test) vs. IELTS/TOEFL for German admissions?',
    answer: 'The KMK and German universities have tightened acceptance criteria post-pandemic. While Duolingo was temporarily accepted during 2021–2022, over 90% of top-tier public German universities (TU9 and U15 universities) currently mandate IELTS Academic (minimum 6.5–7.0 overall with no band under 6.0) or TOEFL iBT (minimum 90–100). Do not gamble your application cycle on Duolingo unless the university’s specific examination regulations (Prüfungsordnung) explicitly enumerate it.',
    keyTakeaway: 'Stick to IELTS Academic or TOEFL iBT to ensure 100% acceptance across all German university faculties.'
  },

  // -------------------------------------------------------------
  // 2. VISA & APS (Layer B: Verified Policy Updates)
  // -------------------------------------------------------------
  {
    id: 'visa-policy-1',
    category: 'Visa & APS',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: August 2026',
    source: {
      name: 'APS India (German Embassy New Delhi)',
      url: 'https://www.aps-india.info'
    },
    question: 'What is the current turnaround time for digital APS certificates and paperless courier protocols?',
    answer: 'APS India issues exclusively digital cryptographic paperless certificates (DigiAPS) sent via secure email with verifiable QR code validation. The average turnaround time has stabilized at 3 to 6 weeks from receipt of online application fees, provided your college registrar responds swiftly to the verification email. Applicants who graduated from universities with verified online transcript portals (or Digilocker integration) report verification in as little as 14–20 business days.',
    keyTakeaway: 'Digital APS with QR code is accepted directly by universities and VFS visa appointment systems.'
  },
  {
    id: 'visa-policy-2',
    category: 'Visa & APS',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: September 2026',
    source: {
      name: 'German Federal Foreign Office / Make it in Germany',
      url: 'https://www.make-it-in-germany.com'
    },
    question: 'How do the new Skilled Immigration Act reforms and the Chancenkarte (Opportunity Card) impact students?',
    answer: 'Under the upgraded German Skilled Immigration Act (Fachkräfteeinwanderungsgesetz), student visa holders enjoy enhanced flexibility. International students can now work up to 140 full days (or 280 half days) per calendar year—up from 120 full days. Furthermore, students holding the new points-based Opportunity Card (Chancenkarte) can take up secondary study preparation or trial employment (Probearbeit) up to 20 hours per week while seeking an academic admission spot.',
    keyTakeaway: 'Increased legal working limits give students substantially greater financial independence.'
  },
  {
    id: 'visa-policy-3',
    category: 'Visa & APS',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: July 2026',
    source: {
      name: 'German Missions in India / VFS Global Portal',
      url: 'https://india.diplo.de'
    },
    question: 'How does the VFS student visa appointment waitlist system operate for upcoming intake windows?',
    answer: 'The German Missions in South Asia operate a streamlined waitlist system on the VFS portal for Category D student visas. When you register on the waitlist with your verified digital APS certificate number and unconditional admission letter, appointment slots are released in chronological batches. Peak wait times occur between July and September (for Winter Semester), reaching 4–7 weeks, whereas off-peak wait times are under 10 days. Always book your slot the day your admission letter is issued.',
    keyTakeaway: 'Your APS certificate number is mandatory to unlock VFS student visa waitlist booking.'
  },

  // -------------------------------------------------------------
  // 3. FINANCIAL & SPERRKONTO (Layer B: Verified Policy Updates)
  // -------------------------------------------------------------
  {
    id: 'fin-policy-1',
    category: 'Financial & Sperrkonto',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: August 2026',
    source: {
      name: 'Federal Foreign Office (Auswärtiges Amt) Official Gazette',
      url: 'https://www.auswaertiges-amt.de'
    },
    question: 'What is the exact mandated Blocked Account amount for 2026/2027 German student visa applications?',
    answer: 'Following the 29th BAföG Amendment enacted by the German Federal Government, the statutory monthly subsistence requirement for students was indexed to €992 per month. For a standard 12-month National Student Visa application, the required total blocked deposit is €11,904 (plus any nominal setup buffer required by the escrow provider, usually €50–€100). Any visa application filed with the outdated amount (€11,208) will be issued an official Nachforderung (document request) causing processing delays.',
    keyTakeaway: 'The statutory requirement is €992/month, totaling €11,904 for one academic year.'
  },
  {
    id: 'fin-policy-2',
    category: 'Financial & Sperrkonto',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: July 2026',
    source: {
      name: 'GKV-Spitzenverband & Techniker Krankenkasse (TK)',
      url: 'https://www.tk.de'
    },
    question: 'What are the current statutory student health insurance contribution rates (GKV + Pflegeversicherung)?',
    answer: 'For enrolled students under age 30, statutory health insurance (Krankenversicherung der Studenten - KVdS) is federally standardized across major statutory funds (TK, Barmer, DAK). The basic statutory health insurance is approximately €93.63/month plus fund-specific additional contribution (Zusatzbeitrag, e.g. 1.2% for TK ~ €10.87), combined with mandatory long-term care insurance (Pflegeversicherung) of approximately €32.48 (or €37.38 for childless students aged 23+). The total monthly premium comes to approximately €136–€142 per month.',
    keyTakeaway: 'Budget approximately €136–€142/month for comprehensive statutory healthcare coverage.'
  },
  {
    id: 'fin-policy-3',
    category: 'Financial & Sperrkonto',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: June 2026',
    source: {
      name: 'Federal Ministry of the Interior & German Consular Regulations',
      url: 'https://www.bmi.bund.de'
    },
    question: 'Can bank fixed deposits, stock portfolios, or parent affidavits be submitted in place of a Sperrkonto?',
    answer: 'For the vast majority of non-EU applicants, a German Sperrkonto with an accredited provider is strictly non-negotiable. The only legally admissible alternatives recognized under § 68 AufenthG are: (1) a formal Formal Obligation (Verpflichtungserklärung) executed in person by a resident of Germany with verified disposable income at their local Ausländerbehörde, or (2) an official scholarship from recognized public funds (DAAD, Erasmus Mundus, Heinrich Böll Stiftung). Bank statements from your home country or parental affidavits are systematically rejected.',
    keyTakeaway: 'Foreign bank statements or stock portfolios cannot substitute for an escrowed German Sperrkonto.'
  },

  // -------------------------------------------------------------
  // 4. JOBS & TECH (Layer B: Verified Policy Updates)
  // -------------------------------------------------------------
  {
    id: 'jobs-policy-1',
    category: 'Jobs & Tech',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: August 2026',
    source: {
      name: 'Federal Ministry of the Interior (BMI) Migration Directives',
      url: 'https://www.make-it-in-germany.com'
    },
    question: 'What are the details of the expanded 140 full days / 280 half days legal work allowance?',
    answer: 'Under the reformed immigration statutes, international students from third countries holding a § 16b residence permit are permitted to work 140 full days (or 280 half days of up to 4 hours each) per calendar year, increased from the previous 120/240 day limit. Furthermore, employment as an academic or student assistant (HiWi) at the university or affiliated research institute (Fraunhofer, Max Planck) is considered supplementary and does not count against your 140-day quota.',
    keyTakeaway: 'Provides greater earning power; track your worked days in your employment calendar for tax audits.'
  },
  {
    id: 'jobs-policy-2',
    category: 'Jobs & Tech',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: July 2026',
    source: {
      name: 'BAMF & Make it in Germany (EU Blue Card Update)',
      url: 'https://www.bamf.de'
    },
    question: 'What are the lowered salary thresholds for the EU Blue Card for STEM university graduates?',
    answer: 'Germany drastically reduced the salary threshold for young professionals and university graduates entering bottleneck STEM occupations (MINT: Mathematics, Informatics, Natural Sciences, Technology). For new graduates, the gross annual salary threshold is set at 45.3% of the annual contribution assessment ceiling (approximately €41,041 gross per year). Given that average entry-level software engineer salaries in Germany range from €52,000 to €68,000, almost all tech master’s graduates qualify for an EU Blue Card immediately upon securing their first job.',
    keyTakeaway: 'The ~€41,041 entry threshold makes transition to the EU Blue Card straightforward for tech grads.'
  },
  {
    id: 'jobs-policy-3',
    category: 'Jobs & Tech',
    layer: 'policy-update',
    badge: 'Verified Policy Update',
    timestamp: 'Updated: May 2026',
    source: {
      name: 'Federal Employment Agency (Bundesagentur für Arbeit)',
      url: 'https://www.arbeitsagentur.de'
    },
    question: 'Can international students perform freelance work (Freiberufler) or operate an online business in Germany?',
    answer: 'By default, the § 16b student residence permit strictly states "Selbständige Tätigkeit nicht gestattet" (Self-employment not permitted). International students may only work as salaried employees (Werkstudent, Minijob, or Praktikum). If you wish to freelance as a software consultant or content creator, you must submit a formal petition to your local Foreigners’ Registration Office (Ausländerbehörde) demonstrating that the activity will not interfere with or delay your academic degree completion.',
    keyTakeaway: 'Freelancing requires express prior written approval from your local Ausländerbehörde.'
  }
];

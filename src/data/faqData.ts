export type FaqCategory = 
  | 'The Journey & Background'
  | 'Travel & Europe Life'
  | 'Tech & University of Bremen'
  | 'Admissions & Visas';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  keyTakeaway?: string;
  tags?: string[];
}

export const CORE_JOURNEY_FAQS: FaqItem[] = [
  // -------------------------------------------------------------
  // 1. THE JOURNEY & BACKGROUND
  // -------------------------------------------------------------
  {
    id: 'journey-1',
    category: 'The Journey & Background',
    question: 'Who is Prakhar, and what is the mission behind "Journey with Prakhar"?',
    answer: 'I am an international Computer Science student at the University of Bremen in Germany, admissions strategist, and creator of "Journey with Prakhar" (and @germanywithprakhar). Having navigated the entire journey myself—from clearing entrance criteria and processing the APS certificate in India, to securing funding and landing a working student tech job—I built this platform to give ambitious students genuine, unfiltered, and actionable blueprints without unverified consultant hype.',
    keyTakeaway: 'Practical, firsthand experience from an active Computer Science student currently living and working in Germany.',
    tags: ['About Prakhar', 'Background', 'University of Bremen']
  },
  {
    id: 'journey-2',
    category: 'The Journey & Background',
    question: 'Why did you choose Germany over the US, UK, Canada, or Australia for higher education?',
    answer: 'Three decisive factors: First, public universities in Germany charge 0% tuition fees across nearly all states, meaning a world-class degree costs a fraction of the €40,000–€80,000 annual debt accumulated in the US or UK. Second, Germany’s industrial and engineering powerhouse offers an 18-month post-study work visa and rapid pathways to permanent residency via the EU Blue Card. Third, the safety, social infrastructure, and ability to travel across 29 European countries with a student pass make the quality of life incomparable.',
    keyTakeaway: 'Tuition-free world-class education + clear path to European permanent residency + unbeatable quality of life.',
    tags: ['Why Germany', 'US vs Germany', 'ROI']
  },
  {
    id: 'journey-3',
    category: 'The Journey & Background',
    question: 'How was your transition from India to Germany, and how did you overcome the initial culture shock?',
    answer: 'The initial weeks involve a steep learning curve of German bureaucracy: city registration (Anmeldung), activating the Sperrkonto, health insurance confirmation, and registering a tax ID (Steuer-ID). What surprised me most was the emphasis on self-reliance (Eigenverantwortung)—professors treat you as an independent researcher rather than spoon-feeding material. Once I connected with international student associations in Bremen and learned conversational German for grocery runs and bakeries, Germany felt like a second home.',
    keyTakeaway: 'Prepare your arrival checklist (Anmeldung, bank, SIM, transport) before landing to settle smoothly in your first 14 days.',
    tags: ['Culture Shock', 'First Month', 'Settling In']
  },
  {
    id: 'journey-4',
    category: 'The Journey & Background',
    question: 'How do you balance full-time Computer Science studies with YouTube creation and 1-on-1 strategy sessions?',
    answer: 'Rigorous calendar blocking and sprint planning. In Germany, university exams are consolidated at the end of each semester (February/March for Winter, July/August for Summer), leaving regular semester weeks flexible for project development and coursework. I allocate focused 3-hour deep work blocks for coding and university labs on weekdays, dedicate weekends to recording videos and mentoring students, and automate repetitive workflows with custom tools.',
    keyTakeaway: 'Time-blocking and taking advantage of flexible German university schedules makes combining studies and creative pursuits possible.',
    tags: ['Time Management', 'Student Life', 'Creator Journey']
  },
  {
    id: 'journey-5',
    category: 'The Journey & Background',
    question: 'What was your biggest lesson or mistake during your initial application cycle?',
    answer: 'My biggest mistake early on was applying to programs without meticulously matching my undergraduate transcripts against the specific German department module catalog (Modulhandbuch). German universities do not care about generic extracurriculars if you fall short by even 3 ECTS credits in theoretical computer science or discrete mathematics. Once I learned to analyze ECTS syllabus prerequisites systematically, my admission conversion went to 100%.',
    keyTakeaway: 'Academic transcript curriculum congruence (ECTS credit match) is king in German university admissions.',
    tags: ['Mistakes to Avoid', 'ECTS Credits', 'Admissions Strategy']
  },

  // -------------------------------------------------------------
  // 2. TRAVEL & EUROPE LIFE
  // -------------------------------------------------------------
  {
    id: 'travel-1',
    category: 'Travel & Europe Life',
    question: 'How do you travel Europe (Spain, Mallorca, Prague, Italy) on a tight student budget?',
    answer: 'Living in Germany gives you an incredible launchpad for low-cost European travel. By leveraging budget carriers like Ryanair and EasyJet from Bremen, Hamburg, or Hanover airports, midweek return flights to Mediterranean spots like Palma de Mallorca or Barcelona often cost between €25 and €45. Pairing that with youth hostels (Hostelworld), off-peak travel during semester breaks, and cooking local meals with friends makes a 4-day trip across Europe cost less than €180 total.',
    keyTakeaway: 'Book budget airlines 4-6 weeks ahead, travel with just a cabin backpack, and take advantage of off-peak student schedules.',
    tags: ['Budget Travel', 'Spain Trip', 'Mallorca', 'Hostels']
  },
  {
    id: 'travel-2',
    category: 'Travel & Europe Life',
    question: 'What is the Deutschlandticket and how does it revolutionize student travel in Germany?',
    answer: 'The Deutschlandticket (integrated into most university semester fees / Semesterbeitrag) grants unlimited nationwide travel on all regional express trains (RE, RB), subways (U-Bahn), city trains (S-Bahn), trams, and buses throughout all 16 German states. As an enrolled student, you can hop on a regional train from Bremen to Hamburg, Berlin, the North Sea coast, or the Black Forest without buying an extra ticket.',
    keyTakeaway: 'Zero incremental transportation cost for domestic travel across Germany using your student semester pass.',
    tags: ['Deutschlandticket', 'Trains', 'Free Transit']
  },
  {
    id: 'travel-3',
    category: 'Travel & Europe Life',
    question: 'Can international students travel freely across all Schengen countries with a German student visa?',
    answer: 'Yes! A German National Student Visa (Category D) or your German electronic Residence Permit (Aufenthaltstitel) grants full freedom of movement across the entire 29-nation Schengen Zone for up to 90 days in any 180-day period. You can travel to France, Spain, Italy, Switzerland, Austria, the Netherlands, and Scandinavian countries with no additional visas required.',
    keyTakeaway: 'Your German student card and residence permit unlock unrestricted travel across 29 European countries.',
    tags: ['Schengen Area', 'Visa Travel', 'Europe Mobility']
  },
  {
    id: 'travel-4',
    category: 'Travel & Europe Life',
    question: 'What packing and travel essentials do you recommend for exploring Europe as an international student?',
    answer: '1) A lightweight 28L–32L carry-on backpack that fits under standard European budget airline seats (avoiding €30–€50 luggage fees). 2) A multi-currency card (like Wise, Revolut, or N26) with zero foreign exchange transaction fees. 3) An offline map downloaded on Google Maps. 4) The DB Navigator app for live train tracking. 5) A compact universal power bank.',
    keyTakeaway: 'Travel light, use fee-free fintech cards, and rely on digital apps to travel hassle-free across Europe.',
    tags: ['Packing Hacks', 'Fintech Cards', 'Travel Gear']
  },

  // -------------------------------------------------------------
  // 3. TECH & UNIVERSITY OF BREMEN
  // -------------------------------------------------------------
  {
    id: 'tech-1',
    category: 'Tech & University of Bremen',
    question: 'What is studying Computer Science at the University of Bremen really like?',
    answer: 'The University of Bremen (Universität Bremen) has a world-renowned Department of Mathematics and Computer Science (FB 03), particularly known for Artificial Intelligence, Robotics, and Cognitive Systems (DFKI - German Research Center for AI is located directly on campus). The curriculum is mathematically rigorous, research-oriented, and provides direct access to state-of-the-art supercomputing clusters and robotics labs.',
    keyTakeaway: 'Strong theoretical rigor combined with world-class AI/Robotics research centers right on campus.',
    tags: ['Uni Bremen', 'Computer Science', 'AI Research']
  },
  {
    id: 'tech-2',
    category: 'Tech & University of Bremen',
    question: 'What programming languages and technical foundations are prioritized in German CS curricula?',
    answer: 'German university CS programs prioritize foundational algorithmic engineering over ephemeral frameworks. You will encounter Java, C, C++, and Python extensively for data structures, operating systems, and computer architecture. Advanced modules incorporate Rust, Haskell (functional programming), and distributed systems. Having a rock-solid grasp of object-oriented design, algorithmic complexity (Big-O), and discrete math is essential for passing exams.',
    keyTakeaway: 'Focus on C++, Java, Python, and algorithmic principles; practical web frameworks can easily be learned on the side.',
    tags: ['Programming Languages', 'Algorithms', 'Curriculum']
  },
  {
    id: 'tech-3',
    category: 'Tech & University of Bremen',
    question: 'How do you find and land a Werkstudent (Working Student) software developer job in Germany?',
    answer: 'German tech companies actively recruit working students for 15–20 hours/week. The formula: 1) Prepare a German-format tabular CV (Lebenslauf) highlighting clean GitHub projects and concrete tech stacks. 2) Target LinkedIn, StepStone, and local company career boards with tailored cover letters (Anschreiben). 3) Demonstrate working code: having deployed web applications or reproducible GitHub repositories sets you apart from 90% of applicants.',
    keyTakeaway: 'A clean 1-page Lebenslauf with deployed GitHub portfolio projects is your best ticket to a €16–€22/hr tech job.',
    tags: ['Werkstudent', 'Tech Jobs', 'Software Engineer', 'Resume']
  },
  {
    id: 'tech-4',
    category: 'Tech & University of Bremen',
    question: 'Do German tech companies hire developers who only speak English?',
    answer: 'Yes, particularly in software engineering, cloud infrastructure, data science, and DevOps. Scaleups in Berlin and Munich as well as corporate engineering teams (SAP, Amazon, Delivery Hero, Siemens, Trivago) conduct daily standups, code reviews, and documentation entirely in English. However, learning conversational German (A2–B1) unlocks hundreds of regional mid-sized champions (Mittelstand) and accelerates long-term career growth.',
    keyTakeaway: 'English gets your foot in the door for engineering roles; German unlocks promotions and job security.',
    tags: ['English Jobs', 'Language Barrier', 'Tech Careers']
  },

  // -------------------------------------------------------------
  // 4. ADMISSIONS & VISAS
  // -------------------------------------------------------------
  {
    id: 'adm-1',
    category: 'Admissions & Visas',
    question: 'How does the Bavarian Formula convert foreign grades into the German 1.0–4.0 scale?',
    answer: 'The modified Bavarian Formula is the official standard mandated by the KMK: German Grade = 1 + 3 × [(Nmax - Nd) / (Nmax - Nmin)], where Nmax is maximum possible grade, Nmin is minimum passing grade, and Nd is your obtained grade. Remember that in the German system, lower is better: 1.0 to 1.5 is "Sehr Gut" (Excellent), 1.6 to 2.5 is "Gut" (Good), and 4.0 is minimum passing grade.',
    keyTakeaway: 'German grading scale is inverted: 1.0 is the top score, and cutoffs for competitive CS degrees are typically 2.0 or better.',
    tags: ['Bavarian Formula', 'GPA Conversion', 'Admissions']
  },
  {
    id: 'adm-2',
    category: 'Admissions & Visas',
    question: 'What is an APS Certificate and why is it mandatory for students from India, China, and Vietnam?',
    answer: 'The Akademische Prüfstelle (APS) is a verification authority managed by the German Embassy and DAAD. It authenticates your educational credentials directly with your school boards and universities before you can receive university admission or submit a German National Student Visa application. Digital APS certificates feature cryptographic verification QR codes and are valid indefinitely once issued.',
    keyTakeaway: 'Mandatory prerequisite for visa filing and university admission; apply 3-4 months ahead of application deadlines.',
    tags: ['APS Certificate', 'Visa Prerequisite', 'Verification']
  },
  {
    id: 'adm-3',
    category: 'Admissions & Visas',
    question: 'What is the Blocked Account (Sperrkonto) and what is the current statutory requirement?',
    answer: 'A Sperrkonto is an escrow bank account that guarantees to the German government that an international student can cover subsistence, rent, and healthcare for at least one year. Following statutory BAföG indexing, the current requirement is €992 per month (€11,904 per year). You can set this up online with official providers like Expatrio (available in our Student Toolkit using personal referral link https://www.expatrio.com?f=prakharr2 with referral code prakharr2). Once you arrive in Germany and open a current checking account (Girokonto), your blocked account releases equal monthly installments on the 1st of each month.',
    keyTakeaway: 'Mandatory visa requirement: €11,904 escrowed annually, disbursed in equal monthly payments of €992.',
    tags: ['Blocked Account', 'Sperrkonto', 'Living Costs']
  },
  {
    id: 'adm-4',
    category: 'Admissions & Visas',
    question: 'Can I book a personalized 1-on-1 strategy call with Prakhar to evaluate my profile?',
    answer: 'Yes! Through the "Journey with Prakhar" platform, you can book an intensive 1-on-1 Strategy Consultation. We review your exact academic transcript, calculate your Bavarian GPA, audit your ECTS credit matches against target universities, analyze your APS dossier, and build a tailored list of tuition-free German universities with high acceptance probabilities.',
    keyTakeaway: 'Direct 1-on-1 roadmap sessions tailored to your specific Bachelor background and career ambitions.',
    tags: ['1-on-1 Consulting', 'Profile Evaluation', 'Mentorship']
  }
];

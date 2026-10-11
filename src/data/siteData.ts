import { ConsultingService, BlogPost, ToolkitResource, Testimonial, ConsultationBooking, WaitlistEntry, FaqItem, SiteSettings } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: 'Prakhar Rajput',
  brandName: 'germanywithprakhar',
  title: 'BSc Computer Science Student at University of Bremen',
  university: 'University of Bremen',
  location: 'Bremen, Germany',
  germanLevel: 'German up to C1 level (Fluent)',
  successRate: 'Direct Peer Guidance',
  founderPhotoUrl: '/image for website.jpg',
  youtubeUrl: 'https://www.youtube.com/@prakhar.rajput',
  personalInstagram: 'https://www.instagram.com/whoisprakharrr/',
  brandInstagram: 'https://www.instagram.com/germanywithprakhar/',
  linkedinUrl: 'https://www.linkedin.com/in/prakhar-rajput-a184681b5/',
  telegramUrl: 'https://t.me/+29XqTd_d_E8yNGZl',
  topmateUrl: 'https://topmate.io/prakhar_rajput/'
};

export const PERSONAL_INFO = {
  name: 'Prakhar Rajput',
  brandName: 'germanywithprakhar',
  brandHandle: '@germanywithprakhar',
  title: 'BSc Computer Science Student at University of Bremen',
  university: 'University of Bremen',
  degree: 'BSc Computer Science',
  location: 'Bremen, Germany',
  languages: [
    { lang: 'English', level: 'Fluent / Academic (C2)', badge: 'Primary Mentoring Medium' },
    { lang: 'German (Deutsch)', level: 'German up to C1 level (Fluent)', badge: 'University & Bureaucracy' },
    { lang: 'Hindi', level: 'Native', badge: 'Mother Tongue' }
  ],
  stats: [
    { label: 'Mentorship Focus', value: '1-on-1 Strategy' },
    { label: 'Guidance Approach', value: 'Direct Peer Guidance' },
    { label: 'YouTube Community', value: '1.6K+' },
    { label: 'Current Residence', value: 'Bremen, DE' }
  ],
  socials: {
    youtube: 'https://www.youtube.com/@prakhar.rajput',
    personalInstagram: 'https://www.instagram.com/whoisprakharrr/',
    brandInstagram: 'https://www.instagram.com/germanywithprakhar/',
    linkedin: 'https://www.linkedin.com/in/prakhar-rajput-a184681b5/',
    telegram: 'https://t.me/+29XqTd_d_E8yNGZl',
    topmate: 'https://topmate.io/prakhar_rajput/'
  }
};

export const CONSULTING_SERVICES: ConsultingService[] = [
  {
    id: 'tier-1',
    title: '1-on-1 Call',
    duration: '25 mins',
    price: '€15',
    popular: true,
    tag: 'POPULAR',
    description: 'Direct, focused answers to your most pressing questions regarding university shortlisting and APS.',
    deliverables: [
      'Focused answers on university shortlisting',
      'APS certificate preparation & process tips',
      'Direct clarity on deadlines and prerequisite eligibility',
      'Follow-up resource links'
    ],
    topmateSlug: 'prakhar_rajput'
  },
  {
    id: 'tier-2',
    title: '1-on-1 Call',
    duration: '45 mins',
    price: '€20',
    description: 'Comprehensive roadmapping session covering university tier lists, step-by-step visa checklists, and document review.',
    deliverables: [
      'Personalized university tier list (Ambitious, Target, Safe)',
      'Step-by-step German visa & APS checklists',
      'Document and CV alignment review',
      'Bavarian formula GPA & ECTS requirement mapping'
    ],
    topmateSlug: 'prakhar_rajput'
  },
  {
    id: 'tier-3',
    title: 'Q&A Session / Seminar',
    duration: '1 hour',
    price: '€10',
    limit: 'Max 50 Participants',
    tag: 'Group Seminar',
    description: 'Join a group seminar covering the realities of moving to Germany, living costs, and an open Q&A session at the end.',
    deliverables: [
      'Realities of relocating and living in Germany',
      'Detailed living cost breakdown & monthly student budgeting',
      'Housing, health insurance, and part-time jobs overview',
      'Open interactive Q&A session at the end'
    ],
    topmateSlug: 'prakhar_rajput'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    degree: 'M.Sc. Informatics (Computer Science)',
    university: 'Technical University of Munich (TUM)',
    quote: 'Prakhar pointed out exactly why my course module description was lacking ECTS in theoretical computer science. After restructuring my module matrix per his advice, I bypassed the entrance exam and received direct admits from both TU Munich and Uni Stuttgart!',
    country: 'India',
    homeCity: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    category: 'tu9',
    admitBadge: 'TU9 Direct Admit',
    intake: 'Winter Semester 2025/26',
    rating: 5,
    germanGrade: '1.4 German Scale',
    keyWin: 'Bypassed Aptitude Test via Module Alignment',
    mentorshipFocus: 'ECTS Mapping & Module Catalogue',
    verifiedAdmit: true
  },
  {
    id: '2',
    name: 'Sarah Chen',
    degree: 'M.Sc. Digital Media & Data Science',
    university: 'University of Bremen',
    quote: 'His breakdown of student life in Bremen, navigating the semester ticket, and landing a WG in Viertel saved me weeks of stress. Prakhar also conducted a mock visa interview that helped me tackle tricky consulate questions with ease!',
    country: 'Taiwan',
    homeCity: 'Taipei',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    category: 'cs-ai',
    admitBadge: 'Uni Bremen Admit',
    intake: 'Summer Semester 2025',
    rating: 5,
    germanGrade: '1.6 German Scale',
    keyWin: 'Sperrkonto & Visa Mock Session Success',
    mentorshipFocus: 'Bremen Living & Visa Prep',
    verifiedAdmit: true
  },
  {
    id: '3',
    name: 'Rohan Mehra',
    degree: 'M.Sc. Artificial Intelligence',
    university: 'FAU Erlangen-Nürnberg',
    quote: 'The 1-on-1 strategy call was a game-changer. Rather than paying 1.5 Lakh INR to generic consultancies, Prakhar reviewed my SOP and helped me tailor my research interests to FAU’s Pattern Recognition Lab. Zero tuition and 100% genuine guidance!',
    country: 'India',
    homeCity: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    category: 'cs-ai',
    admitBadge: 'FAU Admit • €0 Tuition',
    intake: 'Winter Semester 2025/26',
    rating: 5,
    germanGrade: '1.5 German Scale',
    keyWin: 'Saved ₹1.5L in Agency Fees',
    mentorshipFocus: 'SOP & Research Lab Tailoring',
    verifiedAdmit: true
  },
  {
    id: '4',
    name: 'Ananya Deshmukh',
    degree: 'M.Sc. Computer Engineering',
    university: 'RWTH Aachen University',
    quote: 'I was extremely worried about my credit compatibility because my Indian college did not issue formal ECTS breakdowns. Prakhar demonstrated how to calculate credit hours and frame the curriculum syllabus systematically. Got my RWTH offer letter within 4 weeks!',
    country: 'India',
    homeCity: 'Pune',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    category: 'tu9',
    admitBadge: 'RWTH Aachen Admit',
    intake: 'Winter Semester 2025/26',
    rating: 5,
    germanGrade: '1.3 German Scale',
    keyWin: 'Admitted into Top European Tech Hub',
    mentorshipFocus: 'Credit Conversion & Curricular Analysis',
    verifiedAdmit: true
  },
  {
    id: '5',
    name: 'Vikramaditya Iyer',
    degree: 'M.Sc. Information Systems Management',
    university: 'Technical University of Berlin (TU Berlin)',
    quote: 'Prakhar helped me untangle the APS certificate mess when the Delhi office delayed applications. His checklist for professor verification and Digilocker document notarization got my APS issued in just 19 days without any rejection risk.',
    country: 'India',
    homeCity: 'Chennai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    category: 'aps-visa',
    admitBadge: 'TU Berlin Admit',
    intake: 'Summer Semester 2026',
    rating: 5,
    germanGrade: '1.7 German Scale',
    keyWin: 'APS Cleared in Record 19 Days',
    mentorshipFocus: 'APS Verification & Fast-Tracking',
    verifiedAdmit: true
  },
  {
    id: '6',
    name: 'Simran Kaur',
    degree: 'B.Sc. Mechano-Informatics & Robotics',
    university: 'Karlsruhe Institute of Technology (KIT)',
    quote: 'Applying directly after high school for German public university degrees is notoriously confusing with Studienkolleg requirements. Prakhar mapped out my T-Kurs roadmap and German B2/C1 transition so clearly that I had zero hesitation.',
    country: 'India',
    homeCity: 'Chandigarh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    category: 'tu9',
    admitBadge: 'KIT Admit • Top Ranking',
    intake: 'Winter Semester 2025/26',
    rating: 5,
    germanGrade: '1.2 German Scale',
    keyWin: 'Direct Bachelor Pathway Clarified',
    mentorshipFocus: 'Undergraduate Studienkolleg & C1 Roadmap',
    verifiedAdmit: true
  },
  {
    id: '7',
    name: 'Aditya Verma',
    degree: 'M.Sc. Autonomous Systems',
    university: 'University of Stuttgart',
    quote: 'Prakhar reviewed my CV line-by-line and converted my Indian academic background into a spotless Europass-style format highlighting hands-on ROS and Linux coursework. Received unconditional offers from Stuttgart and TU Darmstadt!',
    country: 'India',
    homeCity: 'Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    category: 'engineering',
    admitBadge: 'Uni Stuttgart Admit',
    intake: 'Winter Semester 2025/26',
    rating: 5,
    germanGrade: '1.5 German Scale',
    keyWin: '2 Top Public Admits Secured',
    mentorshipFocus: 'German Academic CV & Portfolio Review',
    verifiedAdmit: true
  },
  {
    id: '8',
    name: 'Neha Patel',
    degree: 'M.Sc. Computational Modeling & Simulation',
    university: 'TU Dresden',
    quote: 'The German Blocked Account (Sperrkonto) and health insurance comparison Prakhar provides on his toolkit saved me over €180 in setup fees. His Topmate call gave me confidence in managing living expenses in Saxony on a tight student budget.',
    country: 'India',
    homeCity: 'Ahmedabad',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80',
    category: 'aps-visa',
    admitBadge: 'TU Dresden Admit',
    intake: 'Summer Semester 2026',
    rating: 5,
    germanGrade: '1.6 German Scale',
    keyWin: 'Saved €180 on Sperrkonto Setup',
    mentorshipFocus: 'Financial Readiness & Housing Strategy',
    verifiedAdmit: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'bremen-5-things',
    title: '5 Things I Wish I Knew Before Moving to Bremen',
    excerpt: 'From navigating the Semesterticket across Lower Saxony to surviving the winter weather and landing your first Werkstudent job without German fluency.',
    category: 'Student Life',
    readTime: '6 min read',
    date: 'February 2026',
    coverImage: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&auto=format&fit=crop&q=80',
    content: [
      'Moving to Bremen as an international Computer Science student was one of the best decisions of my life, but the initial months came with plenty of cultural shocks and administrative surprises.',
      '1. The Semesterticket is a Superpower: In Bremen, your semester contribution covers unlimited regional transit across all of Bremen, Lower Saxony, and even regional trains to Hamburg. You can travel easily on weekends without buying expensive train tickets.',
      '2. German Health Insurance Starts on Day 1: You cannot matriculate without automated digital proof from TK or Barmer directly transmitted to Uni Bremen. Never leave this to the last week before your visa appointment.',
      '3. The "Werkstudent" Market in Bremen: While Berlin and Munich get all the hype, Bremen has massive tech and aerospace hubs (Airbus, OHB, Mercedes-Benz, and numerous software consultancies). German proficiency opens these doors tenfold.',
      '4. Housing (WG-Gesucht) is a Full-Time Job: You should start sending personalized messages in German at least 2 to 3 months before your flight. Never send copy-pasted messages—mention specific details from the roommate profile.',
      '5. Weather & Vitamin D: Bremen winters are grey and rainy. Invest in a solid windproof waterproof jacket (North Face, Jack Wolfskin) and keep a consistent gym and study routine.'
    ]
  },
  {
    id: 'german-visa-interview',
    title: 'Acing the German Student Visa Interview',
    excerpt: 'A comprehensive walkthrough of the most scrutinized questions at VFS / German Consulates, how to explain your study motives, and proof of finances.',
    category: 'Visa & Bureaucracy',
    readTime: '8 min read',
    date: 'January 2026',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    content: [
      'The German National Student Visa (Type D) interview is not an interrogation, but a test of academic intent and financial stability. Consular officers are looking for authenticity, not memorized scripts.',
      'Key Question 1: "Why Germany over USA, UK, or Canada?" - Focus on the public research funding, curriculum alignment with your Bachelor thesis, tuition-free education model, and Germany’s Industrie 4.0 ecosystem.',
      'Key Question 2: "Why this specific University and Program?" - You must cite specific professors, laboratories, and specialized modules. For example, at Uni Bremen, mentioning the Cognitive Systems lab or robotics research proves you actually reviewed the Prüfungsordnung (curriculum regulation).',
      'Key Question 3: "How will you finance your studies?" - Have your Blocked Account confirmation document (Sperrkonto) readily visible in your folder along with health insurance certificate and scholarship letters if applicable.',
      'Pro Tip: Keep two identical sets of unstapled photocopies organized in clear sheet protectors in the exact sequence specified by the consulate checklist.'
    ]
  },
  {
    id: 'tech-portfolio-student',
    title: 'How to Build a Tech Portfolio as an International Student',
    excerpt: 'How I built computer vision and Python projects that caught German recruiters’ eyes and helped secure high-paying student developer positions.',
    category: 'Tech & Career',
    readTime: '7 min read',
    date: 'December 2025',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    content: [
      'In Germany, academic grades matter, but for Werkstudent (working student) and HiWi (research assistant) roles in Computer Science, your GitHub speaks louder than your transcript.',
      '1. Build Domain-Relevant Projects: Generic todo apps and weather widgets get skipped immediately. German engineering firms love automation, sensor data processing, computer vision (OpenCV / PyTorch), and embedded software integrations.',
      '2. Document Everything in English (with German summaries): Write professional README files with architecture diagrams, setup instructions using Docker, and animated GIFs showcasing the working prototype.',
      '3. Deploy Live Demos: Host your web APIs or demos on cloud services. A recruiter should be able to click one link in your CV and test your model in seconds without cloning the repository.',
      '4. Mention German Language Level on Your Tech CV: Even if the code is in English, being able to chat in German during team standups makes you 5x more hireable than an English-only applicant.'
    ]
  }
];

export const TOOLKIT_RESOURCES: ToolkitResource[] = [
  {
    id: 'expatrio',
    name: 'Expatrio Value Package',
    category: 'Finance & Banking',
    description: 'The all-in-one bundle: Government-approved Blocked Account + TK Public Health Insurance + Free German Bank Account (Aion/Revolut).',
    benefit: 'Official German Federal Foreign Office accepted. Up to €139 cashback on arrival.',
    discountCode: 'PRAKHARVIP',
    badge: 'Most Recommended',
    affiliateUrl: 'https://www.expatrio.com/?partner=prakhar',
    iconName: 'Building2'
  },
  {
    id: 'tk-insurance',
    name: 'Techniker Krankenkasse (TK)',
    category: 'Health Insurance',
    description: 'Voted best public health insurance in Germany for university students with full English app support, vaccine coverage, and dental benefits.',
    benefit: 'Automated direct reporting (M10 certificate) to German universities for matriculation.',
    discountCode: 'FREE-SETUP',
    badge: 'Student Standard',
    affiliateUrl: 'https://tk.de/studenten-service',
    iconName: 'ShieldCheck'
  },
  {
    id: 'fintiba',
    name: 'Fintiba Blocked Account',
    category: 'Finance & Banking',
    description: 'Fast, secure Sperrkonto creation with instant blocking confirmation accepted by 100% of German consulates worldwide.',
    benefit: 'Setup completed online in under 15 minutes without embassy certification.',
    discountCode: 'PRAKHAR10',
    affiliateUrl: 'https://www.fintiba.com',
    iconName: 'Landmark'
  },
  {
    id: 'wg-gesucht',
    name: 'WG-Gesucht & ImmoScout24',
    category: 'Housing',
    description: 'The #1 platform for finding student flatshares (Wohngemeinschaft) and private student apartments across Germany.',
    benefit: 'Includes my custom German inquiry templates that boast a 45% reply rate.',
    badge: 'Essential',
    affiliateUrl: 'https://www.wg-gesucht.de',
    iconName: 'Home'
  },
  {
    id: 'anki-german',
    name: 'Anki C1 German Vocabulary Deck',
    category: 'Language & Academics',
    description: 'Spaced repetition flashcards containing 4,000+ high-yield German academic words for TestDaF, Goethe C1, and daily university life.',
    benefit: 'Free download created specifically for engineering & tech students.',
    badge: '100% Free',
    affiliateUrl: '#',
    iconName: 'GraduationCap'
  },
  {
    id: 'tech-gear-setup',
    name: 'Student Tech & Ergonomics Guide',
    category: 'Tech Gear',
    description: 'Curated list of reliable laptops (MacBook Pro / ThinkPad), noise-cancelling headphones (Sony WH-1000XM5), and travel adapters for German sockets.',
    benefit: 'Exclusive student hardware discounts via Apple & CampusPoint Germany.',
    discountCode: 'CAMPUS-DISCOUNT',
    badge: 'Hardware',
    affiliateUrl: 'https://www.campuspoint.de',
    iconName: 'Laptop'
  }
];

export const YOUTUBE_FEATURED = {
  title: 'Life in Germany & Tech: Student Reality at Uni Bremen',
  videoTitle: '3 years in Germany 🇩🇪 | REAL Experiences of an Indian Student in Germany',
  duration: '14:28',
  views: 'Student Experience',
  uploadDate: 'Featured Upload',
  youtubeUrl: 'https://www.youtube.com/@prakhar.rajput',
  embedId: 'G9Q_BV9O9Yw',
  thumbnail: 'https://i.ytimg.com/vi/G9Q_BV9O9Yw/maxresdefault.jpg',
  description: 'Unfiltered experiences living and studying in Germany: CS coursework at Uni Bremen, daily living expenses, German language journey, and finding student jobs.'
};

export const YOUTUBE_RECENT_VIDEOS = [
  {
    id: 'aQJvg2Kd4WU',
    youtubeId: 'aQJvg2Kd4WU',
    title: '🇩🇪 CHEAPEST Indian Store in Germany 🇩🇪 | Student Life | Cheap Desi Ration in Germany!',
    url: 'https://www.youtube.com/watch?v=aQJvg2Kd4WU',
    thumbnail: 'https://i.ytimg.com/vi/aQJvg2Kd4WU/maxresdefault.jpg',
    category: 'Living in Germany',
    duration: '09:50',
    viewCount: 15340,
    views: '15K views',
    publishDate: 'Aug 2024',
    description: 'Where to buy affordable Indian groceries, spices, and lentils in Germany as an international student. Cost comparison between German discounters and Asian/Desi supermarkets.'
  },
  {
    id: 'G9Q_BV9O9Yw',
    youtubeId: 'G9Q_BV9O9Yw',
    title: '3 years in Germany 🇩🇪 | REAL Experiences of an Indian Student in Germany',
    url: 'https://www.youtube.com/watch?v=G9Q_BV9O9Yw',
    thumbnail: 'https://i.ytimg.com/vi/G9Q_BV9O9Yw/maxresdefault.jpg',
    category: 'Student Life',
    duration: '14:28',
    viewCount: 12420,
    views: '12K views',
    publishDate: 'Oct 2024',
    description: 'Prakhar breaks down what 3 years of computer science studies at University of Bremen, Germany actually feels like: cultural adaptation, language hurdles, and campus culture.'
  },
  {
    id: 'eV1K0D4cSQA',
    youtubeId: 'eV1K0D4cSQA',
    title: 'Student Life in Germany 🇩🇪 : How to travel Europe on a Student Budget : Prague Edition 💸',
    url: 'https://www.youtube.com/watch?v=eV1K0D4cSQA',
    thumbnail: 'https://i.ytimg.com/vi/eV1K0D4cSQA/maxresdefault.jpg',
    category: 'Budgeting & Travel',
    duration: '11:05',
    viewCount: 9150,
    views: '9.1K views',
    publishDate: 'Nov 2024',
    description: 'Actionable financial hacks for Indian students in Germany: balancing your monthly blocked account budget with exploration and student travel.'
  },
  {
    id: 's666eBy_xqk',
    youtubeId: 's666eBy_xqk',
    title: 'Spain on a Student Budget Travel Vlog 🇪🇸 | Germany 🇩🇪 to Spain 🇪🇸 | Student Travel Vlog',
    url: 'https://www.youtube.com/watch?v=s666eBy_xqk',
    thumbnail: 'https://i.ytimg.com/vi/s666eBy_xqk/maxresdefault.jpg',
    category: 'Travel Vlog',
    duration: '12:15',
    viewCount: 8240,
    views: '8.2K views',
    publishDate: 'Sep 2024',
    description: 'Traveling across Europe while on a student visa in Germany: budget airline tips, cheap student hostels, and how to travel sustainably across Schengen countries.'
  },
  {
    id: 'y2sVNpkNjWE',
    youtubeId: 'y2sVNpkNjWE',
    title: 'Prague Solo Budget Travel Vlog : Most Beautiful City in Europe | Prakhar Rajput',
    url: 'https://www.youtube.com/watch?v=y2sVNpkNjWE',
    thumbnail: 'https://i.ytimg.com/vi/y2sVNpkNjWE/maxresdefault.jpg',
    category: 'Solo Travel',
    duration: '10:40',
    viewCount: 6780,
    views: '6.8K views',
    publishDate: 'Dec 2024',
    description: 'A weekend solo journey from Germany to Prague, Czech Republic. Highlights include student train transit discounts, food costs, and historic spots.'
  }
];

export const YOUTUBE_POPULAR_VIDEOS = YOUTUBE_RECENT_VIDEOS;

export const INITIAL_BOOKINGS: ConsultationBooking[] = [
  {
    id: 'bk-101',
    serviceId: 'strategy-call',
    serviceTitle: '1-on-1 Germany Strategy Call',
    price: '€49',
    clientName: 'Aditya Verma',
    clientEmail: 'aditya.v98@gmail.com',
    targetDegree: 'M.Sc. Computer Science',
    targetMajor: 'Artificial Intelligence',
    background: 'B.Tech IT (8.6 CGPA), 1.5 yrs SDE exp, applying for Winter 2026',
    scheduledDate: 'Thu, 17 Sep',
    scheduledTime: '16:00 CET (20:30 IST)',
    status: 'confirmed',
    createdAt: '2026-09-10T14:20:00Z'
  },
  {
    id: 'bk-102',
    serviceId: 'sop-audit',
    serviceTitle: 'SOP & Tech Portfolio Audit',
    price: '€75',
    clientName: 'Mei-Ling Wu',
    clientEmail: 'meiling.wu@outlook.com',
    targetDegree: 'M.Sc. Data Science',
    targetMajor: 'Computer Vision & ML',
    background: 'BS Mathematics (3.7 GPA), looking to target Uni Bremen & TU Munich',
    scheduledDate: 'Fri, 18 Sep',
    scheduledTime: '18:00 CET (22:30 IST)',
    status: 'confirmed',
    createdAt: '2026-09-11T09:15:00Z'
  },
  {
    id: 'bk-103',
    serviceId: 'quick-doubt',
    serviceTitle: 'Quick Q&A & Reality Check',
    price: '€25',
    clientName: 'Kavya Nair',
    clientEmail: 'kavya.nair.tech@gmail.com',
    targetDegree: 'M.Sc. Informatics',
    targetMajor: 'Software Engineering',
    background: 'APS certificate received, urgent query on VFS Mumbai slot bookings',
    scheduledDate: 'Sat, 19 Sep',
    scheduledTime: '14:00 CET (18:30 IST)',
    status: 'pending',
    createdAt: '2026-09-12T11:45:00Z'
  },
  {
    id: 'bk-104',
    serviceId: 'strategy-call',
    serviceTitle: '1-on-1 Germany Strategy Call',
    price: '€49',
    clientName: 'Muhammad Tariq',
    clientEmail: 'm.tariq@gmail.com',
    targetDegree: 'B.Sc. Computer Science',
    targetMajor: 'Informatik (English/German)',
    background: 'Completed 13 years education + Studienkolleg enquiry',
    scheduledDate: 'Sun, 20 Sep',
    scheduledTime: '19:30 CET (00:00 IST)',
    status: 'confirmed',
    createdAt: '2026-09-12T15:10:00Z'
  }
];

export const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: 'wl-1',
    email: 'rohit.deshmukh@gmail.com',
    courseTitle: "The Complete Germany Master's Blueprint",
    background: 'B.E. Computer Engineering, Target: TU9 Winter 2026',
    createdAt: '2026-09-10T18:00:00Z'
  },
  {
    id: 'wl-2',
    email: 'ananya.iyer@yahoo.com',
    courseTitle: "The Complete Germany Master's Blueprint",
    background: 'B.Sc. Electronics, wants to transition to Embedded Systems in Germany',
    createdAt: '2026-09-11T12:30:00Z'
  },
  {
    id: 'wl-3',
    email: 'hassan.ali99@gmail.com',
    courseTitle: "The Complete Germany Master's Blueprint",
    background: 'Data Analyst from Pakistan seeking German DAAD & Public Universities',
    createdAt: '2026-09-12T08:15:00Z'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do German universities evaluate my degree (ECTS & Bavarian Formula)?',
    answer: 'Unlike US universities that use holistic admissions, German public universities are strictly requirement-driven. They calculate your German grade using the Bavarian Formula: Grade = 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin)). Crucially, they perform strict ECTS module matching (e.g., minimum 30 ECTS in theoretical computer science/math). If you miss mandatory subject credits, your application will be rejected regardless of your GPA.'
  },
  {
    id: 'faq-2',
    category: 'Visa & APS',
    question: 'What is the APS Certificate and how long does it take?',
    answer: 'The Akademische Prüfstelle (APS) certificate verifies the authenticity of your educational credentials and is mandatory for applicants from India, China, and Vietnam applying for a German Student Visa. Verification typically takes between 3 to 8 weeks. You should apply for your APS certificate as soon as your 6th or 7th semester transcripts are issued.'
  },
  {
    id: 'faq-3',
    category: 'Finances & Sperrkonto',
    question: 'How much money is required in the Blocked Account (Sperrkonto)?',
    answer: 'For 2025/2026, the German Federal Foreign Office mandates a blocked account deposit of €992 per month (€11,904 per year). This covers living expenses, rent, and student health insurance. Platforms like Expatrio and Fintiba allow you to set up this account online in less than 24 hours.'
  },
  {
    id: 'faq-4',
    category: 'Jobs & Tech',
    question: 'Can I work as a software developer (Werkstudent) while studying in Germany?',
    answer: 'Yes! International students are legally permitted to work 140 full days or 280 half days per calendar year (or up to 20 hours per week during semester terms as a Werkstudent). Student developer hourly rates range between €14 to €25/hour. Having active GitHub projects and at least B1 conversational German will significantly elevate your interview conversion rate.'
  },
  {
    id: 'faq-5',
    category: 'Admissions',
    question: 'Is tuition really free at public universities in Germany?',
    answer: 'Yes, 15 out of 16 German federal states charge €0 tuition fees for bachelor and consecutive master degrees at public universities (Baden-Württemberg charges €1,500/semester for non-EU students; Bavaria allows individual unis to set small fees). Students only pay a "Semesterbeitrag" (semester contribution of ~€200 to €390) which includes your public transit ticket and campus student services!'
  }
];


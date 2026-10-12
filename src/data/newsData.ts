export type NewsCategory = 
  | 'German Immigration & Policy'
  | 'Tech & AI Trends'
  | 'Student Life & Travel'
  | 'University & Career';

export interface LiveNewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: {
    name: string;
    url: string;
    domain?: string;
  };
  publishedAt: string;
  tags: string[];
  isBreaking?: boolean;
  readTime?: string;
  keyTakeaway?: string;
}

export const FALLBACK_LIVE_NEWS: LiveNewsItem[] = [
  {
    id: 'news-1',
    title: 'German Federal Cabinet Enacts BAföG Indexing: Blocked Account Subsistence Baseline Updated to €992/Month',
    summary: 'The German Federal Ministry of Education and Research (BMBF) and Auswärtiges Amt have officially indexed the statutory student subsistence minimum under § 16b AufenthG. International student Blocked Accounts (Sperrkonto) now calculate annual escrow requirements at €11,904 (€992/month), safeguarding living allowances against European inflation.',
    category: 'German Immigration & Policy',
    source: {
      name: 'Auswärtiges Amt & BMBF Official Portal',
      url: 'https://www.auswaertiges-amt.de',
      domain: 'auswaertiges-amt.de'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    tags: ['Sperrkonto', 'Visa Directive', 'Statutory Update'],
    isBreaking: true,
    readTime: '3 min read',
    keyTakeaway: 'Ensure your Blocked Account deposit reflects the €11,904 baseline for all upcoming visa interview slots.'
  },
  {
    id: 'news-2',
    title: 'Student Work Allowance Officially Expanded to 140 Full Days / 280 Half Days per Calendar Year',
    summary: 'Under the revised Skilled Immigration Act (Fachkräfteeinwanderungsgesetz), international student work permits have permanently increased from 120 full days (240 half days) to 140 full days (280 half days). This significantly enhances earning flexibility for working students (Werkstudenten) and research assistants (HiWis) throughout semester vacations.',
    category: 'German Immigration & Policy',
    source: {
      name: 'Make it in Germany (Federal Government Portal)',
      url: 'https://www.make-it-in-germany.com',
      domain: 'make-it-in-germany.com'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    tags: ['Werkstudent', 'Work Permit', 'Labor Law'],
    readTime: '4 min read',
    keyTakeaway: 'Students can legally log 20 additional full days of work per year without special immigration agency waivers.'
  },
  {
    id: 'news-3',
    title: 'European AI & Tech Hubs: Munich and Berlin Lead Continental Germany with Surging English-First Tech Roles',
    summary: 'According to the Bitkom European Tech Ecosystem Report, German technology startups and enterprise engineering centers in Berlin, Munich, and Hamburg posted over 42,000 junior and working student developer positions with English as the primary engineering language, driven by European AI Act compliance and cloud-native modernization.',
    category: 'Tech & AI Trends',
    source: {
      name: 'Bitkom Research & TechCrunch Europe',
      url: 'https://techcrunch.com/category/startups/',
      domain: 'techcrunch.com'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    tags: ['Tech Careers', 'Software Engineering', 'AI Trends'],
    readTime: '5 min read',
    keyTakeaway: 'Focus on full-stack TypeScript, Python, and cloud infrastructure to stand out in English-speaking German dev teams.'
  },
  {
    id: 'news-4',
    title: 'Deutschlandticket Integration Confirmed: Nationwide Regional Rail Pass Retained in Student Semester Fees',
    summary: 'The Conference of Transport Ministers and German Student Unions (Deutsches Studierendenwerk) have solidified the discounted nationwide public transit ticket for university students. Enrolled students across Germany can continue riding regional express trains (RE, RB), subways (U-Bahn), suburban rail (S-Bahn), and city buses across all 16 federal states with zero extra fares.',
    category: 'Student Life & Travel',
    source: {
      name: 'Deutsches Studierendenwerk (DSW)',
      url: 'https://www.studierendenwerke.de',
      domain: 'studierendenwerke.de'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), // 12 hours ago
    tags: ['Deutschlandticket', 'Public Transit', 'Student Budget'],
    readTime: '3 min read',
    keyTakeaway: 'Your university student card unlocks border-to-border travel across Germany without purchasing individual train tickets.'
  },
  {
    id: 'news-5',
    title: 'Schengen Border Modernization: EU Entry/Exit System (EES) Rolling Out Biometric Border Kiosks',
    summary: 'The European Union is deploying the Entry/Exit System (EES) across all external Schengen border gates. While travelers from non-EU origins will register biometric digital records on initial arrival, international students holding valid German National Visas (Type D) or electronic Residence Permits (Aufenthaltstitel) maintain unimpeded free movement across 29 Schengen states.',
    category: 'Student Life & Travel',
    source: {
      name: 'European Commission Directorate-General for Migration',
      url: 'https://home-affairs.ec.europa.eu',
      domain: 'ec.europa.eu'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 1440).toISOString(), // 1 day ago
    tags: ['Schengen', 'Travel Freedom', 'EU Borders'],
    readTime: '4 min read',
    keyTakeaway: 'Always carry your physical biometric residence card and passport when taking budget flights or weekend trips across the EU.'
  },
  {
    id: 'news-6',
    title: 'DAAD Reports Record 370,000 International Students Enrolled Across German Universities',
    summary: 'Germany now ranks as the third most popular global study destination, according to the DAAD "Wissenschaft weltoffen" bulletin. Computer Science, Artificial Intelligence, and Renewable Energy engineering lead application volumes, with international students citing zero tuition fees and high post-study employment rates as primary reasons.',
    category: 'University & Career',
    source: {
      name: 'DAAD (German Academic Exchange Service)',
      url: 'https://www.daad.de/en/',
      domain: 'daad.de'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 2100).toISOString(), // 1.5 days ago
    tags: ['DAAD', 'Admissions', 'University Trends'],
    readTime: '4 min read',
    keyTakeaway: 'High application volume means early submission (April/May for Winter Semester) gives you the strongest edge.'
  },
  {
    id: 'news-7',
    title: 'EU Blue Card Salary Minimum Adjusted: STEM University Graduates Qualify at €41,041 Threshold',
    summary: 'Germany’s Federal Ministry of the Interior confirmed that international university graduates in bottleneck professions—including Computer Science, Software Engineering, Mathematics, and Natural Sciences—can secure the permanent EU Blue Card immediately upon earning an annual gross salary of €41,041, enabling fast-track permanent residency in 21 months.',
    category: 'University & Career',
    source: {
      name: 'Federal Ministry of the Interior and Community (BMI)',
      url: 'https://www.bmi.bund.de',
      domain: 'bmi.bund.de'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 2880).toISOString(), // 2 days ago
    tags: ['EU Blue Card', 'Permanent Residency', 'STEM Careers'],
    readTime: '5 min read',
    keyTakeaway: 'Junior software engineering entry salaries in Germany (€48k-€58k) easily exceed the reduced STEM Blue Card threshold.'
  },
  {
    id: 'news-8',
    title: 'Low-Cost European Weekend Travel Hack: Student Routes from Northern Germany to Spain & Central Europe',
    summary: 'Ryanair, EasyJet, and FlixBus have announced expanded seasonal schedules from Bremen, Hamburg, and Hanover airports to popular southern destinations including Palma de Mallorca, Barcelona, and Prague. With return flights frequently dipping under €40 for midweek dates, international students are taking advantage of flexible university scheduling.',
    category: 'Student Life & Travel',
    source: {
      name: 'Journey with Prakhar Travel Dispatch',
      url: 'https://www.instagram.com/whoisprakharrr/',
      domain: 'instagram.com'
    },
    publishedAt: new Date(Date.now() - 1000 * 60 * 3600).toISOString(), // 2.5 days ago
    tags: ['Spain Travel', 'Mallorca', 'Budget Trips'],
    readTime: '3 min read',
    keyTakeaway: 'Book budget airline flights 4-6 weeks in advance and travel with a single under-seat cabin backpack to save 100% of luggage fees.'
  }
];

export function formatNewsTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 5) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Recently';
  }
}

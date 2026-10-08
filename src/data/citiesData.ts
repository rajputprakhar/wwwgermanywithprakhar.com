export interface CityCostData {
  id: string;
  name: string;
  tier: 'high' | 'mid' | 'budget';
  tierLabel: string;
  tierColor: string;
  state: string;
  rentWg: number;
  rentStudio: number;
  rentDorm: number;
  semesterContribution: number; // in € per semester
  semesterTicketStatus: string;
  transitNote: string;
  groceries: number;
  leisure: number;
  phoneWifiMisc: number;
  description: string;
  notableUnis: string[];
}

export const OFFICIAL_SPERRKONTO_MONTHLY = 992; // Official 2025/2026 German monthly Sperrkonto allowance
export const TK_INSURANCE_MONTHLY = 125; // Official standard student public health insurance rate

export const CITIES_DATA: Record<string, CityCostData> = {
  // ==========================================
  // HIGH-TIER COST CITIES
  // ==========================================
  Munich: {
    id: 'munich',
    name: 'Munich',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'Bavaria',
    rentWg: 780,
    rentStudio: 1120,
    rentDorm: 420,
    semesterContribution: 152,
    semesterTicketStatus: 'D-Ticket Upgrade Subsidized',
    transitNote: 'MVV zone; €29/mo student Bavarian Deutschlandticket',
    groceries: 260,
    leisure: 200,
    phoneWifiMisc: 45,
    description: 'Bavaria tech and automotive capital; highest living costs but unmatched engineering job market.',
    notableUnis: ['TU Munich (TUM)', 'LMU Munich', 'Munich UAS']
  },
  Frankfurt: {
    id: 'frankfurt',
    name: 'Frankfurt',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'Hesse',
    rentWg: 670,
    rentStudio: 960,
    rentDorm: 400,
    semesterContribution: 380,
    semesterTicketStatus: 'Included (RMV + Hesse State Rail)',
    transitNote: 'Free regional trains and city transit across entire state of Hesse',
    groceries: 250,
    leisure: 190,
    phoneWifiMisc: 45,
    description: 'Financial hub of continental Europe; headquarters of ECB and major international banking firms.',
    notableUnis: ['Goethe University Frankfurt', 'Frankfurt UAS']
  },
  Hamburg: {
    id: 'hamburg',
    name: 'Hamburg',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'Hamburg',
    rentWg: 630,
    rentStudio: 910,
    rentDorm: 390,
    semesterContribution: 345,
    semesterTicketStatus: 'Included (HVV + D-Ticket Upgrade)',
    transitNote: 'Full HVV metro, S-Bahn, and harbor ferry transit included',
    groceries: 250,
    leisure: 180,
    phoneWifiMisc: 45,
    description: 'Germany’s media & maritime center; world-class quality of life with high housing competition.',
    notableUnis: ['University of Hamburg', 'TU Hamburg (TUHH)', 'HAW Hamburg']
  },
  Berlin: {
    id: 'berlin',
    name: 'Berlin',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'Berlin',
    rentWg: 640,
    rentStudio: 930,
    rentDorm: 380,
    semesterContribution: 320,
    semesterTicketStatus: 'Included (VBB ABC Transit)',
    transitNote: 'Covers entire Berlin ABC zones and Potsdam regional transit',
    groceries: 240,
    leisure: 180,
    phoneWifiMisc: 45,
    description: 'Capital city and dynamic startup ecosystem with vibrant international student scene.',
    notableUnis: ['TU Berlin', 'Humboldt University', 'FU Berlin', 'HTW Berlin']
  },
  Stuttgart: {
    id: 'stuttgart',
    name: 'Stuttgart',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'Baden-Württemberg',
    rentWg: 580,
    rentStudio: 830,
    rentDorm: 370,
    semesterContribution: 210,
    semesterTicketStatus: 'Youth Transit D-Ticket Included',
    transitNote: 'VVS metro network + subsidized D-Ticket for students under 27',
    groceries: 240,
    leisure: 170,
    phoneWifiMisc: 45,
    description: 'Automotive heartland (Mercedes-Benz, Porsche, Bosch); huge industry research demand.',
    notableUnis: ['University of Stuttgart (TU9)', 'Stuttgart Media Uni (HdM)']
  },
  Cologne: {
    id: 'cologne',
    name: 'Cologne',
    tier: 'high',
    tierLabel: 'High-Tier Cost Hub',
    tierColor: 'from-rose-500/20 to-orange-500/20 text-rose-300 border-rose-500/30',
    state: 'North Rhine-Westphalia',
    rentWg: 590,
    rentStudio: 850,
    rentDorm: 370,
    semesterContribution: 330,
    semesterTicketStatus: 'Included (Full NRW State Coverage)',
    transitNote: 'Covers regional rail across all of NRW, connecting to Düsseldorf and Bonn',
    groceries: 240,
    leisure: 180,
    phoneWifiMisc: 45,
    description: 'Major cultural, tech, and media metropolis; lively student atmosphere along the Rhine.',
    notableUnis: ['University of Cologne', 'TH Köln']
  },

  // ==========================================
  // MID-TIER COST CITIES
  // ==========================================
  Bremen: {
    id: 'bremen',
    name: 'Bremen',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'Bremen',
    rentWg: 390,
    rentStudio: 560,
    rentDorm: 290,
    semesterContribution: 390,
    semesterTicketStatus: 'Included (Lower Saxony & Hamburg REs!)',
    transitNote: 'Superb coverage: all regional trains in Lower Saxony and express to Hamburg',
    groceries: 210,
    leisure: 130,
    phoneWifiMisc: 45,
    description: 'Prakhar’s university city! Outstanding balance of affordability, CS research, and student life.',
    notableUnis: ['University of Bremen', 'Hochschule Bremen']
  },
  Hannover: {
    id: 'hannover',
    name: 'Hannover',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'Lower Saxony',
    rentWg: 420,
    rentStudio: 610,
    rentDorm: 310,
    semesterContribution: 385,
    semesterTicketStatus: 'Included (GVH & Lower Saxony RE)',
    transitNote: 'Full GVH metro and regional trains across Lower Saxony state',
    groceries: 220,
    leisure: 130,
    phoneWifiMisc: 45,
    description: 'State capital; central transit hub in northern Germany with premier TU9 engineering faculties.',
    notableUnis: ['Leibniz University Hannover (TU9)', 'Hochschule Hannover']
  },
  Bonn: {
    id: 'bonn',
    name: 'Bonn',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'North Rhine-Westphalia',
    rentWg: 440,
    rentStudio: 630,
    rentDorm: 320,
    semesterContribution: 330,
    semesterTicketStatus: 'Included (Full NRW State Rail)',
    transitNote: 'Covers regional rail transit across the entire state of North Rhine-Westphalia',
    groceries: 225,
    leisure: 140,
    phoneWifiMisc: 45,
    description: 'Former federal capital, home to UN agencies, and world-renowned mathematics & science departments.',
    notableUnis: ['University of Bonn (Excellence Uni)', 'Bonn-Rhein-Sieg UAS']
  },
  Münster: {
    id: 'muenster',
    name: 'Münster',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'North Rhine-Westphalia',
    rentWg: 450,
    rentStudio: 650,
    rentDorm: 330,
    semesterContribution: 325,
    semesterTicketStatus: 'Included (Full NRW State Coverage)',
    transitNote: 'Germany’s bicycle capital with comprehensive rail pass across NRW',
    groceries: 220,
    leisure: 140,
    phoneWifiMisc: 45,
    description: 'Classic university town with over 55,000 students and unparalleled cycling infrastructure.',
    notableUnis: ['University of Münster (WWU)', 'FH Münster']
  },
  Düsseldorf: {
    id: 'duesseldorf',
    name: 'Düsseldorf',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'North Rhine-Westphalia',
    rentWg: 495,
    rentStudio: 720,
    rentDorm: 350,
    semesterContribution: 335,
    semesterTicketStatus: 'Included (VRR & NRW Network)',
    transitNote: 'Complete NRW regional transit coverage and direct connections to Cologne',
    groceries: 235,
    leisure: 160,
    phoneWifiMisc: 45,
    description: 'Commercial and international corporate hub; home to major telecommunications and Japanese firms.',
    notableUnis: ['Heinrich Heine University', 'Hochschule Düsseldorf']
  },
  Heidelberg: {
    id: 'heidelberg',
    name: 'Heidelberg',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'Baden-Württemberg',
    rentWg: 490,
    rentStudio: 730,
    rentDorm: 360,
    semesterContribution: 185,
    semesterTicketStatus: 'Subsidized VRN Transit District',
    transitNote: 'Covers Rhein-Neckar transit district with student pass discounts',
    groceries: 230,
    leisure: 160,
    phoneWifiMisc: 45,
    description: 'Germany’s oldest and most prestigious university; leading center for medicine and life sciences.',
    notableUnis: ['Heidelberg University (Excellence Uni)', 'SRH Hochschule']
  },
  Aachen: {
    id: 'aachen',
    name: 'Aachen',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'North Rhine-Westphalia',
    rentWg: 410,
    rentStudio: 600,
    rentDorm: 300,
    semesterContribution: 320,
    semesterTicketStatus: 'Included (Full NRW + Cross-Border)',
    transitNote: 'Covers all NRW trains + direct border bus lines to Maastricht (Netherlands)',
    groceries: 215,
    leisure: 130,
    phoneWifiMisc: 45,
    description: 'Engineering powerhouse of Europe; vibrant student community centered around RWTH Aachen.',
    notableUnis: ['RWTH Aachen University (TU9)', 'FH Aachen']
  },
  Darmstadt: {
    id: 'darmstadt',
    name: 'Darmstadt',
    tier: 'mid',
    tierLabel: 'Mid-Tier Balanced Hub',
    tierColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    state: 'Hesse',
    rentWg: 470,
    rentStudio: 690,
    rentDorm: 340,
    semesterContribution: 285,
    semesterTicketStatus: 'Included (RMV Network)',
    transitNote: 'Covers Frankfurt Rhine-Main metropolitan area and airport',
    groceries: 230,
    leisure: 150,
    phoneWifiMisc: 45,
    description: 'Recognized as the "City of Science"; premier TU9 institution for Computer Science and Cybersecurity.',
    notableUnis: ['TU Darmstadt (TU9)', 'Hochschule Darmstadt']
  },

  // ==========================================
  // BUDGET-FRIENDLY / HIGH AFFORDABILITY CITIES
  // ==========================================
  Leipzig: {
    id: 'leipzig',
    name: 'Leipzig',
    tier: 'budget',
    tierLabel: 'High Affordability / Student Favorite',
    tierColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    state: 'Saxony',
    rentWg: 330,
    rentStudio: 480,
    rentDorm: 250,
    semesterContribution: 275,
    semesterTicketStatus: 'Included (MDV Central German Network)',
    transitNote: 'Covers Leipzig city trams, metro, and MDV regional trains',
    groceries: 195,
    leisure: 110,
    phoneWifiMisc: 45,
    description: 'Vibrant cultural and creative powerhouse with low living costs and burgeoning tech community.',
    notableUnis: ['Leipzig University', 'HTWK Leipzig']
  },
  Dresden: {
    id: 'dresden',
    name: 'Dresden',
    tier: 'budget',
    tierLabel: 'High Affordability / Student Favorite',
    tierColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    state: 'Saxony',
    rentWg: 320,
    rentStudio: 470,
    rentDorm: 240,
    semesterContribution: 295,
    semesterTicketStatus: 'Included (VVO & Saxony Regional Trains)',
    transitNote: 'Full VVO network and regional rail transit across Saxony state',
    groceries: 195,
    leisure: 110,
    phoneWifiMisc: 45,
    description: 'Center of "Silicon Saxony" (Europe’s largest semiconductor cluster); TU9 Excellence University.',
    notableUnis: ['TU Dresden (TU9 / Excellence)', 'HTW Dresden']
  },
  Chemnitz: {
    id: 'chemnitz',
    name: 'Chemnitz',
    tier: 'budget',
    tierLabel: 'High Affordability / Student Favorite',
    tierColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    state: 'Saxony',
    rentWg: 260,
    rentStudio: 375,
    rentDorm: 220,
    semesterContribution: 285,
    semesterTicketStatus: 'Included (VMS & Saxony Rail)',
    transitNote: 'Full VMS transit and state-wide regional train access',
    groceries: 185,
    leisure: 95,
    phoneWifiMisc: 45,
    description: 'Chemnitz University of Technology; extremely low living expenses and virtually zero housing waiting times.',
    notableUnis: ['Chemnitz University of Technology (TUC)']
  },
  Magdeburg: {
    id: 'magdeburg',
    name: 'Magdeburg',
    tier: 'budget',
    tierLabel: 'High Affordability / Student Favorite',
    tierColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    state: 'Saxony-Anhalt',
    rentWg: 280,
    rentStudio: 395,
    rentDorm: 230,
    semesterContribution: 150,
    semesterTicketStatus: 'Included (Marego City Network)',
    transitNote: 'Covers city trams, buses, and local S-Bahn connections',
    groceries: 190,
    leisure: 100,
    phoneWifiMisc: 45,
    description: 'Expanding engineering and chip fabrication hub with great student-to-rent cost ratios.',
    notableUnis: ['Otto von Guericke University Magdeburg', 'Hochschule Magdeburg-Stendal']
  },
  Ilmenau: {
    id: 'ilmenau',
    name: 'Ilmenau',
    tier: 'budget',
    tierLabel: 'High Affordability / Student Favorite',
    tierColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    state: 'Thuringia',
    rentWg: 250,
    rentStudio: 350,
    rentDorm: 210,
    semesterContribution: 175,
    semesterTicketStatus: 'Included (Thuringian Rail Transit)',
    transitNote: 'Free rail travel throughout Thuringia including Erfurt, Weimar, and Jena',
    groceries: 180,
    leisure: 90,
    phoneWifiMisc: 45,
    description: 'TU Ilmenau engineering campus in the Thuringian hills; lowest student living cost in Germany.',
    notableUnis: ['TU Ilmenau']
  }
};

export const CITIES_LIST = Object.keys(CITIES_DATA);
export const HIGH_TIER_CITIES = ['Munich', 'Frankfurt', 'Hamburg', 'Berlin', 'Stuttgart', 'Cologne'];
export const MID_TIER_CITIES = ['Bremen', 'Hannover', 'Bonn', 'Münster', 'Düsseldorf', 'Heidelberg', 'Aachen', 'Darmstadt'];
export const BUDGET_CITIES = ['Leipzig', 'Dresden', 'Chemnitz', 'Magdeburg', 'Ilmenau'];

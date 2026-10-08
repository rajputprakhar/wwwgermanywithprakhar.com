export interface ConsultingService {
  id: string;
  title: string;
  duration: string;
  price: string;
  tag?: string;
  popular?: boolean;
  limit?: string;
  description: string;
  deliverables: string[];
  topmateSlug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Student Life' | 'Visa & Bureaucracy' | 'Tech & Career';
  readTime: string;
  date: string;
  coverImage: string;
}

export interface ToolkitResource {
  id: string;
  name: string;
  category: 'Finance & Banking' | 'Health Insurance' | 'Housing' | 'Language & Academics' | 'Tech Gear';
  description: string;
  benefit: string;
  discountCode?: string;
  badge?: string;
  affiliateUrl: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  degree: string;
  university: string;
  quote: string;
  country: string;
  avatar: string;
}

export interface ConsultationBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  price: string;
  clientName: string;
  clientEmail: string;
  targetDegree?: string;
  targetMajor?: string;
  background?: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  courseTitle: string;
  background?: string;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Visa & APS' | 'Finances & Sperrkonto' | 'Jobs & Tech';
}

export interface SiteSettings {
  name: string;
  brandName: string;
  title: string;
  university: string;
  location: string;
  germanLevel: string;
  successRate: string;
  founderPhotoUrl?: string;
  youtubeUrl: string;
  personalInstagram: string;
  brandInstagram: string;
  linkedinUrl: string;
  telegramUrl: string;
  topmateUrl: string;
}


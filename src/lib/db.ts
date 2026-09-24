import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import fs from 'fs';
import path from 'path';
import { hashPassword } from './auth';
import {
  BLOG_POSTS_DATA,
  SERVICES_DATA,
  INDUSTRIES_DATA,
  CASE_STUDIES_DATA,
  TESTIMONIALS_DATA,
  FAQS_HOMEPAGE,
  TECH_CATEGORIES,
} from './content';

interface StorageData {
  adminUsers: any[];
  pages: any[];
  blogs: any[];
  services: any[];
  industries: any[];
  caseStudies: any[];
  testimonials: any[];
  faqs: any[];
  technologies: any[];
  inquiries: any[];
  contacts: any[];
  subscribers: any[];
  settings: Record<string, string>;
}

const STORAGE_FILE = path.join(process.cwd(), '.local_db.json');

function getInitialData(): StorageData {
  const defaultAdmin = hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || 'AvoraAdmin2026!Secure');
  return {
    adminUsers: [
      {
        id: 'admin-1',
        email: process.env.ADMIN_DEFAULT_EMAIL || 'admin@avorainnovations.com',
        name: 'Avora Executive Admin',
        password: defaultAdmin.hash,
        role: 'superadmin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    pages: [
      {
        id: 'page-home',
        slug: 'home',
        title: 'AVORA Innovations — Enterprise AI & Digital Engineering',
        description: 'Next-Generation AI solutions, custom software engineering, and digital transformation for global enterprises.',
        isPublished: true,
        metaTitle: 'AVORA Innovations | Enterprise AI, Cloud & Software Engineering',
        metaDesc: 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
        sections: JSON.stringify([
          { type: 'hero', enabled: true },
          { type: 'about', enabled: true },
          { type: 'services', enabled: true },
          { type: 'technologies', enabled: true },
          { type: 'industries', enabled: true },
          { type: 'case-studies', enabled: true },
          { type: 'why-avora', enabled: true },
          { type: 'testimonials', enabled: true },
          { type: 'blogs', enabled: true },
          { type: 'faqs', enabled: true },
          { type: 'cta', enabled: true },
        ]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    blogs: BLOG_POSTS_DATA.map((b) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category,
      tags: JSON.stringify(b.tags),
      coverImage: b.coverImage,
      authorName: b.authorName,
      authorRole: b.authorRole,
      readTime: b.readTime,
      isFeatured: !!b.isFeatured,
      isPublished: true,
      createdAt: new Date(b.publishedAt).toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    services: SERVICES_DATA,
    industries: INDUSTRIES_DATA,
    caseStudies: CASE_STUDIES_DATA,
    testimonials: TESTIMONIALS_DATA,
    faqs: FAQS_HOMEPAGE,
    technologies: TECH_CATEGORIES,
    inquiries: [
      {
        id: 'inq-1',
        name: 'David Vance',
        email: 'd.vance@solargen.example.com',
        phone: '+1 (555) 349-2810',
        company: 'Solargen Dynamics',
        service: 'AI & Machine Learning',
        budget: '$50,000 - $100,000',
        timeline: '1-3 months',
        message: 'Looking to build an autonomous computer vision inspection pipeline for solar panel fabrication lines.',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'inq-2',
        name: 'Dr. Sarah Lin',
        email: 'slin@biovista.example.com',
        phone: '+1 (555) 782-9901',
        company: 'BioVista Diagnostics',
        service: 'Generative AI & LLMs',
        budget: '$100,000+',
        timeline: 'Immediate',
        message: 'Need a private enterprise RAG engine to query clinical trial results with strict citation verification.',
        status: 'contacting',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    contacts: [],
    subscribers: [
      { id: 'sub-1', email: 'tech-insights@innovators.example.com', isActive: true, createdAt: new Date().toISOString() },
    ],
    settings: {
      siteName: 'AVORA Innovations',
      tagline: 'Enterprise AI & Digital Engineering Partner',
      contactEmail: 'contact@avorainnovations.com',
      contactPhone: '+1 (800) 512-AVORA',
      headquarters: '100 Innovation Way, Suite 400, San Francisco, CA 94105',
      twitter: 'https://twitter.com/avorainnovations',
      linkedin: 'https://linkedin.com/company/avorainnovations',
      github: 'https://github.com/avorainnovations',
    },
  };
}

function loadLocalStore(): StorageData {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      // Ensure all arrays exist
      if (!parsed.services) parsed.services = SERVICES_DATA;
      if (!parsed.industries) parsed.industries = INDUSTRIES_DATA;
      if (!parsed.caseStudies) parsed.caseStudies = CASE_STUDIES_DATA;
      if (!parsed.testimonials) parsed.testimonials = TESTIMONIALS_DATA;
      if (!parsed.faqs) parsed.faqs = FAQS_HOMEPAGE;
      if (!parsed.technologies) parsed.technologies = TECH_CATEGORIES;
      return parsed;
    }
  } catch (err) {
    console.warn('[DB] Could not load local storage file, using default seed:', err);
  }
  const initial = getInitialData();
  saveLocalStore(initial);
  return initial;
}

function saveLocalStore(data: StorageData) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Could not save local storage file:', err);
  }
}

// Resilient Unified Database Layer with Full CMS Operations
export const db = {
  // --- Admin User ---
  async findAdminByEmail(email: string) {
    const store = loadLocalStore();
    return store.adminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async updateAdminPassword(email: string, passwordHash: string) {
    const store = loadLocalStore();
    const idx = store.adminUsers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx !== -1) {
      store.adminUsers[idx].password = passwordHash;
      store.adminUsers[idx].updatedAt = new Date().toISOString();
      saveLocalStore(store);
      return store.adminUsers[idx];
    }
    return null;
  },

  // --- Dynamic Pages ---
  async getPage(slug: string) {
    const store = loadLocalStore();
    return store.pages.find((p) => p.slug === slug) || null;
  },

  async getAllPages() {
    const store = loadLocalStore();
    return store.pages;
  },

  async savePage(data: {
    slug: string;
    title: string;
    description?: string;
    sections: string;
    metaTitle?: string;
    metaDesc?: string;
    isPublished?: boolean;
  }) {
    const store = loadLocalStore();
    const existingIdx = store.pages.findIndex((p) => p.slug === data.slug);
    const now = new Date().toISOString();
    if (existingIdx !== -1) {
      store.pages[existingIdx] = {
        ...store.pages[existingIdx],
        ...data,
        updatedAt: now,
      };
      saveLocalStore(store);
      return store.pages[existingIdx];
    } else {
      const newPage = {
        id: 'page-' + Date.now(),
        ...data,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        createdAt: now,
        updatedAt: now,
      };
      store.pages.push(newPage);
      saveLocalStore(store);
      return newPage;
    }
  },

  async deletePage(slug: string) {
    const store = loadLocalStore();
    store.pages = store.pages.filter((p) => p.slug !== slug);
    saveLocalStore(store);
    return true;
  },

  // --- Services (CMS Managed) ---
  async getAllServices() {
    const store = loadLocalStore();
    return store.services;
  },

  async getServiceBySlug(slug: string) {
    const store = loadLocalStore();
    return store.services.find((s) => s.slug === slug) || null;
  },

  async saveService(serviceData: any) {
    const store = loadLocalStore();
    const idx = store.services.findIndex((s) => s.id === serviceData.id || s.slug === serviceData.slug);
    if (idx !== -1) {
      store.services[idx] = { ...store.services[idx], ...serviceData };
      saveLocalStore(store);
      return store.services[idx];
    } else {
      const newService = {
        id: serviceData.slug,
        ...serviceData,
      };
      store.services.push(newService);
      saveLocalStore(store);
      return newService;
    }
  },

  async deleteService(slugOrId: string) {
    const store = loadLocalStore();
    store.services = store.services.filter((s) => s.id !== slugOrId && s.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Industries (CMS Managed) ---
  async getAllIndustries() {
    const store = loadLocalStore();
    return store.industries;
  },

  async getIndustryBySlug(slug: string) {
    const store = loadLocalStore();
    return store.industries.find((i) => i.slug === slug) || null;
  },

  async saveIndustry(industryData: any) {
    const store = loadLocalStore();
    const idx = store.industries.findIndex((i) => i.id === industryData.id || i.slug === industryData.slug);
    if (idx !== -1) {
      store.industries[idx] = { ...store.industries[idx], ...industryData };
      saveLocalStore(store);
      return store.industries[idx];
    } else {
      const newInd = {
        id: industryData.slug,
        ...industryData,
      };
      store.industries.push(newInd);
      saveLocalStore(store);
      return newInd;
    }
  },

  async deleteIndustry(slugOrId: string) {
    const store = loadLocalStore();
    store.industries = store.industries.filter((i) => i.id !== slugOrId && i.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Case Studies (CMS Managed) ---
  async getAllCaseStudies() {
    const store = loadLocalStore();
    return store.caseStudies;
  },

  async getCaseStudyBySlug(slug: string) {
    const store = loadLocalStore();
    return store.caseStudies.find((c) => c.slug === slug) || null;
  },

  async saveCaseStudy(caseStudyData: any) {
    const store = loadLocalStore();
    const idx = store.caseStudies.findIndex((c) => c.id === caseStudyData.id || c.slug === caseStudyData.slug);
    if (idx !== -1) {
      store.caseStudies[idx] = { ...store.caseStudies[idx], ...caseStudyData };
      saveLocalStore(store);
      return store.caseStudies[idx];
    } else {
      const newStudy = {
        id: caseStudyData.slug,
        ...caseStudyData,
      };
      store.caseStudies.push(newStudy);
      saveLocalStore(store);
      return newStudy;
    }
  },

  async deleteCaseStudy(slugOrId: string) {
    const store = loadLocalStore();
    store.caseStudies = store.caseStudies.filter((c) => c.id !== slugOrId && c.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Testimonials (CMS Managed) ---
  async getAllTestimonials() {
    const store = loadLocalStore();
    return store.testimonials;
  },

  async saveTestimonial(testimonialData: any) {
    const store = loadLocalStore();
    const idx = store.testimonials.findIndex((t) => t.id === testimonialData.id);
    if (idx !== -1) {
      store.testimonials[idx] = { ...store.testimonials[idx], ...testimonialData };
      saveLocalStore(store);
      return store.testimonials[idx];
    } else {
      const newT = {
        id: 't-' + Date.now(),
        ...testimonialData,
      };
      store.testimonials.push(newT);
      saveLocalStore(store);
      return newT;
    }
  },

  async deleteTestimonial(id: string) {
    const store = loadLocalStore();
    store.testimonials = store.testimonials.filter((t) => t.id !== id);
    saveLocalStore(store);
    return true;
  },

  // --- FAQs (CMS Managed) ---
  async getAllFaqs() {
    const store = loadLocalStore();
    return store.faqs;
  },

  async saveFaq(faqData: { id?: string; question: string; answer: string }) {
    const store = loadLocalStore();
    const idx = store.faqs.findIndex((f, i) => f.id === faqData.id || `faq-${i}` === faqData.id);
    if (idx !== -1) {
      store.faqs[idx] = { ...store.faqs[idx], ...faqData };
      saveLocalStore(store);
      return store.faqs[idx];
    } else {
      store.faqs.push(faqData);
      saveLocalStore(store);
      return faqData;
    }
  },

  async deleteFaq(questionOrIndex: string | number) {
    const store = loadLocalStore();
    store.faqs = store.faqs.filter((f, i) => i !== questionOrIndex && f.question !== questionOrIndex);
    saveLocalStore(store);
    return true;
  },

  // --- Blogs ---
  async getAllBlogs(options?: { publishedOnly?: boolean }) {
    const store = loadLocalStore();
    if (options?.publishedOnly) {
      return store.blogs.filter((b) => b.isPublished);
    }
    return store.blogs;
  },

  async getBlogBySlug(slug: string) {
    const store = loadLocalStore();
    return store.blogs.find((b) => b.slug === slug) || null;
  },

  async saveBlog(blogData: any) {
    const store = loadLocalStore();
    const now = new Date().toISOString();
    const existingIdx = store.blogs.findIndex((b) => b.id === blogData.id || b.slug === blogData.slug);
    if (existingIdx !== -1) {
      store.blogs[existingIdx] = {
        ...store.blogs[existingIdx],
        ...blogData,
        updatedAt: now,
      };
      saveLocalStore(store);
      return store.blogs[existingIdx];
    } else {
      const newBlog = {
        id: blogData.id || 'blog-' + Date.now(),
        ...blogData,
        createdAt: now,
        updatedAt: now,
      };
      store.blogs.unshift(newBlog);
      saveLocalStore(store);
      return newBlog;
    }
  },

  async deleteBlog(idOrSlug: string) {
    const store = loadLocalStore();
    store.blogs = store.blogs.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
    saveLocalStore(store);
    return true;
  },

  // --- Inquiries ---
  async getAllInquiries() {
    const store = loadLocalStore();
    return store.inquiries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  async createInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    budget?: string;
    timeline?: string;
    message: string;
  }) {
    const store = loadLocalStore();
    const newInq = {
      id: 'inq-' + Date.now(),
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.inquiries.unshift(newInq);
    saveLocalStore(store);
    return newInq;
  },

  async updateInquiryStatus(id: string, status: string) {
    const store = loadLocalStore();
    const idx = store.inquiries.findIndex((i) => i.id === id);
    if (idx !== -1) {
      store.inquiries[idx].status = status;
      store.inquiries[idx].updatedAt = new Date().toISOString();
      saveLocalStore(store);
      return store.inquiries[idx];
    }
    return null;
  },

  async deleteInquiry(id: string) {
    const store = loadLocalStore();
    store.inquiries = store.inquiries.filter((i) => i.id !== id);
    saveLocalStore(store);
    return true;
  },

  // --- Newsletter Subscribers ---
  async addSubscriber(email: string) {
    const store = loadLocalStore();
    const exists = store.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return exists;
    const newSub = {
      id: 'sub-' + Date.now(),
      email,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    store.subscribers.unshift(newSub);
    saveLocalStore(store);
    return newSub;
  },

  async getAllSubscribers() {
    const store = loadLocalStore();
    return store.subscribers;
  },

  // --- Global Settings ---
  async getSettings() {
    const store = loadLocalStore();
    return store.settings;
  },

  async updateSettings(newSettings: Record<string, string>) {
    const store = loadLocalStore();
    store.settings = { ...store.settings, ...newSettings };
    saveLocalStore(store);
    return store.settings;
  },
};

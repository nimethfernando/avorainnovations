import fs from 'fs';
import path from 'path';
import mariadb, { Pool, PoolConnection } from 'mariadb';
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

export const DEFAULT_NAVIGATION = [
  { id: 'nav-services', label: 'Services', href: '/services', type: 'mega', badge: 'Core', enabled: true, order: 1 },
  { id: 'nav-industries', label: 'Industries', href: '/industries', type: 'mega', badge: 'Verticals', enabled: true, order: 2 },
  { id: 'nav-technologies', label: 'Technologies', href: '/technologies', type: 'mega', badge: '', enabled: true, order: 3 },
  { id: 'nav-solutions', label: 'Solutions', href: '/solutions', type: 'link', badge: '', enabled: true, order: 4 },
  { id: 'nav-cases', label: 'Case Studies', href: '/case-studies', type: 'link', badge: 'ROI', enabled: true, order: 5 },
  { id: 'nav-calculator', label: 'Cost Calculator', href: '/cost-calculator', type: 'link', badge: 'Interactive', enabled: true, order: 6 },
  { id: 'nav-about', label: 'Company', href: '/about', type: 'link', badge: '', enabled: true, order: 7 },
  { id: 'nav-blog', label: 'Insights', href: '/blog', type: 'link', badge: '', enabled: true, order: 8 },
  { id: 'nav-contact', label: 'Contact', href: '/contact', type: 'button', badge: '', enabled: true, order: 9 },
];

export const DEFAULT_CTAS = [
  {
    id: 'global-banner',
    title: 'Ready to Engineer Your Competitive Advantage?',
    subtitle: 'Collaborate with elite engineers to architect, build, and deploy production-grade software and enterprise AI solutions.',
    primaryButtonText: 'Schedule Engineering Consultation',
    primaryButtonLink: '/contact',
    secondaryButtonText: 'Calculate Project Cost',
    secondaryButtonLink: '/cost-calculator',
    badgeText: 'Zero-Risk Discovery • 4-Week PoV',
    enabled: true,
  },
  {
    id: 'floating-cta',
    title: 'Consult Engineering Architects',
    subtitle: 'Schedule an architecture sprint with our senior staff.',
    primaryButtonText: 'Discuss Your Project',
    primaryButtonLink: '/contact',
    enabled: true,
  },
];

export const DEFAULT_MEDIA = [
  {
    id: 'media-logo-horizontal',
    name: 'Logo Horizontal (Light Mode)',
    url: '/logo-horizontal.png',
    type: 'image/png',
    dimensions: '1000x250',
    category: 'Branding',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media-logo-dark',
    name: 'Logo Horizontal (Dark Mode)',
    url: '/logo-horizontal-dark.png',
    type: 'image/png',
    dimensions: '1000x250',
    category: 'Branding',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media-symbol',
    name: 'Avora Symbol Emblem',
    url: '/avora-symbol.png',
    type: 'image/png',
    dimensions: '512x512',
    category: 'Branding',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'media-icon',
    name: 'Favicon / Web Clip',
    url: '/icon.png',
    type: 'image/png',
    dimensions: '512x512',
    category: 'Favicon',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_SEO = {
  metaTitle: 'AVORA Innovations | Enterprise AI, Cloud & Digital Product Engineering',
  metaDescription: 'Avora Innovations designs and engineers production-grade AI systems, mobile applications, cloud infrastructures, and digital products for forward-thinking enterprises.',
  siteName: 'AVORA Innovations',
  ogImage: '/logo-horizontal-dark.png',
  twitterHandle: '@avorainnovations',
  twitterCard: 'summary_large_image',
  keywords: 'AI Engineering, Next.js 16, MariaDB, Enterprise Software, Cloud Architecture, Digital Transformation, Konstant Infosolutions alternative',
  canonicalBase: 'https://avorainnovations.com',
  robotsIndex: true,
  robotsFollow: true,
};

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
  navigation: any[];
  ctas: any[];
  media: any[];
  seo: Record<string, any>;
}

const STORAGE_FILE = path.join(process.cwd(), '.local_db.json');

// --- MariaDB Connection Pool (Isolated avora_* tables) ---
let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) return null;

  try {
    const normalizedUrl = rawUrl.replace(/^mariadb:\/\//, 'mysql://');
    const parsed = new URL(normalizedUrl);
    pool = mariadb.createPool({
      host: parsed.hostname || 'localhost',
      port: parseInt(parsed.port || '3306', 10),
      user: decodeURIComponent(parsed.username || 'root'),
      password: decodeURIComponent(parsed.password || ''),
      database: parsed.pathname.replace(/^\//, ''),
      connectionLimit: 10,
      connectTimeout: 7000,
      acquireTimeout: 7000,
      idleTimeout: 30000,
    });
    return pool;
  } catch (err) {
    console.warn('[DB] Failed to initialize MariaDB pool:', err);
    return null;
  }
}

async function queryDb<T = any>(sql: string, params: any[] = []): Promise<T[] | null> {
  const p = getPool();
  if (!p) return null;
  let conn: PoolConnection | null = null;
  try {
    conn = await p.getConnection();
    const rows = await conn.query(sql, params);
    return rows as T[];
  } catch (err) {
    console.error('[DB Query Error]:', err);
    return null;
  } finally {
    if (conn) conn.release();
  }
}

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
    navigation: DEFAULT_NAVIGATION,
    ctas: DEFAULT_CTAS,
    media: DEFAULT_MEDIA,
    seo: DEFAULT_SEO,
  };
}

function loadLocalStore(): StorageData {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (!parsed.services) parsed.services = SERVICES_DATA;
      if (!parsed.industries) parsed.industries = INDUSTRIES_DATA;
      if (!parsed.caseStudies) parsed.caseStudies = CASE_STUDIES_DATA;
      if (!parsed.testimonials) parsed.testimonials = TESTIMONIALS_DATA;
      if (!parsed.faqs) parsed.faqs = FAQS_HOMEPAGE;
      if (!parsed.technologies) parsed.technologies = TECH_CATEGORIES;
      if (!parsed.navigation) parsed.navigation = DEFAULT_NAVIGATION;
      if (!parsed.ctas) parsed.ctas = DEFAULT_CTAS;
      if (!parsed.media) parsed.media = DEFAULT_MEDIA;
      if (!parsed.seo) parsed.seo = DEFAULT_SEO;
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

// Resilient Unified Database Layer with MariaDB and Fallback
export const db = {
  // --- Admin User ---
  async findAdminByEmail(email: string) {
    const rows = await queryDb<any>('SELECT * FROM avora_admin_users WHERE LOWER(email) = LOWER(?) LIMIT 1', [email]);
    if (rows && rows.length > 0) return rows[0];

    const store = loadLocalStore();
    return store.adminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async updateAdminPassword(email: string, passwordHash: string) {
    await queryDb('UPDATE avora_admin_users SET password = ?, updatedAt = NOW() WHERE LOWER(email) = LOWER(?)', [passwordHash, email]);

    const store = loadLocalStore();
    const idx = store.adminUsers.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx !== -1) {
      store.adminUsers[idx].password = passwordHash;
      store.adminUsers[idx].updatedAt = new Date().toISOString();
      saveLocalStore(store);
      return store.adminUsers[idx];
    }
    return { email, password: passwordHash };
  },

  // --- Dynamic Pages ---
  async getPage(slug: string) {
    const rows = await queryDb<any>('SELECT * FROM avora_pages WHERE slug = ? LIMIT 1', [slug]);
    if (rows && rows.length > 0) {
      return {
        ...rows[0],
        isPublished: Boolean(rows[0].isPublished),
      };
    }

    const store = loadLocalStore();
    return store.pages.find((p) => p.slug === slug) || null;
  },

  async getAllPages() {
    const rows = await queryDb<any>('SELECT * FROM avora_pages ORDER BY createdAt DESC');
    if (rows && rows.length > 0) {
      return rows.map((r) => ({
        ...r,
        isPublished: Boolean(r.isPublished),
      }));
    }

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
    const id = 'page-' + (data.slug || Date.now());
    await queryDb(
      `
      INSERT INTO avora_pages (id, slug, title, description, sections, metaTitle, metaDesc, isPublished)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        sections = VALUES(sections),
        metaTitle = VALUES(metaTitle),
        metaDesc = VALUES(metaDesc),
        isPublished = VALUES(isPublished),
        updatedAt = NOW()
    `,
      [
        id,
        data.slug,
        data.title,
        data.description || '',
        data.sections,
        data.metaTitle || '',
        data.metaDesc || '',
        data.isPublished !== false ? 1 : 0,
      ]
    );

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
        id,
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
    await queryDb('DELETE FROM avora_pages WHERE slug = ?', [slug]);

    const store = loadLocalStore();
    store.pages = store.pages.filter((p) => p.slug !== slug);
    saveLocalStore(store);
    return true;
  },

  // --- Services (CMS Managed) ---
  async getAllServices() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'service' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing service data:', e);
      }
    }
    const store = loadLocalStore();
    return store.services;
  },

  async getServiceBySlug(slug: string) {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'service' AND slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing service data:', e);
      }
    }
    const store = loadLocalStore();
    return store.services.find((s) => s.slug === slug) || null;
  },

  async saveService(serviceData: any) {
    const id = serviceData.id || serviceData.slug || 'srv-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'service', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, serviceData.slug, JSON.stringify(serviceData)]
    );

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
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'service' AND (id = ? OR slug = ?)", [slugOrId, slugOrId]);

    const store = loadLocalStore();
    store.services = store.services.filter((s) => s.id !== slugOrId && s.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Industries (CMS Managed) ---
  async getAllIndustries() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'industry' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing industry data:', e);
      }
    }
    const store = loadLocalStore();
    return store.industries;
  },

  async getIndustryBySlug(slug: string) {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'industry' AND slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing industry data:', e);
      }
    }
    const store = loadLocalStore();
    return store.industries.find((i) => i.slug === slug) || null;
  },

  async saveIndustry(industryData: any) {
    const id = industryData.id || industryData.slug || 'ind-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'industry', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, industryData.slug, JSON.stringify(industryData)]
    );

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
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'industry' AND (id = ? OR slug = ?)", [slugOrId, slugOrId]);

    const store = loadLocalStore();
    store.industries = store.industries.filter((i) => i.id !== slugOrId && i.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Case Studies (CMS Managed) ---
  async getAllCaseStudies() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'case_study' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing case study data:', e);
      }
    }
    const store = loadLocalStore();
    return store.caseStudies;
  },

  async getCaseStudyBySlug(slug: string) {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'case_study' AND slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing case study data:', e);
      }
    }
    const store = loadLocalStore();
    return store.caseStudies.find((c) => c.slug === slug) || null;
  },

  async saveCaseStudy(caseStudyData: any) {
    const id = caseStudyData.id || caseStudyData.slug || 'cs-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'case_study', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, caseStudyData.slug, JSON.stringify(caseStudyData)]
    );

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
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'case_study' AND (id = ? OR slug = ?)", [slugOrId, slugOrId]);

    const store = loadLocalStore();
    store.caseStudies = store.caseStudies.filter((c) => c.id !== slugOrId && c.slug !== slugOrId);
    saveLocalStore(store);
    return true;
  },

  // --- Testimonials (CMS Managed) ---
  async getAllTestimonials() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'testimonial' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing testimonial data:', e);
      }
    }
    const store = loadLocalStore();
    return store.testimonials;
  },

  async saveTestimonial(testimonialData: any) {
    const id = testimonialData.id || 't-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'testimonial', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(testimonialData)]
    );

    const store = loadLocalStore();
    const idx = store.testimonials.findIndex((t) => t.id === testimonialData.id);
    if (idx !== -1) {
      store.testimonials[idx] = { ...store.testimonials[idx], ...testimonialData };
      saveLocalStore(store);
      return store.testimonials[idx];
    } else {
      const newT = {
        id,
        ...testimonialData,
      };
      store.testimonials.push(newT);
      saveLocalStore(store);
      return newT;
    }
  },

  async deleteTestimonial(id: string) {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'testimonial' AND id = ?", [id]);

    const store = loadLocalStore();
    store.testimonials = store.testimonials.filter((t) => t.id !== id);
    saveLocalStore(store);
    return true;
  },

  // --- FAQs (CMS Managed) ---
  async getAllFaqs() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'faq' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing faq data:', e);
      }
    }
    const store = loadLocalStore();
    return store.faqs;
  },

  async saveFaq(faqData: { id?: string; question: string; answer: string }) {
    const id = faqData.id || 'faq-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'faq', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(faqData)]
    );

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
    const sql = options?.publishedOnly
      ? 'SELECT * FROM avora_blogs WHERE isPublished = 1 ORDER BY createdAt DESC'
      : 'SELECT * FROM avora_blogs ORDER BY createdAt DESC';
    const rows = await queryDb<any>(sql);
    if (rows && rows.length > 0) {
      return rows.map((r) => ({
        ...r,
        isFeatured: Boolean(r.isFeatured),
        isPublished: Boolean(r.isPublished),
      }));
    }

    const store = loadLocalStore();
    if (options?.publishedOnly) {
      return store.blogs.filter((b) => b.isPublished);
    }
    return store.blogs;
  },

  async getBlogBySlug(slug: string) {
    const rows = await queryDb<any>('SELECT * FROM avora_blogs WHERE slug = ? LIMIT 1', [slug]);
    if (rows && rows.length > 0) {
      return {
        ...rows[0],
        isFeatured: Boolean(rows[0].isFeatured),
        isPublished: Boolean(rows[0].isPublished),
      };
    }

    const store = loadLocalStore();
    return store.blogs.find((b) => b.slug === slug) || null;
  },

  async saveBlog(blogData: any) {
    const id = blogData.id || 'blog-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_blogs (id, slug, title, excerpt, content, category, tags, coverImage, authorName, authorRole, readTime, isFeatured, isPublished)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        excerpt = VALUES(excerpt),
        content = VALUES(content),
        category = VALUES(category),
        tags = VALUES(tags),
        coverImage = VALUES(coverImage),
        authorName = VALUES(authorName),
        authorRole = VALUES(authorRole),
        readTime = VALUES(readTime),
        isFeatured = VALUES(isFeatured),
        isPublished = VALUES(isPublished),
        updatedAt = NOW()
    `,
      [
        id,
        blogData.slug,
        blogData.title,
        blogData.excerpt || '',
        blogData.content || '',
        blogData.category || 'Technology',
        typeof blogData.tags === 'string' ? blogData.tags : JSON.stringify(blogData.tags || []),
        blogData.coverImage || '',
        blogData.authorName || 'Avora Engineering',
        blogData.authorRole || 'Tech Lead',
        blogData.readTime || '5 min read',
        blogData.isFeatured ? 1 : 0,
        blogData.isPublished !== false ? 1 : 0,
      ]
    );

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
        id,
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
    await queryDb('DELETE FROM avora_blogs WHERE id = ? OR slug = ?', [idOrSlug, idOrSlug]);

    const store = loadLocalStore();
    store.blogs = store.blogs.filter((b) => b.id !== idOrSlug && b.slug !== idOrSlug);
    saveLocalStore(store);
    return true;
  },

  // --- Inquiries ---
  async getAllInquiries() {
    const rows = await queryDb<any>('SELECT * FROM avora_inquiries ORDER BY createdAt DESC');
    if (rows && rows.length > 0) return rows;

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
    const id = 'inq-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_inquiries (id, name, email, phone, company, service, budget, timeline, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
    `,
      [
        id,
        data.name,
        data.email,
        data.phone || '',
        data.company || '',
        data.service || '',
        data.budget || '',
        data.timeline || '',
        data.message,
      ]
    );

    const store = loadLocalStore();
    const newInq = {
      id,
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
    await queryDb('UPDATE avora_inquiries SET status = ?, updatedAt = NOW() WHERE id = ?', [status, id]);

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
    await queryDb('DELETE FROM avora_inquiries WHERE id = ?', [id]);

    const store = loadLocalStore();
    store.inquiries = store.inquiries.filter((i) => i.id !== id);
    saveLocalStore(store);
    return true;
  },

  // --- Contact Submissions ---
  async createContactSubmission(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone?: string;
  }) {
    const id = 'contact-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_contact_submissions (id, name, email, subject, message, phone)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [id, data.name, data.email, data.subject || '', data.message, data.phone || '']
    );

    const store = loadLocalStore();
    const newContact = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    };
    store.contacts.unshift(newContact);
    saveLocalStore(store);
    return newContact;
  },

  // --- Newsletter Subscribers ---
  async addSubscriber(email: string) {
    const id = 'sub-' + Date.now();
    await queryDb(
      'INSERT INTO avora_subscribers (id, email, isActive) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE isActive = 1',
      [id, email]
    );

    const store = loadLocalStore();
    const exists = store.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) return exists;
    const newSub = {
      id,
      email,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    store.subscribers.unshift(newSub);
    saveLocalStore(store);
    return newSub;
  },

  async getAllSubscribers() {
    const rows = await queryDb<any>('SELECT * FROM avora_subscribers ORDER BY createdAt DESC');
    if (rows && rows.length > 0) return rows;

    const store = loadLocalStore();
    return store.subscribers;
  },

  // --- Global Settings ---
  async getSettings() {
    const rows = await queryDb<any>('SELECT `key`, `value` FROM avora_settings');
    const store = loadLocalStore();
    if (rows && rows.length > 0) {
      const dbSettings: Record<string, string> = {};
      for (const r of rows) {
        dbSettings[r.key] = r.value;
      }
      return { ...store.settings, ...dbSettings };
    }
    return store.settings;
  },

  async updateSettings(newSettings: Record<string, string>) {
    for (const [k, v] of Object.entries(newSettings)) {
      await queryDb(
        'INSERT INTO avora_settings (id, `key`, `value`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updatedAt = NOW()',
        ['set-' + k, k, v]
      );
    }

    const store = loadLocalStore();
    store.settings = { ...store.settings, ...newSettings };
    saveLocalStore(store);
    return store.settings;
  },

  // --- Technologies (CMS Managed) ---
  async getAllTechnologies() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'technology' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing tech data:', e);
      }
    }
    const store = loadLocalStore();
    return store.technologies || TECH_CATEGORIES;
  },

  async getTechnologyBySlug(slug: string) {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'technology' AND slug = ? LIMIT 1", [slug]);
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing tech data:', e);
      }
    }
    const store = loadLocalStore();
    return (store.technologies || TECH_CATEGORIES).find((t: any) => t.slug === slug) || null;
  },

  async saveTechnology(techData: any) {
    const id = techData.id || techData.slug || 'tech-' + Date.now();
    const slug = techData.slug || id;
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'technology', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, slug, JSON.stringify(techData)]
    );

    const store = loadLocalStore();
    if (!store.technologies) store.technologies = [...TECH_CATEGORIES];
    const idx = store.technologies.findIndex((t: any) => t.id === techData.id || t.slug === techData.slug);
    if (idx !== -1) {
      store.technologies[idx] = { ...store.technologies[idx], ...techData };
      saveLocalStore(store);
      return store.technologies[idx];
    } else {
      const newTech = { id, ...techData };
      store.technologies.push(newTech);
      saveLocalStore(store);
      return newTech;
    }
  },

  async deleteTechnology(slugOrId: string) {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'technology' AND (id = ? OR slug = ?)", [slugOrId, slugOrId]);

    const store = loadLocalStore();
    if (store.technologies) {
      store.technologies = store.technologies.filter((t: any) => t.id !== slugOrId && t.slug !== slugOrId);
      saveLocalStore(store);
    }
    return true;
  },

  // --- Navigation (CMS Managed) ---
  async getNavigation() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'navigation' AND slug = 'main_navigation' LIMIT 1");
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing navigation data:', e);
      }
    }
    const store = loadLocalStore();
    return store.navigation || DEFAULT_NAVIGATION;
  },

  async saveNavigation(navData: any[]) {
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES ('nav-main', 'navigation', 'main_navigation', ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [JSON.stringify(navData)]
    );

    const store = loadLocalStore();
    store.navigation = navData;
    saveLocalStore(store);
    return navData;
  },

  // --- CTAs (CMS Managed) ---
  async getAllCTAs() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'cta' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing CTA data:', e);
      }
    }
    const store = loadLocalStore();
    return store.ctas || DEFAULT_CTAS;
  },

  async saveCTA(ctaData: any) {
    const id = ctaData.id || 'cta-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'cta', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(ctaData)]
    );

    const store = loadLocalStore();
    if (!store.ctas) store.ctas = [...DEFAULT_CTAS];
    const idx = store.ctas.findIndex((c: any) => c.id === ctaData.id);
    if (idx !== -1) {
      store.ctas[idx] = { ...store.ctas[idx], ...ctaData };
      saveLocalStore(store);
      return store.ctas[idx];
    } else {
      store.ctas.push(ctaData);
      saveLocalStore(store);
      return ctaData;
    }
  },

  async deleteCTA(id: string) {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'cta' AND id = ?", [id]);
    const store = loadLocalStore();
    if (store.ctas) {
      store.ctas = store.ctas.filter((c: any) => c.id !== id);
      saveLocalStore(store);
    }
    return true;
  },

  // --- Media & Images (CMS Managed) ---
  async getAllMedia() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'media' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing media data:', e);
      }
    }
    const store = loadLocalStore();
    return store.media || DEFAULT_MEDIA;
  },

  async saveMedia(mediaData: any) {
    const id = mediaData.id || 'media-' + Date.now();
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'media', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(mediaData)]
    );

    const store = loadLocalStore();
    if (!store.media) store.media = [...DEFAULT_MEDIA];
    const idx = store.media.findIndex((m: any) => m.id === mediaData.id);
    if (idx !== -1) {
      store.media[idx] = { ...store.media[idx], ...mediaData };
      saveLocalStore(store);
      return store.media[idx];
    } else {
      store.media.unshift(mediaData);
      saveLocalStore(store);
      return mediaData;
    }
  },

  async deleteMedia(id: string) {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'media' AND id = ?", [id]);
    const store = loadLocalStore();
    if (store.media) {
      store.media = store.media.filter((m: any) => m.id !== id);
      saveLocalStore(store);
    }
    return true;
  },

  // --- SEO Settings (CMS Managed) ---
  async getSEOSettings() {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'seo' AND slug = 'global_seo' LIMIT 1");
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing SEO data:', e);
      }
    }
    const store = loadLocalStore();
    return store.seo || DEFAULT_SEO;
  },

  async saveSEOSettings(seoData: any) {
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES ('seo-global', 'seo', 'global_seo', ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [JSON.stringify(seoData)]
    );

    const store = loadLocalStore();
    store.seo = { ...store.seo, ...seoData };
    saveLocalStore(store);
    return store.seo;
  },
};

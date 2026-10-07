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
  CompanyLocation,
  DEFAULT_LOCATIONS,
  LeadershipMember,
  DEFAULT_LEADERSHIP,
  DEFAULT_TECH_PAGES,
  TechnologyDetailPage,
  buildDefaultTechPage,
  getTechSlug,
} from './content';

export const DEFAULT_NAVIGATION = [
  { id: 'nav-services', label: 'Services', href: '/services', type: 'mega', badge: 'Core', enabled: true, order: 1 },
  { id: 'nav-industries', label: 'Industries', href: '/industries', type: 'mega', badge: 'Verticals', enabled: true, order: 2 },
  { id: 'nav-technologies', label: 'Technologies', href: '/technologies', type: 'mega', badge: '', enabled: true, order: 3 },
  { id: 'nav-solutions', label: 'Solutions', href: '/solutions', type: 'mega', badge: '', enabled: true, order: 4 },
  { id: 'nav-blog', label: 'Blog', href: '/blog', type: 'link', badge: '', enabled: true, order: 5 },
  { id: 'nav-resources', label: 'Resources', href: '/case-studies', type: 'mega', badge: 'Insights', enabled: true, order: 5 },
  { id: 'nav-about', label: 'About', href: '/about', type: 'link', badge: '', enabled: true, order: 6 },
  { id: 'nav-contact', label: 'Contact', href: '/contact', type: 'link', badge: '', enabled: true, order: 7 },
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
  keywords: 'AI Engineering, Next.js 16, MariaDB, Enterprise Software, Cloud Architecture, Digital Transformation, Global AI Studio',
  canonicalBase: 'https://avorainnovations.com',
  robotsIndex: true,
  robotsFollow: true,
};

import { CostCalculatorConfig, DEFAULT_COST_CONFIG } from './calculator-types';
export type { CostCalculatorConfig, CostPlatformConfig, CostScaleConfig, CostFeatureConfig } from './calculator-types';
export { DEFAULT_COST_CONFIG } from './calculator-types';

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
  technologyPages?: any[];
  inquiries: any[];
  contacts: any[];
  subscribers: any[];
  settings: Record<string, string>;
  navigation: any[];
  ctas: any[];
  media: any[];
  seo: Record<string, any>;
  costCalculator?: any;
  locations?: CompanyLocation[];
  leadership?: LeadershipMember[];
  resetTokens?: Array<{ email: string; token: string; expiresAt: number; used: boolean }>;
}

const STORAGE_FILE = path.join(process.cwd(), '.local_db.json');

// --- MariaDB Connection Pool (Isolated avora_* tables) ---
const globalForDb = globalThis as unknown as {
  mariadbPool?: Pool;
  blogsEnsured?: boolean;
  blogsCache?: { data: any[]; timestamp: number };
};

function getPool(): Pool | null {
  if (globalForDb.mariadbPool) return globalForDb.mariadbPool;
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) return null;

  try {
    const normalizedUrl = rawUrl.replace(/^mariadb:\/\//, 'mysql://');
    const parsed = new URL(normalizedUrl);
    const newPool = mariadb.createPool({
      host: parsed.hostname || 'localhost',
      port: parseInt(parsed.port || '3306', 10),
      user: decodeURIComponent(parsed.username || 'root'),
      password: decodeURIComponent(parsed.password || ''),
      database: parsed.pathname.replace(/^\//, ''),
      connectionLimit: 4,
      connectTimeout: 4000,
      acquireTimeout: 4000,
      idleTimeout: 15000,
      minimumIdle: 0,
    });
    globalForDb.mariadbPool = newPool;
    return newPool;
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
        email: process.env.ADMIN_DEFAULT_EMAIL || 'avorainnovations@gmail.com',
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
    technologyPages: DEFAULT_TECH_PAGES,
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
      contactEmail: 'avorainnovations@gmail.com',
      contactPhone: '+995 555433091',
      headquarters: '17 Ioane Shavteli St, Tbilisi, Georgia',
      twitter: 'https://twitter.com/avorainnovations',
      linkedin: 'https://linkedin.com/company/avorainnovations',
      github: 'https://github.com/avorainnovations',
    },
    navigation: DEFAULT_NAVIGATION,
    ctas: DEFAULT_CTAS,
    media: DEFAULT_MEDIA,
    seo: DEFAULT_SEO,
    costCalculator: DEFAULT_COST_CONFIG,
    locations: DEFAULT_LOCATIONS,
    leadership: DEFAULT_LEADERSHIP,
    resetTokens: [],
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
      let needsSave = false;
      const backendCat = parsed.technologies?.find((c: any) => c.slug === 'backend');
      const hasAllBackends = backendCat && backendCat.items && backendCat.items.some((i: any) => i.name.toLowerCase().includes('rails'));
      if (!parsed.technologies || !Array.isArray(parsed.technologies) || parsed.technologies.length < TECH_CATEGORIES.length || !hasAllBackends) {
        parsed.technologies = TECH_CATEGORIES;
        needsSave = true;
      }
      if (!parsed.navigation || !Array.isArray(parsed.navigation) || !parsed.navigation.some((n: any) => n.id === 'nav-blog' || n.href === '/blog')) {
        parsed.navigation = DEFAULT_NAVIGATION;
        needsSave = true;
      }
      if (!parsed.blogs || !Array.isArray(parsed.blogs)) {
        parsed.blogs = [];
        needsSave = true;
      }
      for (const master of BLOG_POSTS_DATA) {
        if (!parsed.blogs.some((b: any) => b.slug === master.slug)) {
          parsed.blogs.push({
            id: master.id,
            slug: master.slug,
            title: master.title,
            excerpt: master.excerpt,
            content: master.content,
            category: master.category,
            tags: JSON.stringify(master.tags),
            coverImage: master.coverImage,
            authorName: master.authorName,
            authorRole: master.authorRole,
            readTime: master.readTime,
            isFeatured: !!master.isFeatured,
            isPublished: true,
            createdAt: new Date(master.publishedAt).toISOString(),
            updatedAt: new Date().toISOString(),
          });
          needsSave = true;
        }
      }
      for (const b of parsed.blogs) {
        if (!b.coverImage || (typeof b.coverImage === 'string' && b.coverImage.startsWith('data:') && b.coverImage.length <= 500)) {
          const master = BLOG_POSTS_DATA.find((p) => p.slug === b.slug);
          b.coverImage = master ? master.coverImage : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
          needsSave = true;
        }
      }
      if (!parsed.ctas) parsed.ctas = DEFAULT_CTAS;
      if (!parsed.media) parsed.media = DEFAULT_MEDIA;
      if (!parsed.costCalculator) parsed.costCalculator = DEFAULT_COST_CONFIG;
      if (!parsed.seo) parsed.seo = DEFAULT_SEO;
      if (!parsed.locations) parsed.locations = DEFAULT_LOCATIONS;
      if (!parsed.leadership) parsed.leadership = DEFAULT_LEADERSHIP;
      if (!parsed.resetTokens) parsed.resetTokens = [];
      if (needsSave) {
        saveLocalStore(parsed);
      }
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
  async ensureAdminUser() {
    const targetEmail = (process.env.ADMIN_DEFAULT_EMAIL || 'avorainnovations@gmail.com').toLowerCase();
    const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || 'AvoraAdmin2026!Secure';
    const defaultHash = hashPassword(defaultPass).hash;

    try {
      const rows = await queryDb<any>('SELECT * FROM avora_admin_users WHERE LOWER(email) = ? LIMIT 1', [targetEmail]);
      if (!rows || rows.length === 0) {
        const existingUsers = await queryDb<any>('SELECT * FROM avora_admin_users LIMIT 1');
        if (existingUsers && existingUsers.length > 0) {
          await queryDb('UPDATE avora_admin_users SET email = ?, name = "Avora Executive Admin", updatedAt = NOW() WHERE id = ?', [
            targetEmail,
            existingUsers[0].id,
          ]);
        } else {
          await queryDb(
            'INSERT INTO avora_admin_users (id, email, name, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            ['admin-1', targetEmail, 'Avora Executive Admin', defaultHash, 'superadmin']
          );
        }
      }
    } catch (e) {
      console.warn('[DB] Could not ensure admin user in DB, falling back to local store:', e);
    }

    try {
      const store = loadLocalStore();
      const adminIdx = store.adminUsers.findIndex((u) => u.email.toLowerCase() === targetEmail);
      if (adminIdx === -1) {
        if (store.adminUsers.length > 0) {
          store.adminUsers[0].email = targetEmail;
        } else {
          store.adminUsers.push({
            id: 'admin-1',
            email: targetEmail,
            name: 'Avora Executive Admin',
            password: defaultHash,
            role: 'superadmin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
        saveLocalStore(store);
      }
    } catch (e) {
      console.error('[DB] Error syncing local store admin user:', e);
    }
  },

  async findAdminByEmail(email: string) {
    await this.ensureAdminUser();
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

  // --- Password Reset Tokens ---
  async savePasswordResetToken(email: string, token: string, expiresAt: number) {
    const tokenRecord = {
      email: email.toLowerCase(),
      token,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString(),
    };

    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'reset_token', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [token, token, JSON.stringify(tokenRecord)]
    );

    const store = loadLocalStore();
    if (!store.resetTokens) store.resetTokens = [];
    store.resetTokens = store.resetTokens.filter((t) => t.token !== token);
    store.resetTokens.push(tokenRecord);
    saveLocalStore(store);
    return true;
  },

  async verifyPasswordResetToken(token: string) {
    // 1. Try DB
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'reset_token' AND id = ? LIMIT 1", [token]);
    if (rows && rows.length > 0) {
      try {
        const record = JSON.parse(rows[0].data);
        if (record.used) {
          return { valid: false, error: 'This password reset link has already been used.' };
        }
        if (Date.now() > record.expiresAt) {
          return { valid: false, error: 'This password reset link has expired. Please request a new one.' };
        }
        return { valid: true, email: record.email };
      } catch (err) {
        console.error('[DB] Error parsing reset token data:', err);
      }
    }

    // 2. Try local store
    const store = loadLocalStore();
    const record = (store.resetTokens || []).find((t) => t.token === token);
    if (!record) {
      return { valid: false, error: 'Invalid or unknown reset link.' };
    }
    if (record.used) {
      return { valid: false, error: 'This password reset link has already been used.' };
    }
    if (Date.now() > record.expiresAt) {
      return { valid: false, error: 'This password reset link has expired. Please request a new one.' };
    }
    return { valid: true, email: record.email };
  },

  async markResetTokenUsed(token: string) {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'reset_token' AND id = ? LIMIT 1", [token]);
    if (rows && rows.length > 0) {
      try {
        const record = JSON.parse(rows[0].data);
        record.used = true;
        await queryDb("UPDATE avora_cms_content SET data = ?, updatedAt = NOW() WHERE type = 'reset_token' AND id = ?", [
          JSON.stringify(record),
          token,
        ]);
      } catch (e) {
        console.error('[DB] Error marking token used in DB:', e);
      }
    }

    const store = loadLocalStore();
    if (store.resetTokens) {
      const idx = store.resetTokens.findIndex((t) => t.token === token);
      if (idx !== -1) {
        store.resetTokens[idx].used = true;
        saveLocalStore(store);
      }
    }
    return true;
  },

  async savePasswordResetOtp(email: string, otp: string, expiresAt: number) {
    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.trim();
    const tokenRecord = {
      email: cleanEmail,
      otp: cleanOtp,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString(),
    };

    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'reset_otp', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      ['otp-' + cleanEmail, cleanOtp, JSON.stringify(tokenRecord)]
    );

    const store = loadLocalStore();
    if (!store.resetTokens) store.resetTokens = [];
    store.resetTokens = store.resetTokens.filter((t) => t.email !== cleanEmail);
    store.resetTokens.push({
      email: cleanEmail,
      token: cleanOtp,
      expiresAt,
      used: false,
    });
    saveLocalStore(store);
    return true;
  },

  async verifyPasswordResetOtp(email: string, otp: string) {
    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.trim();

    // 1. Check in DB
    const rows = await queryDb<any>(
      "SELECT data FROM avora_cms_content WHERE type = 'reset_otp' AND id = ? LIMIT 1",
      ['otp-' + cleanEmail]
    );
    if (rows && rows.length > 0) {
      try {
        const record = JSON.parse(rows[0].data);
        if (record.otp !== cleanOtp) {
          return { valid: false, error: 'Incorrect 6-digit OTP verification code. Please check your email.' };
        }
        if (record.used) {
          return { valid: false, error: 'This verification code has already been used. Please request a new code.' };
        }
        if (Date.now() > record.expiresAt) {
          return { valid: false, error: 'This verification code has expired (valid for 15 minutes). Please request a new code.' };
        }
        return { valid: true, email: record.email };
      } catch (err) {
        console.error('[DB] Error parsing reset OTP:', err);
      }
    }

    // 2. Fallback to local store
    const store = loadLocalStore();
    const record = (store.resetTokens || []).find(
      (t) => t.email.toLowerCase() === cleanEmail && t.token === cleanOtp
    );
    if (!record) {
      return { valid: false, error: 'Incorrect or expired verification code.' };
    }
    if (record.used) {
      return { valid: false, error: 'This verification code has already been used. Please request a new code.' };
    }
    if (Date.now() > record.expiresAt) {
      return { valid: false, error: 'This verification code has expired. Please request a new code.' };
    }
    return { valid: true, email: record.email };
  },

  async markResetOtpUsed(email: string) {
    const cleanEmail = email.toLowerCase().trim();
    const rows = await queryDb<any>(
      "SELECT data FROM avora_cms_content WHERE type = 'reset_otp' AND id = ? LIMIT 1",
      ['otp-' + cleanEmail]
    );
    if (rows && rows.length > 0) {
      try {
        const record = JSON.parse(rows[0].data);
        record.used = true;
        await queryDb(
          "UPDATE avora_cms_content SET data = ?, updatedAt = NOW() WHERE type = 'reset_otp' AND id = ?",
          [JSON.stringify(record), 'otp-' + cleanEmail]
        );
      } catch (e) {
        console.error('[DB] Error marking OTP used in DB:', e);
      }
    }

    const store = loadLocalStore();
    if (store.resetTokens) {
      const idx = store.resetTokens.findIndex((t) => t.email.toLowerCase() === cleanEmail);
      if (idx !== -1) {
        store.resetTokens[idx].used = true;
        saveLocalStore(store);
      }
    }
    return true;
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
    // Check if initial testimonials seeding has occurred in the database
    const seedCheck = await queryDb<any>(
      "SELECT id FROM avora_cms_content WHERE type = 'system_meta' AND id = 'testimonials_seeded_v2' LIMIT 1"
    );

    if (seedCheck && seedCheck.length === 0) {
      // Seed default TESTIMONIALS_DATA into DB so they become editable/deletable CMS entries
      for (const t of TESTIMONIALS_DATA) {
        await queryDb(
          `
          INSERT INTO avora_cms_content (id, type, slug, data)
          VALUES (?, 'testimonial', ?, ?)
          ON DUPLICATE KEY UPDATE id = id
        `,
          [t.id, t.id, JSON.stringify(t)]
        );
      }
      await queryDb(
        `
        INSERT INTO avora_cms_content (id, type, slug, data)
        VALUES ('testimonials_seeded_v2', 'system_meta', 'testimonials_seeded_v2', '{"seeded": true}')
        ON DUPLICATE KEY UPDATE id = id
      `
      );
    }

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

  // --- Company Locations (CMS Managed) ---
  async getAllLocations(): Promise<CompanyLocation[]> {
    const seedCheck = await queryDb<any>(
      "SELECT id FROM avora_cms_content WHERE type = 'system_meta' AND id = 'locations_seeded_v1' LIMIT 1"
    );

    if (seedCheck && seedCheck.length === 0) {
      for (const loc of DEFAULT_LOCATIONS) {
        await queryDb(
          `
          INSERT INTO avora_cms_content (id, type, slug, data)
          VALUES (?, 'location', ?, ?)
          ON DUPLICATE KEY UPDATE id = id
        `,
          [loc.id, loc.id, JSON.stringify(loc)]
        );
      }
      await queryDb(
        `
        INSERT INTO avora_cms_content (id, type, slug, data)
        VALUES ('locations_seeded_v1', 'system_meta', 'locations_seeded_v1', '{"seeded": true}')
        ON DUPLICATE KEY UPDATE id = id
      `
      );
    }

    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'location' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing location data:', e);
      }
    }

    const store = loadLocalStore();
    return store.locations || DEFAULT_LOCATIONS;
  },

  async saveLocation(locationData: any): Promise<CompanyLocation> {
    const id = locationData.id || 'loc-' + Date.now();
    const record: CompanyLocation = {
      id,
      city: locationData.city,
      role: locationData.role || 'Regional Hub',
      address: locationData.address,
      phone: locationData.phone || '',
      email: locationData.email || '',
      isPrimary: !!locationData.isPrimary,
    };

    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'location', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(record)]
    );

    const store = loadLocalStore();
    if (!store.locations) store.locations = [...DEFAULT_LOCATIONS];
    const idx = store.locations.findIndex((l: any) => l.id === id);
    if (idx !== -1) {
      store.locations[idx] = record;
    } else {
      store.locations.push(record);
    }
    saveLocalStore(store);
    return record;
  },

  async deleteLocation(id: string): Promise<boolean> {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'location' AND id = ?", [id]);

    const store = loadLocalStore();
    if (store.locations) {
      store.locations = store.locations.filter((l: any) => l.id !== id);
      saveLocalStore(store);
    }
    return true;
  },

  // --- Executive Leadership Team (CMS Managed) ---
  async getAllLeadership(): Promise<LeadershipMember[]> {
    const seedCheck = await queryDb<any>(
      "SELECT id FROM avora_cms_content WHERE type = 'system_meta' AND id = 'leadership_seeded_v1' LIMIT 1"
    );

    if (seedCheck && seedCheck.length === 0) {
      for (const lead of DEFAULT_LEADERSHIP) {
        await queryDb(
          `
          INSERT INTO avora_cms_content (id, type, slug, data)
          VALUES (?, 'leadership', ?, ?)
          ON DUPLICATE KEY UPDATE id = id
        `,
          [lead.id, lead.id, JSON.stringify(lead)]
        );
      }
      await queryDb(
        `
        INSERT INTO avora_cms_content (id, type, slug, data)
        VALUES ('leadership_seeded_v1', 'system_meta', 'leadership_seeded_v1', '{"seeded": true}')
        ON DUPLICATE KEY UPDATE id = id
      `
      );
    }

    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'leadership' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        const list: LeadershipMember[] = rows.map((r) => JSON.parse(r.data));
        return list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      } catch (e) {
        console.error('[DB] Error parsing leadership data:', e);
      }
    }

    const store = loadLocalStore();
    const local = store.leadership || DEFAULT_LEADERSHIP;
    return [...local].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  },

  async saveLeadership(data: any): Promise<LeadershipMember> {
    const id = data.id || 'lead-' + Date.now();
    const record: LeadershipMember = {
      id,
      name: data.name || '',
      role: data.role || '',
      image: data.image || '/images/team/amit-batra.png',
      experience: data.experience || '10+ Years Experience',
      bio: data.bio || '',
      linkedin: data.linkedin || '',
      expertise: Array.isArray(data.expertise)
        ? data.expertise
        : (typeof data.expertise === 'string'
            ? data.expertise.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []),
      highlights: Array.isArray(data.highlights) && data.highlights.length > 0
        ? data.highlights
        : [
            { label: 'Industry Track Record', value: data.experience || '10+ Years' },
            { label: 'Core Expertise', value: data.role ? data.role.split('&')[0].trim() : 'Leadership' },
            { label: 'Strategic Focus', value: 'Enterprise Scale' },
          ],
      order: typeof data.order === 'number' ? data.order : parseInt(data.order || '1', 10),
      isActive: data.isActive !== undefined ? !!data.isActive : true,
    };

    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'leadership', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, id, JSON.stringify(record)]
    );

    const store = loadLocalStore();
    if (!store.leadership) store.leadership = [...DEFAULT_LEADERSHIP];
    const idx = store.leadership.findIndex((l: any) => l.id === id);
    if (idx !== -1) {
      store.leadership[idx] = record;
    } else {
      store.leadership.push(record);
    }
    saveLocalStore(store);
    return record;
  },

  async deleteLeadership(id: string): Promise<boolean> {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'leadership' AND id = ?", [id]);

    const store = loadLocalStore();
    if (store.leadership) {
      store.leadership = store.leadership.filter((l: any) => l.id !== id);
      saveLocalStore(store);
    }
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
  async ensureDefaultBlogs() {
    if (globalForDb.blogsEnsured) return;
    globalForDb.blogsEnsured = true;

    // 1. Try to ensure master articles in MariaDB (runs once only)
    try {
      const existingRows = await queryDb<any>('SELECT slug, coverImage FROM avora_blogs');
      if (existingRows !== null) {
        const existingSlugs = new Set((existingRows || []).map((r: any) => r.slug));

        for (const post of BLOG_POSTS_DATA) {
          if (!existingSlugs.has(post.slug)) {
            await queryDb(
              `
              INSERT INTO avora_blogs (id, slug, title, excerpt, content, category, tags, coverImage, authorName, authorRole, readTime, isFeatured, isPublished, createdAt, updatedAt)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW())
              ON DUPLICATE KEY UPDATE id = id
            `,
              [
                post.id,
                post.slug,
                post.title,
                post.excerpt,
                post.content,
                post.category,
                JSON.stringify(post.tags),
                post.coverImage,
                post.authorName,
                post.authorRole,
                post.readTime,
                post.isFeatured ? 1 : 0,
                new Date(post.publishedAt || Date.now()).toISOString(),
              ]
            );
          }
        }
      }
    } catch (e) {
      // Fallback silently if DB is unreachable
    }

    // 2. Ensure local store blogs has all default articles and clean cover images
    try {
      const store = loadLocalStore();
      let modified = false;
      const existingStoreSlugs = new Set((store.blogs || []).map((b: any) => b.slug));

      for (const post of BLOG_POSTS_DATA) {
        if (!existingStoreSlugs.has(post.slug)) {
          store.blogs.push({
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            tags: JSON.stringify(post.tags),
            coverImage: post.coverImage,
            authorName: post.authorName,
            authorRole: post.authorRole,
            readTime: post.readTime,
            isFeatured: !!post.isFeatured,
            isPublished: true,
            createdAt: new Date(post.publishedAt).toISOString(),
            updatedAt: new Date().toISOString(),
          });
          modified = true;
        }
      }

      for (const b of store.blogs) {
        if (!b.coverImage || (typeof b.coverImage === 'string' && b.coverImage.startsWith('data:') && b.coverImage.length <= 500)) {
          const master = BLOG_POSTS_DATA.find((p) => p.slug === b.slug);
          b.coverImage = master ? master.coverImage : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
          modified = true;
        }
      }

      if (modified) {
        saveLocalStore(store);
      }
    } catch (e) {
      console.warn('[DB] Error syncing local store blogs:', e);
    }
  },

  async getAllBlogs(options?: { publishedOnly?: boolean }) {
    const sanitizeBlog = (r: any) => {
      let cover = r.coverImage;
      if (!cover || (typeof cover === 'string' && cover.startsWith('data:') && cover.length <= 500)) {
        const master = BLOG_POSTS_DATA.find((p) => p.slug === r.slug);
        cover = master ? master.coverImage : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
      }
      return {
        ...r,
        coverImage: cover,
        isFeatured: Boolean(r.isFeatured),
        isPublished: Boolean(r.isPublished),
      };
    };

    const now = Date.now();
    // In-memory cache for fast, zero-delay responses (invalidated instantly on save/delete)
    if (globalForDb.blogsCache && (now - globalForDb.blogsCache.timestamp < 20000)) {
      const cached = globalForDb.blogsCache.data;
      return options?.publishedOnly ? cached.filter((b) => b.isPublished) : cached;
    }

    // Try MariaDB first
    const sql = options?.publishedOnly
      ? 'SELECT * FROM avora_blogs WHERE isPublished = 1 ORDER BY createdAt DESC'
      : 'SELECT * FROM avora_blogs ORDER BY createdAt DESC';
    const rows = await queryDb<any>(sql);
    if (rows && rows.length > 0) {
      const sanitized = rows.map(sanitizeBlog);
      globalForDb.blogsCache = { data: sanitized, timestamp: now };

      // Sync into local store so fallback always has latest articles
      try {
        const store = loadLocalStore();
        store.blogs = sanitized;
        saveLocalStore(store);
      } catch {}

      return options?.publishedOnly ? sanitized.filter((b) => b.isPublished) : sanitized;
    }

    // Fallback to local store
    const store = loadLocalStore();
    const sanitized = (store.blogs || []).map(sanitizeBlog);
    globalForDb.blogsCache = { data: sanitized, timestamp: now };
    return options?.publishedOnly ? sanitized.filter((b) => b.isPublished) : sanitized;
  },

  async getBlogBySlug(slug: string) {
    if (!slug) return null;
    const clean = decodeURIComponent(slug).trim().toLowerCase();

    // 1. Check in-memory cache first (0ms latency!)
    if (globalForDb.blogsCache) {
      const found = globalForDb.blogsCache.data.find(
        (b: any) =>
          b.slug?.toLowerCase() === clean ||
          b.id?.toLowerCase() === clean ||
          b.slug === slug ||
          b.id === slug
      );
      if (found) return found;
    }

    // 2. Fetch all blogs (populates cache)
    const all = await this.getAllBlogs();
    const found = all.find(
      (b: any) =>
        b.slug?.toLowerCase() === clean ||
        b.id?.toLowerCase() === clean ||
        b.slug === slug ||
        b.id === slug
    );
    if (found) return found;

    // 3. Fallback direct SQL query
    const rows = await queryDb<any>(
      'SELECT * FROM avora_blogs WHERE LOWER(slug) = ? OR LOWER(id) = ? OR slug = ? OR id = ? LIMIT 1',
      [clean, clean, slug, slug]
    );
    if (rows && rows.length > 0) {
      let cover = rows[0].coverImage;
      if (!cover || (typeof cover === 'string' && cover.startsWith('data:') && cover.length <= 500)) {
        const master = BLOG_POSTS_DATA.find((p) => p.slug === rows[0].slug);
        cover = master ? master.coverImage : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
      }
      return {
        ...rows[0],
        coverImage: cover,
        isFeatured: Boolean(rows[0].isFeatured),
        isPublished: Boolean(rows[0].isPublished),
      };
    }

    // 4. Fallback to hardcoded BLOG_POSTS_DATA
    const fallback = BLOG_POSTS_DATA.find(
      (p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean || p.slug === slug
    );
    return fallback ? { ...fallback, isFeatured: Boolean(fallback.isFeatured), isPublished: true } : null;
  },

  async saveBlog(blogData: any) {
    // Invalidate cache immediately so new/updated blog is reflected on next request
    globalForDb.blogsCache = undefined;

    let coverImage = blogData.coverImage;
    if (!coverImage || (typeof coverImage === 'string' && coverImage.startsWith('data:') && coverImage.length <= 500)) {
      const master = BLOG_POSTS_DATA.find((p) => p.slug === blogData.slug);
      coverImage = master ? master.coverImage : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
    }

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
        coverImage,
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
        coverImage,
        updatedAt: now,
      };
      saveLocalStore(store);
      return store.blogs[existingIdx];
    } else {
      const newBlog = {
        id,
        ...blogData,
        coverImage,
        createdAt: now,
        updatedAt: now,
      };
      store.blogs.unshift(newBlog);
      saveLocalStore(store);
      return newBlog;
    }
  },

  async deleteBlog(idOrSlug: string) {
    globalForDb.blogsCache = undefined;
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

  
  // --- Technology Landing Pages (CMS Managed) ---
  async getAllTechnologyPages(): Promise<TechnologyDetailPage[]> {
    const seedCheck = await queryDb<any>(
      "SELECT id FROM avora_cms_content WHERE type = 'system_meta' AND id = 'tech_pages_seeded_v1' LIMIT 1"
    );

    if (seedCheck && seedCheck.length === 0) {
      for (const p of DEFAULT_TECH_PAGES) {
        await queryDb(
          `
          INSERT INTO avora_cms_content (id, type, slug, data)
          VALUES (?, 'tech_page', ?, ?)
          ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
        `,
          [p.id || `tech-${p.slug}`, p.slug, JSON.stringify(p)]
        );
      }
      await queryDb(
        `
        INSERT INTO avora_cms_content (id, type, slug, data)
        VALUES ('tech_pages_seeded_v1', 'system_meta', 'tech_pages_seeded_v1', '{"seeded": true}')
        ON DUPLICATE KEY UPDATE id = id
      `
      );
    }

    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'tech_page' ORDER BY updatedAt DESC");
    if (rows && rows.length > 0) {
      try {
        return rows.map((r) => JSON.parse(r.data));
      } catch (e) {
        console.error('[DB] Error parsing tech page data:', e);
      }
    }
    const store = loadLocalStore();
    return (store.technologyPages && store.technologyPages.length > 0) ? store.technologyPages : DEFAULT_TECH_PAGES;
  },

  async getTechnologyPageBySlug(slug: string): Promise<TechnologyDetailPage | null> {
    const cleanSlug = slug.toLowerCase().trim();
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'tech_page' AND slug = ? LIMIT 1", [cleanSlug]);
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing tech page data:', e);
      }
    }
    const store = loadLocalStore();
    const existing = (store.technologyPages || DEFAULT_TECH_PAGES).find(
      (p: TechnologyDetailPage) => p.slug === cleanSlug || p.id === cleanSlug
    );
    if (existing) return existing;

    const inDefault = DEFAULT_TECH_PAGES.find((p) => p.slug === cleanSlug);
    if (inDefault) return inDefault;

    for (const cat of TECH_CATEGORIES) {
      for (const item of cat.items) {
        if (getTechSlug(item.name) === cleanSlug || item.name.toLowerCase() === cleanSlug) {
          return buildDefaultTechPage(cleanSlug, item, cat.category);
        }
      }
    }

    return null;
  },

  async saveTechnologyPage(pageData: Partial<TechnologyDetailPage>): Promise<TechnologyDetailPage> {
    const slug = pageData.slug || getTechSlug(pageData.name || 'tech-' + Date.now());
    const id = pageData.id || `tech-${slug}`;
    const completeData: TechnologyDetailPage = {
      id,
      slug,
      name: pageData.name || slug,
      title: pageData.title || `Enterprise ${pageData.name || slug} Development`,
      subtitle: pageData.subtitle || 'High-Performance Scalable Software Engineering',
      category: pageData.category || 'Backend',
      badge: pageData.badge || 'Enterprise Stack',
      iconName: pageData.iconName || 'Terminal',
      heroDescription: pageData.heroDescription || '',
      fullOverview: pageData.fullOverview || '',
      keyStats: pageData.keyStats || [
        { value: '99.99%', label: 'Uptime Reliability' },
        { value: '<15ms', label: 'Response SLA' },
      ],
      capabilities: pageData.capabilities || [],
      whyChoose: pageData.whyChoose || [],
      developmentProcess: pageData.developmentProcess || [],
      techStackPairings: pageData.techStackPairings || [],
      useCases: pageData.useCases || [],
      faqs: pageData.faqs || [],
      metaTitle: pageData.metaTitle,
      metaDesc: pageData.metaDesc,
      ...pageData,
    };

    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES (?, 'tech_page', ?, ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [id, slug, JSON.stringify(completeData)]
    );

    const store = loadLocalStore();
    if (!store.technologyPages) store.technologyPages = [...DEFAULT_TECH_PAGES];
    const idx = store.technologyPages.findIndex((p: any) => p.id === id || p.slug === slug);
    if (idx !== -1) {
      store.technologyPages[idx] = completeData;
    } else {
      store.technologyPages.push(completeData);
    }
    saveLocalStore(store);
    return completeData;
  },

  async deleteTechnologyPage(slugOrId: string): Promise<boolean> {
    await queryDb("DELETE FROM avora_cms_content WHERE type = 'tech_page' AND (id = ? OR slug = ?)", [slugOrId, slugOrId]);

    const store = loadLocalStore();
    if (store.technologyPages) {
      store.technologyPages = store.technologyPages.filter((p: any) => p.id !== slugOrId && p.slug !== slugOrId);
      saveLocalStore(store);
    }
    return true;
  },

  // --- Technologies (CMS Managed) ---
  async getAllTechnologies() {
    const seedCheck = await queryDb<any>(
      "SELECT id FROM avora_cms_content WHERE type = 'system_meta' AND id = 'technologies_seeded_v4' LIMIT 1"
    );

    if (seedCheck && seedCheck.length === 0) {
      for (const t of TECH_CATEGORIES) {
        await queryDb(
          `
          INSERT INTO avora_cms_content (id, type, slug, data)
          VALUES (?, 'technology', ?, ?)
          ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
        `,
          [t.slug, t.slug, JSON.stringify(t)]
        );
      }
      await queryDb(
        `
        INSERT INTO avora_cms_content (id, type, slug, data)
        VALUES ('technologies_seeded_v4', 'system_meta', 'technologies_seeded_v4', '{"seeded": true}')
        ON DUPLICATE KEY UPDATE id = id
      `
      );
    }
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

  // --- Cost Calculator Settings (CMS Managed) ---
  async getCostCalculatorSettings(): Promise<CostCalculatorConfig> {
    const rows = await queryDb<any>("SELECT data FROM avora_cms_content WHERE type = 'calculator' AND slug = 'pricing_config' LIMIT 1");
    if (rows && rows.length > 0) {
      try {
        return JSON.parse(rows[0].data);
      } catch (e) {
        console.error('[DB] Error parsing calculator data:', e);
      }
    }
    const store = loadLocalStore();
    return store.costCalculator || DEFAULT_COST_CONFIG;
  },

  async saveCostCalculatorSettings(configData: any): Promise<CostCalculatorConfig> {
    await queryDb(
      `
      INSERT INTO avora_cms_content (id, type, slug, data)
      VALUES ('calc-pricing', 'calculator', 'pricing_config', ?)
      ON DUPLICATE KEY UPDATE data = VALUES(data), updatedAt = NOW()
    `,
      [JSON.stringify(configData)]
    );

    const store = loadLocalStore();
    store.costCalculator = configData;
    saveLocalStore(store);
    return store.costCalculator;
  },
};


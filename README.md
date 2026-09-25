# AVORA Innovations — Enterprise AI & Digital Engineering Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MariaDB](https://img.shields.io/badge/MariaDB-3.5+-003545?style=for-the-badge&logo=mariadb)](https://mariadb.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-v7.10-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

AVORA Innovations is a premier, enterprise-grade digital engineering and artificial intelligence company platform. Benchmarked against global technology leaders (such as **Konstant Infosolutions**), AVORA Innovations provides a deeply interactive, scalable browsing experience designed for Fortune 500 enterprises, high-growth scale-ups, and innovators worldwide.

---

## 🌟 Architectural Highlights

- **Next.js 16 App Router & Turbopack**: Lightning-fast incremental compiler with serverless execution.
- **Enterprise Deep Page Hierarchy**: Complete multi-level architecture for Services, Industries, Technologies, Solutions, Case Studies, and Insights.
- **Interactive Multi-Level Mega Menu**: Dynamic categorized navigation with smooth Framer Motion transitions and quick-close interactions.
- **Interactive Software & AI Cost Calculator (`/cost-calculator`)**: Multi-step interactive estimator that calculates real-time engineering timelines, budgets, and team allocations.
- **Global Instant Search (`Cmd+K` / `Ctrl+K`)**: Modal search index covering all services, verticals, blogs, and capabilities.
- **Full Dual-Theme Architecture**: Instant Light Mode and Dark Mode support with persistent state, zero-flash loading, and Tailwind CSS v4 `@custom-variant dark`.
- **Multi-Language Internationalization (i18n)**: Built-in translation provider supporting English, German, and Hindi with persistent state.
- **Production-Ready Admin CMS Portal (`/admin`)**: Secure, Edge-protected administration panel with a Visual Page Builder, Lead Pipeline, Blog Management, and Global Settings.
- **Isolated MariaDB Database Layer**: Direct high-throughput connection pooling with a designated `avora_*` table namespace to safely run in shared database environments without data collisions.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16.3.4 (App Router), React 19.2.8, TypeScript 5 |
| **Styling & Design System** | Tailwind CSS v4, `@tailwindcss/postcss`, PostCSS 8 |
| **Animations & UI** | Framer Motion 13.2.0, Lucide React, React Icons (FontAwesome 6) |
| **Database & ORM** | MariaDB 3.5+, Prisma ORM 7.10.0, `@prisma/adapter-mariadb`, `mariadb` pool |
| **Authentication & Security** | Stateless JWT via `jose` 6.2.12, Edge Middleware Route Guard, PBKDF2 Password Hashing |
| **Communications** | Nodemailer with Gmail SMTP integration & branded HTML notification templates |
| **SEO & Discoverability** | Schema.org JSON-LD (Organization, Services, Articles), OpenGraph, dynamic sitemap, robots.txt |

---

## 📂 Project Structure

```text
avorainnovations/
├── prisma/
│   └── schema.prisma          # Database models mapped to avora_* namespace
├── public/                    # Static brand assets, transparent favicons, touch icons
│   ├── icon.png               # Edge-to-edge transparent tab icon
│   ├── avora-symbol.png       # Tightly cropped cyan-blue A emblem
│   ├── logo-horizontal.png    # Light mode horizontal logo
│   ├── logo-horizontal-dark.png # Dark mode horizontal logo
│   └── logo-white.png         # Full horizontal logo on white canvas
├── src/
│   ├── app/
│   │   ├── (public pages)     # /, /about, /services, /industries, /technologies, /cost-calculator, etc.
│   │   ├── admin/             # Edge-guarded CMS: Dashboard, visual page builder, inquiries, settings
│   │   ├── api/               # Serverless Next.js API route handlers (auth, leads, CMS operations)
│   │   ├── layout.tsx         # Global Root Layout with SEO JSON-LD & theme providers
│   │   └── globals.css        # Tailwind v4 utility styles and custom animations
│   ├── components/
│   │   ├── admin/             # CMS Sidebar, header, metrics, data grids
│   │   ├── common/            # Consultation modal, Search modal, Floating contact widget
│   │   ├── home/              # Hero section, Interactive Tech Matrix, Testimonials carousel, FAQs
│   │   └── layout/            # Sticky header with MegaMenu, Footer with corporate directory
│   ├── context/               # Dual-theme provider and bespoke multi-language (i18n) context
│   └── lib/
│       ├── auth.ts            # PBKDF2 hashing, JWT signing and verification via jose
│       ├── content.ts         # High-density seed datasets for services, industries, and case studies
│       ├── db.ts              # Unified MariaDB connection pool + local resilient fallback
│       ├── mailer.ts          # Gmail SMTP transporter and automated notification templates
│       ├── seo.ts             # Metadata constructor and JSON-LD schema generators
│       └── utils.ts           # Class utilities and formatting helpers
├── .env                       # Local environment variables (ignored by Git)
├── .env.example               # Reference environment variable blueprint
├── middleware.ts              # Edge-compatible JWT authentication route guard
├── next.config.ts             # Next.js 16 build configuration
└── package.json               # Dependencies and scripts (with automated prisma hooks)
```

---

## 🚀 Environment Configuration

Create a `.env` file in the project root based on `.env.example`:

```bash
# ==========================================
# 1. Authentication Secrets
# ==========================================
ADMIN_JWT_SECRET="ditya-group-jwt-secret-key-at-least-32-chars-random-production"
JWT_SECRET="ditya-group-jwt-secret-key-at-least-32-chars-random-production"
ADMIN_DEFAULT_EMAIL="admin@avorainnovations.com"
ADMIN_DEFAULT_PASSWORD="AvoraAdmin2026!Secure"

# ==========================================
# 2. Database Configuration (MariaDB 3.5+)
# ==========================================
DATABASE_URL="mariadb://ditya0a7_yourcpaneluser_admin:supersecretadminpassword123@162.241.148.163:3306/ditya0a7_yourcpaneluser_gbncircle"

# ==========================================
# 3. Email & SMTP Configuration (Nodemailer)
# ==========================================
EMAIL_USER="gnbmailsender@gmail.com"
EMAIL_PASS="akkjqlnhkgbudmxe"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="gnbmailsender@gmail.com"
SMTP_PASS="akkjqlnhkgbudmxe"
SMTP_FROM="AVORA Innovations <gnbmailsender@gmail.com>"
ADMIN_NOTIFICATION_EMAIL="gnbmailsender@gmail.com"

# ==========================================
# 4. Public Application URL
# ==========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🗄️ Database Architecture & Namespace Isolation

To allow AVORA Innovations to share an enterprise MariaDB database with other existing applications without any table or data collisions, **all database entities reside in the isolated `avora_*` namespace**:

| Table Name | Model Name | Description |
| :--- | :--- | :--- |
| `avora_admin_users` | `AdminUser` | Admin users, salted PBKDF2 hashes, roles, and timestamps |
| `avora_pages` | `PageContent` | Dynamic page definitions, metadata, and JSON section layouts |
| `avora_blogs` | `Blog` | Articles, tags, cover images, read times, and author credentials |
| `avora_inquiries` | `Inquiry` | Consultation booking submissions, project budgets, and lead status |
| `avora_contact_submissions`| `ContactSubmission` | Inbound general inquiries and messages |
| `avora_subscribers` | `Subscriber` | Newsletter email directory |
| `avora_settings` | `Setting` | Key-value store for global coordinates, social URLs, and brand parameters |
| `avora_cms_content` | `CMSContent` | Dynamic store for services, industries, case studies, and testimonials |

> [!NOTE]
> `src/lib/db.ts` incorporates a hybrid architecture: it actively queries the live MariaDB instance with low-latency connection pooling, and gracefully falls back to local storage if the database is unreachable or during static page generation in CI/CD.

---

## 💻 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v20+ or v22 LTS
- **npm**: v10+

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/nimethfernando/avorainnovations.git
cd avorainnovations
npm install
```

### 3. Generate Prisma Client
```bash
npm run prisma:generate
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Access the Admin CMS Portal
- Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email:** `admin@avorainnovations.com`
- **Password:** `AvoraAdmin2026!Secure`

---

## 🏗️ Production Build & Verification

To verify full static generation and TypeScript type-checking across all 71 routes:

```bash
npm run build
```

This automatically runs `prisma generate` followed by `next build`, producing an optimized production deployment.

To test the production build locally:

```bash
npm run start
```

---

## 🌐 Deployment (Vercel)

1. Push your changes to `main` on GitHub:
   ```bash
   git push origin main
   ```
2. Connect the repository in the **Vercel Dashboard**.
3. Add the environment variables from your `.env` into the Vercel Project Settings.
4. Deploy — Vercel executes `npm run build` which automatically compiles all routes with 0 errors.

---

## 📄 License
Private and Confidential — Copyright © 2026 AVORA Innovations. All Rights Reserved.
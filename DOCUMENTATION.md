# AVORA Innovations — Comprehensive System & Architecture Documentation

> **Version:** 2.0.0 (Production Release)  
> **Last Updated:** September 2026  
> **Repository:** `d:\Freelancing\avorainnovations`  
> **Primary Technology Stack:** Next.js 16.3.4 (App Router) • React 19.2.8 • TypeScript 5.7 • Tailwind CSS v4 • MariaDB 3.5+

---

## 1. Executive Summary

AVORA Innovations is an enterprise-grade digital engineering and artificial intelligence company platform. Designed to meet and exceed global benchmark standards (including reference architectures like Konstant Infosolutions), the platform provides:
- High-performance, SEO-optimized public landing pages for services, industries, technologies, case studies, and insights.
- Dedicated inner landing pages for every technology stack (Python, React Native, Flutter, Ruby on Rails, PHP, Node.js, .NET, Swift, Kotlin, Go, AWS, Azure, GCP, LangChain, etc.).
- A dynamic, feature-rich Blog engine with cover image photography, category filtering, live search, and social sharing.
- A Konstant-inspired Leadership showcase featuring executive profiles (including Amit Batra) with local device photo uploads and dynamic CMS management.
- A 100% CMS-driven administrative control panel (`/admin`) for non-technical stakeholders to manage content, leads, navigation, SEO, and team members in real-time.
- Multi-step interactive software and AI cost calculator (`/cost-calculator`).
- Dual-layer database persistence with remote MariaDB isolation (`avora_*` namespace) and seamless zero-downtime local JSON fallback.

---

## 2. Core Architecture & Tech Stack

```mermaid
flowchart TD
    Client["Public Visitor / Enterprise Client"] -->|HTTPS| Cloudflare["Vercel Edge CDN / Middleware"]
    Cloudflare -->|Route Guard| Admin["Admin Portal (/admin)"]
    Cloudflare --> PublicPages["Public Web App (Next.js 16 App Router)"]
    
    subgraph Frontend["Frontend Architecture"]
        PublicPages --> Home["Homepage (Hero, Tech, Services, Blog)"]
        PublicPages --> TechPages["Tech Landing Pages (/technologies/[slug])"]
        PublicPages --> BlogPages["Blog Hub & Articles (/blog, /blog/[slug])"]
        PublicPages --> About["About & Leadership (/about)"]
        PublicPages --> Calculator["Cost Calculator (/cost-calculator)"]
    end

    subgraph DataLayer["Dual-Layer Data Persistence Engine"]
        Admin & PublicPages --> DBHandler["Unified DB Access Layer (src/lib/db.ts)"]
        DBHandler -->|Primary Pool| MariaDB[("Remote MariaDB 3.5+ (avora_* Tables)")]
        DBHandler -->|Resilient Fallback| LocalDB[("Local Atomic JSON (.local_db.json)")]
    end

    subgraph Security["Security & Communications"]
        Admin --> Auth["JWT (jose) + PBKDF2 Password Hashing"]
        Admin --> OTP["Cryptographic OTP Password Reset"]
        PublicPages --> SMTP["Nodemailer (Gmail SMTP Engine)"]
    end
```

### 2.1 Technology Matrix

| Layer | Technology | Specification / Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.4 | App Router, Server Components (RSC), Incremental Static Generation (ISR) |
| **UI Library** | React 19.2.8 | Latest concurrent rendering engine with zero hydration mismatch |
| **Type Safety** | TypeScript 5.7.2 | Strict type checking across components, APIs, and data models |
| **Styling** | Tailwind CSS v4 | Unified Single-Blue palette (`#2563eb`), dark mode custom variants |
| **Icons & Media** | Lucide React + FontAwesome | High-performance SVG icons and UI indicators |
| **Primary Database** | MariaDB 3.5+ | Remote connection pool via `mariadb` driver with `avora_*` namespace |
| **Secondary Storage** | JSON File Storage | Local atomic file `.local_db.json` for offline builds and instant fallbacks |
| **Authentication** | `jose` 6.2.12 + PBKDF2 | Edge-compatible stateless JWT stored in secure `HttpOnly` cookies |
| **Email Transporter** | Nodemailer | Gmail SMTP with branded HTML templates for lead submissions & OTPs |

---

## 3. Brand Identity & Unified Design System

To ensure an elegant, consistent enterprise look matching international engineering studios, the entire site was refactored to a **Single Unified Blue Brand Palette**:

- **Primary Brand Color:** Royal Blue `#2563eb` (`blue-600`) / Bright Blue `#3b82f6` (`blue-500`)
- **Accent & Glow:** Cyan-Blue `#0284c7` (`sky-600`)
- **Dark Theme Background:** Deep Obsidian `#030712` (`gray-950`) / Card Surface `#0f172a` (`slate-900`)
- **Light Theme Background:** Pure White `#ffffff` with subtle slate borders `#e2e8f0` (`slate-200`)
- **Clean Konstant-Inspired Header:**
  - The cluttered top announcement bar was removed for a streamlined, modern enterprise header.
  - Sticky navigation bar with smooth backdrop blur (`backdrop-blur-md`).
  - Active nav indicators, category badges, and button CTAs utilize uniform blue branding.

---

## 4. Key Public Modules & Features

### 4.1 Technologies System & Dedicated Landing Pages (`/technologies/[slug]`)
- **Problem Solved:** On the original site, technologies like Python, React Native, or Ruby on Rails were merely static names on a list. Visitors clicking them had nowhere to go.
- **Konstantinfo Parity:** Every single technology now has a full, dedicated landing page providing:
  1. **Hero Banner:** Technology overview, commercial keywords, and primary/secondary consultation CTAs.
  2. **Core Capabilities Grid:** 6+ detailed engineering capabilities specific to that technology.
  3. **Technical Architecture:** Stack breakdown (engines, databases, protocols, security compliance).
  4. **Why Choose Avora:** Quantifiable metrics (e.g., 99.9% uptime, 40% faster time-to-market).
  5. **Development Process:** 5-step engineering lifecycle (Discovery -> Architecture -> Sprint Delivery -> Security Audit -> Deployment).
  6. **Enterprise FAQs:** Collapsible Q&A accordion addressing common technical inquiries.
- **Flagship Pre-Populated Stacks:**
  - Python (`/technologies/python`)
  - Node.js (`/technologies/nodejs`)
  - React Native (`/technologies/react-native`)
  - Flutter (`/technologies/flutter`)
  - Ruby on Rails (`/technologies/ruby-on-rails`)
  - PHP (`/technologies/php`)
  - .NET Core (`/technologies/dotnet`)
  - Swift (`/technologies/swift`)
  - Kotlin (`/technologies/kotlin`)
  - Go / Golang (`/technologies/golang`)
  - Cloud Stacks: AWS, Azure, GCP
  - AI/ML Stacks: PyTorch, TensorFlow, LangChain, OpenAI
- **Dynamic CMS & Fallback Generator:**
  - Stacks can be created, edited, and customized via `/admin/technologies`.
  - If a visitor accesses a technology that hasn't been individually customized in the CMS, `buildDefaultTechPage(slug)` automatically generates a structured landing page dynamically.
- **Navigation Integration:**
  - **MegaMenu:** Every technology item directly links to `/technologies/[slug]`. Category "+ X more" buttons link to anchor sections on `/technologies#[category]`.
  - **Search Modal (`Ctrl+K`):** Technology search results route directly to dedicated pages.

---

### 4.2 Dynamic Blog Platform (`/blog` & `/blog/[slug]`)
- **Public Blog Hub (`/blog`):**
  - **Featured Article Banner:** Highlights the latest flagship publication with rich imagery and author credentials.
  - **Interactive Category Filter:** Filter by 'All', 'Artificial Intelligence', 'Engineering', 'Cloud & DevOps', 'Mobile', etc.
  - **Live Search Input:** Instant client-side filtering by article title, excerpt, tags, or author.
  - **Responsive Grid:** High-resolution cards with image hover zoom, category badges, publish dates, and reading times.
- **Article Detail View (`/blog/[slug]`):**
  - Full-width hero cover image with dark gradient overlay.
  - Author avatar, designation, publish date, and estimated reading time.
  - Formatted article body with code blocks, blockquotes, and lists.
  - **Social Sharing:** Quick share to LinkedIn, Twitter/X, or copy link to clipboard.
  - **Related Posts Section:** Dynamic recommendations from matching categories.
- **Homepage Blog Section:**
  - Located on `/` before the contact CTA.
  - Displays the 3 latest enterprise publications with high-resolution photography.
  - Dynamically fetches published posts from `/api/admin/blogs` with fallback to static content.
- **Admin Management (`/admin/blogs`):**
  - Create, edit, publish/unpublish, and delete articles.
  - Custom cover image URL, author bio, read time, and SEO tags.

---

### 4.3 Leadership Showcase & About Page (`/about`)
- **Konstant-Inspired Leadership Section (`/about#leadership`):**
  - Modern card grid highlighting the executive team.
  - **Amit Batra Profile:**
    - **Title:** Executive Vice President & Strategic Advisor (Technology, Web3 & AI)
    - **Bio:** 18+ years of experience in technology, innovation, and building technology-driven businesses. Expertise in AI, blockchain, Web3, and scalable digital infrastructure.
    - **LinkedIn:** [https://www.linkedin.com/in/amit-batra-romania/](https://www.linkedin.com/in/amit-batra-romania/)
- **Admin Leadership Management (`/admin/leadership`):**
  - Add, edit, reorder, or delete leadership team members.
  - **Local Device Image Upload:** Admins can click "Upload Photo" to select images directly from their device (PNG, JPG, WebP), stored securely in `/uploads/` via `/api/admin/upload`.
  - Graceful fallback: If no image is uploaded, an elegant blue monogram avatar is automatically rendered.

---

### 4.4 Interactive Cost Calculator (`/cost-calculator`)
- Multi-step interactive tool for prospective enterprise clients:
  1. Platform selection (Web, iOS, Android, Cross-Platform).
  2. Scale & User Volume (Startup MVP, Growth Scale-up, Fortune 500 Enterprise).
  3. AI & Advanced Features (RAG, LLM Agents, Computer Vision, Real-Time Streaming).
  4. Security & Compliance (HIPAA, SOC2, GDPR, ISO 27001).
- Outputs estimated engineering sprint durations, recommended team allocation, and price ranges.
- Directly feeds into lead capture modal for immediate sales pipeline conversion.

---

## 5. Admin CMS Architecture (`/admin`)

The administration panel is a fully edge-protected CMS located at `/admin`. Non-technical managers can maintain the entire platform without modifying source code.

```mermaid
graph LR
    subgraph CMS_Modules["Admin CMS Control Center (/admin)"]
        B["Blogs (/admin/blogs)"]
        T["Technologies (/admin/technologies)"]
        L["Leadership (/admin/leadership)"]
        S["Services & Solutions (/admin/services)"]
        I["Industries (/admin/industries)"]
        C["Case Studies (/admin/case-studies)"]
        INQ["Inquiries & Leads (/admin/inquiries)"]
        CALC["Cost Calculator (/admin/calculator)"]
        NAV["Navigation Menu (/admin/navigation)"]
        SEO["SEO & Meta (/admin/seo)"]
        SET["Global Settings (/admin/settings)"]
    end
```

### 5.1 Admin Module Directory

| Module | URL | Capabilities |
| :--- | :--- | :--- |
| **Dashboard** | `/admin` | Real-time analytics, lead metrics, recent inquiries, system health |
| **Blogs** | `/admin/blogs` | Create, edit, draft, publish blog articles with cover images & SEO |
| **Technologies** | `/admin/technologies` | Manage tech categories, items, and full landing page content |
| **Leadership** | `/admin/leadership` | Add/edit leaders, upload photos from device, update bios & LinkedIn |
| **Services** | `/admin/services` | Edit core engineering practices, capabilities, and sub-services |
| **Industries** | `/admin/industries` | Vertical market pages, compliance stats, case studies |
| **Case Studies** | `/admin/case-studies` | Portfolio projects, client metrics, ROI percentages |
| **Inquiries** | `/admin/inquiries` | Inbound lead pipeline, budget breakdown, contact submissions |
| **Calculator** | `/admin/calculator` | Base pricing models, platform coefficients, feature costs |
| **Navigation** | `/admin/navigation` | Header MegaMenu links, badges, order, and footer directory |
| **SEO** | `/admin/seo` | OpenGraph previews, Twitter cards, meta titles, Googlebot indexing |
| **Media Library** | `/admin/media` | Upload, manage, and retrieve asset URLs |
| **Settings** | `/admin/settings` | Office locations, social links, contact emails, brand metadata |

---

### 5.2 Security & Authentication Workflow

1. **Stateless JWT Protection:**
   - Admin logins issue a cryptographically signed JWT via `jose`.
   - Stored in an `HttpOnly`, `SameSite=Strict`, `Secure` cookie named `avora_admin_token`.
   - Edge middleware (`middleware.ts`) inspects the token on all `/admin/*` routes (except login/password recovery).
2. **Password Security:**
   - Admin passwords are encrypted using PBKDF2 with unique salts (10,000 iterations).
3. **Forgot Password Flow (`/admin/forgot-password`):**
   - Step 1: Admin enters registered email (`avorainnovations@gmail.com`).
   - Step 2: System generates a secure 6-digit cryptographic OTP expiring in 15 minutes.
   - Step 3: OTP is delivered via Gmail SMTP to the administrator's inbox.
   - Step 4: Admin enters OTP on `/admin/reset-password` and sets a new password.
4. **Change Password Flow (`/admin/change-password`):**
   - Authenticated administrators must enter their **Current Password** before setting a new password.
   - Validates password complexity (minimum 8 characters).

---

## 6. Database Schema & Multi-Tenant Namespace

To safely share a remote MariaDB server with other applications without risk of collisions or data overwrites, **all AVORA entities are strictly confined to the `avora_*` namespace**:

| Table Name | Entity Description | Primary Keys & Indices |
| :--- | :--- | :--- |
| `avora_admin_users` | Administrators, hashed credentials, roles | `id` (PK), `email` (Unique) |
| `avora_cms_content` | Dynamic CMS content store (technologies, leadership, navigation, etc.) | `id` (PK), `content_key` (Unique) |
| `avora_blogs` | Published & drafted blog posts, markdown content | `id` (PK), `slug` (Unique) |
| `avora_pages` | Dynamic custom pages and visual builder layouts | `id` (PK), `slug` (Unique) |
| `avora_inquiries` | Cost calculator and consultation submissions | `id` (PK), `created_at` (Index) |
| `avora_contact_submissions` | Inbound general contact inquiries | `id` (PK), `created_at` (Index) |
| `avora_subscribers` | Newsletter email directory | `id` (PK), `email` (Unique) |
| `avora_settings` | Global key-value system settings | `id` (PK), `setting_key` (Unique) |

> **High-Availability Fallback:** `src/lib/db.ts` automatically manages connection pooling. If the remote MariaDB server experiences latency or network hiccups, the platform seamlessly reads from and writes to the local `.local_db.json` cache, ensuring zero downtime for visitors.

---

## 7. API Route Directory

All API handlers are located in `src/app/api/`:

| Endpoint | Method | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `/api/auth/login` | `POST` | Public | Authenticates admin credentials, sets JWT cookie |
| `/api/auth/logout` | `POST` | Admin | Clears session cookie |
| `/api/auth/forgot-password` | `POST` | Public | Generates and emails 6-digit password reset OTP |
| `/api/auth/reset-password` | `POST` | Public | Verifies OTP and resets admin password |
| `/api/auth/change-password` | `POST` | Admin | Verifies current password and updates to new password |
| `/api/admin/blogs` | `GET`, `POST`, `PUT`, `DELETE` | Hybrid | Fetch published blogs (Public) or manage posts (Admin) |
| `/api/admin/technologies` | `GET`, `POST`, `PUT`, `DELETE` | Hybrid | Fetch tech stacks & pages (Public) or manage (Admin) |
| `/api/admin/leadership` | `GET`, `POST`, `PUT`, `DELETE` | Hybrid | Fetch leaders (Public) or manage team (Admin) |
| `/api/admin/upload` | `POST` | Admin | Local device file upload (multipart/form-data) |
| `/api/inquiries` | `POST` | Public | Submits lead from Contact form or Cost Calculator |
| `/api/navigation` | `GET`, `POST` | Hybrid | Retrieves navigation hierarchy or updates via CMS |
| `/api/settings` | `GET`, `POST` | Hybrid | Retrieves global settings or updates via CMS |

---

## 8. Deployment & Operational Runbook

### 8.1 Environment Variables Blueprint (`.env`)

```ini
# 1. Admin Authentication & JWT Secrets
ADMIN_JWT_SECRET="your-jwt-secret-key-at-least-32-chars-random-production"
JWT_SECRET="your-jwt-secret-key-at-least-32-chars-random-production"
ADMIN_DEFAULT_EMAIL="avorainnovations@gmail.com"
ADMIN_DEFAULT_PASSWORD="AvoraAdmin2026!Secure"

# 2. Remote MariaDB Database Connection
DATABASE_URL="mariadb://username:password@host:3306/database_name"

# 3. SMTP Email Configuration (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-specific-password"
SMTP_FROM="AVORA Innovations <your-email@gmail.com>"
ADMIN_NOTIFICATION_EMAIL="your-email@gmail.com"

# 4. Public Web URL
NEXT_PUBLIC_APP_URL="https://avorainnovations.com"
```

### 8.2 Build & Verification Commands

```bash
# 1. Install all dependencies
npm install

# 2. Run TypeScript build verification (Checks all 173 routes)
npm run build

# 3. Start local production server
npm run start

# 4. Start local development server with Turbopack
npm run dev
```

### 8.3 Vercel Production Deployment
The repository is configured for automated CI/CD:
1. Every commit pushed to the `main` branch triggers an automated Vercel build.
2. Ensure the environment variables listed in Section 8.1 are configured in **Vercel Project Settings > Environment Variables**.
3. All static and dynamic routes pre-render cleanly with 0 TypeScript or linting errors.

---

## 9. Default Administrator Credentials

- **Admin Login Portal:** `https://your-domain.com/admin/login` (or `http://localhost:3000/admin/login`)
- **Default Email:** `avorainnovations@gmail.com`
- **Default Initial Password:** `AvoraAdmin2026!Secure`
- **Password Reset:** Accessible anytime via the **"Forgot Password?"** link on the login screen using the 6-digit email OTP.

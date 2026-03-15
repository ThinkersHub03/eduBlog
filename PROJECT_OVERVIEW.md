# EduPortal / EduBlogs Project Overview

This document provides a comprehensive description of the EduPortal ("eduBlogs") web application. It outlines the architecture, tech stack, folder structure, data flow, authentication, core features, setup instructions, and other details useful for developers working on or evaluating the project.

---

## 1. Project Summary

EduPortal is a Next.js 13 application designed as an educational resource platform. It offers:

- **Public-facing content**: Blogs, past papers, books, competitions, institutions, job listings, lectures and more.
- **User authentication**: Sign up/login using Supabase; protected dashboard and profile pages.
- **Admin area**: CRUD interfaces for managing resources (posts, past papers, books, competitions, institutions, jobs, past papers, users, etc.).
- **File uploads**: Support for uploading PDFs (past papers, books, etc.) stored in Supabase storage.
- **Role-based access control**: Admin users have elevated rights; middleware restricts routes accordingly.
- **Utility features**: Search, slugs, sanitization, notifications (toasts), and UI components built with Tailwind CSS.

The application uses the App Router (`app/` directory) along with React server components and client components as needed.

---

## 2. Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `@tailwindcss/postcss` and utility-first components
- **State management**: Redux Toolkit (for authentication state)
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Icons**: lucide-react
- **Rich text editor**: Tiptap
- **Other utilities**: clsx, tailwind-merge, class-variance-authority, etc.
- **Deployment**: Netlify (via `@netlify/plugin-nextjs`) or Vercel; `netlify.toml` included.

---

## 3. Folder Structure

```
.
├── app/                     # Next.js App Router pages and layouts
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── (public)/            # Public-facing sections
│   │   ├── blog/            # Blog listing and posts
│   │   ├── admissions/      # Admissions page
│   │   ├── books/           # Books listing
│   │   ├── competitions/    # Competitions listing
│   │   ├── institutions/    # Institutions listing and detail
│   │   ├── jobs/            # Job listings
│   │   ├── lectures/        # Lecture resources
│   │   ├── pastpapers/      # Past papers listing and detail
│   │   ├── search/          # Search page
│   │   └── ...
│   ├── admin/               # Admin dashboard and CRUD pages
│   │   ├── books/ ...       # CRUD routes for each resource type
│   ├── dashboard/           # User dashboard
│   ├── auth/callback/       # OAuth callback route
│   ├── actions/             # Server actions used by forms
│   └── ...
├── components/              # Reusable UI components
│   ├── layout/              # Common layout pieces (navbar, footer, etc.)
│   ├── providers/           # Context providers (Auth, Redux, Toast)
│   ├── ui/                  # Generic UI primitives (button, card, input, etc.)
│   ├── admin-nav.tsx        # Navigation elements
│   ├── file-upload.tsx      # File upload component
│   └── ...
├── lib/                     # Utility functions and hooks
│   ├── supabase/            # client & server helpers
│   ├── hooks/               # custom React hooks (useAuth)
│   ├── pastpapers.ts        # Helper for slug/sanitize and paths
│   └── utils.ts             # CSS class merging (cn)
├── supabase/                # Database migrations
│   └── migrations/          # .sql migration files
├── temp-app/                # (possibly scratch folder?)
├── middleware.ts            # Route protection and auth middleware
├── next.config.ts           # Next.js config (including image domains, i18n, etc.)
├── netlify.toml             # Netlify deployment config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies and scripts
└── README.md                # Starter README (to be expanded)
```

> **Note:** The `app/` directory leverages nested layouts for the modular sections. Files ending in `.tsx` are React components; pages typically export a default React component.

---

## 4. Authentication & Authorization

- **Supabase Auth** is used for signing up, logging in, and session handling.
- `middleware.ts` intercepts requests and:
  - Redirects unauthenticated users from `/dashboard`, `/profile`, and all `/admin` routes to `/login`.
  - For `/admin` routes, additionally checks the user's `role` column in the `users` table; only `role = 'admin'` can proceed.
- The `AuthProvider` component supplies auth state to client components using React context and Supabase's `onAuthStateChange` listener.
- Redux (`authSlice.ts`) also stores user data for global state.

---

## 5. Data Models (Supabase Tables)

While the exact schema lives in Supabase migrations, key tables include:

- `users` (id, role, profile information)
- `posts` (title, slug, content, published, featured_image, etc.)
- `books`, `competitions`, `institutions`, `jobs`, `past_papers` (with fields relevant to each type, often including a `storage_path` for uploaded files)
- Additional join / support tables as needed.

Files from storage (PDFs, images) are uploaded to the `past-papers` bucket or other buckets; helper utilities (`pastpapers.ts`, `sanitizePdfFileName`) construct safe filenames and paths.

---

## 6. Key Utilities & Helpers

### `src/lib/pastpapers.ts`
Functions for slugs, file name sanitization, storage path construction, and URL extraction.

### `src/lib/utils.ts`
`cn()` merges Tailwind classes safely.

### `src/lib/supabase/client.ts` & `server.ts`
Factory functions returning configured Supabase clients for browser and server contexts.

### `src/lib/hooks/useAuth.ts`
Custom hook that consumes the `AuthContext` and returns user/session info.

---

## 7. Components Highlights

- **`components/ui`**: A collection of primitive UI components (buttons, inputs, tables, dialogs, badging, etc.) built with Tailwind and Radix where applicable.
- **`components/layout`**: Common layout pieces including navigation bars, footers, and dashboard-specific dropdowns.
- **`file-upload.tsx`**: Handles file selection and storing with Supabase storage; used in admin forms for resources requiring document uploads.
- **`delete-button.tsx`**: Generic component to prompt for deletion; calls Supabase to remove database rows and associated storage files.
- **`tiptap-editor.tsx`**: Rich text editor wrapper using Tiptap; used for post content editing.

---

## 8. Server Actions

Under `app/actions/` you will find action functions used by `form` submissions in server components:
- `admin-actions.ts` for creating/updating/deleting admin-managed resources.
- `user-actions.ts` for profile updates and user-specific workflows.

These functions use `redirect()` from `next/navigation` to navigate after completing actions.

---

## 9. Development Setup

1. **Clone repository** and install dependencies:
    ```bash
    npm install
    # or pnpm install / yarn
    ```
2. **Configure environment variables** (copy `.env.example` if available):
    ```
    NEXT_PUBLIC_SUPABASE_URL=<your-url>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
    SUPABASE_SERVICE_KEY=<optional for server actions>
    ```
3. **Run migrations** in Supabase (via `supabase` CLI or dashboard) using SQL files in `supabase/migrations/`.
4. **Start development server**:
    ```bash
    npm run dev
    ```
5. **Access application** at `http://localhost:3000`.
6. **Create an admin user** by setting the `role` field in the `users` table manually or using the dashboard.

### Linting & Formatting

- ESLint is configured via `eslint.config.mjs` and `eslint-config-next`.

### Building & Deployment

- Build with `npm run build` and `npm run start` for production.
- Netlify configuration is available in `netlify.toml`; Vercel deployment works out of the box with Next.js.

---

## 10. Additional Notes

- **Routing conventions**: Uses Next.js dynamic routes (e.g. `[slug]`, `[id]`) for individual item pages.
- **Middleware caching**: Authentication cookies are synchronized via middleware to support SSR.
- **Styling**: Uses class-variance-authority for variant-driven UI components and `twMerge` for class deduplication.
- **Hooks**: Custom hooks in `lib/hooks` provide reusable logic, mainly for authentication.

---

## 11. Future Enhancements (Ideas)

- Add i18n support.
- Implement server-side search across multiple resource types.
- Introduce GraphQL API layer or REST endpoints for external consumption.
- Build a mobile-responsive design audit and PWA features.

---

**End of project overview**

<div align="center">

# Yrco

A networking app where Yrgo's design and web development students meet the industry — built for the connections that kick-start careers.

Every attendee picks 7 traits that define them — and those traits become a unique color palette. Browse the room by color, find the people who complement you, and make connections that matter.

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7, TanStack React Query v5, Framer Motion |
| **Backend** | Express 5, Node.js 20+ |
| **Database** | MongoDB (Mongoose) |
| **Auth** | LinkedIn OAuth 2.0, signed HTTP-only session cookies |
| **Emails** | Resend + React Email _(currently disabled)_ |
| **Media** | Cloudinary |
| **Validation** | Zod (shared schemas and utilities via `@yrco/lib`) |
| **Monorepo** | pnpm workspaces + Turborepo |

## Project Structure

```
yrco/
├── apps/
│   ├── api/              Express REST API
│   │   ├── routes/       Express wiring
│   │   ├── controllers/  HTTP layer — validate, respond, set cookies
│   │   ├── usecases/     Business logic — orchestrate repos and services
│   │   ├── repositories/ Database abstraction (Mongoose)
│   │   ├── services/     External API abstraction (LinkedIn, Cloudinary, Resend)
│   │   ├── middleware/   requireAuth, requireSetup, rate limiting, error handler
│   │   ├── models/       Mongoose schemas and models
│   │   ├── emails/       React Email templates
│   │   ├── helpers/      Pure functions with no side effects
│   │   ├── lib/          Shared library utilities
│   │   ├── tests/        Vitest test files
│   │   └── utils/        Seed scripts, helpers
│   └── web/              React SPA
│       ├── src/pages/    Route-level components
│       ├── src/features/ Feature modules (profile, connections, setup, search, traits)
│       ├── src/shared/   UI primitives, icons, layout, route guards
│       ├── src/providers/ AuthProvider, QueryProvider
│       ├── src/lib/      Axios instance, query keys, error redirect
│       └── src/utils/    Pure helper functions
└── packages/
    └── lib/              Shared Zod schemas and utilities, imported as @yrco/lib
```

## Auth Flow

```
User clicks "Login with LinkedIn"
        │
        v
LinkedIn OAuth consent screen
        │
        v
Redirect to /auth/linkedin/callback with authorization code
        │
        v
API exchanges code for access token, fetches LinkedIn profile
        │
        v
Signed session cookie set (7-day opaque token, stored in Session collection)
        │
        v
Every subsequent request validates the cookie token against the DB (no JWT)
```

## User Roles

Two roles with different setup fields, enforced by a Zod discriminated union in `@yrco/lib`:

| Role | Setup Fields |
| --- | --- |
| **Student** | Education program, optional portfolio links |
| **Organization** | Company name, role, target education programs |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone and install

```bash
git clone <repo-url>
cd yrco
pnpm install
```

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env.development
cp apps/web/.env.example apps/web/.env.development
```

<details>
<summary><strong>API environment variables</strong> (<code>apps/api/.env.development</code>)</summary>

| Variable | Description |
| --- | --- |
| `MONGO_URL` | MongoDB connection string |
| `LINKEDIN_CLIENT_ID` | LinkedIn app client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn app client secret |
| `LINKEDIN_REDIRECT_URI` | Must match the callback URL registered in your LinkedIn app |
| `COOKIE_SECRET` | Random secret for signing session cookies |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RESEND_API_KEY` | Resend API key for transactional emails _(not required while email is disabled)_ |
| `EMAIL_FROM` | Sender address (e.g. `hello@yourdomain.com`) _(not required while email is disabled)_ |
| `APP_NAME` | App name used in email templates _(not required while email is disabled)_ |
| `ALLOWED_CLIENT_ORIGINS` | Comma-separated allowed CORS origins (e.g. `http://localhost:5173`) |
| `PORT` | API port (default `3000`) |

> Generate a cookie secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

</details>

<details>
<summary><strong>Web environment variables</strong> (<code>apps/web/.env.development</code>)</summary>

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | API base URL (e.g. `http://localhost:3000`) |

</details>

### 3. Seed the database

```bash
pnpm --filter=api db:seed
```

### 4. Start dev servers

```bash
pnpm dev
```

Starts both the API (port `3000`) and the web app (port `5173`) via Turborepo.

---

## Scripts

### Root

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all apps |
| `pnpm test` | Run all tests |
| `pnpm --filter=api db:seed` | Seed all collections |
| `pnpm --filter=api db:seed -- <name>` | Seed a specific collection |
| `pnpm --filter=api db:clear` | Clear all collections |
| `pnpm --filter=api db:clear -- <name>` | Clear a specific collection |

### API (`apps/api`)

| Command | Description |
| --- | --- |
| `pnpm dev` | Start API server with watch mode |
| `pnpm test` | Run all tests once (Vitest) |

### Web (`apps/web`)

| Command | Description |
| --- | --- |
| `pnpm dev` | Start Vite dev server on port 5173 |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build (proxies `/api` to `API_URL`) |
| `pnpm lint` | Run ESLint |

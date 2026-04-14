# Yrco

A mobile-first networking app for Yrgo's industry event. Students and companies authenticate via LinkedIn, pick 7 traits that become a unique color palette, then discover and connect with other attendees through that palette.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, React Router v7, TanStack React Query v5, Framer Motion |
| Backend | Express 5, Node.js 20+ |
| Database | MongoDB (Mongoose) |
| Auth | LinkedIn OAuth 2.0, signed HTTP-only session cookies |
| Emails | Resend + React Email |
| Media | Cloudinary |
| Validation | Zod (shared schemas via `@yrco/lib`) |
| Monorepo | pnpm workspaces + Turborepo |

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
│   │   └── utils/        Seed scripts, helpers
│   └── web/              React SPA
│       ├── src/pages/    Route-level components
│       ├── src/features/ Feature modules (profile, connections, setup, search, traits)
│       ├── src/shared/   UI primitives, icons, layout, route guards
│       ├── src/providers/ AuthProvider, QueryProvider
│       └── src/lib/      Axios instance, query keys, error redirect
└── packages/
    └── lib/              Shared Zod schemas, imported as @yrco/lib
```

## Auth Flow

1. User clicks "Login with LinkedIn" → redirected to LinkedIn OAuth
2. LinkedIn redirects to `/auth/linkedin/callback` with an authorization code
3. API exchanges the code for an access token, fetches the user's LinkedIn profile
4. A signed session cookie (7-day opaque token) is set; the token is stored in a `Session` collection
5. Every subsequent API request validates the cookie token against the database — no JWT

## User Roles

Two roles with different setup fields, enforced by a Zod discriminated union in `@yrco/lib`:

- **Student** — education program, optional portfolio links
- **Organization** — company name, role, target education programs

## Prerequisites

- Node.js 20+
- pnpm
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

## Getting Started

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

**`apps/api/.env.development`**

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `LINKEDIN_CLIENT_ID` | LinkedIn app client ID |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn app client secret |
| `LINKEDIN_REDIRECT_URI` | Must match the callback URL registered in your LinkedIn app |
| `COOKIE_SECRET` | Random secret for signing session cookies — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RESEND_API_KEY` | Resend API key for transactional emails |
| `EMAIL_FROM` | Sender address (e.g. `hello@yourdomain.com`) |
| `ALLOWED_CLIENT_ORIGINS` | Comma-separated allowed CORS origins (e.g. `http://localhost:5173`) |
| `PORT` | API port (default `3000`) |

**`apps/web/.env.development`**

| Variable | Description |
|---|---|
| `VITE_API_URL` | API base URL (e.g. `http://localhost:3000`) |

### 3. Seed the database

```bash
pnpm --filter=api db:seed
```

### 4. Start dev servers

```bash
pnpm dev
```

Starts both the API (port `3000`) and the web app (port `5173`) via Turborepo.

## Scripts

### Root

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps |
| `pnpm test` | Run all tests |
| `pnpm --filter=api db:seed` | Seed all collections |
| `pnpm --filter=api db:seed -- <name>` | Seed a specific collection |
| `pnpm --filter=api db:clear` | Clear all collections |
| `pnpm --filter=api db:clear -- <name>` | Clear a specific collection |

### API (`apps/api`)

| Command | Description |
|---|---|
| `pnpm dev` | Start API server with watch mode |
| `pnpm test` | Run all tests once (Vitest) |

### Web (`apps/web`)

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server on port 5173 |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build (proxies `/api` to `API_URL`) |
| `pnpm lint` | Run ESLint |

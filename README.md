# Yrco

A mobile-first networking app for Yrgo's industry event.

## Goal

Making it easy for students and companies to connect and build relationships. Users authenticate via LinkedIn, pick 7 skills and strengths that become a unique color palette, then discover and connect with other attendees through that palette.

## Tech Stack

- **Frontend** — React 19 + Vite + Tailwind CSS v4 + React Router v7
- **Backend** — Express 5 (Node.js)
- **Database** — MongoDB (Mongoose)
- **Auth** — LinkedIn OAuth 2.0 (cookie-based sessions)
- **Emails** — Resend + React Email
- **Media** — Cloudinary
- **Monorepo** — pnpm workspaces + Turborepo

## Project Structure

```
yrco/
├── apps/
│   ├── api/          Express REST API
│   └── web/          React SPA
└── packages/
    └── lib/          Shared Zod validation schemas (@yrco/lib)
```

## Prerequisites

- Node.js 20+
- pnpm
- MongoDB

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/amin/yrco.git
   cd yrco
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables

   ```bash
   cp apps/api/.env.example apps/api/.env.development
   cp apps/web/.env.example apps/web/.env.development
   ```

   Fill in the values in each `.env.development` file:

   - **`MONGO_URL`** — local MongoDB or [MongoDB Atlas](https://www.mongodb.com/atlas)
   - **`LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`** — create an app at [LinkedIn Developers](https://www.linkedin.com/developers)
   - **`CLOUDINARY_*`** — create an account at [Cloudinary](https://cloudinary.com)
   - **`RESEND_API_KEY`** — create an account at [Resend](https://resend.com)
   - **`COOKIE_SECRET`** — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

4. Seed the database

   ```bash
   pnpm --filter=api db:seed
   ```

5. Start the dev servers

   ```bash
   # From the project root
   pnpm dev
   ```

   This starts both the API (port 3000) and the web app (port 5173).

## Scripts

| Command | Location | Description |
| --- | --- | --- |
| `pnpm dev` | Root | Start all apps |
| `pnpm test` | Root | Run all tests |
| `pnpm --filter=api db:seed` | Root | Seed all collections |
| `pnpm --filter=api db:seed -- <name>` | Root | Seed a specific collection |
| `pnpm --filter=api db:clear` | Root | Clear all collections |

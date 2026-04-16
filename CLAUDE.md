# CLAUDE.md

## Project overview

Yrco is a mobile-first networking app for Yrgo's industry event. Students and companies authenticate via LinkedIn, pick 7 traits that become a visual color palette, then discover and connect with other attendees through that palette.

## Monorepo structure

```
apps/api        Express REST API (Node 20+, MongoDB/Mongoose)
apps/web        React SPA (Vite, React 19, Tailwind CSS v4)
packages/lib    Shared Zod schemas and utilities, imported as @yrco/lib
```

Each app has its own `CLAUDE.md` with app-specific commands, architecture, and conventions.

## Commands

```bash
pnpm dev                              # Start all apps via Turborepo
pnpm test                             # Run all tests via Turborepo
pnpm --filter=api db:seed             # Seed all collections
pnpm --filter=api db:seed -- <name>   # Seed a specific collection
pnpm --filter=api db:clear            # Clear all collections
```

Run app-specific scripts from root using `pnpm --filter=<app> <script>`.

## Tooling

- **Package manager**: pnpm (workspaces via `pnpm-workspace.yaml`)
- **Monorepo orchestration**: Turborepo (`turbo.json`)
- **No TypeScript** — plain JavaScript throughout, JSDoc only where non-obvious

## Auth flow

LinkedIn OAuth 2.0 → backend sets signed HTTP-only session cookie → cookie validated against `Session` collection on every request. No JWT.

## User roles

Two roles with different setup fields, validated by a Zod discriminated union in `packages/lib`:
- **Student**: education program, optional portfolio links
- **Organization**: company name, role, target education programs

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                  # Start API (from apps/api)
pnpm test                 # Run all tests once
pnpm vitest run tests/auth.test.js  # Run a single test file
pnpm db:seed              # Seed all collections
pnpm db:seed -- words     # Seed a specific collection
pnpm db:clear             # Clear all collections
pnpm db:clear -- users    # Clear a specific collection
```

To add a new collection: add its name to `utils/seed/config/collections.js` (order = dependency order), create `utils/seed/seeders/<name>Seeder.js`, and register it in the `SEEDERS` map in `utils/seed/seedDatabase.js`.

## Architecture

Clean architecture with strict layer separation:

- **routes/**: Express wiring only
- **controllers/**: All HTTP concerns — validate input (Zod), read/set cookies, send responses and redirects. Nothing else
- **usecases/**: Orchestrate repos and services to fulfill a business operation — no framework code
- **repositories/**: Abstraction over the database (Mongoose). Swap the DB without touching use cases
- **services/**: Abstraction over external APIs (LinkedIn, Cloudinary, Resend). Swap providers without touching use cases
- **middleware/**: `requireAuth` (validates signed session cookie token against the `Session` collection, sets `req.user.uid`), `requireSetup` (queries DB to confirm onboarding is complete, attaches full user object to `req.user`), rate limiting, error handler
- **helpers/**: Pure functions with no side effects

**Monorepo**: `apps/api` (this app), `apps/client` (React), `packages/lib` (shared Zod schemas, imported as `@colyr/lib`).

**Auth**: LinkedIn OAuth 2.0. CSRF state in a short-lived signed cookie; session stored as a signed cookie containing a random opaque token (7 days), backed by a `Session` collection in MongoDB. `requireAuth` validates the token against the DB on every request. No JWT.

**Environment**: Node 20+ `--env-file` — no dotenv. Uses `.env.development` / `.env.production` in `apps/api/`.

## Conventions

**Errors**: throw plain objects `{ status, message }` — not `Error` instances. The global error handler reads `err.status`.

**Repositories**: always return plain objects, never Mongoose documents — this keeps Mongoose contained to the repository layer so use cases and controllers have no knowledge of the ORM. Use `.lean()` for queries without population; use `.populate(...).toObject({ virtuals: true })` when populating refs (required to preserve virtuals). To update a document, call the repository with the new data — never mutate a document directly outside the repository.

**Pagination**: fetch `pageSize + 1`, slice to `pageSize`, use the extra record to set `hasMore` — no COUNT queries.

**Emails**: templates are React components rendered to HTML via `@react-email/render`.

## Testing

Tests in `tests/`. Vitest + `vi.mock()`. Repos and services are mocked; use cases and helpers tested in isolation.

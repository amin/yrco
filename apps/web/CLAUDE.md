# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Vite dev server on port 5173 (from apps/web)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm preview      # Preview production build (proxies /api to API_URL)
```

## Architecture

Mobile-first React SPA (Vite + React 19) styled with Tailwind CSS v4.

**Monorepo**: `apps/web` (this app), `apps/api` (Express API), `packages/lib` (shared Zod schemas, imported as `@yrco/lib`).

### Directory structure

- **pages/**: Route-level components — one per page, minimal logic
- **features/**: Feature modules, each with `hooks/`, `ui/`, and optionally `data/`. Barrel-exported via `index.js`
- **shared/ui/**: Reusable UI primitives (`buttons/`, `inputs/`, `cards/`, `swatches/`). Barrel-exported via `index.js`
- **shared/icons/**: SVG icon components built on `BaseIcon` wrapper
- **shared/layout/**: `ProtectedLayout` (navbar + QR overlay + page transitions), `SearchHeader`
- **shared/routes/**: Route guards (`PublicRoute`, `AuthRoute`, `AppRoute`) and route definitions
- **providers/**: `AuthProvider` (React Query-backed auth context), `QueryProvider`
- **lib/**: `api.js` (Axios instance with response interceptor), `queryKeys.js`, `errorRedirect.js`
- **utils/**: Pure helper functions (`toTitleCase`, `shuffle`)

### Path alias

`@/` maps to `src/` (configured in `vite.config.js` and `jsconfig.json`).

### Routing & auth flow

Three route groups in `App.jsx`, each with a guard component:

- **PublicRoute** — unauthenticated only (redirects to `/palette` if logged in): `/login`
- **AuthRoute** — authenticated, setup not required: `/setup`, `/logout`
- **AppRoute** — authenticated + setup complete (redirects to `/login` or `/setup` otherwise): `/palette`, `/users`, `/:username`, `/connections`
- **Open routes** — no guard: `/auth/callback`, `/error`

AppRoute pages render inside `ProtectedLayout` which provides the bottom `NavBar`, `QrOverlay`, and `PageTransition` (Framer Motion fade+slide).

### Data fetching

- **React Query v5** via `@tanstack/react-query` for all server state
- **Axios** instance in `lib/api.js` with `withCredentials: true` (cookie auth)
- Query keys centralized in `lib/queryKeys.js`
- Auth state: `AuthProvider` wraps the app, exposes `useAuth()` → `{ user, isLoading, error, logout }`

### Global error handling

- **Axios interceptor** (`lib/api.js`): redirects on 401 (to `/login`), 403/500+/network errors (to `/error`)
- **ErrorBoundary** (class component): catches render crashes, shows fallback UI
- **Error page** (`/error`): reads `?message=` from URL, shows message with back button

## Conventions

**Components**: JSX files, named exports, one component per file. No TypeScript — plain JS with JSDoc only where non-obvious.

**Styling**: Tailwind v4 utility classes. Design tokens defined in `index.css` under `@theme` — use token names (`bg-yrgo-red`, `text-sm`, `p-base`, `gap-l`, `rounded-card`) not raw values. CSS variables for button/card semantic tokens under `:root`.

**Buttons**: Built on `BaseButton` (rounded-full, transition-colors, disabled states). `Button` adds variant styling (`primary`/`secondary`). `ToggleButton` for picked/unpicked states. `HeartButton` for connection toggle.

**Icons**: Built on `BaseIcon` wrapper. Each icon is its own file exporting a component that accepts `active` prop for state changes.

**Feature modules**: Each feature (`profile`, `connections`, `search`, `setup`, `traits`) has its own hooks that encapsulate React Query calls and mutations. Pages consume these hooks and stay thin. Barrel-export public API from `feature/index.js`.

**Mutations**: Use `useMutation` from React Query. Invalidate related queries in `onSuccess`. Use `mutateAsync` when you need to await the result (e.g., setup flow).

**Forms in setup**: Multi-step wizard in `Setup.jsx` with step components (`RoleStep`, `DetailsStep`, `OnboardingCardsStep`, `TraitsStep`, `LoadingStep`). Form state lifted to parent, passed down as `formData` + `onChange`.

**Validation**: Zod schemas from `@yrco/lib` for field validation (e.g., URL fields in `DetailsStep`). Validate on blur, show inline error text.

**Videos**: Hosted on Cloudinary (cloud: `dmvfsm0ls`, path: `yrco/`). Use `preload="auto"` for setup animations. Onboarding card video data lives in `features/setup/data/onboardingCards.js`.

**Accessibility**: Buttons have `aria-label` attributes. Nav uses semantic `<nav>` with `aria-current="page"` on active items. Search uses `role="search"`. Interactive elements are `<button>` not `<div>`.

**Redirects**: Login and Setup pages accept `?redirect=` parameter, validated against `APP_ROUTES` using `matchPath` from react-router-dom before navigating. Never redirect to arbitrary URLs.

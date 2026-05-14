# Uni Municipality

A Vite + React municipality events frontend that runs locally in mock mode today and is structured to connect to a CMS-backed SQL backend later.

## Local setup

### Using npm

```bash
npm install
npm run dev
```

### Using pnpm

```bash
pnpm install
pnpm dev
```

The app starts in `mock` mode by default and stores changes in browser local storage for local development.

## Scripts

```bash
npm run dev
npm run dev:host
npm run build
npm run preview
npm run typecheck
```

The same scripts work with `pnpm`.

## Environment

Copy `.env.example` to `.env.local` when you want to use a real backend.

```env
VITE_DATA_PROVIDER=mock
VITE_API_BASE_URL=http://localhost:1337/api
VITE_API_TOKEN=
VITE_AUTH_LOGIN_ENDPOINT=/auth/login
VITE_CMS_EVENTS_ENDPOINT=/events
VITE_CMS_REGISTRATIONS_ENDPOINT=/registrations
VITE_CMS_USERS_ENDPOINT=/users
VITE_CMS_VENUES_ENDPOINT=/venues
VITE_CMS_CATEGORIES_ENDPOINT=/categories
VITE_CMS_NOTIFICATIONS_ENDPOINT=/notifications
```

## Backend readiness

- `mock` mode uses seeded data from `src/app/data/mockData.ts`.
- `cms` mode reads collections and sends mutations to your backend API.
- The frontend supports plain arrays, `{ data: [...] }`, and Strapi-style `attributes` payloads.
- Login expects either `{ user, token }` or `{ data: { user, token } }`.

Do not connect the browser directly to SQL. The intended flow is:

1. React frontend
2. CMS or custom backend API
3. SQL database

Additional setup notes:

- CMS integration guide: `docs/cms-integration.md`
- Starter schema: `docs/sql/schema.sql`

## Git

The repo includes a `.gitignore` for `node_modules`, `dist`, logs, and local env files.

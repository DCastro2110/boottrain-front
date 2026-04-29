# boottrain-front

## Tech stack

- Next.js 16.2.4 (App Router), React 19.2.4, TypeScript 5
- Tailwind CSS v4 (CSS-based config, no `tailwind.config.ts`)
- shadcn/ui (style: base-nova), @base-ui/react
- better-auth for client auth
- orval for API client codegen from backend swagger
- Tanstack Query for data fetching and caching
- ESLint with Next.js and React plugins, Prettier for code formatting
- Chart.js with shadcn/ui for data visualization

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint (only verification; no typecheck script)
- `pnpm format` — Prettier write

## API client codegen

- orval fetches from `http://localhost:3000/swagger.json` (backend must be running)
- Generated output: `src/lib/api/booTrainAPI.ts`
- Do not hand-edit generated files; regenerate with `pnpm orval`

## Tailwind v4

Uses CSS-based configuration via `src/app/globals.css`. No `tailwind.config.ts`.

- Never write a hard coded color; use Shadcn/ui Tailwind classes. If a custom color is needed, add it to the CSS config in `globals.css` and use the new class.

## Path aliases

- `@/*` → `./src/*`
- Component aliases: `@/components`, `@/ui`, `@/utils`, `@/lib`, `@/hooks`

## Auth

Client uses `better-auth/react` with `NEXT_PUBLIC_APP_URL` env var (default: `http://localhost:3000`).

## Env vars

- `NEXT_PUBLIC_APP_URL` — auth base URL
- `NEXT_PUBLIC_API_BASE_URL` — API base URL for fetch client

## Components

- `src/components` — shared components (e.g. `Button`, `Input`, etc.)
- `src/ui` — shadcn/ui components (e.g. `@ui/Button`)
- `src/app` — app-specific components (e.g. pages, layout, etc.)
- Components used in only one place should be defined in the same file as their usage (e.g. `src/app/login/page.tsx` can contain a `LoginForm` component if it's only used there).
- **AVOID** repetitive components; if you find yourself copy-pasting a component, move it to `src/components` and reuse it.
- **ALWAYS** prefer server components unless you need client-side interactivity; use `use client` directive only when necessary. If possible, keep components as server components and use client components only for interactive parts (e.g. a `LoginButton` client component inside a `LoginPage` server component).

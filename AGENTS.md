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
- Pencil for design and prototyping

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
- Components used in only one page should be placed **together with their page folder** in a directory named `_components` (e.g., `src/app/home/_components/some-component.tsx` for a component only used in `src/app/home/page.tsx`). Using the underscore prefix (`_`) tells Next.js to treat the folder as a private folder, not a route.
- Shared components that are used in multiple places go in `src/components/`.

## Naming Conventions

- All file names must use **kebab-case** and be in **English**.
- Component names must be in **PascalCase** (e.g., `MyComponent.tsx`).
- Hooks must be in **camelCase** and start with `use` (e.g., `useFetchData.ts`).
- API client functions should be named based on their action and resource (e.g., `getUser`, `createWorkoutPlan`).
- Data-fetch functions should be named based on the data they fetch (e.g., `fetchWorkoutPlans`, `fetchUserProfile`).
- Server actions should be named based on the action they perform (e.g., `createWorkoutSessionAction`, `updateUserSettingsAction`).

## API Requests

- Use the generated API client from `src/lib/api/booTrainAPI.ts` for all API requests. Do not use `fetch` directly in your components or pages.
- For get data you should create a data-fetch function inside `src/data-fetch`.
- For mutations, you should create a server action inside tha folder of the page that will use it. For example, if you have a page `src/app/home/page.tsx` and you need to create a mutation for that page, you should create a server action inside `src/app/home/_actions` folder.

# Architecture Rules

## Framework & Rendering

- Built on Next.js 16.2.4 with App Router.
- **ALWAYS** prefer server components by default.
- Use the `"use client"` directive only when necessary (e.g., for interactivity, `useState`, `useEffect`, or DOM events).
- Keep components as server components and use client components only for the interactive parts (e.g., place a `LoginButton` client component inside a `LoginPage` server component).

## Directory Structure & Path Aliases

Follow strict boundaries based on aliases and directory purposes:
- `src/app` (`@/*`): Next.js app directory for routing (pages, layouts). App-specific components should be colocated here.
- `src/components` (`@/components`): Shared business or domain-specific components used in more than one place.
- `src/ui` (`@/ui`): Reusable generic design-system primitives and shadcn/ui components.
- `src/lib` (`@/lib`): Core configuration, setup files, and generated codegen (`api/booTrainAPI.ts`).
- `src/hooks` (`@/hooks`): Custom React hooks.
- `src/utils` (`@/utils`): Pure helper functions and generic utilities.

## Component Colocation & Reusability

- Components used in only one place should be defined in the same file as their usage (e.g., `src/app/login/page.tsx` can contain a `LoginForm` component if it's only used there).
- **AVOID** repetitive components. If you find yourself copy-pasting a component, abstract it and move it to `src/components` to reuse it.

## Styling & Design System

- Tailwind CSS v4 is used with a CSS-based configuration located in `src/app/globals.css`. There is no `tailwind.config.ts`.
- **Never write a hard-coded color.** Use Shadcn/ui Tailwind classes.
- If a custom color is needed, add it to the CSS config in `globals.css` and use the resulting new class.

## Data Fetching & Codegen

- API interactions must use the generated client from `orval`.
- Codegen reads from `http://localhost:3000/swagger.json` and outputs to `src/lib/api/booTrainAPI.ts`.
- The `NEXT_PUBLIC_API_BASE_URL` environment variable provides the backend API endpoint base.
- Do not manually edit the generated `booTrainAPI.ts`. Run `pnpm orval` to regenerate.

## Authentication

- Client-side auth is managed via `better-auth/react`.
- Ensure `NEXT_PUBLIC_APP_URL` is used for the auth base URL (defaults to `http://localhost:3000`).

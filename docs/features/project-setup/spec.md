# Project Setup Specification

## Overview

This specification details the initial setup of the Next.js project. It is divided into three main stages:

1. **Linting & Formatting & Cleanup:** Configure ESLint with `eslint-plugin-simple-import-sort`, set up Prettier, and clean up default Next.js files (like the default Home page and global css templates).
2. **Authentication Client:** Initialize and configure the `better-auth` client in the Next.js App Router.
3. **UI Components:** Initialize and configure `shadcn/ui` based on the latest cli tools.

## Detailed Requirements

### Stage 1: Linting, Formatting, and Cleanup

- **Prettier:** Install `prettier` and `eslint-config-prettier`. Create a `.prettierrc` configuration file.
- **ESLint:** Install `eslint-plugin-simple-import-sort`. Update the ESLint config to use simple-import-sort rules for auto-sorting imports.
- **Cleanup:**
  - Remove unnecessary default templates from Next.js in `src/app/page.tsx` and `src/app/globals.css`.
  - Ensure a clean slate for the UI.

### Stage 2: Better Auth Client Configuration

- **Dependencies:** Install `better-auth` if not already installed.
- **Configuration:**
  - Create a client instance at `src/lib/auth-client.ts` using `createAuthClient` from `"better-auth/react"`.
  - Configure the Next.js `next.config.js` or `next.config.mjs` to add `better-auth` to `serverExternalPackages`.

### Stage 3: shadcn/ui Configuration

- **Initialization:** Use `npx shadcn@latest init` to scaffold the UI configuration.
- **Components:** Verify that `components.json` and basic UI utilities (like `lib/utils.ts`) are generated correctly according to the latest shadcn v4 CLI.

## Acceptance Criteria

- Running `npm run lint` or `npm run format` successfully sorts imports and formats code.
- Default Next.js boilerplate UI is removed.
- `auth-client.ts` correctly exports `authClient`.
- `shadcn/ui` is initialized successfully with proper Tailwind and utility configuration.

# TypeScript Rules

## General

- Use TypeScript 5 features where applicable.
- Avoid using `any` types. Prefer `unknown` if the type is truly not known, or define strict interfaces/types.
- Ensure strict mode is respected.
- Prefer interfaces for object shapes and type aliases for unions/primitives.

## Components & React

- Props should be defined in an interface named `I[ComponentName]Props`.
- Use "I" prefix for interfaces to distinguish them from types.
- Use "T" prefix for type aliases when needed (e.g. for unions).
- Explicitly type props for all components.
- Use React 19 features where appropriate.
- Be consistent with exports (prefer named exports for better tree-shaking and refactoring, except for Next.js App Router default exports like `page.tsx`, `layout.tsx`).
- Prefer const for component definitions.

## API & Data Types

- Do not hand-edit generated API types or clients from `orval`. Import them directly from `src/lib/api/booTrainAPI.ts`.
- Use the generated types for all backend data structures to maintain consistency with the backend swagger.
- When wrapping or composing API types, use TypeScript utility types like `Omit`, `Pick`, and `Partial`.

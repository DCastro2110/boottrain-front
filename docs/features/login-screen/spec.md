# Feature: Login Screen

## Overview

A minimalist login screen for the Fit.ai fitness application. The screen features Google OAuth authentication as the sole login method, presenting a modern fitness brand aesthetic with a dark background image, branded logo, and a blue gradient card containing the login prompt and Google sign-in button.

## Goals

- Provide a secure, frictionless login experience via Google OAuth
- Present a clean, modern fitness app aesthetic that reinforces the Fit.ai brand
- Guide users to sign in with minimal friction (single click to Google auth flow)
- Display appropriate branding and copyright information

## Scope

### In Scope

- Login page component at `/login` route
- Google OAuth integration via better-auth
- Responsive centering of the login card
- Fit.ai logo/branding display
- Copyright footer
- Loading states during authentication
- Error handling for failed authentication attempts

### Out of Scope

- Email/password authentication (not applicable)
- Registration flow (handled by Google OAuth callback)
- Password reset functionality
- Remember me functionality
- Social login options beyond Google

## UI/UX Specification

### Layout Structure

| Element                 | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| Full viewport container | Centers content vertically and horizontally                                       |
| Background              | Dark image with semi-transparent overlay (#000000aa)                              |
| Logo                    | Fit.ai text logo, white, positioned at top-center                                 |
| Login Card              | Blue gradient (#2b54ff), rounded top corners (20px radius), contains form content |
| Card Padding            | 48px horizontal, 20px vertical (top), 20px bottom                                 |
| Card Gap                | 60px between major sections                                                       |

### Login Card Contents

1. **Hero Message** (d9CkYz frame)
   - Text: "O app que vai transformar a forma como você treina."
   - Color: White (#ffffff)
   - Font: Inter Tight, 32px, weight 600
   - Line height: 1.05
   - Text align: center
   - Positioned with 12px gap below

2. **Google Sign-In Button** (gRhcb frame)
   - Background: White (#ffffff)
   - Corner radius: 100px (pill shape)
   - Height: 38px
   - Padding: 12px vertical, 24px horizontal
   - Contains:
     - Google icon (16x16, white background with colored logo)
     - Button text: "Fazer login com Google"
     - Text: Black (#000000), Inter 14px, weight 600
   - Gap between icon and text: 8px

3. **Copyright Footer**
   - Text: "©2026 Copyright FIT.AI. Todos os direitos reservados"
   - Color: White 70% opacity (#ffffffb2)
   - Font: Inter Tight, 12px, weight normal

### Responsive Behavior

- Frame width: 402px fixed (mobile-first design)
- Card uses `fill_container` for internal content width
- Content centered within the card using flexbox
- Vertically centered in viewport on larger screens

## Technical Approach

### Component Architecture

| Component        | Type             | Location                                   |
| ---------------- | ---------------- | ------------------------------------------ |
| LoginPage        | Server Component | `src/app/login/page.tsx`                   |
| GoogleAuthButton | Client Component | `src/components/auth/GoogleAuthButton.tsx` |

### Server vs Client Split

- **LoginPage** (Server Component): Renders the page structure, branding, and static content. This is the default in Next.js App Router.
- **GoogleAuthButton** (Client Component): Interactive button that triggers the Google OAuth flow. Uses `"use client"` directive since it handles auth actions and requires browser APIs.

### Authentication Flow

1. User clicks "Fazer login com Google" button
2. `GoogleAuthButton` invokes better-auth's `signIn()` method with Google provider
3. better-auth redirects to Google's OAuth consent screen
4. After user consents, Google redirects back to callback URL
5. better-auth handles token exchange and session creation
6. User is redirected to the authenticated area (home/dashboard)

### Environment Configuration

| Variable                   | Purpose                       | Default                 |
| -------------------------- | ----------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL`      | Auth base URL for better-auth | `http://localhost:3000` |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL for fetch client | (from backend)          |

### better-auth Integration

The project uses better-auth for client authentication. The Google provider configuration must be set up in the better-auth instance configuration on the backend. The client-side integration uses the `signIn` function from `better-auth/react`.

## Data Flow

```
User → LoginPage → GoogleAuthButton (click) → better-auth signIn("google")
                                                              ↓
                                              Google OAuth Consent Screen
                                                              ↓
                                              Callback → Session Created → Redirect
```

## Component Inventory

### GoogleAuthButton

| State   | Appearance                                                         |
| ------- | ------------------------------------------------------------------ |
| Default | White pill button with Google icon + "Fazer login com Google" text |
| Hover   | Slight opacity change or shadow (platform standard)                |
| Loading | Button disabled with spinner/progress indicator                    |
| Error   | Shows error message below button, allows retry                     |

### LoginPage

| State         | Appearance                                                                          |
| ------------- | ----------------------------------------------------------------------------------- |
| Default       | Full screen with background, logo, blue card containing hero text and Google button |
| Authenticated | Should redirect to home/dashboard (handled by middleware)                           |

## Dependencies

- `better-auth/react` - Authentication client
- `@/lib/api/booTrainAPI.ts` - API client (generated, not hand-edited)
- shadcn/ui components - Button, potentially card components
- Tailwind CSS v4 - Styling via CSS-based configuration

## Open Questions

1. **Redirect destination**: After successful login, where should users be redirected? (e.g., `/home`, `/dashboard`)
2. **Auth callback route**: Should a dedicated callback route be created, or rely on better-auth defaults?
3. **Error display**: How should authentication errors be displayed to the user? (toast, inline message, redirect)
4. **Protected routes**: Should the login page redirect authenticated users away, or is middleware handling this?

## Acceptance Criteria

| #     | Criterion                                                                      | Verification      |
| ----- | ------------------------------------------------------------------------------ | ----------------- |
| AC-1  | Login page renders at `/login` route with Fit.ai branding visible              | Visual inspection |
| AC-2  | Background image with dark overlay is displayed                                | Visual inspection |
| AC-3  | Blue gradient card with hero message "O app que vai transformar..." is visible | Visual inspection |
| AC-4  | Google sign-in button displays correctly with icon and Portuguese text         | Visual inspection |
| AC-5  | Clicking the Google button initiates OAuth flow                                | Manual test       |
| AC-6  | Failed authentication displays error message and allows retry                  | Manual test       |
| AC-7  | Page is responsive and centers content on all viewport sizes                   | Responsive test   |
| AC-8  | Authenticated users are redirected away from login page                        | Integration test  |
| AC-9  | Code follows Next.js App Router conventions (server/client split)              | Code review       |
| AC-10 | No hardcoded colors; all styling uses Tailwind/shadcn classes                  | Code review       |

# Feature: AI Onboarding Page

## Overview

A mandatory onboarding flow for new users who lack essential body metrics (weight, height, age, body fat percentage). Upon login, users without these fields are redirected to an AI-powered onboarding chat that collects their information before granting access to the rest of the app.

## Goals

- Ensure all users have complete profiles before using the app
- Provide a friendly, conversational onboarding experience via AI chat
- Seamlessly redirect users to the onboarding page when required fields are missing
- Match the design specification from Node ID `OY1JW` in `docs/design.pen`

## Scope

### In Scope

- Onboarding page at `/onboarding` with AI chat interface
- Server-side proxy to validate user profile completeness
- Onboarding page self-restricts access to incomplete profiles only
- Responsive design (mobile-first, desktop-compatible)
- Reuse of existing AI components from `@/components/ai`
- AI-powered conversation to collect: weight, height, age, body fat percentage

### Out of Scope

- Modifying existing AI components (reuse only)
- Backend API changes
- Authentication flow modifications
- Modifications to login page or home page
- Analytics/tracking

## Requirements

### Functional Requirements

- FR-1: Onboarding page (`/onboarding`) is only accessible to users with incomplete profiles. Users with complete profiles are redirected to home.
- FR-2: Onboarding page displays an AI chat interface matching design OY1JW
- FR-3: AI chat collects required user information through conversation
- FR-4: Upon successful data collection, user is redirected to home page
- FR-5: Server-side proxy validates profile completeness
- FR-6: Responsive layout works on mobile (primary) and desktop
- FR-7: Login page and home page remain unchanged

### Non-Functional Requirements

- NFR-1: Page load time < 2 seconds
- NFR-2: Mobile-first responsive design (393px base width per design)
- NFR-3: Uses existing AI components without modification
- NFR-4: Follows existing app conventions (Inter Tight font, #2b54ff primary color)

## Technical Approach

### Architecture

1. **Onboarding Page** (`src/app/onboarding/page.tsx`): Server component that checks session and renders the AI chat interface
2. **Proxy** (`src/proxy.ts`): Next.js proxy (export default) that intercepts requests, validates session and profile completeness, and redirects incomplete profiles to `/onboarding`
3. **AI Chat**: AI collects user data and saves directly to profile via `/ai` endpoint

### Data Flow

1. User accesses any protected route
2. Proxy checks session and profile completeness
3. If no session → redirect to `/login`
4. If session but incomplete profile → redirect to `/onboarding`
5. User completes onboarding via AI chat
6. AI saves data directly to profile via `/ai` endpoint
7. User redirected to home page

### Data Update

After AI conversation collects data, the AI saves it directly to the user profile via the `/ai` endpoint. No explicit `putUsersUserId` call needed from the client.

### Key Components

- `AIModal` from `@/components/ai/ai-modal.tsx` - reused for chat UI
- `ChatInput` from `@/components/ai/chat-input.tsx` - input handling
- `ChatMessages` from `@/components/ai/chat-messages.tsx` - message display
- `SuggestedChips` from `@/components/ai/suggested-chips.tsx` - quick actions

### API Integration

- `getUsersUserId(userId)` - fetch current user profile (from `@/lib/api/boo-train-api.ts`)
- `putUsersUserId(userId, body)` - update user profile with collected data

## Data Models / API Contracts

### User Profile (from boo-train-api.ts)

```typescript
interface UserProfile {
  height: number | null;
  weight: number | null;
  age: number | null;
  bodyFatPercentage: number | null;
}
```

### Validation Logic

User has complete profile when ALL fields are non-null:

- `height !== null`
- `weight !== null`
- `age !== null`
- `bodyFatPercentage !== null`

## Dependencies

- `@/components/ai/*` - existing AI components
- `@/lib/api/boo-train-api.ts` - API client (getUsersUserId, putUsersUserId)
- `@/lib/auth-client` - better-auth client for session
- `next/navigation` - redirect utility

## Open Questions

1. Should the AI onboarding be a full-page experience or a modal? (Based on design, full-page chat)
2. What happens if AI fails to collect data? Need error handling / fallback
3. Should there be a "skip" option for onboarding? (Requirement says mandatory, so no skip)
4. How does the AI know what data to collect? The AI backend needs to be instructed via system prompt

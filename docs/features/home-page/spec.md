# Feature: Home Page

## Overview

The Home Page serves as the main dashboard for users after logging into the BooTrain fitness application. It displays personalized workout information, weekly consistency tracking, and navigation to other sections of the app.

## Goals

- Provide users with a quick overview of their daily workout status
- Display weekly exercise consistency with color-coded indicators
- Show the current day's workout or rest day information
- Offer easy navigation to other app sections via bottom navbar

## Scope

### In Scope

- Banner section with user greeting and motivational message
- Consistency section with 7 day squares (Sunday to Saturday)
- "Treino de Hoje" (Today's Workout) section with workout or rest day card
- Bottom navigation navbar with 5 icons (Home, Calendar, AI, Stats, Profile)
- Data fetching using Tanstack Query with the `GetHomeInfo` API

### Out of Scope

- Authentication flow (handled separately)
- Workout detail pages
- User profile editing
- AI chat functionality
- Stats page implementation

## Requirements

### Functional Requirements

- FR-1: Page fetches home info data on load using `GetHomeInfo` API
- FR-2: Banner displays user name ("Olá, Paulo") and motivational text ("Bora treinar hoje?")
- FR-3: Consistency section shows 7 squares for days Sunday through Saturday
- FR-4: Consistency squares use three colors:
  - Blue (`#2b54ff`) = exercise completed
  - Light blue (`#d5dffeff` ) = exercise started
  - White (`#f1f1f1`) = exercise not started
- FR-5: Consistency section displays fire sequence number (e.g., "15")
- FR-6: "Treino de Hoje" section shows workout card when `todayWorkoutDay` is not null
- FR-7: Workout card displays: workout name, weekday name, estimated duration, number of exercises
- FR-8: "Treino de Hoje" section shows rest day card when `todayWorkoutDay` is null
- FR-9: Rest day card displays "Descanso" (Rest) message with zap icon
- FR-10: Bottom navbar has 5 icons: house (Home), calendar (Calendar), sparkles filled blue (AI), chart (Stats), user (Profile)
- FR-11: Navbar icons navigate to their respective pages when clicked

### Non-Functional Requirements

- NFR-1: Use Tanstack Query for data fetching and caching
- NFR-2: All components should be server components unless client interactivity is needed
- NFR-3: Follow shadcn/ui component patterns for styling
- NFR-4: Use Tailwind CSS v4 with CSS-based configuration
- NFR-5: Respect path aliases (`@/*` → `./src/*`)
- NFR-6: Components should be reusable (WorkoutCard, RestDayCard, Navbar)

### Design Specifications

#### Page Dimensions

- The sizes are only reference for spacing and layout. The page should be responsive and adapt to different screen sizes.

- Home page frame: 393x838
- Background: white (`#ffffffff`)

#### Banner Section

- Height: 296px
- Background: Image with gradient overlay
- Gradient: transparent to `00000099` at bottom
- Corner radius: 0 top, 20px bottom
- Content: Logo "Fit.ai", greeting "Olá, Paulo", subtitle "Bora treinar hoje?"
- Account badge with blue fill (`#2b54ff`)

#### Consistency Section

- Corner radius: 8px
- Padding: 20px
- Title: "Consistência" (18px, weight 600)
- Link: "Ver histórico" (12px, blue)
- Day squares in horizontal layout with 12px gap
- Fire sequence badge with orange accent (`#f06100`)

#### Today's Workout Section

- Corner radius: 0 top, 8px bottom
- Padding: 20px
- Title: "Treino de Hoje" (18px, weight 600)
- Link: "Ver treinos" (12px, blue)

#### Workout Card

- Height: 200px
- Corner radius: 12px
- Background: Image with dark overlay (`#00000066`)
- Content: Weekday badge, workout name, duration (timer icon), exercise count (dumbbell icon)

#### Rest Day Card

- Height: 110px
- Corner radius: 12px
- Background: Light gray (`#f1f1f1ff`)
- Content: Weekday badge (dark), zap icon (blue), "Descanso" text

#### Bottom Navbar

- Position: absolute at bottom (y: 750)
- Width: 393px
- Corner radius: 20px top
- Background: white with light gray border
- 5 icons: house, calendar, sparkles (filled blue), chart, user
- Icons have 24px dimensions with 12px padding
- Gap between icons: 24px

## Technical Approach

### Architecture

1. **Data Fetch Functions** (in `src/data-fetch/`):
   - `getHomeInfo.ts` - Server-side function to call `getHomeInfo` API
2. **Page** (`src/app/page.tsx`): Server component that imports from data-fetch and passes to children
3. **Components** (in `src/components/`):
   - `ConsistencyBoard.tsx` - Receives data via props, renders 7 day squares
   - `WorkoutCard.tsx` - Receives workout data via props
   - `RestDayCard.tsx` - Receives weekday via props
   - `Navbar.tsx` - Bottom navigation with 5 icons (static, no props needed)
4. **Section Components** (in `src/components/`):
   - `TreinoDeHoje.tsx` - Receives data via props, conditionally renders WorkoutCard or RestDayCard

### Data Flow

```
Page (server component)
  └── src/data-fetch/getHomeInfo.ts (server-side API call)
  └── Banner (static UI - no data needed)
  └── ConsistencyBoard (receives consistency data via props)
  └── TreinoDeHoje (receives todayWorkoutDay via props)
  └── Navbar (static with Link components - no data needed)
```

**Important**: The page component fetches data on the server using `getHomeInfo` directly, then passes the fetched data to client components via props. Client components receive data as props and do NOT fetch data themselves.

### Component Details

| Component          | Type   | Props                                                        | Purpose                     |
| ------------------ | ------ | ------------------------------------------------------------ | --------------------------- |
| `ConsistencyBoard` | Client | `consistency: WeekConsistencyItem[]`, `fireSequence: number` | Renders 7 day squares       |
| `WorkoutCard`      | Client | `workout: TodayWorkoutDay`                                   | Displays workout info       |
| `RestDayCard`      | Client | `weekday: string`                                            | Shows rest day              |
| `TreinoDeHoje`     | Client | `todayWorkoutDay: TodayWorkoutDay \| null`                   | Conditionally renders cards |
| `Navbar`           | Server | none                                                         | Bottom navigation links     |

### API Response Shape

```typescript
interface GetHomeInfo200 {
  weekConsistency: Array<{
    day:
      | 'SUNDAY'
      | 'MONDAY'
      | 'TUESDAY'
      | 'WEDNESDAY'
      | 'THURSDAY'
      | 'FRIDAY'
      | 'SATURDAY';
    status: 'completed' | 'not_completed' | 'missed';
  }>;
  fireSequence: number;
  todayWorkoutDay: {
    date: string;
    name: string;
    estimatedDurationInSeconds: number;
    numberOfExercises: number;
    coverImageUrl: string | null;
    isCompleted: boolean;
  } | null;
}
```

### Status to Color Mapping

| Status          | Color                | Description                       |
| --------------- | -------------------- | --------------------------------- |
| `completed`     | Blue                 | Exercise completed                |
| `not_completed` | White/Light          | Exercise not started              |
| `missed`        | Light blue with blur | Exercise started but not finished |

Note: The design shows 3 visual states. The API returns `completed`, `not_completed`, and `missed`. The "started" state (light blue) will be used for `missed` based on the requirements showing light blue for "exercise started".

## Dependencies

- `@tanstack/react-query` - Data fetching and caching
- `lucide-react` - Icons (house, calendar, sparkles, chart, user, timer, dumbbell, zap)
- `next/link` - Client-side navigation
- `clsx` / `tailwind-merge` - Conditional className handling (standard in shadcn)

## Open Questions

1. The API `status` field has `completed`, `not_completed`, `missed` but design shows `blue`, `light blue`, `white`. Map:
   - `completed` → blue
   - `not_completed` → white
   - `missed` → light blue (started but not finished)

2. The banner has a "Fit.ai" logo - should this be a static element or link to home?

3. The fire sequence badge shows an orange streak counter. Is this a critical UI element that needs interaction or just display?

4. The navbar "AI" icon (sparkles) is highlighted blue - is this intentional to show the currently active page or just a design emphasis?

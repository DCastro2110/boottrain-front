# Home Page - Implementation Tasks

## Task Summary

- **Total Tasks**: 6
- **Recommended Implementation Order**: 1 → 2 → 3 → 4 → 5 → 6

## Task List

- [ ] 1. Create ConsistencyBoard component
- [ ] 2. Create WorkoutCard component
- [ ] 3. Create RestDayCard component
- [ ] 4. Create Navbar component
- [ ] 5. Create TreinoDeHoje section component
- [ ] 6. Implement Home page (main page.tsx - server component)

## Architecture Note

Data fetching happens server-side in `page.tsx`. The page component calls `getHomeInfo` directly and passes the data to child components via props. Child components are client components that receive data as read-only props.

## Critical Dependencies

- Task 6 (Home page) requires all previous tasks to be complete
- All components use Tailwind CSS v4 classes - no hardcoded colors
# Workout Day Feature Specification

## Overview
This feature introduces the Workout Day page where users can view their exercises for a specific workout day, start a session, and mark it as completed.

## Routes
- `/workout-plan/[id]/workout-day/[workoutDayId]`

## Technical Requirements
- **Authentication:** If the user is not logged in, redirect them to the login page.
- **Authorization:** If the API returns a permission error (e.g., 403), display an unauthorized access view with the message "Você não tem permissão para acessar esta página." and a "Voltar para o menu" button that redirects to the home page (`/`).
- **Data Fetching:** Fetch workout day details using `getWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayId` from `src/lib/api/boo-train-api.ts`.
- **UI Structure:** Use the main layout represented by node `l3fqk`.
- **Hero/Header Section:** Implement using component node `q3wGFH`.
- **Start Workout Button:** Located in the header (node `J5Ubc` style). Clicking this must call `postWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessions` to start the session.
- **Exercise Cards:** Implement exercise list using component node `J8B1U`. Data must be populated from the fetched workout day data.
- **Finish Button:** Implement "Marcar como concluído" button (node `gYCIU` style). Clicking this must call `patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId` to mark the session as complete.
- **Success Popup:** After successfully marking the session as complete, show a popup displaying "Parabéns! Você concluiu o treino do dia!" with a "Voltar para o menu" button to close the popup.
- **Responsiveness:** The page must be responsive and look good on all devices.

## Tech Stack
- Next.js 16.2.4 (App Router)
- React 19.2.4
- Tailwind CSS v4
- shadcn/ui
- Orval generated API client

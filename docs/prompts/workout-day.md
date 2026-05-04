# Workout Day

## Technical Requirements

- Create the page '/workout-plan/{id}/workout-day/{id}' in the project. Should be equal to the Node ID: l3fqk.
- In the header you should add button to start the workout day, equal in Node ID: J5Ubc. You should call the function `postWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessions`
- The component Node ID: q3wGFH already created, use him to create the page.
- Create the compoent card for each exercise Node ID: J8B1U. The exercise data should be taken from the workout day data.
- The page should be responsive and look good on all devices.
- When user click in the "Marcar como concluído" button, the workout day should be marked as done and the system and the user should show a popup with the message "Parabéns! Você concluiu o treino do dia!". Esse popup deve ter um botão "Voltar para o menu" para fechar o popup.
  - This button should call the function `patchWorkoutPlanWorkoutPlanIdWorkoutDaysWorkoutDayIdSessionsSessionId` to mark the workout day as complete.
- If user isn't logged in, you should redirect the user to login page.
- If the user try access a page without permission, you should show a page of unauthorized access with the message "Você não tem permissão para acessar esta página." and a button "Voltar para o menu" to redirect the user to the home page.

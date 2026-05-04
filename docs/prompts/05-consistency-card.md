# Consistency Page

## Technical Requirements

- Create the page '/consistency' in the project. Should be equal to the Node ID: QkeRn
- The Header should be equal to the Node ID: lnaYy and Node ID: v1F4lK
- You should create for new components:
  - PeriodConsistencyCard: Node ID: XKWEJ
  - PeriodConsistencyCardSkeleton:
  - InfoCard: Node ID: fcxmr
  - InfoCardSkeleton:
- The Info Cards should follow the composite pattern (Container > Icons + Title)
- If user isn't logged in, you should redirect the user to login page.
- If the user try access a page without permission, you should show a page of unauthorized access with the message "Você não tem permissão para acessar esta página." and a button "Voltar para o menu" to redirect the user to the home page.
- To get the consistency data, you should call the function `getStats` and use the data to fill the cards. The consistency data should be updated every time the user complete a workout day.
- The data-fetch getStats functions shoukd be created in the file `src/data-fetch/stats.ts` and should be used in the page to get the data. The function to gte the data shoubd be get in `src/lib/api/boo-train.ts`

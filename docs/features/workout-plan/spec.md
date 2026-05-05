# Especificação Técnica: Workout Plan

## Overview

A funcionalidade de Workout Plan permite que os usuários visualizem os detalhes de um plano de treino específico, incluindo a listagem de dias de treino. A navegação permite acessar os detalhes de cada dia de treino. A funcionalidade também inclui a reestruturação das rotas existentes para português, saindo do inglês usado anteriormente, e a adoção da convenção `_components` para diretórios de componentes locais.

## Goals & Scope

- **O que será feito:**
  - Reestruturação das rotas de inglês (`/workout-plan/...`) para português (`/planos/...`).
  - Criação da página principal do plano em `/planos/[planId]`.
  - Migração da página de detalhes do dia para `/planos/[planId]/dias/[dayId]`.
  - Migração de componentes locais de `components/` para `_components/` na nova estrutura.
  - Integração com a API para buscar os detalhes do plano específico.
  - Reutilização do componente de card da home page.
  - Implementação de Header e design responsivo baseado nos Node IDs fornecidos (`qW6Lu` para header e página, `a3W9s` para cards).
  - Proteção de rota para usuários autenticados e tratamento rigoroso de falta de permissão.
- **O que não será feito:**
  - Criação ou edição de planos de treino (apenas visualização).
  - Componente de Card será reaproveitado, não recriado do zero.

## Technical Approach

- **Rotas (Next.js App Router):**
  - `/planos/[planId]/page.tsx`: Lista os dias do plano e exibe cabeçalho.
  - `/planos/[planId]/dias/[dayId]/page.tsx`: Detalhes de um dia específico (rota migrada).
  - Qualquer diretório de componentes local a uma rota DEVE ser nomeado como `_components` (ex: `/planos/[planId]/dias/[dayId]/_components`).
- **Data Fetching:** Utilização da função `getWorkoutPlanWorkoutPlanId` da API gerada pelo Orval.
- **Autenticação e Autorização:**
  - Uso do hook `useUser` para verificar o estado de autenticação.
  - Tratamento de erro 401/403 (Forbidden/Unauthorized) da API para exibir a mensagem "Você não tem permissão para acessar esta página." e o botão "Voltar para o menu".
- **Design:** Next.js Components com Tailwind CSS para garantir responsividade total.

## Data Models / API Contracts

Contratos principais da API (`src/lib/api/boo-train-api.ts`):

```typescript
type GetWorkoutPlanWorkoutPlanId200 = {
  id: string;
  name: string;
  description: string;
  userId: string;
  isActive: boolean;
  workoutDays: GetWorkoutPlanWorkoutPlanId200WorkoutDaysItem[];
};

type GetWorkoutPlanWorkoutPlanId200WorkoutDaysItem = {
  id: string;
  name: string;
  isRestDay: boolean;
  weekDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  estimatedDurationInSeconds: number;
  workoutExercises: { ... }[];
};
```

## Dependencies

- `@/lib/api/boo-train-api`: Chamadas de API.
- `@/hooks/use-user`: Controle de autenticação.
- Componente de card da home page (presente em `src/app/home/components/`).

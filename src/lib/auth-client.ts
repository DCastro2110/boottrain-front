import { inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL!,
  plugins: [
    inferAdditionalFields({
      user: {
        height: { type: 'number' },
        weight: { type: 'number' },
        age: { type: 'number' },
        fitnessLevel: { type: 'string' },
        bodyFatPercentage: { type: 'number' },
      },
    }),
  ],
});

import { defineConfig } from 'orval';

export default defineConfig({
  fetch: {
    input: 'http://localhost:3000/swagger.json',
    output: {
      target: 'src/lib/api',
      client: 'fetch',
      override: {
        mutator: {
          path: 'src/lib/fetch.ts',
          name: 'customFetch',
        },
      },
    },
  },
});

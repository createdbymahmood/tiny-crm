import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:9900',
    },
});

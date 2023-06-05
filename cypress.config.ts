import { defineConfig } from 'cypress';

import viteConfig from './vite.config';

export default defineConfig({
    e2e: {
        specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:9900',
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
            viteConfig,
        },
        specPattern: 'app/**/*.cy.spec.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/component.ts',
    },
});

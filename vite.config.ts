/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

const viteConfig = defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        tsconfigPaths(),
        viteCompression(),
    ],
    server: {
        port: 9900,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        exclude: ['node_modules', '**/*.cy.spec.tsx'],
        include: ['app/**/*.{spec,test}.{j,t}s?(x)'],
    },
    envPrefix: 'APP',
});

export default viteConfig;

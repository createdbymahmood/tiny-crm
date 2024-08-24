/// <reference types="vitest" />

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';

const getManualChunks = (id: string) => {
    if (!id.includes('node_modules')) return;
    return id.toString().split('node_modules/')[1].split('/')[0].toString();
};

const viteConfig = defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        tsconfigPaths(),
        viteCompression(),
        TanStackRouterVite(),
    ],
    server: {
        port: 9900,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        exclude: ['node_modules', '**/*.cy.spec.tsx'],
        include: ['src/**/*.{spec,test}.{j,t}s?(x)'],
    },
    envPrefix: 'APP',
    build: {
        rollupOptions: {
            output: {
                manualChunks: getManualChunks,
            },
        },
    },
});

export default viteConfig;

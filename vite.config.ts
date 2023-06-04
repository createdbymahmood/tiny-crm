/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';

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
    },
});

export default viteConfig;

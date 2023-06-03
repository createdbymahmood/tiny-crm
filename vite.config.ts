import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

const viteConfig = defineConfig({
    plugins: [react(), checker({ typescript: true }), tsconfigPaths()],
    server: {
        port: 9900,
    },
});

export default viteConfig;

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { version: '2023-05' }], // https://github.com/owlsdepartment/vite-plugin-babel/issues/24
                ],
            },
        })
    ],
    server: {
        open: true, // Auto-opens the browser on startup
    },
    "esbuild": {
        "target": "ES2020"
    }
});
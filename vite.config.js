import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', { version: '2023-05' }], // https://github.com/owlsdepartment/vite-plugin-babel/issues/24
                ],
            },
        }),
        mkcert()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: 'worldbuildingbible.io',
        open: true, // Auto-opens the browser on startup
    },
    esbuild: {
        target: "ES2020"
    },
    test: {
        environment: 'jsdom',
        globals: true
    }
});
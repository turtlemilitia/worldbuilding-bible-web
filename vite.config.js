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
        host: '0.0.0.0', // Listen to all addresses
        // open: true, // Auto-opens the browser on startup –– can't use it dockerized
        port: 5173,
        strictPort: true, // fails rather than trying another port if the port is in use
        https: false, // we have a proxy which deals with the https part of things
        // allow root domain and any subdomain of worldbuildingtome.io
        allowedHosts: ['.worldbuildingtome.io'],
        hmr: {
            protocol: 'wss',           // use secure WebSockets
            host: 'worldbuildingtome.io',
            clientPort: 443,          // client connects through your proxy on 443
        },
    },
    esbuild: {
        target: "ES2020"
    },
    test: {
        environment: 'jsdom',
        globals: true
    }
});
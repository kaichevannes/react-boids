import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { resolve } from 'path'
// import wasm from "vite-plugin-wasm";
// import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
        libInjectCss(),
        dts({
            tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
        }),
        // wasm(),
        // topLevelAwait(),
    ],
    server: {
        headers: {
            'Cross-Origin-Opener-Policy': 'same-origin',
            'Cross-Origin-Embedder-Policy': 'require-corp',
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            formats: ['es']
        },
        minify: false,
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            }
        }
    },
    worker: {
        format: 'es',
    }
})

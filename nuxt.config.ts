import { i18n } from './vite/plugins/i18n';
import { mdx } from './vite/plugins/mdx';

export default defineNuxtConfig({
    compatibilityDate: '2025-09-02',
    build: {
        transpile: ['@ikol/ui-kit'],
    },
    alias: {
        dayjs: './node_modules/dayjs/esm',
    },
    modules: [
        '@nuxtjs/device',
        '@nuxt/eslint',
    ],
    app: {
        head: {
            charset: 'utf-8',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' },
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', href: '/logo.svg', sizes: 'image/svg+xml' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap' },
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' },
            ],
        },
    },
    vite: {
        plugins: [
            i18n(),
            mdx(),
        ],
    },
    devtools: false,
});

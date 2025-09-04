import { i18n } from './vite/plugins/i18n';

export default defineNuxtConfig({
    compatibilityDate: '2025-09-02',
    build: {
        transpile: ['@ikol/ui-kit'],
    },
    alias: {
        dayjs: 'dayjs/esm',
    },
    modules: [
        '@nuxtjs/device'
    ],
    app: {
        head: {
            charset: 'utf-8',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: "any" },
                { rel: 'icon', href: '/logo.svg', sizes: "image/svg+xml" },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap' },
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' }
            ],
        },
    },
    vite: {
        plugins: [
            i18n()
        ],
    },
    devtools: false,
});

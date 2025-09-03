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
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap' },
                { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' }
            ],
        },
    },
    devtools: false,
});

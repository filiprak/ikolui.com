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
    devtools: false,
});

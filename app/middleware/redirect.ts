export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path == '/docs') {
        return navigateTo('/docs/getting-started')
    }
});


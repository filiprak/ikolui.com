import '#vue-router';

interface RouteMenuMeta {
    type: 'docs',
    section?: string,
    icon?: string,
    label: string,
}

declare module 'vue-router' {
    interface RouteMeta {
        menu?: RouteMenuMeta,
    }
}

declare module '#app' {
    interface PageMeta {
        menu?: RouteMenuMeta,
    }
}

export { }

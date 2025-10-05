import '#vue-router';

interface RouteMenuMeta {
    type: 'docs' | 'root',
    section?: string,
    icon?: string,
    label: string,
}

declare module 'vue-router' {
    interface RouteMeta {
        menu?: RouteMenuMeta,
        order?: number,
    }
}

declare module '#app' {
    interface PageMeta {
        menu?: RouteMenuMeta,
        order?: number,
    }
}

export { };

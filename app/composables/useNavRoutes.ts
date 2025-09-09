import type { RouteRecordNormalized } from "vue-router";

export default function useNavRoutes(type: 'docs') {
    const router = useRouter();
    const route = useRoute();

    const normalizePath = (path: string) => {
        return path.replace(/\/+$/, '') || '/';
    }

    const isActive = (check: RouteRecordNormalized) => {
        return normalizePath(route.path) === normalizePath(check.path);
    }

    const items = computed(
        () => router
            .getRoutes()
            .filter(i => i.meta.menu?.type === type)
            .sort((a, b) => {
                return (a.meta.order ?? 999999) - (b.meta.order ?? 999999);
            })
    );

    return {
        items,
        isActive,
    };
}
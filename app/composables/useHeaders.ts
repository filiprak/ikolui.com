export function useHeaders(el?: Ref<HTMLElement | undefined>) {
    const headers = useState<Array<{
        uid: number,
        id: string,
        level: number,
        text: string
    }>>('headers-on-page', () => []);

    const activeIds = useState<Set<string>>('headers-active', () => new Set());
    const observer = ref<IntersectionObserver>();

    const handleIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeIds.value.add(entry.target.id);
            } else {
                activeIds.value.delete(entry.target.id);
            }
        });
    };

    if (el) {
        onMounted(() => {
            observer.value = new IntersectionObserver(handleIntersect, {
                root: null,
                // rootMargin: '0px 0px -70% 0px',
                threshold: 0,
            });

            if (el.value)
                observer.value?.observe(el.value);
        });

        onUnmounted(() => {
            observer.value?.disconnect();
            observer.value = undefined;
        });
    }

    return {
        headers,
        active_headers: activeIds,
    };
}

import { ref, onMounted } from 'vue';

export function useLocalStorage<T>(key: string): Ref<T | undefined>;
export function useLocalStorage<T>(key: string, fallback: T): Ref<T>;
export function useLocalStorage<T>(key: string, fallback?: T): Ref<T | undefined> {
    const data = ref<T | undefined>(fallback);

    onMounted(() => {
        try {
            data.value = JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
        } catch (e) {
            data.value = fallback;
        }
    });

    if (import.meta.client) {
        watch(data, (v) => {
            localStorage.setItem(key, JSON.stringify(v));
        }, { deep: true });
    }

    return data as Ref<T | undefined>;
}

<template>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { CODEBLOCK } from '~/components/mdx/types';

const tab_cookie = useCookie<string | undefined>('code-tabs', { default: () => undefined });
const tabs = ref<string[]>([]);

provide(CODEBLOCK, { tabs, active: tab_cookie });

watch(tabs, (t) => {
    tab_cookie.value = (tab_cookie.value ?? t[0]);
}, { immediate: true, deep: true });
</script>

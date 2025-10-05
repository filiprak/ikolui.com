<template>
    <div>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { CODEBLOCK } from '~/components/mdx/types';
import Pre from './Pre.vue';

const children = useChildComponents(Pre);
const tabs = children.map(i => i.title || '');
const hash = simpleHash(JSON.stringify(tabs.sort()));
const tab_cookie = useCookie<string | undefined>(`codeblock-${hash}`, { default: () => tabs[0] });

if (tab_cookie.value && tabs.indexOf(tab_cookie.value) < 0) {
    tab_cookie.value = tabs[0];
}

provide(CODEBLOCK, { active: tab_cookie, tabs });
</script>

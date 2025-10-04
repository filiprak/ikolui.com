<template>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { CODEBLOCK } from '~/components/mdx/types';
import Pre from './Pre.vue';

const children = useChildComponents(Pre);
const tabs = children.map(i => i.title || '');
const tab_cookie = useCookie<string | undefined>('code-tabs', { default: () => tabs[0] });

provide(CODEBLOCK, { active: tab_cookie, tabs });
</script>

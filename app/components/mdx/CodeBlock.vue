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
const tab = useLocalStorage(`codeblock-${hash}`, tabs[0]);

provide(CODEBLOCK, { active: tab, tabs });
</script>

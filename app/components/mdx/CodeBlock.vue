<template>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { CODEBLOCK } from '~/components/mdx/types';

const tabs = ref<string[]>([]);
const active = ref<string>();

provide(CODEBLOCK, { tabs, active });
</script>

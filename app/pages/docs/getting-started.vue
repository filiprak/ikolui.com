<template>
    <Doc />
</template>
<script setup lang="ts">
import Doc from '@/content/docs/getting-started.mdx';

definePageMeta({
    menu: {
        type: 'docs',
        icon: 'rocket',
        label: '[[_Getting Started_]]'
    },
})
</script>

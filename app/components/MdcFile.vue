<template>
    <article class="prose">
        <MDCRenderer v-if="ast"
                     :body="ast.body"
                     :data="ast.data" />
    </article>
</template>
<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import MDCRenderer from '@nuxtjs/mdc/runtime/components/MDCRenderer.vue';

const props = defineProps<{ file: string }>();

async function loadMdc() {
    const md = await import(/* @vite-ignore */ `@/content/${props.file}.mdc?raw&time=${Date.now()}`).then(m => m.default);

    return await parseMarkdown(md);
}

const { data: ast } = await useAsyncData(props.file, async () => {
    return loadMdc();
});

if (import.meta.hot) {
    import.meta.hot.accept('@/content/' + props.file + '.mdc', () => {
        console.log('update')
    });
}
</script>

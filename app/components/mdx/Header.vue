<template>
    <component ref="el"
               :is="tag"
               :id="slug">
        <template v-if="level > 1">
            <a :href="`#${slug}`">
                <slot></slot>
            </a>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </component>
</template>
<script setup lang="ts">
import { slugify } from '@ikol/ui-kit/utils';

const props = defineProps<{
    level: number,
}>();

const el = ref<HTMLElement>();
const text = useChildText();
const tag = computed(() => `h${props.level}`);
const slug = computed(() => slugify(text));

const { headers } = useHeaders(el);

if (import.meta.server) {
    const uid = getCurrentInstance()?.uid!;

    const conf = {
        uid,
        id: slug.value,
        level: props.level,
        text,
    };
    headers.value.push(conf);
}
</script>

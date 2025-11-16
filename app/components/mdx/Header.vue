<template>
    <component :is="tag"
               :id="slug"
               ref="el">
        <template v-if="level > 1">
            <a :href="`#${slug}`">
                <slot/>
            </a>
        </template>
        <template v-else>
            <slot/>
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
    const uid = getCurrentInstance()?.uid || -1;

    const conf = {
        uid,
        id: slug.value,
        level: props.level,
        text,
    };
    headers.value.push(conf);
}
</script>

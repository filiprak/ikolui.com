<template>
    <component :is="tag"
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

const text = useChildText();
const tag = computed(() => `h${props.level}`);
const slug = computed(() => slugify(text));
</script>

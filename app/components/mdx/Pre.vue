<template>
    <div :class="$style.pre">
        <div v-if="title"
             :class="$style.header"
             class="ik-px-7 ik-py-2">
            <IkIcon icon="code"
                    :class="$style.icon" />
            <span>{{ title }}</span>
        </div>
        <div :class="$style.actions">
            <CopyBtn :text="code || ''" />
        </div>
        <Pre v-bind="$attrs" />
    </div>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { IkIcon } from '@ikol/ui-kit/components/IkIcon';
import CopyBtn from '~/components/utils/CopyBtn.vue';

defineProps<{
    title?: string,
    code?: string,
}>();

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const Pre = {
    render() {
        return h('pre', slots.default?.())
    }
}

</script>
<style lang="css" module>
.pre {
    position: relative;
}

.actions {
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--s-4);
}

.pre pre {
    margin-top: 0 !important;
}

.pre:has(.header) pre {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.icon {
    color: var(--content-neutral-light-default);
}

.header {
    display: flex;
    column-gap: var(--s-6);
    color: var(--content-neutral-strong-default);
    align-items: center;
    height: 44px;
    font-size: var(--text-sm);
    border: 1px solid var(--border-neutral-light-default);
    border-bottom: none;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    /* background-color: rgb(from var(--background-neutral-strong-default) calc(r * 0.7) calc(g * 0.7) calc(b * 0.7)); */
    background-color: rgba(from var(--background-neutral-light-default) r g b / 0.4);
}
</style>
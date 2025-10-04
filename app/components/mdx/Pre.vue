<template>
    <div :class="$style.pre">
        <Preview :class="$style.preview" />
        <div :class="$style.wrapper">
            <div v-if="title"
                 :class="$style.header"
                 class="ik-px-7 ik-py-2">
                <IkIcon :icon="icon"
                        size_px="16"
                        :class="$style.icon" />
                <span>{{ title }}</span>
            </div>
            <div :class="$style.actions">
                <CopyBtn :text="code || ''" />
            </div>
            <Pre v-bind="$attrs" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { IkIcon } from '@ikol/ui-kit/components/IkIcon';
import CopyBtn from '~/components/utils/CopyBtn.vue';

const props = defineProps<{
    title?: string,
    lang?: string,
    code?: string,
}>();

defineOptions({ inheritAttrs: false });

const slots = useSlots();

const Pre = {
    render() {
        const vnodes = slots.default?.() || [];
        return h('pre', vnodes[0]);
    }
}

const Preview = {
    render() {
        const vnodes = slots.default?.() || [];
        return vnodes[1];
    }
}

const icon = computed(() => {
    if (props.lang == 'vue') {
        return 'vuejs:brands';
    } else if (props.lang == 'js' || props.lang == 'ts') {
        return 'js:brands';
    } else if (props.lang == 'sh') {
        return 'terminal';
    } else {
        return 'code';
    }
});

</script>
<style lang="css" module>
.wrapper {
    position: relative;
}

.actions {
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--s-4);
}

.preview {
    padding: var(--s-9);
    background-color: var(--background-neutral-strong-default);
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    border: 1px solid var(--border-neutral-light-default);
    border-bottom: none;
}

:global(.ik-theme--dark) .preview {
    background-color: #111;
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
    background-color: rgba(from var(--background-neutral-light-default) r g b / 0.4);
}

.pre:has(.preview) .header {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
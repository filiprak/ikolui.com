<template>
    <div :class="$style.pre">
        <IkListItem v-if="title"
                    :class="$style.header"
                    class="ik-px-7 ik-py-2">
            {{ title }}
            <template #append>
                <CopyBtn :text="code || ''" />
            </template>
        </IkListItem>
        <Pre v-bind="$attrs" />
    </div>
</template>
<script setup lang="ts">
import { IkListItem } from '@ikol/ui-kit/components/IkList';
import { h } from 'vue';
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
.pre pre {
    margin-top: 0 !important;
}

.pre pre {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.header {
    border: 1px solid var(--border-neutral-light-default);
    border-bottom: none;
    border-top-left-radius: var(--radius-3);
    border-top-right-radius: var(--radius-3);
    /* background-color: rgb(from var(--background-neutral-strong-default) calc(r * 0.7) calc(g * 0.7) calc(b * 0.7)); */
    background-color: rgba(from var(--background-neutral-light-default) r g b / 0.2);
}
</style>
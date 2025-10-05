<template>
    <div :class="$style.wrapper">
        <ClientOnly>
            <IkButton
icon="sun:regular"
                      class="ik-mr-1"
                      ghost
                      size="xs"
                      :active="!theme.is_dark.value"
                      circle
                      @click="theme.is_dark.value = false"/>
            <IkButton
icon="moon:regular"
                      size="xs"
                      ghost
                      :active="theme.is_dark.value"
                      circle
                      @click="theme.is_dark.value = true"/>
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">
import { IkButton } from '@ikol/ui-kit/components/IkButton';
import { useTheme } from '@ikol/ui-kit/composables/theme';

const theme = useTheme();
</script>
<style lang="css" module>
.wrapper {
    padding: var(--s-1);
    border: 1px solid var(--border-neutral-regular-default);
    border-radius: var(--radius-full);
    height: var(--f-input-h-sm);
    min-width: 68px;
}
</style>
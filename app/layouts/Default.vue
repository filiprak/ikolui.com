<template>
    <IkApp>
        <Nav />
        <div style="position: relative;">
            <div :class="$style.gradient"></div>
        </div>
        <IkAppContent :class="$style.content">
            <slot />
        </IkAppContent>
        <Footer />
    </IkApp>
</template>
<script lang="ts" setup>
import { IkApp, IkAppContent } from '@ikol/ui-kit/components/IkApp';

useHead({
    style: [
        {
            'data-vars': '',
            innerHTML: `
                :root {
                    --layout-w: 1400px;
                    --layout-pad: var(--s-8);
                    --nav-h: 64px;
                    --nav-z-index: 900;
                }
            `,
        },
    ],
});
</script>
<style lang="css" module>
.gradient {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(to bottom, var(--background-primary-strong-default), transparent);
    opacity: .25;
    pointer-events: none;
    border-top: 2px solid var(--border-primary-light-default);
}

.content {
    min-height: calc(100svh - 300px);
    z-index: 2;
}
</style>

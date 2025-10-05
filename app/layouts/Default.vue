<template>
    <IkApp>
        <Nav />
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
.content {
    min-height: calc(100svh - 300px);
}
</style>

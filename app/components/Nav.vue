<template>
    <nav :class="$style.nav">
        <div :class="$style.bg"></div>
        <div :class="$style.wrapper">
            <IkListItem class="ik-pa-0 ik-py-5"
                        inline>
                <template #prepend>
                    <IkImage src="/logo.svg"
                             :size="32" />
                </template>
                <span class="ik-text--xl ik-text--bold">IKOL UI</span>
            </IkListItem>
            <div :class="$style.items">
                <div>Components</div>
                <div>FAQs</div>
                <div>Resources</div>
                <div>Blog</div>
            </div>
            <div :class="$style.actions">
                <IkButtonGroup>
                    <IkButton ghost>
                        Sign In
                    </IkButton>
                    <IkButton filled
                              design="primary">
                        Preview
                    </IkButton>
                </IkButtonGroup>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { IkButton } from '@ikol/ui-kit/components/IkButton';
import { IkButtonGroup } from '@ikol/ui-kit/components/IkButtonGroup';
import { IkImage } from '@ikol/ui-kit/components/IkImage';
import { IkListItem } from '@ikol/ui-kit/components/IkList';

</script>
<style lang="css" module>
.nav {
    position: relative;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    height: 60px;
    border-bottom: 1px solid var(--border-neutral-light-default);
}

.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: var(--s-7);
    padding: 0 var(--layout-pad);
    max-width: var(--layout-w);
    width: 100%;
}

.items {
    display: block;
}

.items > div {
    display: inline-block;
    font-weight: var(--text-semibold);
    padding: var(--s-8);
    height: 60px;
}

.bg {
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    backdrop-filter: saturate(150%) blur(8px);
}

.actions {}
</style>
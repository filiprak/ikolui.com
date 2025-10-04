<template>
    <nav :class="$style.nav">
        <div :class="$style.bg"></div>
        <div :class="$style.wrapper">
            <IkListItem class="ik-pa-0 ik-py-5"
                        link="/"
                        no_hover
                        inline>
                <template #prepend>
                    <IkImage src="/logo.svg"
                             :size="32" />
                </template>
                <span class="ik-text--xl ik-text--bold">ikol UI</span>
            </IkListItem>
            <div :class="$style.items"
                 class="hide-mobile">
                <NuxtLink to="/">[[_Home_]]</NuxtLink>
                <NuxtLink to="/docs">[[_Documentation_]]</NuxtLink>
            </div>
            <div :class="$style.actions">
                <ThemeSwitch />
                <IkButtonGroup class="hide-mobile">
                    <IkButton filled
                              round
                              tag="a"
                              href="/docs"
                              design="primary">
                        [[_Get Started_]]
                    </IkButton>
                </IkButtonGroup>
                <IkButton :class="$style.burger"
                          class="hide-desktop"
                          round
                          outline>
                    <div></div>
                    <div></div>
                    <div></div>
                </IkButton>
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
    z-index: 900;
    position: relative;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0;
    height: var(--nav-h);
    border-bottom: 1px solid rgba(from var(--border-neutral-light-default) r g b / 0.4);
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

.items > * {
    display: inline-block;
    font-weight: var(--text-semibold);
    padding: var(--s-8);
    height: 60px;
    text-decoration: none !important;
    color: var(--content-neutral-strong-default);
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

.actions {
    display: grid;
    gap: var(--s-7);
    grid-template-columns: max-content max-content;
}

.burger {
    flex-direction: column;
    gap: 5px;
}

.burger div {
    width: 16px;
    height: 1px;
    background-color: currentColor;
}
</style>
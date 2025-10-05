<template>
    <nav :class="$style.nav">
        <div :class="$style.bg" />
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
                <NuxtLink v-for="item in items"
                          :to="item.path">
                    {{ item.label }}
                </NuxtLink>
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
                <IkButton :class="{ [$style.burger]: true, [$style['burger-open']]: burger_open }"
                          class="hide-desktop"
                          round
                          outline
                          @click="burger_open = !burger_open">
                    <div />
                    <div />
                    <div />
                </IkButton>
                <div v-if="burger_open"
                     :class="$style['mobile-items']">
                    <div class="ik-py-10">
                        <NuxtLink v-for="item in items"
                                  :to="item.path"
                                  @click="burger_open = false">
                            {{ item.label }}
                        </NuxtLink>
                    </div>
                    <div class="ik-pa-7">
                        <IkButton round
                                  size="lg"
                                  append_icon="times"
                                  @click="burger_open = false">
                            [[_Close_]]
                        </IkButton>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { IkButton } from '@ikol/ui-kit/components/IkButton';
import { IkButtonGroup } from '@ikol/ui-kit/components/IkButtonGroup';
import { IkImage } from '@ikol/ui-kit/components/IkImage';
import { IkListItem } from '@ikol/ui-kit/components/IkList';
import { useBodyScroll } from '@ikol/ui-kit/composables/body_scroll';

const items = [
    { path: '/', label: '[[_Home_]]' },
    { path: '/docs', label: '[[_Documentation_]]' },
];

const burger_open = ref(false);
const scroll = useBodyScroll();

watch(burger_open, (v) => {
    scroll.is_locked.value = v;
})

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

.burger-open div:first-child {
    transform: translateY(3px) rotate(45deg);
}

.burger-open div:nth-child(2) {
    display: none;
}

.burger-open div:last-child {
    transform: translateY(-3px) rotate(-45deg);
}

.mobile-items {
    z-index: 900;
    position: fixed;
    top: var(--nav-h);
    font-size: var(--text-lg);
    left: 0;
    bottom: 0;
    right: 0;
    background-color: var(--bg-color);
    display: grid;
    grid-template-rows: 1fr min-content;
    justify-content: center;
    text-align: center;
}

.mobile-items > div:first-child > * {
    display: block;
    text-align: center;
    font-weight: var(--text-semibold);
    padding: var(--s-8);
    height: 60px;
    text-decoration: none !important;
    color: var(--content-neutral-strong-default);
}
</style>
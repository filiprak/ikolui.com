<template>
    <Section>
        <div :class="$style.wrapper">
            <aside :class="{ [$style.left]: true, 'hide-mobile': !menu_open }">
                <DocsSideNav @navigate="menu_open = false" />
            </aside>
            <div :class="$style.center">
                <IkFlex :class="$style.top"
                        justify_start
                        grow_and_fixed>
                    <Breadcrumb />
                    <IkButton class="hide-desktop ik-ml-7"
                              outline
                              round
                              :icon="menu_open ? 'times' : 'chevron-left'"
                              @click="menu_open = !menu_open">
                        [[_Menu_]]
                    </IkButton>
                </IkFlex>
                <NuxtPage />
            </div>
            <div :class="$style.right"
                 class="hide-mobile" />
        </div>
    </Section>
</template>
<script setup lang="ts">
import { IkButton } from '@ikol/ui-kit/components/IkButton';
import { IkFlex } from '@ikol/ui-kit/components/IkFlex';
import { useBodyScroll } from '@ikol/ui-kit/composables/body_scroll';

definePageMeta({
    menu: {
        type: 'root',
        label: '[[_Docs_]]',
    },
});

const menu_open = ref(false);
const scroll = useBodyScroll();

watch(menu_open, (v) => {
    scroll.is_locked.value = v;
});
</script>
<style lang="css" module>
.wrapper {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
}

:global(.mobile) .wrapper {
    padding-top: var(--s-7);
}

.left {
    position: sticky;
    top: var(--nav-h);
    padding: var(--s-8) var(--s-8) var(--s-8) 0;
    max-height: calc(100vh - var(--nav-h));
    overflow-y: auto;
    grid-column: span 2;
}

:global(.mobile) .left {
    position: fixed;
    z-index: var(--nav-z-index);
    top: calc(var(--nav-h) + 60px);
    left: 0;
    bottom: 0;
    right: 0;
    padding: var(--s-6);
    background-color: var(--bg-color);
    display: grid;
    grid-template-rows: 1fr min-content;
}

.center {
    grid-column: span 6;
}

:global(.mobile) .center {
    grid-column: span 10;
}

.right {
    grid-column: span 2;
}

:global(.mobile) .top {
    z-index: var(--nav-z-index);
    position: fixed;
    top: calc(var(--nav-h) - 1px);
    left: 0;
    right: 0;
    padding: var(--s-6) var(--layout-pad);
    backdrop-filter: saturate(150%) blur(8px);
    border-bottom: 1px solid rgba(from var(--border-neutral-light-default) r g b / 0.4);
}
</style>

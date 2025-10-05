<template>
    <Section>
        <div :class="$style.wrapper">
            <aside :class="$style.left"
                   class="hide-mobile">
                <DocsSideNav />
            </aside>
            <div :class="$style.center">
                <Breadcrumb />
                <NuxtPage />
            </div>
            <div :class="$style.right" />
        </div>
    </Section>
</template>
<script setup lang="ts">
definePageMeta({
    menu: {
        type: 'root',
        label: '[[_Docs_]]',
    },
});
</script>
<style lang="css" module>
.wrapper {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
}

.left {
    position: sticky;
    top: var(--nav-h);
    padding: var(--s-8) var(--s-8) var(--s-8) 0;
    max-height: calc(100vh - var(--nav-h));
    overflow-y: auto;
    grid-column: span 2;
}

.center {
    grid-column: span 8;
}

.right {}
</style>

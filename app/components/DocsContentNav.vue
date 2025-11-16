<template>
    <nav>
        <NuxtLink v-for="header in headers"
                  no-prefetch
                  :to="`#${header.id}`"
                  custom
                  :key="header.uid">
            <template #default="{ href, isActive }">
                <a class="ik-py-3 ik-pr-5"
                   :class="{ [$style.item]: true, [$style.top]: header.level == 1 }"
                   :href="href"
                   :style="{ paddingLeft: `${(header.level) * 16}px` }">
                    {{ header.text }}
                </a>
            </template>
        </NuxtLink>
    </nav>
</template>
<script setup lang="ts">
const { headers } = useHeaders();
</script>
<style lang="css" module>
.item {
    display: block;
    text-decoration: none;
    color: var(--content-neutral-light-default);
    border-left: 1px solid transparent;
}

.item:hover {
    color: var(--content-neutral-regular-hover);
    border-left: 1px solid var(--border-neutral-regular-hover);
}

.item.top {
    font-weight: var(--text-semibold);
    color: var(--content-neutral-strong-default);
}
</style>
<template>
    <nav>
        <NuxtLink v-for="header in headers"
                  :key="header.uid"
                  no-prefetch
                  :to="`#${header.id}`"
                  custom>
            <template #default="{ href }">
                <a class="ik-py-3 ik-pr-5"
                   :class="{
                    [$style.item]: true,
                    [$style.top]: header.level == 1,
                    [$style.active]: active_headers.has(header.id)
                }"
                   :href="href"
                   :style="{ paddingLeft: `${(header.level) * 16}px` }">
                    {{ header.text }}
                </a>
            </template>
        </NuxtLink>
    </nav>
</template>
<script setup lang="ts">
const { headers, active_headers } = useHeaders();
</script>
<style lang="css" module>
.item {
    display: block;
    text-decoration: none;
    color: var(--content-neutral-light-default);
    border-left: 1px solid transparent;
}

.item.active,
.item:hover {
    color: var(--content-neutral-regular-hover);
    border-left: 1px solid var(--border-neutral-regular-hover);
}

.item.top {
    font-weight: var(--text-semibold);
    color: var(--content-neutral-strong-default);
}
</style>
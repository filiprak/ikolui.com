<template>
    <nav>
        <NuxtLink v-for="header in headers"
                  no-prefetch
                  :to="`#${header.id}`"
                  custom
                  :key="header.uid">
            <template #default="{ href, isActive }">
                <a class="ik-py-3 ik-pr-5"
                   :class="$style.item"
                   :href="href"
                   :style="{ paddingLeft: `${(header.level - 1) * 16}px` }">
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
    
}
</style>
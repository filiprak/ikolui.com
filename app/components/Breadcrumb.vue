<template>
    <nav :class="$style.wrapper">
        <ol :class="$style.list">
            <li v-for="(crumb, index) in crumbs"
                :key="index"
                :class="$style.item">
                <NuxtLink :to="crumb.to"
                          custom
                          :class="[$style.link, { [$style.current]: index === crumbs.length - 1 }]">
                    <template #default="{ href, isActive }">
                        <IkLink :href="href">{{ crumb.text }}</IkLink>
                    </template>
                </NuxtLink>
                <span v-if="index < crumbs.length - 1"
                      :class="$style.separator">
                    <IkIcon icon="chevron-right"></IkIcon>
                </span>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
import { IkIcon } from '@ikol/ui-kit/components/IkIcon'
import { IkLink } from '@ikol/ui-kit/components/IkLink'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const crumbs = computed(() => {
    return route.matched.map((m, i) => {
        return {
            text: m.meta.menu?.label,
            to: m.path,
        }
    })
})
</script>

<style module>
.wrapper {
    display: block;
}

.list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
}

.item {
    display: inline-flex;
    align-items: center;
}

.link {
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.separator {
    margin: 0 var(--s-5);
}

.current {
    font-weight: 600;
}

.text {
    max-width: 18ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
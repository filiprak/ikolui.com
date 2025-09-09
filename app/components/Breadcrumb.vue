<template>
    <nav :class="$style.wrapper">
        <ol :class="$style.list">
            <li v-for="(crumb, index) in crumbs"
                :key="index"
                :class="$style.item">
                <NuxtLink :to="crumb.to"
                          custom>
                    <template #default="{ href, isActive }">
                        <IkLink :href="href"
                                :class="[$style.link, { [$style.current]: index === crumbs.length - 1 }]">
                            {{ crumb.text }}
                        </IkLink>
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
    color: var(--content-neutral-light-default);
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
    font-size: var(--text-sm);
    color: var(--content-neutral-light-default);
}

.separator {
    margin: 0 var(--s-6);
}

.current {
    font-weight: var(--text-semibold);
    color: var(--content-neutral-strong-default);
}
</style>
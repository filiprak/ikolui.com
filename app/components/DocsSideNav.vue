<template>
    <div>
        <div v-for="section in sections">
            <IkListItem v-if="section.label"
                        @click="onSectionClick(section)"
                        :class="[$style.item]">
                <template #prepend
                          v-if="section.icon">
                    <IkIcon :icon="section.icon"
                            size_px="18" />
                </template>
                {{ section.label }}
                <template #append
                          v-if="section.icon">
                    <IkIcon :icon="section.is_expanded ? 'chevron-up' : 'chevron-down'" />
                </template>
            </IkListItem>
            <template v-if="section.is_root || section.is_expanded">
                <NuxtLink v-for="page in section.items"
                          :to="page.path"
                          custom>
                    <template #default="{ href, isActive }">
                        <IkListItem :link="href"
                                    :class="[
                                        $style.item, {
                                            [$style.active]: isActive,
                                            [$style.child]: !!section.label
                                        }
                                    ]">
                            <template #prepend
                                      v-if="page.meta.menu?.icon">
                                <IkIcon :icon="page.meta.menu?.icon"
                                        size_px="18" />
                            </template>
                            {{ page.meta.menu?.label }}
                        </IkListItem>
                    </template>
                </NuxtLink>
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter, type RouteRecordNormalized } from 'vue-router';
import { computed } from 'vue';
import { IkListItem } from '@ikol/ui-kit/components/IkList';
import { IkIcon } from '@ikol/ui-kit/components/IkIcon';

interface Section {
    id: string,
    icon?: string,
    label?: string,
    is_root?: boolean,
    is_expanded?: boolean,
    items: RouteRecordNormalized[],
}

function onSectionClick(section: Section) {
    console.log(section)
    section.is_expanded = !section.is_expanded
}

const router = useRouter();
const route = useRoute();

const nav_pages = computed(
    () => router
        .getRoutes()
        .filter(i => i.meta.menu?.type === 'docs')
);

const sections = ref<Section[]>([
    {
        id: 'intro',
        is_root: true,
        items: nav_pages.value.filter(i => !i.meta.menu?.section || i.meta.menu.section == 'intro')
    },
    {
        id: 'components',
        icon: 'cubes',
        label: '[[_Components_]]',
        items: nav_pages.value.filter(i => i.meta.menu?.section == 'components')
    },
]);

const openActiveSection = () => {
    sections.value
        .filter(section => section.items.some(item => item.path === route.path))
        .forEach(i => {
            i.is_expanded = true;
        })
};

watch(
    () => route.path,
    () => openActiveSection(),
    { immediate: true }
);
</script>
<style lang="css" module>
.item {
    border-radius: var(--radius-4);
    padding: var(--s-3) var(--s-6);
    margin-bottom: var(--s-2);
    color: var(--content-neutral-light-default);
}

.item:not(.active) :global(.ik-icon) {
    opacity: 0.5;
}

.item.child {
    color: var(--content-neutral-weak-default);
    margin-left: var(--s-10);
}

.item.active {
    color: var(--content-neutral-strong-default);
}
</style>
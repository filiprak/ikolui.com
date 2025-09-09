<template>
    <div>
        <div v-for="section in sections">
            <IkListItem v-if="section.label"
                        @click="onSectionClick(section)"
                        :class="[$style.item]">
                <template #prepend
                          v-if="section.icon">
                    <div :class="$style.prepend">
                        <IkIcon :icon="section.icon"
                                size_px="18" />
                    </div>
                </template>
                {{ section.label }}
                <template #append
                          v-if="section.icon">
                    <IkIcon :icon="section.is_expanded ? 'chevron-down' : 'chevron-right'" />
                </template>
            </IkListItem>
            <div v-if="section.is_root || section.is_expanded">
                <NuxtLink v-for="page in section.items"
                          :to="page.path"
                          custom>
                    <template #default="{ href, isActive }">
                        <IkListItem :link="href"
                                    :active="isActive"
                                    :class="[
                                        $style.item, {
                                            [$style.active]: isActive,
                                            [$style.child]: !!section.label
                                        }
                                    ]">
                            <template #prepend
                                      v-if="page.meta.menu?.icon">
                                <div :class="$style.prepend">
                                    <IkIcon :icon="page.meta.menu?.icon"
                                            size_px="18" />
                                </div>
                            </template>
                            {{ page.meta.menu?.label }}
                        </IkListItem>
                    </template>
                </NuxtLink>
            </div>
            <Hr v-if="section.is_root"
                class="ik-my-5" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { type RouteRecordNormalized } from 'vue-router';
import { IkListItem } from '@ikol/ui-kit/components/IkList';
import { IkIcon } from '@ikol/ui-kit/components/IkIcon';
import useNavRoutes from '~/composables/useNavRoutes';

interface Section {
    id: string,
    icon?: string,
    label?: string,
    is_root?: boolean,
    is_expanded?: boolean,
    items: RouteRecordNormalized[],
}

function onSectionClick(section: Section) {
    section.is_expanded = !section.is_expanded
}

const route = useRoute();

const { items, isActive } = useNavRoutes('docs');

const sections = ref<Section[]>([
    {
        id: 'intro',
        is_root: true,
        items: items.value.filter(i => !i.meta.menu?.section || i.meta.menu.section == 'intro')
    },
    {
        id: 'components',
        icon: 'cubes',
        label: '[[_Components_]]',
        items: items.value.filter(i => i.meta.menu?.section == 'components')
    },
]);

const openActiveSection = () => {
    sections.value
        .filter(section => section.items.some(item => isActive(item)))
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

.prepend {
    width: 24px;
}

.item:not(.active) :global(.ik-icon) {
    opacity: 0.5;
}

.item.child {
    color: var(--content-neutral-light-default);
    margin-left: var(--s-10);
}

.item.active {
    color: var(--content-neutral-strong-default);
}
</style>
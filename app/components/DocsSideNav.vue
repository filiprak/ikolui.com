<template>
    <nav>
        <div v-for="section in sections"
             :key="section.id">
            <IkListItem v-if="section.label"
                        :class="[$style.item]"
                        @click="onSectionClick(section)">
                <template v-if="section.icon"
                          #prepend>
                    <div :class="$style.prepend">
                        <IkIcon :icon="section.icon"
                                size_px="18" />
                    </div>
                </template>
                {{ section.label }}
                <template v-if="section.icon"
                          #append>
                    <IkIcon :icon="section.is_expanded ? 'chevron-down' : 'chevron-right'" />
                </template>
            </IkListItem>
            <div v-if="section.is_root || section.is_expanded">
                <template v-for="(page, idx) in section.items"
                          :key="page.path">
                    <div v-if="page.meta.menu?.subsection !== section.items[idx - 1]?.meta.menu?.subsection"
                         :class="[$style.item, $style.subsection]">
                        {{ subsections[page.meta.menu?.subsection || 'base'] }}
                    </div>
                    <NuxtLink :to="page.path"
                              custom
                              :prefetch-on="{ visibility: false, interaction: true }"
                              @click="emit('navigate')">
                        <template #default="{ href, isActive: active }">
                            <IkListItem :link="href"
                                        :active="active"
                                        :class="[
                                            $style.item, {
                                                [$style.active]: active,
                                                [$style.child]: !!section.label
                                            }
                                        ]">
                                <template v-if="page.meta.menu?.icon"
                                          #prepend>
                                    <div :class="$style.prepend">
                                        <IkIcon :icon="page.meta.menu?.icon"
                                                size_px="18" />
                                    </div>
                                </template>
                                {{ page.meta.menu?.label }}
                            </IkListItem>
                        </template>
                    </NuxtLink>
                </template>
            </div>
            <Hr v-if="section.is_root"
                class="ik-my-5" />
        </div>
    </nav>
</template>
<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router';
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
    section.is_expanded = !section.is_expanded;
}

const route = useRoute();
const emit = defineEmits<{
    (e: 'navigate'): void,
}>();

const { items, isActive } = useNavRoutes('docs');

const subsections: Record<string, string> = {
    inputs: '[[_Inputs_]]',
    form: '[[_Form_]]',
    data: '[[_Data display_]]',
    feedback: '[[_Feedback_]]',
    media: '[[_Media_]]',
    navigation: '[[_Navigation_]]',
    layout: '[[_Layout_]]',
    utils: '[[_Utilities_]]',
};

const sections = ref<Section[]>([
    {
        id: 'intro',
        is_root: true,
        items: items.value.filter(i => !i.meta.menu?.section || i.meta.menu.section == 'intro'),
    },
    {
        id: 'components',
        icon: 'cubes',
        label: '[[_Components_]]',
        items: items.value.filter(i => i.meta.menu?.section == 'components'),
        is_expanded: true,
    },
]);

const openActiveSection = () => {
    sections.value
        .filter(section => section.items.some(item => isActive(item)))
        .forEach(i => {
            i.is_expanded = true;
        });
};

watch(
    () => route.path,
    () => openActiveSection(),
    { immediate: true },
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
    margin-left: var(--s-11);
}

.item.active {
    color: var(--content-neutral-strong-default);
}

.item.subsection {
    color: var(--content-neutral-weak-default);
    font-size: var(--text-xs);
    margin-left: var(--s-10);
}
</style>
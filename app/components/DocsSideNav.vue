<template>
    <div>
        <div v-for="page in nav_pages">
            <NuxtLink :to="page.path"
                      custom>
                <template #default="{ href }">
                    <IkListItem :link="href">
                        <template #prepend>
                            <IkIcon :icon="page.meta.menu?.icon" />
                        </template>
                        {{ page.meta.menu?.label }}
                    </IkListItem>
                </template>
            </NuxtLink>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { IkListItem } from '@ikol/ui-kit/components/IkList';
import { IkIcon } from '@ikol/ui-kit/components/IkIcon';

const router = useRouter();
const nav_pages = computed(() => router.getRoutes().filter(i => i.meta.menu?.type === 'docs'));

</script>
<template>
    <NuxtLayout>
        <IkApp>
            <Nav />
            <IkAppContent>
                <NuxtPage />
            </IkAppContent>
        </IkApp>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { IkApp, IkAppContent } from '@ikol/ui-kit/components/IkApp';
import { useSSRContext } from '@ikol/ui-kit/composables/globals';
import { useTheme } from '@ikol/ui-kit/composables/theme';

const theme = useTheme();
const context = useSSRContext();

theme.is_dark.value = true;

const head = computed(() => {
    const styles = [...(context?.inline_styles.entries() || [])]
        .map(([id, { css }]) => {
            return { [`data-${id}`]: '', innerHTML: css, };
        });

    styles.push({
        'data-vars': '',
        innerHTML: `
            :root {
                --layout-w: 1400px;
                --layout-pad: var(--s-8);
            }
        `,
    });

    return {
        style: styles,
        htmlAttrs: {
            class: Object
                .entries(theme.css_classes.value)
                .filter((i) => i[1])
                .map(i => i[0]),
        }
    };
});

useHead(head);

</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script lang="ts" setup>
import './styles/globals.css';
import './styles/utils.css';
import './styles/mdx.css';
import { useSSRContext } from '@ikol/ui-kit/composables/globals';
import { provideTheme, IkThemeType } from '@ikol/ui-kit/composables/theme';

const theme = provideTheme({
    type: IkThemeType.DARK,
});

const context = useSSRContext();

const head = computed(() => {
    const styles = [...(context?.inline_styles.entries() || [])]
        .map(([id, { css }]) => {
            return { [`data-${id}`]: '', innerHTML: css, };
        });

    return {
        style: styles,
        titleTemplate: (title?: string) => {
            return title ? `${title} — IKOL UI` : `IKOL UI — [[_Build Stunning UI's, Faster._]]`;
        },
        htmlAttrs: {
            class: Object
                .entries(theme.css_classes.value)
                .filter((i) => i[1])
                .map(i => i[0]),
        },
        meta: [
            { name: 'color-scheme', content: theme.is_dark.value ? 'dark' : 'light' },
        ],
    };
});

useHead(head);
</script>

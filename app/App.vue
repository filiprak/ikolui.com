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
import { IkThemeType, THEME_SYMBOL, createTheme } from '@ikol/ui-kit/composables/theme';
import { DEVICE_SYMBOL, createDevice } from '@ikol/ui-kit/composables/device';

const theme_cookie = useCookie<'light' | 'dark'>('theme', { default: () => 'dark' });
const context = useSSRContext();
const theme = createTheme({ type: theme_cookie.value == 'dark' ? IkThemeType.DARK : IkThemeType.LIGHT });
const device = createDevice();

watch(() => theme.is_dark.value, (is_dark) => {
    theme_cookie.value = is_dark ? 'dark' : 'light';
});

provide(THEME_SYMBOL, theme);
provide(DEVICE_SYMBOL, device);

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

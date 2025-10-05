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
import { THEME_SYMBOL, createTheme } from '@ikol/ui-kit/composables/theme';
import { DEVICE_SYMBOL, createDevice } from '@ikol/ui-kit/composables/device';

const context = useSSRContext();
const theme = createTheme();
const device = createDevice();

provide(THEME_SYMBOL, theme);
provide(DEVICE_SYMBOL, device);

useHead(computed(() => {
    const styles = [...(context?.inline_styles.entries() || [])]
        .map(([id, { css }]) => {
            return { [`data-${id}`]: '', innerHTML: css };
        });

    return {
        style: styles,
        titleTemplate: (title?: string) => {
            return title ? `${title} — IKOL UI` : 'IKOL UI — [[_Build Stunning UI\'s, Faster._]]';
        },
        script: [
            `let theme = localStorage.getItem("ik-theme-pub-active");
             let meta = document.createElement('meta');
             theme = ["light", "dark"].indexOf(theme) < 0 ? "dark" : theme;
             document.documentElement.classList.toggle("ik-theme", true);
             document.documentElement.classList.toggle("ik-theme--" + theme, true);
             document.documentElement.classList.toggle("ik-theme--" + theme, true);
             meta.name = 'color-scheme';
             meta.content = theme;
             document.head.appendChild(meta);`,
        ],
        meta: [
            { name: 'color-scheme', content: theme.is_dark.value ? 'dark' : 'light' },
        ],
    };
}));
</script>

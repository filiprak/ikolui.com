<template>
    <NuxtLayout>
        <IkApp>
            <Nav />
            <IkAppContent :class="$style.content">
                <NuxtPage />
            </IkAppContent>
            <Footer />
        </IkApp>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import './styles/utils.css';
import './styles/mdx.css';
import '@wooorm/starry-night/style/dark';
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
        titleTemplate: (title?: string) => {
            return title ? `${title} — IKOL UI` : `IKOL UI — [[_Build Stunning UI's, Faster._]]`;
        },
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
<style lang="css" module>
.content {
    min-height: calc(100svh - 300px);
}
</style>
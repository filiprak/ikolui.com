<template>
    <NuxtLayout>
        <IkApp>
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

const styles = [...(context?.inline_styles.entries() || [])]
    .map(([id, { css }]) => {
        return { id, innerHTML: css, };
    });

useHead({
    style: styles,
    htmlAttrs: {
        class: Object.entries(theme.css_classes.value).filter((i) => i[1]).map(i => i[0]),
    },
});
</script>
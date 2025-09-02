import { createIkolUI } from '@ikol/ui-kit';
import { provideConfig } from '@ikol/ui-kit/composables/globals';

provideConfig({
    SSR: import.meta.server,
});

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(
        createIkolUI({
            config: {
                SSR: import.meta.server,
            },
        })
    );
});


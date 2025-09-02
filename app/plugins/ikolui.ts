import { createIkolUI } from '@ikol/ui-kit';
import { provideConfig } from '@ikol/ui-kit/composables/globals';

provideConfig({
    SSR: import.meta.server,
});

export default defineNuxtPlugin({
    hooks: {
        'app:beforeMount'(app) {
            console.log(app)
            app.use(
                createIkolUI()
            );
        },
    }
});

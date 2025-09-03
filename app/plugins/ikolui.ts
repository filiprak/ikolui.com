import { createIkolUI } from '@ikol/ui-kit';
import { provideConfig, provideGlobal, SSR_CONTEXT_INJECTION_KEY } from '@ikol/ui-kit/composables/globals';

export default defineNuxtPlugin(app => {
    const { isMobile, isTablet } = useDevice();
    const device = isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop');

    provideConfig({
        SSR: import.meta.server,
        SSR_DEVICE: device,
    });

    provideGlobal(SSR_CONTEXT_INJECTION_KEY, {
        inline_styles: new Map<string, {
            attrs?: Record<string, string>;
            css: string;
            asset_path?: string;
        }>(),
        remotes: [],
        shared: [],
        errors: [],
        prefetch: {},
    });

    app.vueApp.use(
        createIkolUI()
    );
});

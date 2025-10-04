import { provideConfig, provideGlobal, SSR_CONTEXT_INJECTION_KEY } from '@ikol/ui-kit/composables/globals';

export default defineNuxtPlugin(app => {
    const { isMobile, isTablet } = useDevice();
    const device = isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop');

    provideConfig({
        SSR: import.meta.server,
        SSR_DEVICE: device,
        LOCAL_STORAGE_HASH: 'pub',
    });

    provideGlobal(SSR_CONTEXT_INJECTION_KEY, {
        remotes: [],
        shared: [],
        errors: [],
        prefetch: {},
        inline_styles: new Map(),
        links: new Map(),
    });
});

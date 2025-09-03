import { createIkolUI } from '@ikol/ui-kit';
import { provideConfig } from '@ikol/ui-kit/composables/globals';

export default defineNuxtPlugin(app => {
    const { isMobile, isTablet, isDesktop } = useDevice();
    const device = isMobile ? 'mobile' : (isTablet ? 'tablet' : 'desktop');

    provideConfig({
        SSR: import.meta.server,
        SSR_DEVICE: device,
    });

    app.vueApp.use(
        createIkolUI()
    );
});

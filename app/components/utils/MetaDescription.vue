<script setup lang="ts">
import { useRender } from '@ikol/ui-kit/composables/render';

const slots = useSlots();
const text = useChildText();

useHead({
    meta: [
        { name: 'description', content: text },
        { property: 'og:description', content: text },
        { property: 'twitter:description', content: text },
    ],
});

useRender(() => {
    return slots.default?.();
});
</script>

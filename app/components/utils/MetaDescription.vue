<script setup lang="ts">
import { useRender } from '@ikol/ui-kit/composables/render';

const slots = useSlots();
const text = useChildText();
const description = useState<string>('meta:description');

description.value = text;

useRender(() => {
    return slots.default?.();
});
</script>

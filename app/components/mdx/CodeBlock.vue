<script setup lang="ts">
import { useRender } from '@ikol/ui-kit/composables/render';
import { h } from 'vue';
import { CODEBLOCK } from '~/components/mdx/types';

const slots = useSlots();
const tabs = ref<string[]>([]);
const active = ref<string>();

provide(CODEBLOCK, { tabs, active });

useRender(() => {
    console.log(tabs.value)
    return h('div', {}, slots.default?.());
});

</script>
<style lang="css" module></style>
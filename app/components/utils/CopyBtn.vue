<template>
    <IkButton @click="copyText"
              circle
              ghost
              v-tooltip.top.close="'Copy'"
              :disabled="copied"
              :class="$style.btn">
        <IkIcon icon="clone:regular"
                v-if="!copied" />
        <IkIcon icon="check-square"
                v-else />
    </IkButton>
</template>
<script setup lang="ts">
import { IkButton } from "@ikol/ui-kit/components/IkButton";
import { vTooltip } from "@ikol/ui-kit/directives/tooltip";
import { IkIcon } from "@ikol/ui-kit/components/IkIcon";
import { ref } from "vue";

const props = defineProps({
    text: { type: String, required: true },
    delay: { type: Number, default: 800 }
});

const copied = ref(false);

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(props.text);
        copied.value = true;
        setTimeout(() => (copied.value = false), props.delay);
    } catch (err) {
        console.error("Failed to copy:", err);
    }
}
</script>
<style lang="css" module>
.btn {}
</style>
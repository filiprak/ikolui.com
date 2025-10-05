<template>
    <IkButton
ghost
              size="xs"
              round
              :disabled="copied"
              :icon="copied ? 'check' : 'clone:regular'"
              :class="$style.btn"
              @click="copyText">
        <template v-if="!copied">[[_Copy_]]</template>
        <template v-else>[[_Copied_]]</template>
    </IkButton>
</template>
<script setup lang="ts">
import { IkButton } from "@ikol/ui-kit/components/IkButton";
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
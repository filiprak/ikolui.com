<template>
    <section :class="$style.section">
        <div :class="$style.wrapper">
            <slot></slot>
        </div>
    </section>
</template>
<style lang="css" module>
.section {
    display: flex;
    justify-content: center;
    width: 100%;
}

.wrapper {
    max-width: var(--layout-w);
    padding: 40px var(--layout-pad);
    width: 100%;
}
</style>
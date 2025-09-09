<template>
    <footer :class="$style.footer">
        <div :class="$style.wrapper">
            <IkListItem class="ik-pa-0 ik-py-5">
                <template #prepend>
                    <IkImage src="/logo.svg"
                             :size="32" />
                </template>
                <span class="ik-text--xl ik-text--bold">IKOL UI</span>
                <template #append>
                    <IkButtonGroup>
                        <IkButton icon="github:brands"
                                  circle
                                  outline>
                        </IkButton>
                        <IkButton icon="facebook-f:brands"
                                  circle
                                  outline>
                        </IkButton>
                        <IkButton icon="npm:brands"
                                  circle
                                  outline>
                        </IkButton>
                    </IkButtonGroup>
                </template>
            </IkListItem>
        </div>
        <Hr />
        <div :class="$style.wrapper">
            <div :class="$style.items">
                <div>
                    <div>[[_Components_]]</div>
                    <IkLink design="default">Item 1</IkLink>
                    <IkLink design="default">Item 2</IkLink>
                    <IkLink design="default">Item 3</IkLink>
                </div>
                <div>
                    <div>[[_FAQs_]]</div>
                    <IkLink design="default">Item 1</IkLink>
                    <IkLink design="default">Item 2</IkLink>
                    <IkLink design="default">Item 3</IkLink>
                </div>
                <div>
                    <div>[[_Resources_]]</div>
                    <IkLink design="default">Item 1</IkLink>
                    <IkLink design="default">Item 2</IkLink>
                    <IkLink design="default">Item 3</IkLink>
                </div>
                <div>
                    <div>[[_Blog_]]</div>
                    <IkLink design="default">Item 1</IkLink>
                    <IkLink design="default">Item 2</IkLink>
                    <IkLink design="default">Item 3</IkLink>
                </div>
            </div>
        </div>
        <Hr />
        <div :class="$style.wrapper">
            <IkListItem class="ik-text--default-light ik-pa-0">
                <span class="ik-text--normal">© 2025 IKOL UI. All rights reserved.</span>
                <template #append>
                    <ThemeSwitch />
                </template>
            </IkListItem>
        </div>
    </footer>
</template>
<script setup lang="ts">
import { IkButton } from '@ikol/ui-kit/components/IkButton';
import { IkButtonGroup } from '@ikol/ui-kit/components/IkButtonGroup';
import { IkImage } from '@ikol/ui-kit/components/IkImage';
import { IkLink } from '@ikol/ui-kit/components/IkLink';
import { IkListItem } from '@ikol/ui-kit/components/IkList';

</script>
<style lang="css" module>
.footer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--s-10);
    padding-bottom: var(--s-10);
}

.footer :global(.ik-divider) {
    width: 100%;
}

.wrapper {
    display: flex;
    flex-direction: column;
    column-gap: var(--s-7);
    padding: 0 var(--layout-pad);
    max-width: var(--layout-w);
    width: 100%;
}

.items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    height: max-content;
    padding-bottom: var(--s-8);
    font-weight: var(--text-semibold);
    gap: var(--s-8);
}

.items > div > * {
    display: block !important;
    padding: var(--s-5) 0;
}

.items > div > div:first-of-type {
    font-weight: var(--text-bold);
    font-size: var(--text-lg);
}
</style>
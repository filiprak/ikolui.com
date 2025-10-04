import type { InjectionKey } from "vue";

export const CODEBLOCK = Symbol.for('codeblock') as InjectionKey<{
    tabs: Ref<string[]>,
    active: Ref<string | undefined>,
}>;
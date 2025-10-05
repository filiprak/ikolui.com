import type { InjectionKey } from 'vue';

export const CODEBLOCK = Symbol.for('codeblock') as InjectionKey<{
    tabs: string[],
    active: Ref<string | undefined>,
}>;
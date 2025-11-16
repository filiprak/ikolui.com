import Pre from '@/components/mdx/Pre.vue';
import Header from './components/mdx/Header.vue';
import MetaDescription from './components/utils/MetaDescription.vue';
import CodeBlock from './components/mdx/CodeBlock.vue';
import { ClientOnly } from '#components';
import type { FunctionalComponent, Slots } from 'vue';

function genHeader(level: number): FunctionalComponent {
    return (_, { slots }: { slots: Slots }) => {
        return h(Header, { level }, slots.default ? slots.default() : []);
    };
}

export function useMDXComponents() {
    return {
        pre: Pre,
        h1: genHeader(1),
        h2: genHeader(2),
        h3: genHeader(3),
        h4: genHeader(4),
        h5: genHeader(5),
        h6: genHeader(6),
        MetaDescription: MetaDescription,
        CodeBlock: CodeBlock,
        ClientOnly: ClientOnly,
    };
}

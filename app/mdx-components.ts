import Pre from '@/components/mdx/Pre.vue';
import MetaDescription from './components/utils/MetaDescription.vue';
import CodeBlock from './components/mdx/CodeBlock.vue';
import { ClientOnly } from '#components';

export function useMDXComponents() {
    return {
        pre: Pre,
        MetaDescription: MetaDescription,
        CodeBlock: CodeBlock,
        ClientOnly: ClientOnly,
    };
}

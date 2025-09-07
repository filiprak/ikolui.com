import mdxJs from '@mdx-js/rollup';
import rehypeShiki from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';

function parseMeta(line: string) {
    const args: Record<string, unknown> = {};
    const regex = /(\w+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
        const key = match[1] || '';
        if (key) {
            const value = match[2] ?? match[3] ?? match[4];
            args[key] = value !== undefined ? value : true;
        }
    }

    return args;
}

export const mdx = () => mdxJs({
    jsxImportSource: 'vue',
    providerImportSource: import.meta.resolve('../../app/mdx-components.ts'),
    remarkPlugins: [
        function wrap() {
            return (tree) => {
                tree.children = [
                    {
                        type: 'mdxJsxFlowElement',
                        name: 'div',
                        attributes: [
                            {
                                type: 'mdxJsxAttribute',
                                name: 'className',
                                value: 'mdx-wrapper',
                            },
                        ],
                        children: tree.children,
                    },
                ];
            }
        },
        remarkFrontmatter,
    ],
    rehypePlugins: [
        [rehypeShiki, {
            themes: { light: 'github-light-default', dark: 'github-dark-default' },
            transformers: [
                {
                    pre(tree: any) {
                        tree.properties = Object.assign(tree.properties, parseMeta(this.options.meta?.__raw || ''));
                    }
                }
            ],
        }],
    ],
});

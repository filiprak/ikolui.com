import mdxJs from '@mdx-js/rollup';
import rehypeStarryNight from 'rehype-starry-night';

export const mdx = () => mdxJs({
    jsxImportSource: 'vue',
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
        }
    ],
    rehypePlugins: [rehypeStarryNight],
});

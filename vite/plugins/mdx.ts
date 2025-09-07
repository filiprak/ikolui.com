import mdxJs from '@mdx-js/rollup';
import rehypeShiki from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';
import type { Plugin } from 'vite';

function previewName(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return `Vue${hash}.vue`;
}

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

export const mdx = (): Plugin[] => {
    const previews: Record<string, string> = {};

    return [
        {
            name: 'ikolui:mdx-previews',
            resolveId(id) {
                if (previews[id]) {
                    return '\0' + id;
                }
            },
            load(id) {
                if (id.startsWith('\0') && previews[id.slice(1)]) {
                    return previews[id.slice(1)];
                }
            }
        },
        mdxJs({
            jsxImportSource: 'vue',
            providerImportSource: import.meta.resolve('../../app/mdx-components.ts'),
            remarkPlugins: [
                function wrap() {
                    return (tree) => {
                        console.log(previews)
                        tree.children = [
                            ...Object.keys(previews).map((mod) => {
                                const component = mod.replace('.vue', '');
                                return {
                                    type: "mdxjsEsm",
                                    value: `import ${component} from '${mod}';\n`,
                                };
                            }),
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
                            preprocess(code, options) {
                                this.options._meta = parseMeta(this.options.meta?.__raw || '');
                                this.options._code = code;

                                if (options.lang === 'vue' && this.options._meta.preview) {
                                    const vue_name = previewName(code);
                                    previews[vue_name] = code;

                                    this.options._vue = vue_name;
                                }
                            },
                            pre(tree: any) {
                                tree.properties = Object.assign(tree.properties, this.options._meta);
                                tree.properties = Object.assign(tree.properties, { code: this.options._code });
                            },
                            root(tree) {
                                if (this.options._vue) {
                                    const mod = this.options._vue;
                                    const component = mod.replace('.vue', '');

                                    tree.children = tree.children || [];
                                    tree.children.push({
                                        type: "mdxJsxFlowElement",
                                        name: component,
                                    });
                                }
                            },
                        }
                    ],
                }],
            ],
        })
    ];
};
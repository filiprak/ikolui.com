import mdxJs from '@mdx-js/rollup';
import rehypeShiki from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';
import { parse, compileScript } from '@vue/compiler-sfc';
import type { Plugin } from 'vite';

function previewName(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    hash = Math.abs(hash);
    return `Vue${hash}`;
}

function previewModule(name: string) {
    return `virtual:${name}.vue`;
}

function transformVueSFC(source: string, id: string, ssr?: boolean) {
    const { descriptor } = parse(source, { filename: id });
    const script = compileScript(descriptor, { id, inlineTemplate: true, templateOptions: { ssr: ssr } });
    return script.content;
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
            enforce: 'pre',
            resolveId(id) {
                if (previews[id]) {
                    return '\0' + id;
                }
            },
            load(id, options) {
                if (id.startsWith('\0') && previews[id.slice(1)]) {
                    return transformVueSFC(previews[id.slice(1)], id.slice(1), options?.ssr);
                }
            },
        },
        mdxJs({
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
                            preprocess(code, options) {
                                this.options._meta = parseMeta(this.options.meta?.__raw || '');
                                this.options._code = code;
                                this.options._lang = options.lang;

                                if (options.lang === 'vue' && this.options._meta.preview) {
                                    const name = previewName(code);
                                    const mod = previewModule(name);
                                    previews[mod] = code;

                                    this.options._vue_module = mod;
                                    this.options._vue_name = name;
                                }
                            },
                            pre(tree: any) {
                                tree.properties = Object.assign(tree.properties, this.options._meta);
                                tree.properties = Object.assign(tree.properties, { code: this.options._code, lang: this.options._lang });

                                if (this.options._vue_module) {
                                    const mod = this.options._vue_module;
                                    const component = this.options._vue_name;

                                    tree.children = tree.children || [];
                                    tree.children.push({
                                        type: "mdxjsEsm",
                                        value: `import ${component} from '${mod}';`,
                                        data: {
                                            estree: {
                                                type: "Program",
                                                body: [
                                                    {
                                                        type: "ImportDeclaration",
                                                        source: { type: "Literal", value: mod },
                                                        specifiers: [
                                                            {
                                                                type: "ImportDefaultSpecifier",
                                                                local: { type: "Identifier", name: component }
                                                            }
                                                        ]
                                                    }
                                                ],
                                                sourceType: "module"
                                            },
                                        },
                                    });
                                    tree.children.push({
                                        type: "mdxJsxFlowElement",
                                        name: 'div',
                                        children: [{
                                            type: "mdxJsxFlowElement",
                                            name: component,
                                        }],
                                    });
                                }
                            },
                        }
                    ],
                }],
            ],
        }),
        {
            name: 'ikolui:mdx-adjust',
            enforce: 'post',
            transform(code, id) {
                if (id.endsWith('.mdx')) {
                    code = code.replace('export default ', '');
                    code += '\n';
                    code += 'export default { setup: (props) => () => MDXContent(props) };';
                    return code;
                }
            },
        },
    ];
};
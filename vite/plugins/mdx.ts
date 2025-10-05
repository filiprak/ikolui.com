import mdxJs from '@mdx-js/rollup';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
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
                if (id.startsWith('\0')) {
                    const trim_id = id.slice(1);
                    if (previews[trim_id]) {
                        return transformVueSFC(previews[trim_id], id.slice(1), options?.ssr);
                    }
                }
            },
        },
        mdxJs({
            jsxImportSource: 'vue',
            providerImportSource: import.meta.resolve('../../app/mdx-components.ts'),
            remarkPlugins: [
                function wrapperMdxPlugin() {
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
                    };
                },
                remarkFrontmatter,
            ],
            rehypePlugins: [
                [rehypeShiki, {
                    themes: { light: 'github-light-default', dark: 'github-dark-default' },
                    transformers: [
                        {
                            preprocess(code, options) {
                                this.options.meta = this.options.meta || {};
                                this.options.meta.props = parseMeta(this.options.meta?.__raw || '');
                                this.options.meta.code = code;
                                this.options.meta.lang = options.lang;

                                if (options.lang === 'vue' && this.options.meta.props.preview) {
                                    const name = previewName(code);
                                    const mod = previewModule(name);
                                    previews[mod] = code;

                                    this.options.meta.vue_module = mod;
                                    this.options.meta.vue_name = name;
                                }
                            },
                            pre(tree) {
                                this.options.meta = this.options.meta || {};

                                tree.properties = Object.assign(tree.properties, {
                                    ...this.options.meta.props,
                                    code: this.options.meta.code,
                                    lang: this.options.meta.lang,
                                });

                                if (this.options.meta.vue_module) {
                                    const mod = this.options.meta.vue_module;
                                    const component = this.options.meta.vue_name;

                                    tree.children = tree.children || [];
                                    tree.children.push({
                                        type: 'mdxjsEsm' as 'raw',
                                        value: `import ${component} from '${mod}';`,
                                        data: {
                                            estree: {
                                                type: 'Program',
                                                body: [
                                                    {
                                                        type: 'ImportDeclaration',
                                                        source: { type: 'Literal', value: mod },
                                                        specifiers: [
                                                            {
                                                                type: 'ImportDefaultSpecifier',
                                                                local: { type: 'Identifier', name: component },
                                                            },
                                                        ],
                                                    },
                                                ],
                                                sourceType: 'module',
                                            },
                                        },
                                    });
                                    tree.children.push({
                                        type: 'mdxJsxFlowElement',
                                        name: 'div',
                                        attributes: [],
                                        children: [{
                                            type: 'mdxJsxFlowElement',
                                            name: component,
                                            attributes: [],
                                            children: [],
                                        }],
                                    });
                                }
                            },
                        },
                    ],
                } as RehypeShikiOptions],
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
import mdxJs from '@mdx-js/rollup';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import remarkFrontmatter from 'remark-frontmatter';
import { parse, compileScript, compileStyle } from '@vue/compiler-sfc';
import type { Plugin, UserConfig } from 'vite';

function hash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return String(Math.abs(hash));
}

function previewName(str: string) {
    return `Vue${hash(str)}`;
}

function previewModule(name: string) {
    return `virtual:${name}.vue`;
}

function transformVueSFC(source: string, filename: string, ssr?: boolean) {
    const { descriptor } = parse(source, { filename });

    const is_scoped = descriptor.styles.some(i => i.scoped);

    const scope_id = 'data-v-' + hash(filename);
    const scriptBlock = compileScript(descriptor, {
        genDefaultAs: '__sfc__',
        id: scope_id,
        inlineTemplate: true,
        templateOptions: {
            ssr: ssr,
            compilerOptions: {
                scopeId: is_scoped ? scope_id : undefined,
            },
        },
    });

    const script = [
        scriptBlock.content,
        is_scoped ? `__sfc__.__scopeId = "${scope_id}"` : '',
        'export default __sfc__',
    ].join('\n');
    let style = '';
    const styleBlock = descriptor.styles[0];

    if (styleBlock) {
        style = compileStyle({
            source: styleBlock.content,
            filename: filename.replace('.vue', '.css'),
            id: scope_id,
            scoped: true,
        }).code;
    }

    return { script, style };
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

export const mdx = (options: { includeDefine?: string[] } = {}): Plugin[] => {
    const previews: Record<string, { src: string, compiled?: { script: string, style: string } }> = {};
    let config: UserConfig;

    return [
        {
            name: 'ikolui:mdx-previews',
            enforce: 'pre',
            resolveId(id) {
                if (previews[id] || previews[id.replace('.css', '.vue')]) {
                    return '\0' + id;
                }
            },
            load(id, options) {
                if (id.startsWith('\0')) {
                    const trim_id = id.slice(1).replace('.css', '.vue');

                    if (previews[trim_id]) {
                        if (!previews[trim_id].compiled) {
                            previews[trim_id].compiled = transformVueSFC(previews[trim_id].src, trim_id, options?.ssr);
                        }

                        if (id.indexOf('.css') >= 0) {
                            return previews[trim_id].compiled.style;
                        } else {
                            return previews[trim_id].compiled.script;
                        }
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
                                    previews[mod] = { src: code };

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
                                    const cssmod = mod.replace('.vue', '.css');
                                    const component = this.options.meta.vue_name;

                                    tree.children = tree.children || [];
                                    tree.children.push({
                                        type: 'mdxjsEsm' as 'raw',
                                        value: `import '${cssmod}';\nimport ${component} from '${mod}';`,
                                        data: {
                                            estree: {
                                                type: 'Program',
                                                body: [
                                                    {
                                                        type: 'ImportDeclaration',
                                                        source: { type: 'Literal', value: cssmod },
                                                        specifiers: [],
                                                    },
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
            name: 'ikolui:mdx-adjust-pre',
            enforce: 'pre',
            config(_cfg) {
                config = _cfg;
            },
            transform(code, id) {
                if (id.endsWith('.mdx')) {
                    const defineVars: Record<string, string> = {};
                    options.includeDefine?.forEach(name => {
                        defineVars[name] = config.define?.[name];
                    });

                    const replaced = code.replace(/\$\{(.+?)\}\$/g, (_, expr) => {
                        const fn = new Function(
                            ...Object.keys(defineVars),
                            `return ${expr}`,
                        );
                        const result = fn(...Object.values(defineVars).map(v => JSON.parse(v)));
                        return result !== undefined ? String(result) : '';
                    });

                    return replaced;
                }
            },
        },
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
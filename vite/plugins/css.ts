import path from 'path';
import micromatch from 'micromatch';
import type { ConfigEnv, Plugin } from 'vite';

const ROOT = path.resolve(import.meta.dirname, '..', '..');

function isMatching(file_path: string, pattern: string | string[]) {
    return micromatch.isMatch(file_path, [ROOT.replace(/\\/g, '/'), pattern].join('/'), { dot: true });
}

export function cssLayers() {
    let env: ConfigEnv;

    const layers = new Map<string, string[] | string>([
        ['base', []],
        ['vendor', [`node_modules/**/*.css`]],
    ]);
    const excluded: string[] = [
        '**/ui-kit/**'
    ];

    const declaration: string = `@layer ${[...layers.keys()].join(',')};`;

    function isExcluded(file_path: string) {
        return isMatching(file_path, excluded);
    }

    function getLayer(file_path: string): string | null {
        for (const [layer, pattern] of layers.entries()) {
            if (pattern !== '*') {
                if (isMatching(file_path, pattern)) {
                    return layer;
                }
            }
        }
        return null;
    }

    const plugin: Plugin = {
        name: 'css-layers',
        enforce: 'pre',

        config(_, _env) {
            env = _env;
        },

        transform(code, id) {
            if (id.endsWith('.css') && !isExcluded(id)) {
                const layer = getLayer(id);

                if (layer) {
                    code = `@layer ${layer} {\n${code}\n}\n`;

                    if (env.command == 'serve') {
                        if (code.indexOf(declaration) < 0) {
                            code = `${declaration}\n${code}`;
                        }
                    }
                }

                return code;
            }
        },

        generateBundle(_, bundle) {
            for (const fileName of Object.keys(bundle)) {
                if (fileName.endsWith('.css')) {
                    const chunk = bundle[fileName];

                    if (chunk && chunk.type === 'asset') {
                        if (chunk.source.toString().indexOf(declaration) < 0) {
                            chunk.source = `${declaration}\n${chunk.source.toString()}`;
                        }
                    }
                }
            }
        },
    };

    return plugin;
}

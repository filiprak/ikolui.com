import { defineNuxtModule, resolveAlias, resolvePath } from 'nuxt/kit';
import type { NuxtPage } from 'nuxt/schema';
import { join, basename, dirname, resolve } from 'path';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';
import glob from 'fast-glob';
import { translate } from '../vite/plugins/i18n';

function isSameDir(path1: string, path2: string) {
    const dir1 = dirname(resolve(path1));
    const dir2 = dirname(resolve(path2));
    return dir1 === dir2;
}

async function getMdxMeta(filePath: string) {
    const file = await read(filePath);

    matter(file);

    const data = JSON.parse(translate(JSON.stringify((file.data.matter || {}))));

    return data as Record<string, unknown>;
}

function findParent(targets: NuxtPage[], lost: NuxtPage, curr: NuxtPage | null = null): NuxtPage | undefined {
    for (const p of targets) {
        const parent = findParent(p.children || [], lost, p);
        if (parent) return parent;
        if (curr && isSameDir((curr.file || '').replace('.vue', '/index.vue'), lost.file || '')) {
            return curr;
        }
    }
}

// function debugPages(targets: NuxtPage[], s = '---') {
//     for (const p of targets) {
//         console.log(s + (p.path || '<empty>') + ` (${p.file})`)
//         print(p.children || [], s + '---');
//     }
// }

export default defineNuxtModule({
    async setup(options, nuxt) {
        const pagesDir = resolveAlias('~/pages');
        const mdxFiles = new Set(await glob('**/*.mdx', {
            cwd: pagesDir,
            ignore: ['node_modules', '.nuxt'],
        }));

        nuxt.hook('pages:extend', async (pages) => {
            for (const file of mdxFiles) {
                const [, ...parsed] = basename(file).match(/^(\d+)?\.?([^.]+)\.(\w+)$/)!;
                const path = `${parsed[1]}`;
                const order = parseInt(parsed[0] || '9999999');
                const matter = await getMdxMeta(join(pagesDir, file));
                const page: NuxtPage = {
                    name: path,
                    path: path,
                    file: await resolvePath(`@/pages/${file}`),
                    meta: {
                        ...(matter?.meta || {}),
                        order,
                        mdxPath: file,
                    },
                };

                const parent = findParent(pages, page);

                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(page);
                } else {
                    page.path = `/${page.path}`;
                    pages.push(page);
                }
            }
        });
    },
});

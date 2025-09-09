import { defineNuxtModule, resolveAlias } from 'nuxt/kit';
import type { NuxtPage } from 'nuxt/schema';
import { join, basename, dirname } from 'path';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';
import glob from 'fast-glob';
import { translate } from '../vite/plugins/i18n';

async function getMdxMeta(filePath: string) {
    const file = await read(filePath);

    matter(file);

    const data = JSON.parse(translate(JSON.stringify((file.data.matter || {}))));

    return data as Record<string, unknown>;
}

export default defineNuxtModule({
    async setup(options, nuxt) {
        const pagesDir = resolveAlias('~/pages')
        const mdxFiles = new Set(await glob('**/*.mdx', {
            cwd: pagesDir,
            ignore: ['node_modules', '.nuxt'],
        }));

        nuxt.hook('pages:extend', async (pages) => {
            for (const file of mdxFiles) {
                let child = false;
                const [, ...parsed] = basename(file).match(/^(\d+)?\.?([^.]+)\.(\w+)$/)!;
                const path = `/${dirname(file)}/${parsed[1]}`;
                const order = parseInt(parsed[0] || '9999999');
                const matter = await getMdxMeta(join(pagesDir, file));
                const page: NuxtPage = {
                    name: path,
                    path: path,
                    file: `~/pages/${file}`,
                    meta: {
                        ...(matter?.meta || {}),
                        order,
                        mdxPath: file,
                    },
                }

                for (const p of pages) {
                    if (
                        p.path !== '/' &&
                        p.path !== path &&
                        path.startsWith(p.path)
                    ) {
                        page.path = page.path.slice(p.path.length + 1);
                        p.children = p.children || [];
                        p.children.push(page);
                        child = true;
                    }
                }
                if (!child) {
                    pages.push(page);
                }
            }
        });
    },
});

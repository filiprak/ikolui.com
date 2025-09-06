// modules/mdx-pages.ts
import { defineNuxtModule, resolveAlias } from 'nuxt/kit';
import glob from 'fast-glob';

export default defineNuxtModule({
    setup(options, nuxt) {
        const pagesDir = resolveAlias('~/pages')

        nuxt.hook('ready', async () => {
            const mdxFiles = await glob('**/*.mdx', {
                cwd: pagesDir,
                ignore: ['node_modules', '.nuxt'],
            });

            nuxt.hook('pages:extend', (pages) => {
                for (const file of mdxFiles) {
                    const path = file.replace('.mdx', '');

                    pages.push({
                        name: path,
                        path: `/${path}`,
                        file: `~/pages/${file}`,
                        meta: {
                            mdxPath: file,
                        },
                    })
                }
            })
        })
    },
});

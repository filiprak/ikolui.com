import type { Plugin } from 'vite';

const regex = /\[\[\_(.*?)\_\]\]/gs;

export function translate(input: string) {
    return input.replace(regex, '$1');
}

export function i18n(): Plugin {

    return {
        name: 'ikolui:i18n',
        enforce: 'pre',

        transform(code: string, id: string) {
            const filepath = id.split('?')[0] || '';
            if (
                filepath.endsWith('.vue') ||
                filepath.endsWith('.js') ||
                filepath.endsWith('.ts') ||
                filepath.endsWith('.mdx') ||
                filepath.endsWith('.jsx') ||
                filepath.endsWith('.tsx')
            ) {
                if (regex.test(code)) {
                    const newCode = translate(code);
                    return {
                        code: newCode,
                        map: null,
                    };
                }
            }
            return null;
        },
    };
}

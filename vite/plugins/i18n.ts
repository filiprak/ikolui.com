import { type Plugin } from 'vite';

export function i18n(): Plugin {
    const regex = /\[\[\_(.*?)\_\]\]/gs;

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
                    const newCode = code.replace(regex, '$1');
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

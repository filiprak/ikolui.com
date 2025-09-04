import { type Plugin } from 'vite';

export function i18n(): Plugin {
    const regex = /\[\[\_(.*?)\_\]\]/gs;

    return {
        name: 'ikolui:i18n',
        enforce: 'pre',

        transform(code: string, id: string) {
            if (
                id.endsWith('.vue') ||
                id.endsWith('.js') ||
                id.endsWith('.ts') ||
                id.endsWith('.jsx') ||
                id.endsWith('.tsx')
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

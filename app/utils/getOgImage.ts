export function getOgImage(title?: string, desc?: string) {
    const query = {
        title: (title || ''),
        desc: (desc || ''),
    };
    return 'https://og-image.ad-testowski.workers.dev?' + (new URLSearchParams(query).toString());
}

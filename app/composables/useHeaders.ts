export function useHeaders() {
    const headers = useState<Array<{
        uid: number,
        id: string,
        level: number,
        text: string
    }>>('headers-on-page', () => []);

    return {
        headers,
    };
}

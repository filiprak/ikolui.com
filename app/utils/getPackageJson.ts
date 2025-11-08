import { readFileSync } from 'fs';
import path from 'path';

export function getPackageJson() {
    const name = '@ikol/ui-kit';

    const pkgPath = path.resolve(import.meta.dirname, `../../node_modules/${name}/package.json`);

    const raw = readFileSync(pkgPath, 'utf-8');
    return JSON.parse(raw);
}

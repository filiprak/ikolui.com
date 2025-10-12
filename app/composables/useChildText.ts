import { isString } from '@ikol/ui-kit/utils';
import { isVNode, Text } from 'vue';

type ComponentSlots = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
};

export function useChildText(): string {
    const slots = useSlots();

    if (!slots || typeof slots.default !== 'function') return '';

    const vnodes = slots.default();
    const parts: string[] = [];

    const walk = (children: VNode[]) => {
        for (const vnode of children) {
            if (isString(vnode)) {
                parts.push(vnode);
            } else if (isString(vnode.children)) {
                parts.push(vnode.children);
            } else if (Array.isArray(vnode.children)) {
                walk(vnode.children as VNode[]);
            } else if (
                vnode.children &&
                typeof (vnode.children as ComponentSlots).default === 'function'
            ) {
                walk((vnode.children as ComponentSlots).default?.());
            }
        }
    };

    walk(vnodes);

    return parts.map(i => i.trim()).filter(i => !!i).join(' ');
}

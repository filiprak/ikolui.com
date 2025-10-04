import { isVNode, type DefineComponent } from "vue";

type ComponentProps<T> = T extends new (...args: any) => { $props: infer P }
    ? P
    : never;

export function useChildComponents<T extends Component>(componentType: T): ComponentProps<T>[] {
    const slots = useSlots();

    if (!slots || typeof slots.default !== 'function') return [];

    const vnodes = slots.default();
    const matches: VNode[] = [];

    const walk = (children: VNode[]) => {
        for (const vnode of children) {
            if (!isVNode(vnode)) continue;
            if (vnode.type === componentType) matches.push(vnode);
            if (Array.isArray(vnode.children)) {
                walk(vnode.children as VNode[]);
            } else if (
                vnode.children &&
                typeof (vnode.children as any).default === 'function'
            ) {
                walk((vnode.children as any).default());
            }
        }
    }

    walk(vnodes);

    return matches.map(i => i.props) as ComponentProps<T>[];
}

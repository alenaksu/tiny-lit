import { TemplateInterface } from './types';

export function comment(data: string = ''): Comment {
    return document.createComment(data);
}

export function text(data: string = ''): Text {
    return document.createTextNode(data);
}

export function isNode(obj: any, type?: number): boolean {
    return (
        !!obj &&
        !!(<Node>obj).nodeType &&
        (!type || (<Node>obj).nodeType === type)
    );
}

export function isPrimitive(val: any) {
    return val !== Object(val);
}

export function replaceRange(newNode: Node, range: any) {
    const [startNode, endNode] = <any>[].concat(range);

    if (!startNode.parentNode) return;

    if (endNode && startNode.nextSibling !== endNode) {
        removeNodes(startNode.nextSibling!, endNode);
    }

    startNode.parentNode!.replaceChild(newNode, startNode);
}

export function removeNodes(
    startNode: Node,
    endNode: Node | null = null,
    parent: Node | null = startNode.parentNode!
): void {
    if (!parent) return;

    while (startNode !== endNode) {
        const nextNode = startNode.nextSibling!;
        parent.removeChild(startNode);
        startNode = nextNode;
    }
}

export function moveTemplate(
    template: TemplateInterface,
    after: Node,
    parent: Node = after.parentNode!
): void {
    const [startNode, endNode] = template.range!;
    const before = after.nextSibling!;

    let node = startNode;
    do {
        const nextNode = node!.nextSibling!;
        parent.insertBefore(node, before as Node);
        node = nextNode;
    } while (node !== endNode);
    parent.insertBefore(endNode, before as Node);
}

export function getNodeIndex(node: Node): number {
    let index = 0;
    while ((node = node.previousSibling!)) index++;
    return index;
}

export function getNodePath(node: Node): Array<number> {
    const path: number[] = [];
    while (node.parentNode) {
        path.unshift(getNodeIndex(node));
        node = node.parentNode;
    }
    return path;
}

export function getNodeByPath(node: Node, path: Array<number>): Node {
    for (let i = 0, l = path.length; i < l; i++)
        node = node.childNodes[path[i]];

    return node;
}

export const TemplateSymbol = Symbol();

export function isSameTemplate(
    t1: TemplateInterface,
    t2: TemplateInterface
): boolean {
    return isTemplate(t1) && isTemplate(t2) && t1.strings === t2.strings;
}

export function isTemplate(obj: any): boolean {
    return obj && obj[TemplateSymbol];
}

export const MARKER_PREFIX = `__${Math.random().toString().slice(2)}_`;
export const MARKER_RE = new RegExp(
    `<!--${MARKER_PREFIX}(\\d+)-->|${MARKER_PREFIX}(\\d+)`
);

export const TEXT_ELEMENT = /^(?:style|textarea)$/i;

export function markerNumber(value) {
    const m = MARKER_RE.exec(value);
    MARKER_RE.lastIndex = 0;

    return m ? Number(m[1] || m[2]) : -1;
}

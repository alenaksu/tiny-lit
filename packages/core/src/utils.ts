import { TemplateInterface, NodeRange } from './types';

export function range(nodes: Node[]): Range {
    const range = document.createRange();
    if (nodes.length > 1) {
        range.setStartBefore(nodes[0]);
        range.setEndAfter(nodes[nodes.length - 1]);
    } else if (nodes.length) {
        range.selectNode(nodes[0]);
    }

    return range;
}

export function comment(data: string = ''): Comment {
    return document.createComment(data);
}

export function text(data: string = ''): Text {
    return document.createTextNode(data);
}

export function isNode(obj: any): boolean {
    return !!obj && !!(<Node>obj).nodeType;
}

export function replaceRange(newNode: Node, [startNode, endNode]: NodeRange) {
    if (endNode && startNode.nextSibling !== endNode)
        removeNodes([startNode.nextSibling!, endNode]);

    startNode.parentNode!.replaceChild(newNode, startNode);
}

export function removeNodes(nodes: Node[]): void {
    range(nodes).deleteContents();
}

export function insertBefore(node: Node, before: Node): void {
    before.parentNode!.insertBefore(node, before);
}

export function moveTemplate(template: TemplateInterface, node: Node): void {
    node.parentNode!.insertBefore(
        range(<Node[]>template.range).extractContents(),
        node.nextSibling
    );
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

export function isTemplateEqual(
    t1: TemplateInterface,
    t2: TemplateInterface
): boolean {
    return (
        isTemplate(t1) &&
        t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings!.length === t2.strings!.length &&
                t1.strings!.every((s, i) => t2.strings![i] === s)))
    );
}

export function isTemplate(obj: any): boolean {
    return obj && obj[TemplateSymbol];
}

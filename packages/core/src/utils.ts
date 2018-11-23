import { TemplateInterface } from './types';

export function isNode(obj: any) {
    return !!obj && !!(<Node>obj).ownerDocument;
}

export function replaceContent(content: Node[], node: Node) {
    insertBefore(node, content[0]);
    removeNodes(content);

    return node;
}

export function removeNodes(nodes: Node[]): void {
    const range = document.createRange();
    range.setStartBefore(nodes[0]);
    range.setEndAfter(nodes[nodes.length - 1]);

    range.deleteContents();
}

export function insertBefore(node: Node, before: Node) {
    before.parentNode!.insertBefore(node, before);
}

export function moveTemplate(template: TemplateInterface, node: Node) {
    let currentNode = node;
    template.content.forEach(node => {
        currentNode.parentNode!.insertBefore(node, currentNode.nextSibling);
        currentNode = node;
    });
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

export function isTemplateEqual(t1: TemplateInterface, t2: TemplateInterface) {
    return (
        isTemplate(t1) &&
        t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings!.length &&
                t2.strings!.length &&
                t1.strings!.every((s, i) => t2.strings![i] === s)))
    );
}

export function isTemplate(obj: any) {
    return obj && obj[TemplateSymbol];
}

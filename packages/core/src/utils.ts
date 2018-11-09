import { TemplateInterface } from './types';

export function textNode(text: string = ''): Text {
    return document.createTextNode(text);
}

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
    return node.parentNode
        ? getNodePath(node.parentNode).concat(getNodeIndex(node))
        : [];
}

export function getNodeByPath(root: Node, path: Array<number>): Node {
    return path.length
        ? getNodeByPath(root.childNodes[path[0]], path.slice(1))
        : root;
}

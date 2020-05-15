import { LinkSymbol, Expression } from './types';
import { AttributeExpression, NodeExpression } from './expressions';
import {
    getNodePath,
    getNodeByPath,
    text,
    TEXT_ELEMENT,
    MARKER_RE,
    markerNumber,
    isNode
} from './utils';

function treeWalkerFilter() {
    return NodeFilter.FILTER_ACCEPT;
}
// fix(IE11): expect filter to be a function and not an object
(<any>treeWalkerFilter).acceptNode = treeWalkerFilter;

export function linkAttributes(
    element: Element,
    linkedExpressions: LinkSymbol[]
): void {
    const attrs = element.attributes;
    let i = attrs.length;

    while (i--) {
        const { name, value, namespaceURI } = attrs.item(i) as Attr;
        const m = markerNumber(value);

        if (~m) {
            element.removeAttribute(name);
            linkedExpressions[m] = {
                type: AttributeExpression,
                name,
                namespaceURI,
                nodePath: getNodePath(element)
            };
        }
    }
}

export function linkComment(node: Comment, linkedExpressions: LinkSymbol[]) {
    const m = markerNumber(node.data);

    if (~m) {
        linkedExpressions[m] = {
            type: NodeExpression,
            nodePath: getNodePath(node)
        };
        node.nodeValue = '';
    }
}

export function linkTexts(
    node: CharacterData,
    linkedExpressions: LinkSymbol[]
): void {
    let m: RegExpExecArray | null;
    while ((m = MARKER_RE.exec(node.data)) !== null) {
        const keyNode: Text = text();
        node = (<Text>node).splitText(m.index);
        node.deleteData(0, m[0].length);

        node.parentNode!.insertBefore(keyNode, node);

        linkedExpressions[Number(m[1] || m[2])] = {
            type: NodeExpression,
            nodePath: getNodePath(keyNode)
        };
    }
}

export function linkExpressions(root: DocumentFragment) {
    const treeWalker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        treeWalkerFilter as any,
        false
    );

    const linkedExpressions: Array<LinkSymbol> = [];

    while (treeWalker.nextNode()) {
        const node: any = treeWalker.currentNode;

        if (isNode(node, Node.ELEMENT_NODE)) {
            linkAttributes(node, linkedExpressions);
            if (TEXT_ELEMENT.test(node.tagName)) {
                for (const childNode of node.childNodes) {
                    linkTexts(childNode, linkedExpressions);
                }
            }
        } else linkComment(node, linkedExpressions);
    }

    return linkedExpressions;
}

export function resolve(fragment: Node, symbols: LinkSymbol[]): Expression[] {
    return symbols.map(
        (symbol) =>
            new symbol.type(
                getNodeByPath(fragment, symbol.nodePath),
                symbol.name,
                symbol.namespaceURI
            )
    ) as any;
}

import { LinkSymbol, Expression } from './types';
import { AttributeExpression, NodeExpression } from './expressions';
import {
    getNodePath,
    getNodeByPath,
    text,
    markerNumber,
    TEXT_ELEMENT,
    getMarkers
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
        const { name, value } = attrs.item(i) as Attr;
        const n = markerNumber(value);

        if (n !== -1) {
            element.removeAttribute(name);
            linkedExpressions[n] = {
                type: AttributeExpression,
                name,
                nodePath: getNodePath(element)
            };
        }
    }
}

export function linkComment(node: Comment, linkedExpressions: LinkSymbol[]) {
    const n = markerNumber(node.data);

    if (n !== -1) {
        linkedExpressions[n] = {
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
    getMarkers(node.data).forEach((key: string) => {
        const keyNode: Text = text();
        node = (<Text>node).splitText(node.data.indexOf(key));
        node.deleteData(0, key.length);

        node.parentNode!.insertBefore(keyNode, node);

        linkedExpressions[markerNumber(key)] = {
            type: NodeExpression,
            nodePath: getNodePath(keyNode)
        };
    });
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

        if (node.nodeType === Node.ELEMENT_NODE) {
            linkAttributes(node, linkedExpressions);
            if (TEXT_ELEMENT.test(node.tagName)) {
                [].forEach.call(node.childNodes, node =>
                    linkTexts(node, linkedExpressions)
                );
            }
        } else linkComment(node, linkedExpressions);
    }

    return linkedExpressions;
}

export function resolve(fragment: Node, symbols: LinkSymbol[]): Expression[] {
    return symbols.map(
        symbol =>
            new symbol.type(
                getNodeByPath(fragment, symbol.nodePath),
                symbol.name
            )
    ) as any;
}

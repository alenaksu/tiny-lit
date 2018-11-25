import { ExpressionMap, LinkSymbol } from './types';
import { AttributeExpression, NodeExpression } from './expressions';
import { getNodePath, getNodeByPath } from './utils';

function markerNumber(marker: string): number {
    return Number(marker.replace(/\D+/g, ''));
}

function treeWalkerFilter(node: any) {
    return node.__skip
        ? (delete node.__skip, NodeFilter.FILTER_SKIP)
        : NodeFilter.FILTER_ACCEPT;
}
// fix(IE11): expect filter to be a function and not an object
(<any>treeWalkerFilter).acceptNode = treeWalkerFilter;

export function linkAttributes(
    element: Element,
    expressions: ExpressionMap,
    linkedExpressions: LinkSymbol[]
): void {
    const attrs = element.attributes;
    let i = attrs.length;

    while (i--) {
        const { name, value } = attrs.item(i) as Attr;

        if (expressions.has(value)) {
            element.removeAttribute(name);
            linkedExpressions[markerNumber(value)] = {
                type: AttributeExpression,
                name,
                nodePath: getNodePath(element)
            };
        }
    }
}

export function linkTexts(node: Node, linkedExpressions: LinkSymbol[]): void {
    let key;
    if (node.nodeValue && (key = node.nodeValue.match(/__\d+__/))) {
        linkedExpressions[markerNumber(key[0])] = {
            type: NodeExpression,
            name,
            nodePath: getNodePath(node)
        };
    }
    // const keys = node.data.match(/__\d+__/g) || [];

    // keys.forEach((key: string) => {
    //     let keyNode: Node = node.ownerDocument!.createTextNode('');
    //     (<any>keyNode).__skip = true;

    //     if (node instanceof Comment) {
    //         keyNode = node as any;
    //     } else {
    //         node = node.splitText(node.data.indexOf(key));
    //         node.deleteData(0, key.length);

    //         insertBefore(keyNode, node);
    //     }

    //     linkedExpressions[markerNumber(key)] = {
    //         type: NodeExpression,
    //         name,
    //         nodePath: getNodePath(keyNode)
    //     };
    // });
}

export function linkExpressions(
    root: DocumentFragment,
    expressions: ExpressionMap
) {
    const treeWalker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        treeWalkerFilter as any,
        false
    );

    const linkedExpressions: Array<LinkSymbol> = Array(expressions.size);

    while (treeWalker.nextNode()) {
        const node: any = treeWalker.currentNode;

        if (node.nodeType === Node.COMMENT_NODE)
            linkTexts(node, linkedExpressions);
        else if (node.nodeType === Node.ELEMENT_NODE)
            linkAttributes(node, expressions, linkedExpressions);
    }

    return linkedExpressions;
}

export function resolve(fragment: Node, symbols: LinkSymbol[]) {
    return symbols.map(symbol =>
        new symbol.type(getNodeByPath(fragment, symbol.nodePath), symbol.name)
    );
}

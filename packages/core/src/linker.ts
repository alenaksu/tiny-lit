import { ExpressionMap, LinkSymbol, Expression } from './types';
import { AttributeExpression, NodeExpression } from './expressions';
import {
    getNodePath,
    getNodeByPath,
    text,
    markerNumber,
    MARKER_RE,
    TEXT_ELEMENT
} from './utils';

function treeWalkerFilter() {
    return NodeFilter.FILTER_ACCEPT;
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

export function linkComment(
    node: Comment,
    expressions: ExpressionMap,
    linkedExpressions: LinkSymbol[]
) {
    if (expressions.has(node.data)) {
        linkedExpressions[markerNumber(node.data)] = {
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
    const keys = node.data.match(MARKER_RE) || [];

    keys.map((key: string) => {
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

        if (node.nodeType === Node.ELEMENT_NODE) {
            linkAttributes(node, expressions, linkedExpressions);
            if (TEXT_ELEMENT.test(node.tagName)) {
                [].forEach.call(node.childNodes, node =>
                    linkTexts(node, linkedExpressions)
                );
            }
        } else linkComment(node, expressions, linkedExpressions);
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

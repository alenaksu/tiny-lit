import { ExpressionMap, LinkSymbol } from './types';
export declare function linkAttributes(element: Element, expressions: ExpressionMap, linkedExpressions: LinkSymbol[]): void;
export declare function linkTexts(node: Text, linkedExpressions: LinkSymbol[]): void;
export declare function linkExpressions(root: DocumentFragment, expressions: ExpressionMap): LinkSymbol[];
export declare function resolve(fragment: Node, symbols: LinkSymbol[]): void[];

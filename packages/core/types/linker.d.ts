import { ExpressionMap, LinkSymbol, Expression } from './types';
export declare function linkAttributes(element: Element, expressions: ExpressionMap, linkedExpressions: LinkSymbol[]): void;
export declare function linkComment(node: Comment, expressions: ExpressionMap, linkedExpressions: LinkSymbol[]): void;
export declare function linkTexts(node: CharacterData, linkedExpressions: LinkSymbol[]): void;
export declare function linkExpressions(root: DocumentFragment, expressions: ExpressionMap): LinkSymbol[];
export declare function resolve(fragment: Node, symbols: LinkSymbol[]): Expression[];

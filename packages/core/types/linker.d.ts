import { MarkerMap, LinkSymbol, Expression } from './types';
export declare function linkAttributes(element: Element, markers: MarkerMap, linkedExpressions: LinkSymbol[]): void;
export declare function linkComment(node: Comment, markers: MarkerMap, linkedExpressions: LinkSymbol[]): void;
export declare function linkTexts(node: CharacterData, linkedExpressions: LinkSymbol[]): void;
export declare function linkExpressions(root: DocumentFragment, markers: MarkerMap): LinkSymbol[];
export declare function resolve(fragment: Node, symbols: LinkSymbol[]): Expression[];

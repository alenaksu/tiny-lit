import { TemplateInterface } from './types';
export declare function isNode(obj: any): boolean;
export declare function replaceContent(content: Node[], node: Node): Node;
export declare function removeNodes(nodes: Node[]): void;
export declare function insertBefore(node: Node, before: Node): void;
export declare function moveTemplate(template: TemplateInterface, node: Node): void;
export declare function getNodeIndex(node: Node): number;
export declare function getNodePath(node: Node): Array<number>;
export declare function getNodeByPath(node: Node, path: Array<number>): Node;

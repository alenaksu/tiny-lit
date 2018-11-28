export interface ExpressionMap extends Map<string, HTMLElement | Function | string> {
}
export interface Expression {
    update(value: any, force?: boolean): void;
    clear?(): void;
}
export interface TemplateInterface {
    update(values: any[], force?: boolean): void;
    create(): Node;
    delete(): void;
    range?: NodeRange;
    expressions?: Expression[];
    values: any[];
    strings?: TemplateStringsArray;
    key: string;
    withKey(key: string): TemplateInterface;
}
export declare type LinkSymbol = {
    type: new (...args: any[]) => void;
    name: string;
    nodePath: Array<number>;
};
export declare type CacheEntry = {
    expressions: Array<LinkSymbol>;
    template: HTMLTemplateElement;
};
export declare type NodeRange = [Node, Node?];
export declare type TemplateArray = Map<string, TemplateInterface>;

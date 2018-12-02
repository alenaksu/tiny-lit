export interface ExpressionMap
    extends Map<string, HTMLElement | Function | string> {}

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

export type LinkSymbol = {
    type: new (...args: any[]) => void;
    name: string;
    nodePath: Array<number>;
};

export type CacheEntry = {
    expressions: Array<LinkSymbol>;
    template: HTMLTemplateElement;
};

export type NodeRange = [Node, Node?];

export type TemplateArray = Map<string, TemplateInterface>;

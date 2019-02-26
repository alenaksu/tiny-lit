export interface Expression {
    update(value: any, force?: boolean): void;
    clear?(): void;
}

export interface TemplateInterface {
    update(values: any[], force?: boolean): void;
    create(): Node;
    delete(): void;
    range?: [Node, Node];
    expressions?: Expression[];
    values: any[];
    strings?: TemplateStringsArray;
    context?: string;
    key?: string;
    withKey(key: string): TemplateInterface;
}

export type LinkSymbol = {
    type: new (...args: any[]) => void;
    name?: string;
    nodePath: Array<number>;
};

export type CacheEntry = {
    expressions: Array<LinkSymbol>;
    content: DocumentFragment;
};

export type TemplateArray = Map<string, TemplateInterface>;

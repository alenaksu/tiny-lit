import { TemplateInterface, Expression } from './types';
import { TemplateSymbol } from './utils';
export declare class Template implements TemplateInterface {
    [TemplateSymbol]: boolean;
    values: any[];
    strings: TemplateStringsArray;
    range?: [Node, Node];
    expressions?: Expression[];
    key?: any;
    constructor(strings: TemplateStringsArray, values: any[]);
    withKey(key: any): this;
    update(values: any[], force?: boolean): void;
    delete(): void;
    create(): DocumentFragment;
}

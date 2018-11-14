import { TemplateInterface, Expression } from './types';
declare const TemplateSymbol: unique symbol;
export declare function isTemplateEqual(t1: Template, t2: Template): boolean | 0;
export declare function isTemplate(obj: any): any;
export declare class Template implements TemplateInterface {
    [TemplateSymbol]: boolean;
    values: any[];
    strings: TemplateStringsArray;
    content: Node[];
    expressions: Expression[];
    key: any;
    constructor(strings: TemplateStringsArray, values: any[]);
    withKey(key: any): this;
    update(values: any[], force?: boolean): void;
    create(): DocumentFragment;
}
export declare class TemplateCollection implements TemplateInterface {
    [TemplateSymbol]: boolean;
    values: any[];
    templates: Map<string, Template>;
    rootNode?: Text;
    constructor(values: any[]);
    private _flushTemplates;
    readonly content: Node[];
    update(items: any[]): void;
    create(): Node;
}
export {};

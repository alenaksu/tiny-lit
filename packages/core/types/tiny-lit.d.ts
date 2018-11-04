import { TemplateInterface, Expression } from './types';
export declare class Template implements TemplateInterface {
    values: any[];
    strings: string[];
    content: Node[];
    expressions: Expression[];
    key: any;
    constructor(strings: string[], values: any[]);
    withKey(key: any): this;
    update(values: any[], force?: boolean): void;
    create(): DocumentFragment;
}
export declare class TemplateCollection implements TemplateInterface {
    values: any[];
    templates: Map<string, Template>;
    rootNode?: Text;
    constructor(values: any[]);
    private _flushTemplates;
    readonly content: Node[];
    update(items: any[]): void;
    create(): Node;
}
export declare class AttributeExpression implements Expression {
    name: string;
    value?: any;
    element: Element;
    constructor(element: Element, name: string);
    update(value: any, force: boolean): void;
}
export declare class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    value: any;
    constructor(element: Node);
    update(value: any, force: boolean): void;
}
export declare function render(template: TemplateInterface, container: HTMLElement): void;
export declare namespace render {
    var instances: WeakMap<HTMLElement, TemplateInterface>;
}
export declare function html(strings: any, ...values: any[]): Template;

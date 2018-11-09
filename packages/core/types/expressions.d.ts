import { Expression, TemplateInterface } from './types';
export declare class AttributeExpression implements Expression {
    name: string;
    value?: any;
    element: Element;
    constructor(element: Element, name: string);
    update(value: any, force: boolean): void;
}
export declare class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    value?: Node | TemplateInterface;
    constructor(element: Node);
    update(value: any, force: boolean): void;
}

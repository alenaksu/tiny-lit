import { Expression, TemplateInterface, TemplateArray } from './types';
export declare class AttributeExpression implements Expression {
    name: string;
    value?: any;
    element: Element;
    constructor(element: Element, name: string);
    update(value: any): void;
}
export declare class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    placeholder: Node;
    value?: Node | TemplateInterface | TemplateArray;
    constructor(element: Node);
    updateArray(items: TemplateInterface[]): Map<any, any>;
    replaceWith(newValue: Node | TemplateInterface | TemplateArray): void;
    update(value: any): void;
}

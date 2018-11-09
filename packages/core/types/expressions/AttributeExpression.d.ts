import { Expression } from '../types';
export default class AttributeExpression implements Expression {
    name: string;
    value?: any;
    element: Element;
    constructor(element: Element, name: string);
    update(value: any, force: boolean): void;
}

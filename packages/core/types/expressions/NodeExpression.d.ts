import { Expression, TemplateInterface } from '../types';
export default class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    value: any;
    constructor(element: Node);
    update(value: any, force: boolean): void;
}

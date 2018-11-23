import { Expression, TemplateInterface } from './types';
import { TemplateCollection } from './template-collection';
import { isNode, replaceContent, isTemplate, isTemplateEqual } from './utils';

export class AttributeExpression implements Expression {
    name: string;
    value?: any;
    element: Element;

    constructor(element: Element, name: string) {
        this.name = name;
        this.element = element;
    }

    update(value: any, force: boolean): void {
        const { name, element, value: currentValue } = this;

        if (!force && currentValue === value) {
            return;
        }

        if (name in element) {
            (element as any)[name] = value;
        } else if (typeof value !== 'undefined') {
            element.setAttribute(name, value);
        } else {
            element.hasAttribute(name) && element.removeAttribute(name);
        }

        this.value = value;
    }
}

export class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    value?: Node | TemplateInterface;

    constructor(element: Node) {
        this.element = element;
        this.value = undefined;
    }

    update(value: any, force: boolean): void {
        const { element } = this;

        if (value === undefined || value === null) {
            value = '';
        } else if (!force && value === this.value) {
            return;
        }

        if (Array.isArray(value)) value = new TemplateCollection(value);

        if (!isNode(value) && !isTemplate(value) && !isTemplate(element)) {
            (<Node>element).nodeValue = value;
        } else if (isTemplateEqual(element as TemplateInterface, value)) {
            (element as TemplateInterface).update(value.values);
        } else {
            replaceContent(
                isTemplate(element)
                    ? (<TemplateInterface>element).content
                    : [<Node>element],
                isTemplate(value)
                    ? value.create()
                    : isNode(value)
                        ? value
                        : (value = document.createTextNode(value))
            );
            this.element = value;
        }

        this.value = value;
    }
}

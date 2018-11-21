import { Expression, TemplateInterface } from './types';
import {
    TemplateCollection,
    isTemplate,
    isTemplateEqual,
    Template
} from './template';
import { isNode, replaceContent } from './utils';

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
            value = document.createTextNode('');
        } else if (!force && value === this.value) {
            return;
        }

        if (Array.isArray(value)) value = new TemplateCollection(value);

        if (!isNode(value) && !isTemplate(value) && !isTemplate(element)) {
            (<Node>element).nodeValue = value;
        } else if (isTemplateEqual(element as Template, value)) {
            (element as Template).update(value.values);
        } else {
            replaceContent(
                isTemplate(element)
                    ? (<Template>element).content
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

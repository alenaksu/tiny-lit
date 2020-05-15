import { Expression, TemplateInterface, TemplateArray } from './types';
import {
    isNode,
    replaceRange,
    isTemplate,
    isSameTemplate,
    moveTemplate,
    text,
    isPrimitive
} from './utils';
import { scheduled } from './scheduler';

export class AttributeExpression implements Expression {
    value?: any;

    constructor(
        public element: Element,
        public name: string,
        public namespaceURI: string | null
    ) {}

    update(newValue: any): void {
        if (newValue === this.value) return;

        this.requestUpdate(newValue);
    }

    requestUpdate = scheduled((newValue: any): void => {
        const { name, element, namespaceURI } = this;

        if ('ownerSVGElement' in <SVGElement>element) {
            element.setAttributeNS(namespaceURI, name, newValue);
        } else if (name in element) {
            (element as any)[name] = newValue;
        } else if (typeof newValue !== 'undefined') {
            element.setAttribute(name, newValue);
        } else {
            element.hasAttribute(name) && element.removeAttribute(name);
        }

        this.value = newValue;
    });
}

export class NodeExpression implements Expression {
    element: Node | TemplateInterface;
    placeholder: Node;
    value?: Node | TemplateInterface | TemplateArray;

    constructor(element: Node) {
        this.element = this.placeholder = element;
    }

    updateArray(items: TemplateInterface[]) {
        this.replaceWith(this.placeholder);

        const templates = this.value instanceof Map ? this.value : new Map();

        let currentNode: Node = <Node>this.element;
        const keys = new Set();
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];

            const key: string = String(item.key || i);
            let template = templates.get(key)!;

            if (!template) {
                const node: Node = item.create();
                currentNode.parentNode!.insertBefore(
                    node,
                    currentNode.nextSibling
                );

                templates.set(key, (template = item));
            } else if (!isSameTemplate(template, item)) {
                replaceRange(item.create(), template.range);
                templates.set(key, (template = item));
            } else {
                template.update(item.values);
            }

            if (currentNode.nextSibling !== template.range[0]) {
                moveTemplate(template, currentNode);
            }
            currentNode = template.range[1];

            keys.add(key);
        }

        templates.forEach((template, key, map) => {
            if (!keys.has(key)) {
                template.delete();
                map.delete(key);
            }
        });

        return templates;
    }

    replaceWith(newValue: Node | TemplateInterface | TemplateArray) {
        const { element, value, placeholder } = this;

        if (newValue == null) newValue = placeholder;

        if (element !== newValue) {
            if (value instanceof Map) {
                value.forEach((template) => template.delete());
                value.clear();
            }

            this.element = <any>newValue;

            replaceRange(
                isTemplate(newValue)
                    ? (<TemplateInterface>newValue).create()
                    : <Node>newValue,
                isTemplate(element)
                    ? (<TemplateInterface>element).range!
                    : <Node>element
            );
        }
    }

    updateText(value: any) {
        if (!isNode(this.element, Node.TEXT_NODE)) {
            this.replaceWith(text());
        }
        (<Text>this.element).textContent = value;
    }

    updateTemplate(values: any[]) {
        (<TemplateInterface>this.element).update(values);
    }

    update(newValue: any): void {
        if (newValue === this.value) return;

        this.requestUpdate(newValue);
    }

    requestUpdate = scheduled((newValue: any): void => {
        if (isPrimitive(newValue)) {
            this.updateText(newValue);
        } else if (Array.isArray(newValue)) {
            newValue = this.updateArray(newValue);
        } else if (isSameTemplate(newValue, <TemplateInterface>this.element)) {
            this.updateTemplate(newValue.values);
        } else {
            this.replaceWith(newValue);
        }

        this.value = newValue;
    });
}

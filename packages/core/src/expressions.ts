import { Expression, TemplateInterface, TemplateArray } from './types';
import {
    isNode,
    replaceRange,
    isTemplate,
    isTemplateEqual,
    moveTemplate,
    text
} from './utils';

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
    placeholder: Node;
    value?: Node | TemplateInterface | TemplateArray;

    constructor(element: Node) {
        this.element = this.placeholder = element;
    }

    updateArray(items: TemplateInterface[]) {
        const templates = this.value instanceof Map ? this.value : new Map();

        const { element: rootNode } = this;

        let currentNode: Node = <Node>rootNode;
        const keys: string[] = items.reduce(
            (keys, item, i) => {
                const key: string = String(item.key || i);
                let template = templates.get(key)!;

                if (!template) {
                    const node: Node = item.create();
                    currentNode.parentNode!.insertBefore(
                        node,
                        currentNode.nextSibling
                    );

                    templates.set(key, (template = item));
                } else if (!isTemplateEqual(template, item)) {
                    replaceRange(item.create(), template.range);
                    templates.set(key, (template = item));
                } else {
                    template.update(item.values);
                }

                if (currentNode.nextSibling !== template.range[0]) {
                    moveTemplate(template, currentNode);
                }
                currentNode = template.range[1];

                keys.push(key);

                return keys;
            },
            [] as string[]
        );

        templates.forEach((template, key, map) => {
            if (keys.indexOf(key) === -1) {
                template.delete();
                map.delete(key);
            }
        });

        return templates;
    }

    replaceWith(newValue: Node | TemplateInterface | TemplateArray) {
        const { element, value } = this;

        if (value instanceof Map) {
            value.forEach(template => template.delete());
            value.clear();
        }

        this.element = newValue = isTemplate(newValue)
            ? <TemplateInterface>newValue
            : isNode(newValue)
                ? <Node>newValue
                : text(<any>newValue);

        replaceRange(
            isTemplate(newValue)
                ? (<TemplateInterface>newValue).create()
                : <Node>newValue,
            isTemplate(element)
                ? (<TemplateInterface>element).range!
                : <Node>element
        );
    }

    update(value: any, force: boolean): void {
        const { element, placeholder } = this;

        if (!force && value === this.value) {
            return;
        }

        if (value == null) value = placeholder;

        if (
            typeof value !== 'object' &&
            (<Node>element).nodeType === Node.TEXT_NODE
        ) {
            (<Node>element).nodeValue = value;
        } else if (isTemplateEqual(value, <TemplateInterface>element)) {
            (element as TemplateInterface).update(value.values);
        } else if (Array.isArray(value)) {
            if (
                !(this.value instanceof Map) &&
                (<Node>element).nodeType !== Node.COMMENT_NODE
            ) {
                this.replaceWith(placeholder);
            }
            value = this.updateArray(value);
        } else {
            this.replaceWith(value);
        }

        this.value = value;
    }
}

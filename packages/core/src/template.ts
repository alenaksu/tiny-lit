import { TemplateInterface, Expression } from './types';
import { createElement } from './parser';
import {
    insertBefore,
    replaceContent,
    removeNodes,
    moveTemplate
} from './utils';

const TemplateSymbol = Symbol();

export function isTemplateEqual(t1: Template, t2: Template) {
    return (
        isTemplate(t1) &&
        t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings.length &&
                t2.strings.length &&
                t1.strings.every((s, i) => t2.strings[i] === s)))
    );
}

export function isTemplate(obj: any) {
    return obj && obj[TemplateSymbol];
}

export class Template implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    strings: TemplateStringsArray;
    content: Node[] = [];
    expressions: Expression[] = [];
    key: any = undefined;

    constructor(strings: TemplateStringsArray, values: any[]) {
        this.values = values;
        this.strings = strings;
    }

    withKey(key: any) {
        this.key = key;
        return this;
    }

    update(values: any[], force?: boolean) {
        for (let i = 0; i < values.length; i++) {
            if (this.expressions[i] !== undefined)
                this.expressions[i].update(values[i], force);
        }
    }

    create(): DocumentFragment {
        const { fragment, expressions } = createElement(
            this.strings,
            this.values
        );
        this.expressions = expressions;
        this.update(this.values, true);
        this.content = [].slice.call(fragment.childNodes);

        return fragment;
    }
}

export class TemplateCollection implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    templates: Map<string, Template>;
    rootNode?: Text;

    constructor(values: any[]) {
        this.values = values;
        this.templates = new Map();
    }

    private _flushTemplates(keys: string[]) {
        this.templates.forEach((template, key, map) => {
            if (keys.indexOf(key) === -1) {
                removeNodes(template.content);
                map.delete(key);
            }
        });
    }

    get content(): Node[] {
        const { templates, rootNode } = this;

        const nodes: any[] = [rootNode];
        templates.forEach((template: Template) =>
            nodes.push(...(<Template>template).content)
        );

        return nodes;
    }

    update(items: any[]) {
        const { rootNode, templates } = this;

        let currentNode: Node = <Node>rootNode;
        const keys = items.reduce((keys, item, i) => {
            const key: string = String(item.key || i);
            let template = <Template>templates.get(key);

            if (!template) {
                const node: Node = item.create();
                currentNode.nextSibling!
                    ? insertBefore(node, currentNode.nextSibling!)
                    : currentNode.parentNode!.appendChild(node);

                templates.set(key, (template = item));
            } else if (!isTemplateEqual(template, item)) {
                replaceContent(template.content, item.create());
                templates.set(key, (template = item));
            } else {
                template.update(item.values);
            }

            if (currentNode.nextSibling !== template.content[0]) {
                moveTemplate(template, currentNode);
            }
            currentNode = template.content[template.content.length - 1];

            keys.push(key);

            return keys;
        }, []);

        this._flushTemplates(keys);
    }

    create(): Node {
        const fragment = document.createDocumentFragment();
        fragment.appendChild((this.rootNode = document.createTextNode('')));

        this.update(this.values);

        return fragment;
    }
}

import {
    Template as TemplateInterface,
    Expression,
    ExpressionMap,
} from './types';

/**
 * UTILS
 */
const parseTemplate = (function() {
    const templateCache = new Map();
    const range = document.createRange();
    range.setStart(document.documentElement, 0);

    return (html: string): DocumentFragment => {
        if (!templateCache.has(html)) {
            templateCache.set(html, range.createContextualFragment(html));
        }

        return templateCache.get(html).cloneNode(true);
    };
})();

function typeCheck(obj: any, types: any[]) {
    return types.some((type: any) => obj instanceof type);
}

function replaceContent(content: Node[], node: Node) {
    insertBefore(node, content[0]);
    removeNodes(content);

    return node;
}

function removeNodes(nodes: Node[]): void {
    nodes.forEach((node: Node) => {
        node.parentNode && node.parentNode.removeChild(node);
    });
}

function treeWalkerFilter(node: any) {
    return node.__skip ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
}
// fix(IE11): expect filter to be a function and not an object
(<any>treeWalkerFilter).acceptNode = treeWalkerFilter;

function insertBefore(node: Node, before: Node) {
    before.parentNode!.insertBefore(node, before);
}

function isTemplateEqual(t1: Template, t2: Template) {
    return (
        isTemplate(t1) &&
        t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings.length &&
                t2.strings.length &&
                t1.strings.every((s, i) => t2.strings[i] === s)))
    );
}

function markerNumber(marker: string): number {
    return Number(marker.replace(/\D+/g, ''));
}

function textNode(text: string = ''): Text {
    return document.createTextNode(text);
}

function isNode(obj: any) {
    return !!obj && !!(<Node>obj).ownerDocument;
}

function isTemplate(obj: any) {
    return typeCheck(obj, [Template, TemplateCollection]);
}

function createElement(
    strings: string[],
    values: any[]
): { fragment: DocumentFragment; expressions: Expression[] } {
    const expressionsMap: any = new Map();

    const html = values.reduce((html: string, value: any, i: number) => {
        const marker = `__${i}__}}`;
        expressionsMap.set(marker, value);

        html += marker + strings[i + 1];

        return html;
    }, strings[0]);

    const fragment = parseTemplate(html);

    const expressions: any = linkExpressions(fragment, expressionsMap);

    return {
        fragment,
        expressions,
    };
}

/**
 * TEMPLATES
 */

function attributesToExpressions(
    element: Element,
    expressions: ExpressionMap,
    linkedExpressions: Expression[]
): void {
    const attrs = element.attributes;
    let i = attrs.length;

    while (i--) {
        const { name, value } = attrs.item(i) as Attr;
        if (expressions.has(value)) {
            attrs.removeNamedItem(name);
            linkedExpressions[markerNumber(value)] = new AttributeExpression(
                <Element>element,
                name
            ) as Expression;
        }
    }
}

function textsToExpressions(node: Text, linkedExpressions: Expression[]): void {
    const keys = node.data.match(/__\d+__}}/g) || [];

    keys.map((key: string) => {
        const keyNode: Text = textNode(key);
        (<any>keyNode).__skip = true;
        node = node.splitText(node.data.indexOf(key));
        node.deleteData(0, key.length);

        insertBefore(keyNode, node);

        linkedExpressions[markerNumber(key)] = new ElementExpression(
            keyNode
        ) as Expression;
    });
}

function linkExpressions(root: DocumentFragment, expressions: ExpressionMap) {
    const treeWalker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        treeWalkerFilter as any,
        false
    );

    const linkedExpressions: (Expression)[] = Array(expressions.size);

    while (treeWalker.nextNode()) {
        const node: any = treeWalker.currentNode;

        if (node.nodeType === Node.TEXT_NODE) {
            textsToExpressions(node, linkedExpressions);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            attributesToExpressions(node, expressions, linkedExpressions);
        }
    }

    return linkedExpressions;
}

export class Template implements TemplateInterface {
    values: any[];
    strings: string[];
    content: Node[] = [];
    expressions: Expression[] = [];
    key: any = undefined;

    constructor(strings: string[], values: any[]) {
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

function moveTemplate(template: Template, node: Node) {
    let currentNode = node;
    template.content.forEach(node => {
        currentNode.parentNode!.insertBefore(node, currentNode.nextSibling);
        currentNode = node;
    });
}

export class TemplateCollection implements TemplateInterface {
    values: any[];
    templates: Map<string, Template>;
    rootNode?: Text;

    constructor(values: any[]) {
        this.values = values;
        this.templates = new Map();
    }

    private _flushTemplates(keys: string[]) {
        const { templates } = this;

        templates.forEach((template, key, map) => {
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

                templates.set(key, item);
                template = item;
            } else if (!isTemplateEqual(template, item)) {
                replaceContent(template.content, item.create());
                templates.set(key, item);
                template = item;
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
        this.rootNode = textNode();
        fragment.appendChild(this.rootNode);

        this.update(this.values);

        return fragment;
    }
}

class AttributeExpression implements Expression {
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
        } else if (value !== undefined) {
            element.setAttribute(name, value);
        }

        if (
            value === undefined ||
            (value === null && element.hasAttribute(name))
        ) {
            element.removeAttribute(name);
        }

        this.value = value;
    }
}

class ElementExpression implements Expression {
    element: Node | TemplateInterface;
    value: any;

    constructor(element: Node) {
        this.element = element;
        this.value = undefined;
    }

    update(value: any, force: boolean): void {
        const { element } = this;

        if (value === undefined || value === null) {
            value = textNode();
        } else if (!force && value === this.value) {
            return;
        }

        if (Array.isArray(value)) {
            value = new TemplateCollection(value);
        }

        if (isTemplateEqual(element as Template, value)) {
            (element as Template).update(value.values);
        } else if (isNode(value) || isTemplate(value)) {
            replaceContent(
                isTemplate(element)
                    ? (<Template>element).content
                    : [<Node>element],
                isTemplate(value) ? value.create() : value
            );
            this.element = value;
        } else {
            (<Node>element).nodeValue = value;
        }
        this.value = value;
    }
}

/**
 * MAIN FUNCTIONS
 */

export function collection(
    items: any[],
    callback: Function
): TemplateCollection {
    return new TemplateCollection(items.map(<any>callback));
}

export function render(template: TemplateInterface, container: any) {
    if (!container.__template) {
        container.__template = template;
        container.appendChild(template.create());
    } else {
        container.__template.update(template.values);
    }
}

export function html(strings: any, ...values: any[]): Template {
    return new Template([].concat(strings), values);
}

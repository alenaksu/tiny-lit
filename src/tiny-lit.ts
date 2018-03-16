/**
 * UTILS
 */
function typeCheck(obj: any, types: any[]) {
    return types.some((type: any) => obj instanceof type);
}

function replaceContent(content: Node[], node: Node) {
    insertBefore(node, content[0]);
    removeNodes(content);

    return node;
}

function removeNodes(nodes: Node[] | Node): void {
    []
        .concat(<any>nodes)
        .forEach((node: Node) => node.parentNode!.removeChild(node));
}

function treeWalkerFilter(node: any) {
    return node.__skip ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
}
// fix(IE11): expect filter to be a function and not an object
(<any>treeWalkerFilter).acceptNode = treeWalkerFilter;

function createTreeWalker(root: Node): TreeWalker {
    return document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
        treeWalkerFilter as any,
        false
    );
}

function insertBefore(node: Node, before: Node) {
    before.parentNode!.insertBefore(node, before);
}

function isTemplateEqual(t1: Template, t2: Template) {
    return (
        t1.constructor === t2.constructor &&
        ((!t1.strings && !t2.strings) ||
            (t1.strings.length &&
                t2.strings.length &&
                t1.strings.every((s, i) => t2.strings[i] === s)))
    );
}

/**
 * TEMPLATES
 */

interface ExpressionMap {
    [marker: string]: HTMLElement | Function | string;
}

export interface Expression {
    update(value: any, force?: boolean): void;
}

export interface TemplateInterface {
    update(values: any[], force?: boolean): void;
    create(): Node;
}

function attributesToExpressions(
    node: any,
    expressions: ExpressionMap
): AttributeExpression[] {
    return [].reduce.call(
        node.attributes,
        (attributes: AttributeExpression[], attr: Attr) => {
            attr.value in expressions &&
                attributes.push(
                    new AttributeExpression(<Element>node, attr.name)
                );
            return attributes;
        },
        []
    ) as AttributeExpression[];
}

function textsToExpressions(node: Text): Expression[] {
    const keys = node.data.match(/{{__\d+__}}/g) || [];

    return keys.map((key: string) => {
        const keyNode: Text = document.createTextNode(key);
        (<any>keyNode).__skip = true;
        node = node.splitText(node.data.indexOf(key));
        node.deleteData(0, key.length);

        insertBefore(keyNode, node);

        return new ElementExpression(keyNode);
    });
}

function linkExpressions(root: DocumentFragment, expressions: ExpressionMap) {
    const treeWalker = createTreeWalker(root);
    const linkedExpressions: (Expression)[] = [];

    while (treeWalker.nextNode()) {
        const node: any = treeWalker.currentNode;

        if (node.nodeType === Node.TEXT_NODE) {
            linkedExpressions.push(...textsToExpressions(node));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            linkedExpressions.push(
                ...attributesToExpressions(node, expressions)
            );
        }
    }

    return linkedExpressions;
}

function isNode(obj: any) {
    return typeCheck(obj, [Element, DocumentFragment, Text]);
}

function isTemplate(obj: any) {
    return typeCheck(obj, [Template, TemplateCollection]);
}

function createElement(
    strings: string[],
    values: any[]
): { fragment: DocumentFragment; expressions: Expression[] } {
    const expressionsMap: ExpressionMap = {};

    const html = values.reduce((html: string, value: any, i: number) => {
        const marker = `{{__${i}__}}`;
        expressionsMap[marker] = value;

        html += marker + strings[i + 1];

        return html;
    }, strings[0]);

    const wrapper = <DocumentFragment>document
        .createRange()
        .createContextualFragment(html);

    const expressions: any = linkExpressions(wrapper, expressionsMap);

    return {
        fragment: wrapper,
        expressions,
    };
}

export class Template implements TemplateInterface {
    values: any[];
    strings: string[];
    content: Node[] = [];
    expressions: Expression[] = [];

    constructor(strings: string[], values: any[]) {
        this.values = values;
        this.strings = strings;
    }

    update(values: any[], force?: boolean) {
        values.forEach((value: any, i: number) =>
            this.expressions[i].update(value, force)
        );
    }

    create(): DocumentFragment {
        const { fragment, expressions } = createElement(
            this.strings,
            this.values
        );
        this.content = [].slice.call(fragment.childNodes);
        this.expressions = expressions;
        this.update(this.values, true);

        return fragment;
    }
}

export class TemplateCollection implements TemplateInterface {
    values: any[];
    templates: Template[];
    rootNode?: Text;

    constructor(values: any[]) {
        this.values = values;
        this.templates = [];
    }

    private _removeTemplates(from: number, to: number) {
        for (let i: number = from; i <= to; i++) {
            removeNodes(this.templates[i].content);
        }
        this.templates.splice(from, to - from + 1);
    }

    update(items: any[]) {
        const { rootNode, templates } = this;
        items.forEach((template, i) => {
            if (templates[i] && !isTemplateEqual(templates[i], template)) {
                replaceContent(templates[i].content, template.create());
                templates[i] = template;
            } else if (!templates[i]) {
                // ADD
                const node: Node = template.create();
                insertBefore(node, rootNode!);

                templates[i] = template;
            } else {
                // UPDATE
                templates[i].update(template.values);
            }
        });

        // REMOVE
        this._removeTemplates(items.length, templates.length - 1);
    }

    create(): Node {
        const fragment = document.createDocumentFragment();
        this.rootNode = document.createTextNode('');
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

        if (typeof value === 'string') {
            element.setAttribute(name, value);
        } else {
            element.hasAttribute(name) && element.removeAttribute(name);
        }

        if (value !== undefined || (element as any)[name] !== '') {
            (element as any)[name] = value;
        }

        // ???
        currentValue !== undefined &&
            (<any>element).propertyChangedCallback &&
            (<any>element).propertyChangedCallback(name, currentValue, value);

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
            value = document.createTextNode('');
        } else if (!force && value === this.value) {
            return;
        }

        if (
            isTemplate(element) &&
            isTemplate(value) &&
            isTemplateEqual(element as Template, value)
        ) {
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

export interface RenderContainer extends HTMLElement {
    __template: TemplateInterface;
}

export function collection(
    items: any[],
    callback: Function
): TemplateCollection {
    return new TemplateCollection(items.map(<any>callback));
}

export function render(
    template: Template,
    container: any,
    append: boolean = false
) {
    if (!container.__template) {
        container.__template = template;
        !append && (container.innerHTML = '');
        container.appendChild(template.create());
    } else {
        container.__template.update(template.values);
    }
}

export function html(strings: any, ...values: any[]): Template {
    return new Template(strings, values);
}

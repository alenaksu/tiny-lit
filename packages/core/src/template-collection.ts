import { TemplateInterface } from './types';
import {
    TemplateSymbol,
    insertBefore,
    isTemplateEqual,
    replaceContent,
    moveTemplate,
    removeNodes,
    comment
} from './utils';

export class TemplateCollection implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    templates: Map<string, TemplateInterface>;
    rootNode?: Node;

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
        templates.forEach((template: TemplateInterface) =>
            nodes.push(...template.content)
        );

        return nodes;
    }

    update(items: any[]) {
        const { rootNode, templates } = this;

        let currentNode: Node = <Node>rootNode;
        const keys = items.reduce((keys, item, i) => {
            const key: string = String(item.key || i);
            let template = templates.get(key)!;

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
        fragment.appendChild((this.rootNode = comment()));

        this.update(this.values);

        return fragment;
    }
}

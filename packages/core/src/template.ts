import { TemplateInterface, Expression } from './types';
import { parseTemplate } from './parser';
import { TemplateSymbol, removeNodes, text } from './utils';

export class Template implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    strings: TemplateStringsArray;
    range?: [Node, Node];
    expressions?: Expression[];
    context?: string;
    key?: any;

    constructor(
        strings: TemplateStringsArray,
        values: any[],
        context?: string
    ) {
        this.values = values;
        this.strings = strings;
        this.context = context;
    }

    withKey(key: any) {
        this.key = key;
        return this;
    }

    update(values: any[]) {
        for (let i = 0; i < values.length; i++) {
            if (this.expressions![i] !== undefined)
                this.expressions![i].update(values[i]);
        }
    }

    delete() {
        removeNodes(this.range![0], this.range![1].nextSibling);
        this.range = undefined;
        this.expressions = undefined;
    }

    create(): DocumentFragment {
        const { fragment, expressions } = parseTemplate(
            this.strings,
            this.context
        );
        this.expressions = expressions;
        this.range = [
            fragment.insertBefore(text(), fragment.firstChild),
            fragment.appendChild(text())
        ];

        this.update(this.values);

        return fragment;
    }
}

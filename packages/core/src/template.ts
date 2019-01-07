import { TemplateInterface, Expression, } from './types';
import { createElement } from './parser';
import { TemplateSymbol, removeNodes } from './utils';

export class Template implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    strings: TemplateStringsArray;
    range?: [Node, Node];
    expressions?: Expression[];
    key?: any;

    constructor(strings: TemplateStringsArray, values: any[]) {
        this.values = values;
        this.strings = strings;
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
        removeNodes(...this.range!);
        this.range = undefined;
        this.expressions = undefined;
    }

    create(): DocumentFragment {
        const { fragment, expressions } = createElement(
            this.strings,
            this.values
        );
        this.expressions = expressions;
        this.range = [fragment.firstChild!, fragment.lastChild!];

        this.update(this.values);

        return fragment;
    }
}

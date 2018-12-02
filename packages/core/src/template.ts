import { TemplateInterface, Expression, NodeRange } from './types';
import { createElement } from './parser';
import { TemplateSymbol, removeNodes } from './utils';

export class Template implements TemplateInterface {
    [TemplateSymbol] = true;
    values: any[];
    strings: TemplateStringsArray;
    range?: NodeRange;
    expressions?: Expression[];
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
            if (this.expressions![i] !== undefined)
                this.expressions![i].update(values[i], force);
        }
    }

    delete() {
        removeNodes(<Node[]>this.range!);
        this.range = undefined;
        this.expressions = [];
    }

    create(): DocumentFragment {
        const { fragment, expressions } = createElement(
            this.strings,
            this.values
        );
        this.expressions = expressions;
        this.range = [fragment.firstChild!, fragment.lastChild!];

        this.update(this.values, true);

        return fragment;
    }
}

import { TemplateInterface, Expression } from './types';
import { createElement } from './parser';
import { TemplateSymbol } from './utils';

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

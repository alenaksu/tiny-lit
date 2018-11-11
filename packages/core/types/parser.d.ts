import { Expression } from './types';
export declare function createElement(strings: TemplateStringsArray, values: any[]): {
    fragment: DocumentFragment;
    expressions: Expression[];
};

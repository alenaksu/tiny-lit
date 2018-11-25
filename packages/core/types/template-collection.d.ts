import { TemplateInterface } from './types';
import { TemplateSymbol } from './utils';
export declare class TemplateCollection implements TemplateInterface {
    [TemplateSymbol]: boolean;
    values: any[];
    templates: Map<string, TemplateInterface>;
    rootNode?: Node;
    constructor(values: any[]);
    private _flushTemplates;
    readonly content: Node[];
    update(items: any[]): void;
    create(): Node;
}

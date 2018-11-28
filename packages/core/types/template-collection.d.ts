import { TemplateInterface } from './types';
import { TemplateSymbol } from './utils';
export declare class TemplateCollection implements TemplateInterface {
    [TemplateSymbol]: boolean;
    values: any[];
    templates: Map<string, TemplateInterface>;
    range: Node[];
    rootNode?: Node;
    constructor(values: any[]);
    private _flushTemplates;
    delete(): void;
    update(items: any[]): void;
    create(): Node;
}

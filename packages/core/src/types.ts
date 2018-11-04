export interface ExpressionMap
    extends Map<string, HTMLElement | Function | string> {}

export interface Expression {
    update(value: any, force?: boolean): void;
}

export interface TemplateInterface {
    update(values: any[], force?: boolean): void;
    create(): Node;
    content: Node[];
    values: any[];
}

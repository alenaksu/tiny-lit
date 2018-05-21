export interface Type<T> extends Function {
    new (): T;
}

export interface IElement {
    state: any;
    slot: TemplateInterface;
    readonly scheduler: IScheduler;
    getTemplate(): TemplateInterface;
    render(): void;
    setState(nextState: object | Function): void;
}

export interface ScheduledFunction extends Function {
    _priority: number;
    _scheduled: boolean;
}

export interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining(): number;
}

export interface IScheduler {
    defer(fn: ScheduledFunction): () => void;
}

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

export interface RenderContainer extends HTMLElement {
    __template: TemplateInterface;
}

export type Constructor<T> = new (...args: any[]) => T;

export interface Element {
    state: any;
    slot: Template[];
    readonly scheduler: Scheduler;
    getTemplate(): Template;
    render(): void;
    setState(nextState: object | Function, callback?: Function): void;
    renderCallbacks: Array<Function>;
}

export interface ScheduledFunction extends Function {
    _priority?: number;
    _scheduled?: boolean;
}

export interface IdleDeadline {
    didTimeout: boolean;
    timeRemaining(): number;
}

export interface Scheduler {
    defer(fn: ScheduledFunction): () => void;
}

export interface ExpressionMap
    extends Map<string, HTMLElement | Function | string> {}

export interface Expression {
    update(value: any, force?: boolean): void;
}

export interface Template {
    update(values: any[], force?: boolean): void;
    create(): Node;
    content: Node[];
    values: any[];
}

export interface RenderContainer extends HTMLElement {
    __template: Template;
}

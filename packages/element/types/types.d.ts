import { Template } from '@tiny-lit/core';
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export interface Element {
    state: any;
    slot: Template[];
    readonly scheduler: Scheduler;
    render(): Template;
    update(): void;
    setState(nextState: object | Function, callback?: Function): void;
    renderCallbacks: Array<Function>;
}
export interface CustomElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    observedAttributes?: Array<string>;
}
export declare type ElementProperties<T> = {
    [P in keyof T]?: T[P];
};
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

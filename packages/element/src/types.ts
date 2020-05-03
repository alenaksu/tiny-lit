import { Template } from '@tiny-lit/core';

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface Element {
    state: any;
    render(): Template | null;
    update(): void;
    setState(nextState: object | Function, callback?: Function): void;
    renderCallbacks: Array<Function>;
    renderRoot: HTMLElement | ShadowRoot;
}

export interface CustomElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;
    attributeChangedCallback?(
        name: string,
        oldValue: string,
        newValue: string
    ): void;
    observedAttributes?: Array<string>;
}

export type PropertyDescriptor = {
    type: Function;
    onChange?: Function;
};

export type ElementProperties<T> = { [P in keyof T]?: T[P] };

export type AttributeMap = Map<string, string>;

export const PROPS = Symbol();
export const ATTRS = Symbol();
import { Template } from '@tiny-lit/core';
import { Constructor, Scheduler as SchedulerInterface } from './types';
export declare function withElement<T extends Constructor>(Base: T): {
    new (...args: any[]): {
        state: any;
        __childNodes: Node[];
        rendered: boolean;
        renderCallbacks: Function[];
        readonly scheduler: SchedulerInterface;
        readonly slot: Template[];
        connectedCallback(): void;
        setState(nextState: object | Function, callback?: Function | undefined): void;
        getTemplate(): Template;
        render: () => void;
    };
} & T;
export declare function withProps<T extends Constructor>(Base: T): {
    new (...args: any[]): {
        [propName: string]: any;
        __props: object;
        attributeChangedCallback(name: string, _: string, newValue: string): void;
    };
    readonly observedAttributes: string[];
} & T;
export declare const Element: {
    new (...args: any[]): {
        [propName: string]: any;
        __props: object;
        attributeChangedCallback(name: string, _: string, newValue: string): void;
    };
    readonly observedAttributes: string[];
} & {
    new (...args: any[]): {
        state: any;
        __childNodes: Node[];
        rendered: boolean;
        renderCallbacks: Function[];
        readonly scheduler: SchedulerInterface;
        readonly slot: Template[];
        connectedCallback(): void;
        setState(nextState: object | Function, callback?: Function | undefined): void;
        getTemplate(): Template;
        render: () => void;
    };
} & {
    new (): HTMLElement;
    prototype: HTMLElement;
};
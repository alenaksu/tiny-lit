import { Template } from '@tiny-lit/core';
import { Constructor, Scheduler as SchedulerInterface } from './types';
export declare function withElement<T extends Constructor>(Base: T): {
    new (...args: any[]): {
        state: any;
        rendered: boolean;
        renderCallbacks: Function[];
        readonly scheduler: SchedulerInterface;
        connectedCallback(): void;
        setState(nextState: object | Function, callback?: Function | undefined): void;
        render(): Template;
        update: () => void;
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
        rendered: boolean;
        renderCallbacks: Function[];
        readonly scheduler: SchedulerInterface;
        connectedCallback(): void;
        setState(nextState: object | Function, callback?: Function | undefined): void;
        render(): Template;
        update: () => void;
    };
} & {
    new (): HTMLElement;
    prototype: HTMLElement;
};

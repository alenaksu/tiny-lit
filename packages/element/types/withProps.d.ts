import { Constructor } from './types';
export declare function withProps<T extends Constructor>(Base: T): {
    new (...args: any[]): {
        [propName: string]: any;
        __props: object;
        attributeChangedCallback(name: string, _: string, newValue: string): void;
    };
    readonly observedAttributes: string[];
} & T;

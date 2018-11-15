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
        readonly scheduler: import("./types").Scheduler;
        connectedCallback(): void;
        setState(nextState: object | Function, callback?: Function | undefined): void;
        render(): import("../../core/types/template").Template | null;
        update: () => void;
    };
} & {
    new (): HTMLElement;
    prototype: HTMLElement;
};

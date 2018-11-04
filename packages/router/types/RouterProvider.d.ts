import { Router } from './router';
export declare class RouterProvider extends HTMLElement {
    router?: Router;
    onRouterRequest: (e: CustomEvent<{
        router?: import("./types").Router | undefined;
    }>) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

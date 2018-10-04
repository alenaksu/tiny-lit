import { Router } from '../router';
export declare class RouterProvider extends HTMLElement {
    router: Router;
    constructor();
    onRouterRequest: (e: CustomEvent<{
        router?: import("../types").Router | undefined;
    }>) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

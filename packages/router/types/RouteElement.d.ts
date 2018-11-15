import { Router } from './types';
export declare class RouteElement extends HTMLElement {
    router?: Router;
    moduleLoaded?: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

import { Router } from './types';
export declare class RouteElement extends HTMLElement {
    router?: Router;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

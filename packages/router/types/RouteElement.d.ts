import { Router } from './types';
export declare class RouteElement extends HTMLElement {
    router?: Router;
    dispose?: Function;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

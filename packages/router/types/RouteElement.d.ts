import { Router } from './types';
export declare class RouteElement extends HTMLElement {
    router?: Router;
    moduleLoaded?: boolean;
    dispose?: Function;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

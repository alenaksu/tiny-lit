import { Router } from './types';
export declare class RouteElement extends HTMLElement {
    router?: Router;
    moduleLoaded?: boolean;
    offRoute?: Function;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

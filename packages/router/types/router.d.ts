import { RouteLifecycle, Route, Router as RouterInterface } from './types';
import { RouterOptions } from './types';
export declare class Router implements RouterInterface {
    routes: Map<string, Route>;
    current?: Route;
    constructor({ interceptLocal }: RouterOptions);
    handleLocalClick: (e: any) => void;
    on(path: string, { onEnter, onLeave, onUpdate }: RouteLifecycle): this;
    off(path: string): this;
    resolve: () => this;
    goTo(path: any): this;
}

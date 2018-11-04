import { RouteLifecycle, Route, Router as RouterInterface, HistoryInterface } from './types';
import { RouterOptions } from './types';
export declare class Router implements RouterInterface {
    history: HistoryInterface;
    routes: Map<string, Route>;
    current?: Route;
    constructor({ interceptLocals, useHash }: RouterOptions);
    handleLocalClick: (e: any) => void;
    on(path: string, { onEnter, onLeave, onUpdate }: RouteLifecycle): void;
    off(path: string): void;
    resolve: () => void;
    goTo(path: any): void;
}

import { RouteCallbacks, Route, Router as RouterInterface, HistoryInterface } from './types';
import { RouterOptions } from './types';
export declare class Router implements RouterInterface {
    history: HistoryInterface;
    routes: Array<Route>;
    current?: Route;
    constructor({ interceptLocals, useHash }: RouterOptions);
    handleLocalClick: (e: any) => void;
    on(path: string, callbacks: RouteCallbacks): () => Route[];
    resolve: () => void;
    goTo(path: any): void;
}

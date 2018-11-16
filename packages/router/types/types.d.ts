export interface RouteCallbacks {
    onEnter?(matches: any): any;
    onLeave?(matches: any): any;
    onUpdate?(matches: any): any;
}
export declare const enum RouteComponentCallbacks {
    onRouteUpdate = "onRouteUpdate",
    onRouteEnter = "onRouteEnter",
    onRouteLeave = "onRouteLeave"
}
export interface RouteComponent extends HTMLElement {
    [RouteComponentCallbacks.onRouteEnter]?(matches: any): any;
    [RouteComponentCallbacks.onRouteUpdate]?(matches: any): any;
    [RouteComponentCallbacks.onRouteLeave]?(): any;
}
export declare type Route = {
    regex: RegExp;
    callbacks: RouteCallbacks;
    path: string;
};
export declare enum RouterEvents {
    Request = "router::request",
    Change = "router::change"
}
export interface Router {
    routes: Array<Route>;
    current?: Route;
    on(path: string, callbacks: RouteCallbacks): Function;
    resolve(): any;
    goTo(path: any): any;
}
export declare type RequestRouterEvent = CustomEvent<{
    router?: Router;
}>;
export declare type RouterOptions = {
    interceptLocals?: boolean;
    useHash?: Boolean;
};
export declare type HistoryInterface = {
    path(): string;
    go(path: string): void;
    listen(callback: () => void): Function;
};

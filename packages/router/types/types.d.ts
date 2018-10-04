export interface RouteLifecycle {
    onEnter?(matches: any): any;
    onLeave?(matches: any): any;
    onUpdate?(matches: any): any;
}
export interface RouteComponent extends HTMLElement {
    onRouteUpdate?(matches: any): any;
    onRouteEnter?(matches: any): any;
    onRouteLeave?(): any;
}
export declare type Route = {
    regex: RegExp;
} & RouteLifecycle;
export declare enum RouterEvents {
    Request = "router::request",
    Change = "router::change"
}
export interface Router {
    routes: Map<string, Route>;
    current?: Route;
    on(path: string, { onEnter, onLeave, onUpdate }: RouteLifecycle): any;
    off(path: string): any;
    resolve(): any;
    goTo(path: any): any;
}
export declare type RequestRouterEvent = CustomEvent<{
    router?: Router;
}>;
export declare type RouterOptions = {
    interceptLocal?: boolean;
};

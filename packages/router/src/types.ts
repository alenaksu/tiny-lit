export interface RouteLifecycle {
    onEnter?(matches: any);
    onLeave?(matches: any);
    onUpdate?(matches: any);
}

export interface RouteComponent extends HTMLElement {
    onRouteUpdate?(matches: any);
    onRouteEnter?(matches: any);
    onRouteLeave?();
}

export type Route = {
    regex: RegExp;
} & RouteLifecycle;

export enum RouterEvents {
    Request = 'router::request',
    Change = 'router::change'
}

export interface Router {
    routes: Map<string, Route>;
    current?: Route;
    on(path: string, { onEnter, onLeave, onUpdate }: RouteLifecycle);
    off(path: string);
    resolve();
    goTo(path);
}

export type RequestRouterEvent = CustomEvent<{ router?: Router }>;

export type RouterOptions = {
    interceptLocals?: boolean;
    useHash?: Boolean;
};

export type HistoryInterface = {
    path(): string;
    go(path: string): void;
    listen(callback: () => void): Function;
};

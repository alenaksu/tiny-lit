export interface RouteCallbacks {
    onEnter?(matches: any);
    onLeave?(matches: any);
    onUpdate?(matches: any);
}

export const enum RouteComponentCallbacks {
    onRouteUpdate = 'onRouteUpdate',
    onRouteEnter = 'onRouteEnter',
    onRouteLeave = 'onRouteLeave'
}

export interface RouteComponent extends HTMLElement {
    [RouteComponentCallbacks.onRouteEnter]?(matches: any);
    [RouteComponentCallbacks.onRouteUpdate]?(matches: any);
    [RouteComponentCallbacks.onRouteLeave]?();
}

export type Route = {
    regex: RegExp;
} & RouteCallbacks;

export enum RouterEvents {
    Request = 'router::request',
    Change = 'router::change'
}

export interface Router {
    routes: Map<string, Route>;
    current?: Route;
    on(path: string, callbacks: RouteCallbacks);
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

import { Router, RouteComponent, RouteComponentCallbacks } from './types';
import { requestRouter } from './events';

const callCallback = (
    route: RouteElement,
    component: HTMLElement,
    name: RouteComponentCallbacks,
    params?: any
) =>
    Promise.resolve(
        route.moduleLoaded ||
            !route.hasAttribute('module') ||
            (import(route.getAttribute('module')!) &&
                (route.moduleLoaded = true))
    ).then(() => component[name] && component[name](params));

export class RouteElement extends HTMLElement {
    router?: Router;
    moduleLoaded?: boolean;

    connectedCallback() {
        const path = this.getAttribute('path'),
            componentName = this.getAttribute('component');

        if (!path || !componentName) return;

        if ((this.router = requestRouter(this))) {
            const component: RouteComponent = document.createElement(
                componentName
            );

            this.router.on(path, {
                onEnter: params => {
                    callCallback(
                        this,
                        component,
                        RouteComponentCallbacks.onRouteEnter,
                        params
                    );
                    this.appendChild(component);
                },
                onUpdate: params => {
                    callCallback(
                        this,
                        component,
                        RouteComponentCallbacks.onRouteUpdate,
                        params
                    );
                },
                onLeave: () => {
                    callCallback(
                        this,
                        component,
                        RouteComponentCallbacks.onRouteLeave
                    );
                    this.removeChild(component);
                }
            });
        }
    }

    disconnectedCallback() {
        if (this.router) this.router.off(this.getAttribute('path')!);
    }
}

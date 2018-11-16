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
        import(route.getAttribute('module')!)
    )
        .then(() => customElements.whenDefined(component.localName))
        .then(() => {
            component[name] && component[name](params)
            route.moduleLoaded = true;
        });

export class RouteElement extends HTMLElement {
    router?: Router;
    moduleLoaded?: boolean;
    dispose?: Function;

    connectedCallback() {
        const path = this.getAttribute('path'),
            componentName = this.getAttribute('component');

        if (!path || !componentName) return;

        if ((this.router = requestRouter(this))) {
            const component: RouteComponent = document.createElement(
                componentName
            );

            this.dispose = this.router.on(path, {
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
        if (this.dispose) this.dispose();
    }
}

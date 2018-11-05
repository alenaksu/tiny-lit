import { Router, RouteComponent } from './types';
import { requestRouter } from './events';

export class RouteElement extends HTMLElement {
    router?: Router;

    connectedCallback() {
        if ((this.router = requestRouter(this))) {
            const path = this.getAttribute('path'),
                componentName = this.getAttribute('component');

            if (!path || !componentName) return;

            const component: RouteComponent = document.createElement(
                componentName
            );

            this.router.on(path, {
                onEnter: params => {
                    if (component.onRouteEnter) component.onRouteEnter(params);
                    this.appendChild(component);
                },
                onUpdate: params => {

                    if (component.onRouteUpdate) component.onRouteUpdate(params);
                },
                onLeave: () => {
                    if (component.onRouteLeave) component.onRouteLeave();
                    this.removeChild(component);
                }
            });
        }
    }

    disconnectedCallback() {
        const path = this.getAttribute('path');
        if (this.router && path) this.router.off(path);
    }
}

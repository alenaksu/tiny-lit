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

                    this.appendChild(component);

                    if (component.onRouteEnter) component.onRouteEnter(params);
                },
                onUpdate: params => {

                    if (component.onRouteUpdate) component.onRouteUpdate(params);
                },
                onLeave: () => {
                    this.removeChild(component);

                    if (component.onRouteLeave) component.onRouteLeave();
                }
            });
        }
    }

    disconnectedCallback() {
        const path = this.getAttribute('path');
        if (this.router && path) this.router.off(path);
    }
}

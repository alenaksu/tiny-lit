import { Router, RouteComponent } from './types';
import { requestRouter } from './events';

const waitComponent = (
    route: RouteElement,
    component: HTMLElement
) =>
    Promise.resolve(
        !route.hasAttribute('module') ||
        import(route.getAttribute('module')!)
    )
        // TODO check element upgrade
        .then(() => customElements.whenDefined(component.localName));

export class RouteElement extends HTMLElement {
    router?: Router;
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
                    waitComponent(
                        this,
                        component
                    ).then(() =>
                        this.appendChild(component)
                    ).then(() => component.onRouteEnter && component.onRouteEnter(params));
                },
                onUpdate: params => {
                    waitComponent(
                        this,
                        component
                    ).then(() => component.onRouteUpdate && component.onRouteUpdate(params));
                },
                onLeave: () => {
                    waitComponent(
                        this,
                        component
                    )
                        .then(() => component.onRouteLeave && component.onRouteLeave())
                        .then(() =>
                            this.removeChild(component)
                        );
                }
            });
        }
    }

    disconnectedCallback() {
        if (this.dispose) this.dispose();
    }
}

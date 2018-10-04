import { Router } from './router';
import { RouterEvents, RequestRouterEvent } from './types';

export class RouterProvider extends HTMLElement {
    router: Router;

    constructor() {
        super();

        this.router = new Router({ interceptLocal: true });
    }

    onRouterRequest = (e: RequestRouterEvent) => {
        e.detail.router = this.router;
    }

    connectedCallback() {
        document.body.addEventListener(RouterEvents.Request, <any>this.onRouterRequest, true);

        requestAnimationFrame(() => this.router.resolve());
    }

    disconnectedCallback() {
        document.body.removeEventListener(RouterEvents.Request, <any>this.onRouterRequest, true);
    }
}

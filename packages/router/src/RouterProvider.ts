import { Router } from './router';
import { RouterEvents, RequestRouterEvent } from './types';

export class RouterProvider extends HTMLElement {
    router?: Router;

    onRouterRequest = (e: RequestRouterEvent) => {
        e.detail.router = this.router;
    }

    connectedCallback() {
        document.body.addEventListener(RouterEvents.Request, <any>this.onRouterRequest, true);

        if (!this.router) {
            this.router = new Router({
                interceptLocals: this.hasAttribute('intercept-locals'),
                useHash: this.hasAttribute('use-hash')
             });
        }

        Promise.resolve().then(this.router!.resolve);
    }

    disconnectedCallback() {
        document.body.removeEventListener(RouterEvents.Request, <any>this.onRouterRequest, true);
    }
}

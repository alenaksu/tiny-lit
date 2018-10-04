import { RouterEvents, RequestRouterEvent, Router } from "./types";

export function requestRouter(el: HTMLElement): Router | undefined {
    const event: RequestRouterEvent = new CustomEvent(RouterEvents.Request, { detail: {} });
    el.dispatchEvent(event);

    return event.detail.router;
}
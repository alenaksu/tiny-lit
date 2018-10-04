import {
    StoreEvents,
    StoreEvent,
    Mutation,
    UpdateEvent,
    DispatchEvent,
    RequestStoreEvent,
    StoreProviderInterface,
} from './types';

export function normalizeEvent(fn) {
    return (event: string | StoreEvent, data?: any) => {
        if (typeof event === 'string') event = { type: event, data };

        return fn(event);
    };
}

export function requestStore(el: HTMLElement): StoreProviderInterface | undefined {
    const event = new CustomEvent(StoreEvents.Request, { detail: {} }) as RequestStoreEvent;
    el.dispatchEvent(event);

    return event.detail.store;
}

export function createUpdateEvent(
    state: any,
    mutation?: Mutation
): UpdateEvent {
    return new CustomEvent(StoreEvents.Update, {
        detail: {
            state,
            mutation,
        },
    });
}

export function createDispatchEvent(type: string, data?: any): DispatchEvent {
    return new CustomEvent(StoreEvents.Dispatch, {
        detail: {
            type,
            data,
        },
    });
}

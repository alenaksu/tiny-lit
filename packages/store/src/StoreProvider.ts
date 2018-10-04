import {
    StoreEvents,
    StoreInterface,
    StoreProviderInterface,
    Mutation,
    StoreConfig,
    RequestStoreEvent,
} from './types';
import { createUpdateEvent } from './events';
import { createStore } from './store';

export abstract class StoreProvider extends HTMLElement
    implements StoreProviderInterface {
    store?: StoreInterface = undefined;
    listeners: WeakMap<object, Function> = new WeakMap();

    constructor() {
        super();

        this.addEventListener(StoreEvents.Request, <any>this.onStoreRequest, true);
        this.addEventListener(StoreEvents.Dispatch, this.onStoreDispatch, true);

        this.store = createStore(this.config);
        this.store.subscribe(this.onStateChange);
    }

    get config(): StoreConfig {
        return {};
    }

    getStore(): StoreInterface {
        return this.store!;
    }

    onStateChange = (state: any, mutation?: Mutation) =>
        this.dispatchEvent(createUpdateEvent(state, mutation))

    onStoreRequest = (event: RequestStoreEvent) => {
        event.stopPropagation();
        event.detail.store = this;
    }

    onStoreDispatch = (event: Event) => {
        this.getStore().dispatch((<CustomEvent>event).detail);
    }
}

import { StoreInterface, StoreProviderInterface, StoreConfig } from './types';
export declare abstract class StoreProvider extends HTMLElement implements StoreProviderInterface {
    store?: StoreInterface;
    listeners: WeakMap<object, Function>;
    constructor();
    readonly config: StoreConfig;
    getStore(): StoreInterface;
    onStateChange: (state: any, mutation?: import("./types").StoreEvent | undefined) => boolean;
    onStoreRequest: (event: CustomEvent<{
        store?: StoreProviderInterface | undefined;
    }>) => void;
    onStoreDispatch: (event: Event) => void;
}

export interface CustomElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;
    attributeChangedCallback?(name: string, oldValue: string, newValue: string): void;
    observedAttributes?: Array<string>;
}
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export interface StoreEvent {
    type: string;
    data: any;
}
export declare type Action = StoreEvent;
export declare type Mutation = StoreEvent;
export declare type SubcribeCallback = (state: any, mutation?: Mutation) => void;
export interface UpdateEvent extends CustomEvent {
    detail: {
        mutation?: Mutation;
        state: any;
    };
}
export interface DispatchEvent extends CustomEvent {
    detail: Action;
}
export interface StoreProviderInterface extends HTMLElement {
    getStore(): StoreInterface;
    config: StoreConfig;
}
export interface StoreConnectedElement {
    unsubscribe?: Function;
    onStateChange?(state: any, mutation?: Mutation): any;
    onStoreConnect?(unsubscribe: Function): any;
}
export interface StoreInterface {
    state: any;
    mutations: Map<string, MutationHandler>;
    actions: Map<string, ActionHandler>;
    dispatch(action: string | Action, payload?: any): any;
    subscribe(callback: Function): any;
    commit(mutation: string): any;
}
export declare type MutationHandler = (state?: any, data?: any) => object;
export declare type ActionHandler = (store: StoreInterface, payload: any) => void;
export declare type PluginHandler = (store: StoreInterface) => void;
export declare type StoreConfig = {
    actions?: {
        [name: string]: ActionHandler;
    };
    mutations?: {
        [name: string]: MutationHandler;
    };
    initialState?: any;
    plugins?: Array<PluginHandler>;
};
export declare enum StoreEvents {
    Request = "store::request",
    Dispatch = "store::dispatch",
    Update = "store::update"
}
export declare type RequestStoreEvent = CustomEvent<{
    store?: StoreProviderInterface;
}>;

export interface CustomElement {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    adoptedCallback?(): void;
    attributeChangedCallback?(
        name: string,
        oldValue: string,
        newValue: string
    ): void;
    observedAttributes?: Array<string>;
}
export type Constructor<T = {}> = new (...args: any[]) => T;
export interface StoreEvent {
    type: string;
    data: any;
}

export type Action = StoreEvent;
export type Mutation = StoreEvent;

export type SubcribeCallback = (state: any, mutation?: Mutation) => void;

export interface UpdateEvent extends CustomEvent {
    detail: {
        mutation?: Mutation;
        state: any;
    };
}

export interface DispatchEvent extends CustomEvent {
    detail: Action;
}

export interface StoreProviderInterface extends HTMLElement{
    getStore(): StoreInterface;
    config: StoreConfig;
}
export interface StoreConnectedElement {
    unsubscribe?: Function;
    onStateChange?(state: any, mutation?: Mutation);
    onStoreConnect?(unsubscribe: Function);
}

export interface StoreInterface {
    state: any;
    mutations: Map<string, MutationHandler>;
    actions: Map<string, ActionHandler>;
    dispatch(action: string | Action, payload?: any);
    subscribe(callback: Function);
    commit(mutation: string);
}

export type MutationHandler = (state?: any, data?: any) => void;
export type ActionHandler = (store: StoreInterface, payload: any) => void;
export type PluginHandler = (store: StoreInterface) => void;

export type StoreConfig = {
    actions?: { [name: string]: ActionHandler };
    mutations?: { [name: string]: MutationHandler };
    initialState?: any;
    plugins?: Array<PluginHandler>;
};

export enum StoreEvents {
    Request = 'store::request',
    Dispatch = 'store::dispatch',
    Update = 'store::update',
}

export type RequestStoreEvent = CustomEvent<{ store?: StoreProviderInterface }>;
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

export type Reducer = (state: any, action: Action) => any;

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
    dispatch(action: string | Action, payload?: any);
    subscribe(callback: Function);
    commit(mutation: string);
}

export type StoreConfig = {
    actions?: { [name: string]: (store: StoreInterface, payload: any) => void };
    mutations?: { [name: string]: (state?: any, data?: any) => void };
    initialState?: any;
    plugins?: Array<(store: StoreInterface) => void>;
};

export enum StoreEvents {
    Request = 'store::request',
    Dispatch = 'store::dispatch',
    Update = 'store::update',
}

export type RequestStoreEvent = CustomEvent<{ store?: StoreProviderInterface }>;
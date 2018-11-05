import { StoreConfig, StoreInterface, SubcribeCallback, MutationHandler, ActionHandler } from './types';
declare const StateProp: unique symbol;
export declare class Store<S = any> implements StoreInterface {
    [StateProp]: S;
    readonly mutations: Map<string, MutationHandler>;
    readonly actions: Map<string, ActionHandler>;
    listeners: Set<Function>;
    constructor(store?: StoreConfig);
    dispatch: (event: string | import("./types").StoreEvent, data?: any) => any;
    readonly state: S;
    subscribe(callback: SubcribeCallback): () => boolean;
    commit: (event: string | import("./types").StoreEvent, data?: any) => any;
}
export declare const createStore: (store: StoreConfig) => Store<any>;
export {};

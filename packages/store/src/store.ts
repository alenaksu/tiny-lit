import {
    Action,
    StoreConfig,
    StoreInterface,
    Mutation,
    SubcribeCallback,
    MutationHandler,
    ActionHandler
} from './types';

import { normalizeEvent } from './events';

const StateProp = Symbol();

const objToMap = (obj: any, map: Map<any, any>) => {
    for (const key in obj) map.set(key, obj[key]);
};

export class Store<S = any> implements StoreInterface {
    [StateProp]: S = {} as S;
    readonly mutations: Map<string, MutationHandler> = new Map();
    readonly actions: Map<string, ActionHandler> = new Map();
    private listeners: Set<Function> = new Set();

    constructor(store: StoreConfig = {}) {
        objToMap(store.mutations, this.mutations);
        objToMap(store.actions, this.actions);

        this[StateProp] = { ...store.initialState };

        store.plugins!.forEach(plugin => plugin(this));
    }

    dispatch = normalizeEvent((action: Action) => {
        const actions = this.actions!;
        if (action.type in actions) actions[action.type](this, action.data);
    });

    get state() {
        return this[StateProp];
    }

    subscribe(callback: SubcribeCallback) {
        const { listeners } = this;

        const handler = (mutation?: Mutation) => callback(this.state, mutation);

        listeners.add(handler);
        callback(this.state);

        return () => listeners.delete(handler);
    }

    commit = normalizeEvent((mutation: Mutation) => {
        const mutations = this.mutations!;
        if (mutation.type in mutations)
            mutations[mutation.type](this.state, mutation.data);

        this.listeners.forEach(listener => listener(mutation));
    });
}

export const createStore = (store: StoreConfig) => {
    return new Store(store);
};

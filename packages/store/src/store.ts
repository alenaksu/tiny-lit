import {
    Action,
    StoreConfig,
    StoreInterface,
    Mutation,
    SubcribeCallback,
} from './types';

import { normalizeEvent } from './events';

const StateProp = Symbol();

export class Store<S = any> implements StoreInterface {
    [StateProp]: S = {} as S;
    config: StoreConfig;
    listeners: Set<Function> = new Set();

    constructor(store: StoreConfig) {
        this.config = {
            mutations: {},
            actions: {},
            initialState: {},
            plugins: [],
            ...store
        };
        this[StateProp] = this.config.initialState;

        this.config.plugins!.forEach(plugin => plugin(this));
    }

    dispatch = normalizeEvent((action: Action) => {
        const actions = this.config.actions!;
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
        const mutations = this.config.mutations!;
        if (mutation.type in mutations)
            mutations[mutation.type](this.state, mutation.data);

        this.listeners.forEach(listener => listener(mutation));
    });
}

export const createStore = (store: StoreConfig) => {
    return new Store(store);
};

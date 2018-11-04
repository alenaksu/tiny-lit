import { StoreEvent, Mutation, UpdateEvent, DispatchEvent, StoreProviderInterface } from './types';
export declare function normalizeEvent(fn: any): (event: string | StoreEvent, data?: any) => any;
export declare function requestStore(el: HTMLElement): StoreProviderInterface | undefined;
export declare function createUpdateEvent(state: any, mutation?: Mutation): UpdateEvent;
export declare function createDispatchEvent(type: string, data?: any): DispatchEvent;

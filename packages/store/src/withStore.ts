import {
    Constructor,
    CustomElement,
    StoreConnectedElement,
    StoreEvents,
    UpdateEvent,
    Mutation
} from './types';
import { requestStore, createDispatchEvent } from './events';

export function withStore<T extends Constructor<CustomElement & HTMLElement>>(
    Base: T
) {
    return class extends Base implements StoreConnectedElement {
        unsubscribe?: Function;

        connectedCallback() {
            if (super.connectedCallback) super.connectedCallback();

            let store;
            if (store = requestStore(this)) {
                const handler = e =>
                    this.onStateChange!(
                        (<UpdateEvent>e).detail.state,
                        (<UpdateEvent>e).detail.mutation
                    );
                store.addEventListener(StoreEvents.Update, handler, true);
                this.unsubscribe = store.removeEventListener.bind(
                    this,
                    StoreEvents.Update,
                    handler,
                    true
                );

                this.onStateChange(store.getStore().state);
            }
        }

        disconnectedCallback() {
            if (super.disconnectedCallback) super.disconnectedCallback();

            this.unsubscribe!();
        }

        onStoreConnect() { }

        onStateChange(_: any, __?: Mutation) { }

        dispatch(type: string, data?: any) {
            this.dispatchEvent(createDispatchEvent(type, data));
        }
    };
}

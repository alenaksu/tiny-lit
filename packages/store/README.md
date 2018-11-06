# @tiny-lit/store

A framework-agnostic centralized state management based on the [Vuex](https://github.com/vuejs/vuex) pattern

## Installation

To install with npm

```
npm i --save @tiny-lit/store
```

or with yarn

```
yarn add @tiny-lit/store
```

## Introduction

A store uses **actions** and **mutations** to bring changes to the state.

### Actions

Action handlers are pure functions that accepts the store class and data as arguments. They can contain async operations and MUST NOT directly mutate the state, but they may commit mutations.

```ts
type ActionHandler = (store: StoreInterface, data: any) => void;
```

### Mutations

Like actions also mutations handlers are pure function. The first parameter is the state object and the second is the data.

```ts
type MutationHandler = (state?: any, data?: any) => void;
```

### Plugins

A plugin is a function, called just after the initialization of the store, that receive the store instance in the first argument.

```ts
type PluginHandler = (store: StoreInterface) => void;
```

## Getting started

### Options

You can create a store using `createStore` function passing a configuration object.

These are the options you can specify in the configuration:

-   `actions` an object containing the actions
-   `mutations` and object containing the mutations
-   `initialState` the initial state of your application
-   `plugins` and array of plugins


### Methods

- `subscribe` Registers a handler to the store listening for changes. It will return an unsubscribe function.
```ts
subscribe(callback: (state: any, mutation?: Mutation) => void) => Function
```
- `commit` Applies the mutation provided.
```ts
commit(type: string, data:any) => void
commit(mutation: {
    type: string;
    data: any;
}) => void
```

### Properties

- `mutations` A map of the registered mutations
- `actions` A map of the registered actions
- `state` The state

### Example

This is a basic example on how to create a store:

```js
import { createStore } from '@tiny-lit/store';

const consolePlugin = store => store.subscribe(console.log);

const myStore = createStore({
    config = {
        actions: {
            incrementCounter(store, data) {
                store.commit('setCount', store.state + data)
            },
            decrementCounter(store, data) {
                store.commit('setCount', store.state - data)
            },
            asyncIncrement(store) {
                store.commit('setCount', 0);
                fetch('https://www.example.com')
                    .then(response => response.json())
                    .then(({ counter }) => {
                        store.commit('setCount', counter);
                    })
            }
        },
        mutations: {
            setCount(state, data) {
                state.count = data
            }
        },
        initialState: {
            count: 0
        },
        plugins: [consolePlugin]
    }
})
```

## Use with custom elements

### Provider

To use the store in conjuction with your custom elements, you need to create a Provider element for your store.

To do that, simply create an element extending the `StoreProvider` class and implementing a getter named `config` 
that will return your store configuration object.

**Example**

```ts
import { StoreProvider } from '@tiny-lit/store';

class MyStore extends StoreProvider {
    static get is() {
        return 'my-store';
    }

    get config() {
        return {
            // your config goes here
        };
    }
}
customElements.define(MyStore.is, MyStore);
```

### Consumer

Now that you have a store provider, you need to connect your custom elements to it.
Using the `withStore` mixin, it will subscribe/unsubscribe your elements to the store 
on connect/disconnected callbacks.

These are the lifecycle callbacks you can implement:

- `onStoreConnect` Called when the element connected to a store
```ts
onStoreConnect() => void
```
- `onStateChange` Called everytime the state changed
```ts
onStateChange(newState: any) => void
```


In addition, your element will implement a `dispatch` method for triggering changes. 
It is essentially a proxy to `store.dispatch`, the only difference is that using the 
`withStore` mixin everything is based on DOM events.
```ts
dispatch(type: string, data?: any) => void;
```

_Note that if you don't provide a Provider, your element will continue to works as usual._

**Example**

```ts
import { withStore } from '@tiny-lit/store';

class MyCounter extends withStore(HTMLElement) {
    constructor() {
        super();
        this.count = 0;
    }

    onStateChange(state) {
        if (this.count !== state.count) {
            this.count = state.count;

            this.update();
        }
    }

    static get is() { return 'my-counter'; }

    update() {
        this.innerText = `Count: ${this.count}`;
    }
}
customElements.define(MyCounter.is, MyCounter);

class MyButton extends withStore(HTMLElement) {
    constructor() {
        super();
        
        this.addEventListener('click', () => {
            this.dispatch('increment');
        })
    }

    static get is() { return 'my-button'; }
}
customElements.define(MyButton.is, MyButton);
```

### A DOM Example
```html
<my-store>
    <my-consumer></my-consumer>
    <my-button>Click to increment</my-button>
</my-store>
```

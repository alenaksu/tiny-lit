import { StoreProvider, withStore, createStore } from '@tiny-lit/store/lib/cjs';
import { html } from '@tiny-lit/core/lib/cjs';
import { Element } from '@tiny-lit/element/lib/cjs';

const JSONObject = value => {
    if (typeof value !== object) {
        try {
            value = JSON.parse(value);
        } catch (e) {}
    }
    return value;
};

const Items = [
    {
        name: 'Men+s+Tech+Shell+Full-Zip',
        title: "Men's Tech Shell Full-Zip",
        category: 'mens_outerwear',
        price: 50.2
    },
    {
        name: 'Anvil+L+S+Crew+Neck+-+Grey',
        title: 'Anvil L/S Crew Neck - Grey',
        category: 'mens_outerwear',
        price: 22.15
    },
    {
        name: 'Green+Flex+Fleece+Zip+Hoodie',
        title: 'Green Flex Fleece Zip Hoodie',
        category: 'mens_outerwear',
        price: 45.65
    },
    {
        name: 'Android+Nylon+Packable+Jacket',
        title: 'Android Nylon Packable Jacket',
        category: 'mens_outerwear',
        price: 33.6
    },
    {
        name: 'YouTube+Ultimate+Hooded+Sweatshirt',
        title: 'YouTube Ultimate Hooded Sweatshirt',
        category: 'mens_outerwear',
        price: 32.35
    },
    {
        name: 'Grey+Heather+Fleece+Zip+Hoodie',
        title: 'Grey Heather Fleece Zip Hoodie',
        category: 'mens_outerwear',
        price: 38.85
    },
    {
        name: 'Vastrm+Hoodie',
        title: 'Vastrm Hoodie',
        category: 'mens_outerwear',
        price: 200.0
    },
    {
        name: 'Recycled+Plastic+Bottle+Hoodie+-+Green',
        title: 'Recycled Plastic Bottle Hoodie - Green',
        category: 'mens_outerwear',
        price: 60.95
    },
    {
        name: 'Rowan+Pullover+Hood',
        title: 'Rowan Pullover Hood',
        category: 'mens_outerwear',
        price: 60.85
    },
    {
        name: 'Men+s+Voyage+Fleece+Jacket',
        title: "Men's Voyage Fleece Jacket",
        category: 'mens_outerwear',
        price: 48.0
    },
    {
        name: 'Eco-Jersey+Chrome+Zip+Up+Hoodie',
        title: 'Eco-Jersey Chrome Zip Up Hoodie',
        category: 'mens_outerwear',
        price: 37.75
    },
    {
        name: 'Android+Colorblock+Hooded+Pullover',
        title: 'Android Colorblock Hooded Pullover',
        category: 'mens_outerwear',
        price: 50.2
    },
    {
        name: 'Tri-blend+Full-Zip+Hoodie',
        title: 'Tri-blend Full-Zip Hoodie',
        category: 'mens_outerwear',
        price: 52.2
    },
    {
        name: 'Fleece+Full-Zip+Hoodie',
        title: 'Fleece Full-Zip Hoodie',
        category: 'mens_outerwear',
        price: 45.65
    },
    {
        name: 'Jacquard-Knit+Full-Zip+Fleece',
        title: 'Jacquard-Knit Full-Zip Fleece',
        category: 'mens_outerwear',
        price: 74.9
    },
    {
        name: 'YouTube+Unisex+Flex+Fleece+Zip+Hoodie',
        title: 'YouTube Unisex Flex Fleece Zip Hoodie',
        category: 'mens_outerwear',
        price: 45.25
    }
];

const ElementWithStore = withStore(Element);

class MyStore extends StoreProvider {
    static get is() {
        return 'my-store';
    }

    get config() {
        return {
            initialState: {
                cart: [],
                count: 0
            },
            plugins: [store => store.subscribe(console.log)],
            actions: {
                addToCart({ commit }, item) {
                    commit('addItem', item);
                    commit('updateCount');
                },
                removeFromCart({ commit }, item) {
                    commit('removeItemByIndex', item);
                    commit('updateCount');
                },
                removeAllFromCart({ commit, state }) {
                    let items = state.cart;

                    items.forEach(item => commit('removeItem', item));

                    commit('updateCount');
                }
            },
            mutations: {
                addItem(state, data) {
                    state.cart.push(data);
                },
                removeItemByIndex(state, data) {
                    state.cart.splice(data, 1);
                },
                removeItem(state, item) {
                    state.cart = state.cart.filter(i => i !== item);
                },
                updateCount(state) {
                    state.count = state.cart.length;
                }
            }
        };
    }
}
customElements.define(MyStore.is, MyStore);

class Basket extends ElementWithStore {
    constructor() {
        super();
        this.count = 0;
        this.items = [];
    }

    static get properties() {
        return {
            count: Number,
            items: Object
        };
    }

    onStateChange(state) {
        this.count = state.count;
        this.items = state.cart;
    }

    static get is() {
        return 'shop-basket';
    }

    handleRemove(index) {
        this.dispatch('removeFromCart', index);
    }

    handleRemoveAll() {
        this.dispatch('removeAllFromCart');
    }

    getTemplate() {
        return html`
            <style>
                .basket {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    padding: 20px 50px;
                    background: rgba(0,0,0,0.8);
                    color: white;
                }
            </style>
            <div class="basket">
                Basket<br />
                Total: ${this.count}

                <ul>
                    ${this.items.map(
                        (item, index) => html`
                        <li>
                            <button onCLick=${() =>
                                this.handleRemove(index)}>X</button>
                            ${item.title}
                        </li>
                    `
                    )}
                </ul>

                ${
                    this.items.length
                        ? html`<button onClick=${() =>
                              this.handleRemoveAll()}>remove all</button>`
                        : null
                }
            </div>
        `;
    }
}
customElements.define(Basket.is, Basket);

class Item extends ElementWithStore {
    item = {};

    static get is() {
        return 'shop-item';
    }

    static get properties() {
        return {
            c: JSONObject
        };
    }

    handleClick = () => {
        this.dispatch('addToCart', this.item);
    };

    getTemplate() {
        return html`
            <div class="detail" has-content="">
                <img
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw"
                    width="300"
                    height="300"
                    class="image"
                />
                <h1>${this.item.title}</h1>
                <div class="price">${this.item.price}$</div>
                <button
                    onClick=${this.handleClick}
                    class="button"
                    aria-label="Add this item to cart"
                >
                    Add to Cart
                </button>
            </div>
        `;
    }
}
customElements.define(Item.is, Item);

class StoreDemo extends Element {
    static get is() {
        return 'store-demo';
    }

    getTemplate() {
        return html`
            <style>
                h1 {
                    font-size: 13px;
                    font-weight: 500;
                    line-height: 28px;
                    margin: 0;
                }
                .detail {
                    text-align:center;
                    margin: 0 28px 48px;
                }
                .price {
                    margin: 0px 0 10px;
                    font-size: 13px;
                    color: rgb(117, 117, 117);
                }
                .image {
                    max-width: 100%;
                    background: rgb(117, 117, 117);
                }
                .button {
                    display: inline-block;
                    box-sizing: border-box;
                    border: 2px solid #000;
                    background-color: #FFF;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--app-primary-color);
                    margin: 0;
                    padding: 8px 44px;
                    text-align: center;
                    text-decoration: none;
                    text-transform: uppercase;
                    border-radius: 0;
                    outline: none;
                    -webkit-appearance: none;
                }
                my-store {
                    display: flex;
                    flex-wrap: wrap;
                }
                shop-item {
                    flex: 1 1;
                    flex-basis: 33%;
                    max-width: 33%;
                }
            </style>
            <my-store>
                <shop-basket></shop-basket>
                ${Items.map(item => html`<shop-item item=${item}></shop-item>`)}
            </my-store>
        `;
    }
}

customElements.define(StoreDemo.is, StoreDemo);

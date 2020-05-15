import { StoreProvider, withStore, createStore } from '@tiny-lit/store';
import { html, Element } from '@tiny-lit/element';

const JSONObject = value => {
    if (typeof value === 'string') {
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
                ...JSON.parse(this.getAttribute('initial-state')),
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
                    return{
                        ...state,
                        cart: [
                            ...state.cart,
                            data
                        ]
                    };
                },
                removeItemByIndex(state, data) {
                    return{
                        ...state,
                        cart: state.cart.filter((a, i) => i !== data)
                    };
                },
                removeItem(state, item) {
                    return {
                        ...state,
                        cart: state.cart.filter(i => i !== item)
                    };
                },
                updateCount(state) {
                    return {
                        ...state,
                        count: state.cart.length
                    };
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
        this.state = {
            open: false
        };
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

    toggleCart = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return html`
            <style>
                .basket {
                    position: fixed;
                    bottom: 0;
                    right: 10px;
                    color: white;
                    z-index: 100;
                }

                .basket__list {
                    z-index: 100;
                    overflow-y: scroll;
                    max-height: 150px;
                    margin: 0;
                }

                .basket__listItem  {
                    margin-bottom: 5px;
                }

                .basket__listItemButton {
                    padding: 3px 5px;
                }

                .basket__dropdown {
                    position: absolute;
                    bottom: calc(100% + 10px);
                    background-color: rgb(var(--background));
                    width: 300px;
                    right: 0;
                    padding: 10px;
                    border: 1px solid rgb(var(--primary));
                }

                .basket__toggle {
                    position: relative;
                }

                .basket__badge {
                    background: rgb(var(--primary));
                    border-radius: 50%;
                    padding: 2px;
                    color: rgb(var(--background));
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 15px;
                    height: 15px;
                    font-size: 12px;
                    line-height: 15px;
                    margin: 5px 10px 0;
                }

                .basket__clear {
                    float:right;
                    margin-top: 20px;
                }
            </style>
            <div class="basket">
                <button class="basket__toggle" onClick=${this.toggleCart}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        width="24"
                    >
                        <path
                            fill="currentColor"
                            d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                        ></path>
                    </svg>
                    <span class="basket__badge">${this.count}</span>
                </button>
                <div class="basket__dropdown" hidden=${!this.state.open}>
                    <span>Total: ${this.count}${html`<span>items</span>`}</span>


                    <table class="basket__list">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.items.map(
                                (item, index) => html`
                                <tr>
                                    <td>${item.title}</td>
                                    <td>1</td>
                                    <td>
                                        <button
                                            class="basket__listItemButton"
                                            onCLick=${() => this.handleRemove(index)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            `)}
                        </tbody>
                    </table>

                    ${
                        this.items.length
                            ? html`<button class="basket__clear" onClick=${() =>
                                this.handleRemoveAll()}>remove all</button>`
                            : null
                    }
                </div>
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
            item: JSONObject
        };
    }

    handleClick = () => {
        this.dispatch('addToCart', this.item);
    };

    render() {
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

    render() {
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
                }
                .image {
                    max-width: 100%;
                    background: rgb(117, 117, 117);
                }
                my-store {
                    display: flex;
                    flex-wrap: wrap;
                    position: relative;
                }
                shop-item {
                    flex: 1 1;
                    flex-basis: 33%;
                    max-width: 33%;
                }
                @media (max-width: 767px) {
                    shop-item {
                        flex-basis: 100%;
                        max-width: 100%;
                    }
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

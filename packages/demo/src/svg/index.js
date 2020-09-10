import { Element, html } from '@tiny-lit/element';

const t = (c) => html` <div>${c}</div> `;

class Svg extends Element {
    static get is() {
        return 'test-svg';
    }

    static get properties() {
        return {
            radius: Number
        };
    }

    maxRadius = 50;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    onChange = ({ target }) => {
        this.maxRadius = Number(target.value);
        this.update();
    };

    connectedCallback() {
        super.connectedCallback();

        this.interval = setInterval(() => {
            this.radius = Math.abs(
                Math.sin(Date.now() / 1000) * this.maxRadius
            );
        }, 10);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    get radius() {
        console.log("get");
    }

    set radius(value) {
        console.log("set", value);
    }

    render() {
        return html`
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    height: 50vh;
                }
            </style>
            <div>
                <p>Max size</p>
                <input
                    type="range"
                    min="10"
                    max="100"
                    onChange=${this.onChange}
                />
            </div>
            <svg height=${this.maxRadius * 2} width=${this.maxRadius * 2}>
                <circle
                    cx=${this.maxRadius}
                    cy=${this.maxRadius}
                    r="${this.radius}"
                    stroke="black"
                    stroke-width="3"
                    fill="red"
                />
                Sorry, your browser does not support inline SVG.
            </svg>
        `;
    }
}
customElements.define(Svg.is, Svg);

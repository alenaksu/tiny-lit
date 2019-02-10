import { html, render } from '@tiny-lit/core';
import { Element } from '@tiny-lit/element';

const t = c => html`
    <div>${c}</div>
`;

class Svg extends Element {
    static get is() {
        return 'test-svg';
    }

    maxRadius = 50;
    state = {
        radius: 0
    };

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

        this.interval = setInterval(
            () =>
                this.setState({
                    radius: Math.abs(Math.sin(Date.now() / 1000) * this.maxRadius)
                }),
            20
        );
    }

    disconnectedCallback() {
        clearInterval(this.interval);
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
                    value=${this.radius}
                />
            </div>
            <svg height=${this.maxRadius * 2} width=${this.maxRadius * 2}>
                <circle
                    cx=${this.maxRadius}
                    cy=${this.maxRadius}
                    r="${this.state.radius}"
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

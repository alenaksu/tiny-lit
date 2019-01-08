import { html, render } from "@tiny-lit/core";
import { Element } from "@tiny-lit/element";
import { request } from "https";

const t = (c) => html`
  <div>${c}</div>
`;

class Counter extends Element {
    static get is() { return 'test-counter'; }

    radius = 50;

    onChange = ({ target }) => {
        this.radius = Number(target.value);
        this.update();
    }

    connectedCallback() {
        super.connectedCallback();
        this.renderCallbacks.push(() => {
            this.querySelector("#start").addEventListener("click", this.start);
        });
    }

    render() {
        return html`
            <button id="start">start</button>
            <div id="content"></div>

            <input type="range" min="1" max="100" onChange=${this.onChange} value=${this.radius} />

            <svg height="100" width="100">
                <circle cx="50" cy="50" r="${this.radius}" stroke="black" stroke-width="3" fill="red" />
                Sorry, your browser does not support inline SVG.
            </svg>
        `;
    }

    start = () => {
        render(t(null), this.content);

        requestAnimationFrame(() => {
            this.c = 0;
            console.clear();
            console.time("duration");
            while (this.c <= 1000000) {
                render(t(this.c++), this.content);
            }
            console.timeEnd("duration");
        });
    }
}
customElements.define(Counter.is, Counter);
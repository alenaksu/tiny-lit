import { html, render } from "@tiny-lit/core";
import { Element } from "@tiny-lit/element";

const t = (c) => html`
  <div>${c}</div>
`;

class Counter extends HTMLElement {
    static get is() { return 'test-counter'; }

    connectedCallback() {
        this.innerHTML = `
            <button id="start">start</button>
            <div id="content"></div>
        `;

        this.content = this.querySelector("#content")
        this.querySelector("#start").addEventListener("click", this.start);
    }

    start = () => {
        this.c = 0;
        console.clear();
        console.time("duration");
        while (this.c <= 1000000) {
          render(t(this.c++), this.content);
        }
        console.timeEnd("duration");
    }
}
customElements.define(Counter.is, Counter);
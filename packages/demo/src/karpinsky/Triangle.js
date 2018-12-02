import { html } from '@tiny-lit/core';
import { Element } from '@tiny-lit/element';

const targetSize = 25;

class KarpinskyTriangle extends Element {
    static get is() {
        return 'karpinsky-triangle';
    }

    static get properties() {
        return {
            x: Number,
            y: Number,
            s: Number,
            seconds: Number,
        };
    }
    x = 0;
    y = 0;
    s = 0;
    seconds = 0;

    constructor() {
        super();

        // this.attachShadow({ mode: 'closed' });
    }

    render() {
        let { s, seconds, x, y } = this;

        if (s <= targetSize) {
            return html`
                <karpinsky-dot x=${x - targetSize / 2} y=${y -
                targetSize / 2} size=${targetSize} text=${seconds} />
            `;
        }

        s = s / 2;

        let slowDown = true;
        if (slowDown) {
            let e = performance.now() + 0.8;
            while (performance.now() < e) {
                // Artificially long execution time.
            }
        }

        return html`
            <karpinsky-triangle x=${x} y=${y -
            s / 2} s=${s} seconds=${seconds}></karpinsky-triangle>
            <karpinsky-triangle x=${x - s} y=${y +
            s / 2} s=${s} seconds=${seconds}></karpinsky-triangle>
            <karpinsky-triangle x=${x + s} y=${y +
            s / 2} s=${s} seconds=${seconds}></karpinsky-triangle>
        `;
    }
}

customElements.define(KarpinskyTriangle.is, KarpinskyTriangle);
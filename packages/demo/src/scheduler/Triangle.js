import { Element, html } from '@tiny-lit/element';

const targetSize = 25;

class SierpinskiTriangle extends Element {
    static get is() {
        return 'sierpinski-triangle';
    }

    static get properties() {
        return {
            x: Number,
            y: Number,
            s: Number,
            seconds: Number
        };
    }

    x = 0;
    y = 0;
    s = 0;
    seconds = 0;

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    renderTemplate() {
        let { s, seconds, x, y } = this;

        if (s <= targetSize) {
            return html`
                <sierpinski-dot
                    x=${x - targetSize / 2}
                    y=${y - targetSize / 2}
                    size=${targetSize}
                    text=${seconds}
                />
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
            <sierpinski-triangle
                x=${x}
                y=${y - s / 2}
                s=${s}
                seconds=${seconds}
            ></sierpinski-triangle>
            <sierpinski-triangle
                x=${x - s}
                y=${y + s / 2}
                s=${s}
                seconds=${seconds}
            ></sierpinski-triangle>
            <sierpinski-triangle
                x=${x + s}
                y=${y + s / 2}
                s=${s}
                seconds=${seconds}
            ></sierpinski-triangle>
        `;
    }

    render() {
        return html`${this.renderTemplate()}`
    }
}

customElements.define(SierpinskiTriangle.is, SierpinskiTriangle);

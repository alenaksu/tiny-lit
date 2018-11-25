import { html } from '@tiny-lit/core/lib/cjs';
import { Element } from '@tiny-lit/element/lib/cjs';

class KarpinskyDot extends Element {
    static get is() {
        return 'karpinsky-dot';
    }

    static get properties() {
        return {
            x: Number,
            y: Number,
            size: Number,
            text: String,
            hover: Boolean,
        };
    }

    x = 0;
    y = 0;
    size = 0;
    text = '';
    hover = false;

    constructor() {
        super();

        // this.addEventListener('mouseover', () => this.setState({ hover: true }));
        // this.addEventListener('mouseleave', () => this.setState({ hover: false }));
        this.addEventListener('mouseover', () => (this.hover = true));
        this.addEventListener('mouseleave', () => (this.hover = false));

        // this.attachShadow({ mode: 'closed' });
    }

    getStyle() {
        const { x, y, size } = this;
        const hover = this.hover;
        const s = size * 1.3;

        return `
            position: absolute;
            font: normal 15px sans-serif;
            text-align: center;
            cursor: pointer;
            width: ${s}px;
            height: ${s}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: ${s / 2}px;
            line-height: ${s}px;
            background: ${hover ? '#ff0' : '#61dafb'};
        `;
    }

    render() {
        const { hover, text } = this;

        return html`
            <span style=${this.getStyle()}>
                ${hover ? '**' + text + '**' : text}
            </span>
        `;
    }
}

customElements.define(KarpinskyDot.is, KarpinskyDot);
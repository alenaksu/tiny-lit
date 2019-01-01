import { html } from '@tiny-lit/core';
import { Element } from '@tiny-lit/element';

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

        this.attachShadow({ mode: 'open' });
    }

    render() {
        const { hover, text, x, y, size } = this;
        const s = size * 1.3;

        return html`
            <style>
                span {
                    position: absolute;
                    font: normal 15px sans-serif;
                    text-align: center;
                    cursor: pointer;
                    color: black;
                    width: ${s}px;
                    height: ${s}px;
                    left: ${x}px;
                    top: ${y}px;
                    border-radius: ${s / 2}px;
                    line-height: ${s}px;
                    background: ${hover ? '#ff0' : '#61dafb'};
                }
            </style>
            <span>
                ${hover ? '**' + text + '**' : text}
            </span>
        `;
    }
}

customElements.define(KarpinskyDot.is, KarpinskyDot);
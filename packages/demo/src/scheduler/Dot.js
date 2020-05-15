import { html, Element } from '@tiny-lit/element';

class SierpinskiDot extends Element {
    static get is() {
        return 'sierpinski-dot';
    }

    static get properties() {
        return {
            x: Number,
            y: Number,
            size: Number,
            text: String,
            hover: Boolean
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

        this.attachShadow({ mode: 'closed' });
    }

    get style() {
        const { x, y, size } = this;
        const s = size * 1.3;

        return `
            span {
                position: absolute;
                font: normal 15px sans-serif;
                text-align: center;
                cursor: pointer;
                color: black;
                width: ${s}px;
                height: ${s}px;
                transform: translate(${x}px, ${y}px);
                border-radius: ${s / 2}px;
                line-height: ${s}px;
            }
        `;
    }

    render() {
        const { hover, text } = this;

        return html`
            <style>
                ${this.style}
            </style>

            <span style=${`background: ${hover ? '#ff0' : '#61dafb'}`}>
                ${hover ? '**' + text + '**' : text}
            </span>
        `;
    }
}

customElements.define(SierpinskiDot.is, SierpinskiDot);

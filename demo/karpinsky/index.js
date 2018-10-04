import { html } from '@tiny-lit/core/lib/cjs';
import { Element } from '@tiny-lit/element/lib/cjs';

const targetSize = 25;

function rafInterval(fn) {
    let running = true;

    function run() {
        fn();
        running && requestAnimationFrame(run);
    }

    requestAnimationFrame(run);

    return () => (running = false);
}

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

    getTemplate() {
        const { hover, text } = this;

        return html`<span style=${this.getStyle()}>
                        ${hover ? '**' + text + '**' : text}
                    </span>`;
    }
}

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

    getTemplate() {
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

class KarpinskyDemo extends Element {
    static get is() {
        return 'karpinsky-demo';
    }

    connectedCallback() {
        this.start = Date.now();
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
        this.renderInterval = rafInterval(this.render);
        this.setState({
            seconds: 0,
        });
    }

    disconnectedCallback() {
        this.renderInterval();
        clearInterval(this.timerInterval);
    }

    tick() {
        this.setState({
            seconds: (this.state.seconds % 10) + 1,
        });
    }

    getStyle() {
        const elapsed = Date.now() - this.start;
        const t = (elapsed / 1000) % 10;
        const scale = 1 + (t > 5 ? 10 - t : t) / 10;

        return `
            position: absolute;
            transform-origin: 0 0;
            width: 10px;
            height: 10px;
            left: 50%;
            top: 50%;
            background: #eee;
            transform: scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px) translateX(50%)
        `;
    }

    getTemplate() {
        const { seconds } = this.state;

        return html`
            <div style=${this.getStyle()}>
                <karpinsky-triangle x=${0} y=${0} s=${1000} seconds=${seconds} />
            </div>
        `;
    }
}

customElements.define(KarpinskyTriangle.is, KarpinskyTriangle);
customElements.define(KarpinskyDot.is, KarpinskyDot);
customElements.define(KarpinskyDemo.is, KarpinskyDemo);

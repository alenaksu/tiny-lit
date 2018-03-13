import { html, Element } from '../../src/index.ts';

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
class FiberDot extends Element {
    static get observedAttributes() {
        return ['x', 'y', 'size', 'text'];
    }

    static get is() {
        return 'fiber-dot';
    }

    propertyChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    getStyle() {
        const { x, hover, y, size } = this;
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

class FiberTriangle extends Element {
    static get observedAttributes() {
        return ['x', 'y', 's', 'seconds'];
    }

    propertyChangedCallback(name, oldValue, newValue) {
        this.setState({
            [name]: parseFloat(newValue),
        });
    }

    static get is() {
        return 'fiber-triangle';
    }

    getTemplate() {
        let { s, seconds, x, y } = this;

        if (s <= targetSize) {
            return html`
                <fiber-dot x=${x - targetSize / 2} y=${y -
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
            <fiber-triangle x=${x} y=${y -
            s / 2} s=${s} seconds=${seconds}></fiber-triangle>
            <fiber-triangle x=${x - s} y=${y +
            s / 2} s=${s} seconds=${seconds}></fiber-triangle>
            <fiber-triangle x=${x + s} y=${y +
            s / 2} s=${s} seconds=${seconds}></fiber-triangle>
        `;
    }
}

class FiberDemo extends Element {
    static get observedAttributes() {
        return ['elapsed'];
    }

    static get is() {
        return 'fiber-demo';
    }

    propertyChangedCallback(name, oldValue, newValue) {
        this.render();
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
            seconds: this.state.seconds % 10 + 1,
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
            transform: scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px)
        `;
    }

    getTemplate() {
        const { seconds } = this.state;

        return html`
            <div style=${this.getStyle()}>
                <fiber-triangle x=${0} y=${0} s=${1000} seconds=${seconds} />
            </div>
        `;
    }
}

customElements.define(FiberTriangle.is, FiberTriangle);
customElements.define(FiberDot.is, FiberDot);
customElements.define(FiberDemo.is, FiberDemo);

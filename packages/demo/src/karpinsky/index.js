import { html } from '@tiny-lit/core';
import { Element } from '@tiny-lit/element';
import './Dot';
import './Triangle';

function rafInterval(fn) {
    let running = true;

    function run() {
        fn();
        return running && requestAnimationFrame(run);
    }

    requestAnimationFrame(run);

    return () => (running = false);
}


class KarpinskyDemo extends Element {
    static get is() {
        return 'karpinsky-demo';
    }

    constructor() {
        super();

        // this.attachShadow({ mode: 'closed' });
    }

    static get properties() {
        return {
            elapsed: Number
        }
    }

    connectedCallback() {
        const rendered = this.rendered;

        if (!rendered) console.time('render');

        this.start = Date.now();
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
        this.renderInterval = rafInterval(() => {
            this.elapsed = Date.now() - this.start;
        });
        this.setState({
            seconds: 0,
        });

        if (!rendered) console.timeEnd('render');
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
        const elapsed = this.elapsed;
        const t = (elapsed / 1000) % 10;
        const scale = 1 + (t > 5 ? 10 - t : t) / 10;

        return `
            position: absolute;
            transform-origin: 0 0;
            width: 10px;
            height: 10px;
            left: 50%;
            top: 50%;
            transform: scaleX(${scale / 2.1}) scaleY(0.7) translateZ(0.1px) translateX(50%)
        `;
    }

    render() {
        const { seconds } = this.state;

        return html`
            <style>
                :host {
                    color: black;
                }
            </style>
            <div style=${this.getStyle()}>
                <karpinsky-triangle x=${0} y=${0} s=${1000} seconds=${seconds} />
            </div>
        `;
    }
}

customElements.define(KarpinskyDemo.is, KarpinskyDemo);

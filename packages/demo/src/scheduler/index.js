import { Element, html } from '@tiny-lit/element';
import './Dot';
import './Triangle';

function rafInterval(fn) {
    let running = true;

    function run() {
        fn();
        running && requestAnimationFrame(run);
    }

    requestAnimationFrame(run);

    return () => (running = false);
}

class SchedulerDemo extends Element {
    static get is() {
        return 'scheduler-demo';
    }

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
    }

    static get properties() {
        return {
            elapsed: Number
        };
    }

    connectedCallback() {
        const rendered = this.rendered;

        console.time('render');

        this.start = Date.now();
        this.timerInterval = setInterval(this.tick.bind(this), 1000);
        this.renderInterval = rafInterval(() => {
            this.elapsed = Date.now() - this.start;
        });
        this.setState({
            seconds: 0
        });
    }

    disconnectedCallback() {
        this.renderInterval();
        clearInterval(this.timerInterval);
    }

    tick() {
        this.setState({
            seconds: (this.state.seconds % 10) + 1
        });
    }

    getTransform() {
        const elapsed = this.elapsed;
        const t = (elapsed / 1000) % 10;
        const scale = 1 + (t > 5 ? 10 - t : t) / 10;

        return `
            transform: scale(${scale / 2.1}, 0.7) translateX(50%) translateZ(0);
        `;
    }

    firstUpdated() {
        console.timeEnd('render');
    }

    render() {
        const { seconds } = this.state;

        return html`
            <style>
                :host {
                    color: black;
                }

                .container {
                    position: absolute;
                    transform-origin: 0 0;
                    width: 10px;
                    height: 10px;
                    left: 50%;
                    top: 50%;
                    will-change: transform;
                }
            </style>
            <div class="container" style=${this.getTransform()}>
                <sierpinski-triangle
                    x=${0}
                    y=${0}
                    s=${1000}
                    seconds=${seconds}
                />
            </div>
        `;
    }
}

customElements.define(SchedulerDemo.is, SchedulerDemo);

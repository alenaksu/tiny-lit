import { render, Template } from './tiny-lit';
import Scheduler from './Scheduler';

export abstract class Element extends HTMLElement {
    state: any = {};

    get scheduler(): any {
        return Scheduler;
    }

    constructor() {
        super();
        this.render = this.scheduler.defer(this.render.bind(this));
    }

    connectedCallback() {
        this.render();
    }

    setState(nextState: any) {
        this.state = {
            ...this.state,
            ...nextState
        };

        this.render();
    }

    getTemplate(): Template {
        throw 'Method not implemented';
    }

    render() {
        render(this.getTemplate(), this as any);
    }
}

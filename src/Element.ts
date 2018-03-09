import { render, Template, collection, html } from './tiny-lit';
import Scheduler from './Scheduler';

export abstract class Element extends HTMLElement {
    state: any = {};
    private _children: Node[];

    get scheduler(): any {
        return Scheduler;
    }

    get children(): any {
        return collection(this._children, (node: Node) => html`${node}`);
    }

    constructor() {
        super();
        this.render = this.scheduler.defer(this.render.bind(this));
        this._children = [].slice.call(this.childNodes);
    }

    connectedCallback() {
        this.render();
    }

    setState(nextState: any) {
        this.state = {
            ...this.state,
            ...nextState,
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

import { render, Template, collection, html } from './tiny-lit';
import Scheduler, { IScheduler } from './Scheduler';

export interface IElement {
    state: any;
    // slot: TemplateCollection;
    readonly scheduler: IScheduler;
    getTemplate(): Template;
    render(): void;
    setState(nextState: object | Function): void;
}

export interface Type<T> extends Function {
    new (): T;
}

export function withElement(Base: Type<any>): Type<IElement> {
    return class extends Base implements IElement {
        state: any = {};
        _children: Node[];

        get scheduler(): any {
            return Scheduler;
        }

        get slot(): any {
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

        setState(nextState: object | Function): void {
            const state: any = this.state;

            this.state = {
                ...state,
                ...(typeof nextState === 'function'
                    ? nextState(state, this)
                    : nextState),
            };

            this.render();
        }

        getTemplate(): Template {
            throw 'Method not implemented';
        }

        render() {
            render(this.getTemplate(), this as any);
        }
    };
}

export const Element = withElement(HTMLElement);

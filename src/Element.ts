import { render, Template, collection, TemplateCollection } from './tiny-lit';
import Scheduler from './Scheduler';
import { Type, IElement, IScheduler } from './types';

export function withElement(Base: Type<any>): Type<IElement> {
    return class extends Base implements IElement {
        state: any = {};

        get scheduler(): IScheduler {
            return Scheduler;
        }

        get slot(): TemplateCollection {
            let { __template, childNodes } = this;

            childNodes = [].slice.call(childNodes);

            return collection(
                __template
                    ? childNodes.filter(
                          (node: Node) => !~__template.content.indexOf(node)
                      )
                    : childNodes,
                (node: Node) => node
            );
        }

        constructor() {
            super();
            this.render = this.scheduler.defer(this.render.bind(this));
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

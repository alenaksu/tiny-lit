import { render, Template, html } from './tiny-lit';
import Scheduler from './Scheduler';
import {
    Constructor,
    Element as ElementInterface,
    Scheduler as SchedulerInterface,
} from './types';

export function withElement<T extends Constructor<{}>>(
    Base: T
): Constructor<ElementInterface> & T {
    return class extends Base implements ElementInterface {
        state: any = {};
        __childNodes: Node[] = [];
        rendered: boolean = false;
        renderCallbacks: Array<Function> = [];

        get scheduler(): SchedulerInterface {
            return Scheduler;
        }

        get slot(): Template[] {
            return this.__childNodes.map((node: Node) => html`${node}`);
        }

        connectedCallback() {
            this.render();
        }

        setState(nextState: object | Function, callback?: Function): void {
            const state: any = this.state;

            this.state = {
                ...state,
                ...(typeof nextState === 'function'
                    ? nextState(state, this)
                    : nextState),
            };

            callback && this.renderCallbacks.push(callback);

            this.render();
        }

        getTemplate(): Template {
            throw 'Method not implemented';
        }

        render = this.scheduler.defer(() => {
            if (!this.rendered) {
                this.__childNodes = [].slice.call((<any>this).childNodes);
                this.rendered = true;
            }
            render(this.getTemplate(), this as any);

            while (this.renderCallbacks.length) {
                this.renderCallbacks.shift()!();
            }
        });
    };
}

function defineProps(instance: any) {
    instance.__props = {};
    const props = instance.constructor.properties;

    if (props) {
        Object.keys(props).forEach(key => {
            instance.__props[key] = props[key];
            Object.defineProperty(instance, key, {
                get(): any {
                    return (<any>this).__props[key];
                },
                set(newValue: any) {
                    const oldValue = (<any>this).__props[key];
                    (<any>this).__props[key] = newValue;

                    (<any>this).rendered &&
                        oldValue !== newValue &&
                        !this.render._scheduled &&
                        this.render();
                },
            });
        });
    }
}

export function withProps<T extends Constructor<{}>>(base: T): T {
    return class extends base {
        constructor(...args: any[]) {
            super(...args);
            defineProps(this);
        }
    };
}

export const Element: Constructor<ElementInterface> &
    Constructor<HTMLElement> = withElement(HTMLElement);

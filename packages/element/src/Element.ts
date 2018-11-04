import { render, Template, html } from '@tiny-lit/core';
import Scheduler from './Scheduler';
import {
    Constructor,
    Element as ElementInterface,
    Scheduler as SchedulerInterface,
} from './types';

function toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function withElement<T extends Constructor>(Base: T) {
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

function defineProps(constructor: any): string[] {
    if (!constructor.hasOwnProperty('__attrsMap')) {
        const props: { [key: string]: Function } = constructor.properties;
        const attrsMap: { [key: string]: string } = Object.create(null);

        if (props) {
            for (const name in props) {
                attrsMap[toKebabCase(name)] = name;

                Object.defineProperty(constructor.prototype, name, {
                    get(): any {
                        return (<any>this).__props[name];
                    },
                    set(newValue: any) {
                        const oldValue = (<any>this).__props[name];
                        (<any>this).__props[name] = props[name](newValue);

                        (<any>this).rendered &&
                            oldValue !== newValue &&
                            !this.render._scheduled &&
                            this.render();
                    },
                });
            }
        }

        constructor.__attrsMap = attrsMap;
        constructor.__observedProperties = Object.keys(attrsMap);
    }

    return constructor.__observedProperties;
}

export function withProps<T extends Constructor>(Base: T) {
    return class extends Base {
        __props: object = Object.create(null);
        [propName: string]: any;

        static get observedAttributes(): string[] {
            return defineProps(this);
        }

        attributeChangedCallback(name: string, _: string, newValue: string) {
            this[(<any>this.constructor).__attrsMap[name]] = newValue;
        }
    };
}

export const Element = withProps(withElement(HTMLElement));

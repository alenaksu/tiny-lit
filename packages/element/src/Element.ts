import { render, Template } from '@tiny-lit/core';
import Scheduler from './Scheduler';
import {
    Constructor,
    Element as ElementInterface,
    Scheduler as SchedulerInterface
} from './types';

export function withElement<T extends Constructor>(Base: T) {
    return class extends Base implements ElementInterface {
        state: any = {};
        rendered: boolean = false;
        renderCallbacks: Array<Function> = [];

        get scheduler(): SchedulerInterface {
            return Scheduler;
        }

        connectedCallback() {
            this.update();
        }

        setState(nextState: object | Function, callback?: Function): void {
            const state: any = this.state;

            this.state = {
                ...state,
                ...(typeof nextState === 'function'
                    ? nextState(state, this)
                    : nextState)
            };

            callback && this.renderCallbacks.push(callback);

            this.update();
        }

        render(): Template {
            throw 'Method not implemented';
        }

        update = this.scheduler.defer(() => {
            this.rendered = true;

            render(this.render(), this as any);

            while (this.renderCallbacks.length) this.renderCallbacks.shift()!();
        });
    };
}

function defineProps(constructor: any): string[] {
    if (!constructor.__attrsMap) {
        const props: { [key: string]: Function } = constructor.properties;
        const attrsMap: { [key: string]: string } = Object.create(null);

        if (props) {
            for (const name in props) {
                attrsMap[
                    name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
                ] = name;

                Object.defineProperty(constructor.prototype, name, {
                    get(): any {
                        return (<any>this).__props[name];
                    },
                    set(newValue: any) {
                        const oldValue = (<any>this).__props[name];
                        (<any>this).__props[name] = props[name](newValue);

                        (<any>this).rendered &&
                            oldValue !== newValue &&
                            !this.update._scheduled &&
                            this.update();
                    }
                });
            }
        }

        constructor.__attrsMap = attrsMap;
        constructor.__observedProps = Object.keys(attrsMap);
    }

    return constructor.__observedProps;
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

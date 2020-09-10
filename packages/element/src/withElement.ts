import { render, Template, scheduled, JobPriority } from '@tiny-lit/core';
import {
    Constructor,
    Element as ElementInterface,
} from './types';

export function withElement<T extends Constructor<HTMLElement>>(Base: T) {
    return class extends Base implements ElementInterface {
        state: any = {};
        rendered: boolean = false;
        renderCallbacks: Array<Function> = [];
        renderRoot: HTMLElement | ShadowRoot = this;

        attachShadow(shadowRootInitDict: ShadowRootInit) {
            return (this.renderRoot = super.attachShadow.call(
                this,
                shadowRootInitDict
            ));
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

        render(): Template | null {
            return null;
        }

        firstUpdated(){}

        beforeUpdate(){}

        updated() {}

        _onUpdated = scheduled(() => {
            while (this.renderCallbacks.length) this.renderCallbacks.shift()!();

            this.rendered ? this.updated() : this.firstUpdated();
            this.rendered = true;
        }, JobPriority.Callback)

        update() {
            this.beforeUpdate();

            const template = this.render();
            template && render(template, this.renderRoot as any);

            this.renderCallbacks.length && this._onUpdated();
        };
    };
}

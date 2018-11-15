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

        render(): Template | null {
            return null;
        }

        update = this.scheduler.defer(() => {
            this.rendered = true;

            const template = this.render();
            template && render(template, this as any);

            while (this.renderCallbacks.length) this.renderCallbacks.shift()!();
        });
    };
}

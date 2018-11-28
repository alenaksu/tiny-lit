export { Template } from './template';
import { TemplateInterface } from './types';
import { Template } from './template';
export declare function render(template: TemplateInterface, container: HTMLElement): void;
export declare namespace render {
    var instances: WeakMap<HTMLElement, TemplateInterface>;
}
export declare function html(strings: any, ...values: any[]): Template;

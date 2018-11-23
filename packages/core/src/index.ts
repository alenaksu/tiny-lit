export { Template } from './template';
export { TemplateCollection } from './template-collection';

import { TemplateInterface } from './types';
import { Template } from './template';

export function render(template: TemplateInterface, container: HTMLElement) {
    if (!render.instances.has(container)) {
        render.instances.set(container, template);
        container.appendChild(template.create());
    } else {
        render.instances.get(container)!.update(template.values);
    }
}
render.instances = new WeakMap<HTMLElement, TemplateInterface>();

export function html(strings: any, ...values: any[]): Template {
    return new Template(strings, values);
}
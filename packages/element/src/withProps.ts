import {
    Constructor,
    PropertyDescriptor,
    ElementProperties,
    AttributeMap
} from './types';

function createChangeCallback(name) {
    const defaultName = `on${name.charAt(0).toUpperCase()}${name.slice(
        1
    )}Changed`;

    return function (this: any, ...args) {
        this[defaultName] && this[defaultName](...args);
    };
}

function normalizeDescriptor(name, descriptor) {
    return {
        type: descriptor.call ? descriptor : descriptor.type,
        onChange:
            descriptor.onChange === true
                ? createChangeCallback(name)
                : descriptor.onChange
    };
}

function defineProp(
    prototype,
    name: string,
    propertyDescriptor: PropertyDescriptor
) {
    Object.defineProperty(prototype, name, {
        get(): any {
            return this.__props[name];
        },
        set(newValue: any) {
            const oldValue = this[name];

            this.__props[name] = newValue;
            if (this.rendered && oldValue !== newValue) {
                if (propertyDescriptor.onChange)
                    propertyDescriptor.onChange.call(this, newValue, oldValue);

                this.update();
            }
        }
    });
}

function defineProps(constructor: any): string[] {
    if (!constructor.__attrs) {
        const properties: ElementProperties<PropertyDescriptor> =
            constructor.properties || {};
        const attrsMap: AttributeMap = Object.create(null);
        const props = Object.create(null);
        const proto = constructor.prototype;

        for (const propertyName in properties) {
            const propertyDescriptor = normalizeDescriptor(
                propertyName,
                properties[propertyName]
            );

            const attrName = propertyName
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .toLowerCase();

            attrsMap[attrName] = propertyName;
            props[propertyName] = propertyDescriptor;

            defineProp(proto, propertyName, propertyDescriptor);
        }

        constructor.__attrs = attrsMap;
        constructor.__props = props;
    }

    return Object.keys(constructor.__attrs);
}

export function withProps<T extends Constructor>(Base: T) {
    return class extends Base {
        __props: object = Object.create(null);
        [name: string]: any;

        static get observedAttributes(): string[] {
            return defineProps(this);
        }

        attributeChangedCallback(name: string, _: string, newValue: string) {
            const { __attrs: attributes, __props: properties } = <any>(
                this.constructor
            );
            if (properties && attributes && name in properties) {
                const propName = attributes[name];

                this[propName] = properties[propName].type(newValue);
            }
        }
    };
}

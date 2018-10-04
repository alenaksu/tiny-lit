import { Element } from '../src/Element';
import { html } from '@tiny-lit/core';

describe('Element', () => {
    const root = document.createElement('div');;
    const template = text => html`<div>${text}</div>`;
    customElements.define('a-element', Element);
    customElements.define(
        'c-element',
        class extends Element {
            getTemplate() {
                return template(this.state.text);
            }
        }
    );
    customElements.define(
        's-element',
        class extends Element {
            get scheduler() {
                return {
                    defer: render => render,
                };
            }
            getTemplate() {
                return template(this.state.text);
            }
        }
    );

    customElements.define(
        'p-element',
        class extends Element {
            static get properties() {
                return {
                    a: String,
                    b: Number,
                    c: Boolean,
                    myProp: String,
                    mySuperProp: Boolean,
                };
            }

            a = 'a';
            b = 1;
            c = false;
            myProp = null;
            mySuperProp = null;

            getTemplate() {
                return template(this.state.text);
            }
        }
    );

    beforeAll(() => {
        document.body.appendChild(root);
    });

    afterEach(() => {
        root.innerHTML = '';
    });

    it('should throw an exception if not extended', () => {
        const e = <any>document.createElement('a-element');

        expect(e.getTemplate).toThrow();
    });

    it('should init with empty state', () => {
        const e = <any>document.createElement('c-element');

        expect(e.state).toEqual({});
    });

    it('state should be immutable', () => {
        const e = <any>document.createElement('c-element');
        const s = e.state;

        e.setState({});

        expect(e.state).not.toBe(s);
    });

    it('setState should run callback after render', () => {
        const callback = jasmine.createSpy('elem');
        const e = <any>document.createElement('s-element');

        e.setState({}, callback);
        e.setState({}, callback);

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should render on setState', () => {
        const e = <any>document.createElement('c-element');
        const r = e.render;

        let rendered = false;
        e.render = function() {
            rendered = true;
            r();
        };
        e.setState({});

        expect(rendered).toBe(true);
    });

    it('should accept functions as setState argument', () => {
        const e = <any>document.createElement('c-element');
        const increment = state => ({
            value: state.value + 1,
        });

        e.setState({
            value: 0,
        });
        expect(e.state.value).toBe(0);

        e.setState(increment);
        expect(e.state.value).toBe(1);
    });

    it('should pass state and element as setState function arguments', done => {
        const e = <any>document.createElement('c-element');
        const increment = (state, instance) => {
            expect(state).toEqual({});
            expect(instance).toBe(e);

            done();
        };

        e.setState(increment);
    });

    it('should return child nodes with `slot` method', () => {
        const e = <any>document.createElement('s-element'),
            s = document.createElement('span');
        e.appendChild(s);
        e.render();
        e.render();
        e.render();

        expect(e.slot.length).toBe(1);
        expect(e.slot[0].values[0]).toBe(s);
    });

    describe('withProps', () => {
        it('should reflect props to attributes', done => {
            const e: any = document.createElement('p-element');

            expect(e.constructor.observedAttributes).toEqual([
                'a',
                'b',
                'c',
                'my-prop',
                'my-super-prop',
            ]);

            e.setAttribute('my-prop', 'true');
            e.setAttribute('my-super-prop', 'true');

            requestAnimationFrame(() => {
                // expect(e.constructor.properties.mySuperProp).toHaveBeenCalled();
                // expect(e.constructor.properties.myProp).toHaveBeenCalled();

                expect(e.mySuperProp).toBe(true);
                expect(e.myProp).toBe('true');

                done();
            });
        });

        it('should initialize observed properties', () => {
            const e: any = document.createElement('p-element');

            e.constructor.observedAttributes.forEach(attrName => {
                const desc = Object.getOwnPropertyDescriptor(
                    e.constructor.prototype,
                    e.constructor.__attrsMap[attrName]
                );

                expect(desc).toBeDefined();
                expect(typeof desc!.get).toBe('function');
                expect(typeof desc!.set).toBe('function');
            });

            expect(e.__props).toBeDefined();
            expect(e.__props).toEqual({
                a: 'a',
                b: 1,
                c: false,
                myProp: 'null',
                mySuperProp: false,
            });
        });

        it('should trigger update when props changes', () => {
            const e: any = document.createElement('p-element');
            const callback = jasmine.createSpy('elem');

            e.render();
            e.render = callback;

            e.a = 1;

            expect(callback).toHaveBeenCalled();
        });

        it('should coerce property value', () => {
            const e: any = document.createElement('p-element');
            const callback = jasmine.createSpy('elem');

            e.render();
            e.render = callback;

            e.a = 1;
            e.b = true;
            e.c = '';

            expect(e.a).toBe('1');
            expect(e.b).toBe(1);
            expect(e.c).toBe(false);
        });
    });
});

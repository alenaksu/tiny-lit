import { Element as TlElement } from '../src/Element';
import { html } from '@tiny-lit/core';

describe('Element', () => {
    const root = document.createElement('div');
    const template = (text) => html`<div>${text}</div>`;
    customElements.define('a-element', class extends TlElement {});
    customElements.define(
        'c-element',
        class extends TlElement {
            render() {
                return template(this.state.text);
            }
        }
    );
    customElements.define(
        's-element',
        class extends TlElement {
            render() {
                return template(this.state.text);
            }
        }
    );

    customElements.define(
        'p-element',
        class extends TlElement {
            static get properties() {
                return {
                    a: String,
                    b: {
                        type: Number
                    },
                    c: {
                        type: Boolean,
                        onChange: jasmine.createSpy()
                    },
                    myProp: { type: String, onChange: true },
                    mySuperProp: Boolean
                };
            }

            a = 'a';
            b = 1;
            c = false;
            myProp = null;
            mySuperProp = null;

            render() {
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

        e.setState({}, () => {
            callback();
            e.setState({}, callback);
        });

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should update on setState', () => {
        const e = <any>document.createElement('c-element');
        const r = e.update.bind(e);

        let updated = false;
        e.update = function () {
            updated = true;
            r();
        };
        e.setState({});

        expect(updated).toBe(true);
    });

    it('should accept functions as setState argument', () => {
        const e = <any>document.createElement('c-element');
        const increment = (state) => ({
            value: state.value + 1
        });

        e.setState({
            value: 0
        });
        expect(e.state.value).toBe(0);

        e.setState(increment);
        expect(e.state.value).toBe(1);
    });

    it('should pass state and element as setState function arguments', (done) => {
        const e = <any>document.createElement('c-element');
        const increment = (state, instance) => {
            expect(state).toEqual({});
            expect(instance).toBe(e);

            done();
        };

        e.setState(increment);
    });

    it('should save shadowRoot when attaching', () => {
        const e: any = document.createElement('c-element');
        const shadowRoot = e.attachShadow({ mode: 'open' });

        expect(shadowRoot).toBe(e.renderRoot);
    });

    it('should render inside shadow dom', (done) => {
        const e: any = document.createElement('c-element');
        const shadowRoot = e.attachShadow({ mode: 'open' });

        e.setState({ text: 'ciaone' }, () => {
            expect(shadowRoot.innerHTML).toBe('<div>ciaone</div>');
            done();
        });
    });

    it('should call beforeUpdate before every render', () => {
        const e: any = document.createElement('c-element');
        const beforeUpdate = jasmine.createSpy();
        const render = jasmine.createSpy();

        e.beforeUpdate = beforeUpdate;
        e.render = render;
        e.update();

        expect(beforeUpdate).toHaveBeenCalledBefore(render);
    });

    it('should call firstUpdated after the first render', () => {
        const e: any = document.createElement('c-element');
        const firstUpdated = jasmine.createSpy();
        const render = jasmine.createSpy();

        e.firstUpdated = firstUpdated;
        e.render = render;
        e.update();

        expect(render).toHaveBeenCalledBefore(firstUpdated);
    });

    it('should call updated after the render is completed', (done) => {
        const e: any = document.createElement('c-element');
        const updated = jasmine.createSpy();
        const render = jasmine.createSpy();

        e.updated = updated;
        e.render = render;
        e.update();
        e.setState({}, () => {
            setTimeout(() => {
                expect(render).toHaveBeenCalledBefore(updated);
                done();
            });
        });
    });

    describe('withProps', () => {
        it('should reflect props to attributes', (done) => {
            const e: any = document.createElement('p-element');

            expect(e.constructor.observedAttributes).toEqual([
                'a',
                'b',
                'c',
                'my-prop',
                'my-super-prop'
            ]);

            e.setAttribute('a', 'true');
            e.setAttribute('c', 'true');

            requestAnimationFrame(() => {
                // expect(e.constructor.properties.mySuperProp).toHaveBeenCalled();
                // expect(e.constructor.properties.myProp).toHaveBeenCalled();

                expect(e.a).toBe('true');
                expect(e.c).toBe(true);

                done();
            });
        });

        it('should initialize observed properties', () => {
            const e: any = document.createElement('p-element');

            e.constructor.observedAttributes.forEach((attrName) => {
                const desc = Object.getOwnPropertyDescriptor(
                    e.constructor.prototype,
                    e.constructor.__attrs[attrName]
                );

                expect(desc).toBeDefined();
                expect(typeof desc!.get).toBe('function');
                expect(typeof desc!.set).toBe('function');
            });

            expect(e.__props).toBeDefined();
            e.remove();
        });

        it('should trigger update when props change', () => {
            const e: any = document.createElement('p-element');
            const callback = jasmine.createSpy('elem');

            e.update();
            e.update = callback;

            e.a = 1;

            expect(e.update).toHaveBeenCalled();
        });

        it('should coerce property value', (done) => {
            const e: any = document.createElement('p-element');
            const callback = jasmine.createSpy('elem');

            e.update();
            e.update = callback;

            e.setAttribute('a', '1'); // string
            e.setAttribute('b', '1'); // number
            e.setAttribute('c', ''); // boolean

            requestAnimationFrame(() => {
                expect(e.a).toBe('1');
                expect(e.b).toBe(1);
                expect(e.c).toBe(false);

                done();
            });
        });

        it('should call the default property change callback', () => {
            const e: any = document.createElement('p-element');

            e.update();

            e.myProp = 'bar';
            e.onMyPropChanged = jasmine.createSpy('onMyPropChanged');
            e.myProp = 'foo';

            expect(e.onMyPropChanged).toHaveBeenCalledWith('foo', 'bar');
        });

        it('should call the defined property change callback', () => {
            const e: any = document.createElement('p-element');

            const onChange = e.constructor.__props.myProp.onChange;
            e.constructor.__props.myProp.onChange = jasmine.createSpy(
                'onChange'
            );

            e.update();

            e.myProp = 'bar';
            e.onMyPropChanged = jasmine.createSpy('onMyPropChanged');
            e.myProp = 'foo';

            expect(e.constructor.__props.myProp.onChange).toHaveBeenCalledWith(
                'foo',
                'bar'
            );
            expect(e.onMyPropChanged).not.toHaveBeenCalled();

            e.constructor.__props.myProp.onChange = onChange;
        });
    });
});

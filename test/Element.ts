import { Element } from '../src/Element';
import { div } from './utils';
import { html } from '../src/tiny-lit';

describe('Element', () => {
    const root = div();
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

    beforeAll(() => {
        document.body.appendChild(root);
    });

    afterEach(() => {
        root.innerHTML = '';
    });

    afterEach(() => (root.innerHTML = ''));

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

    it('should pass state and element as setState function arguments', () => {
        const e = <any>document.createElement('c-element');
        const increment = (state, instance) => {
            expect(state).toEqual({});
            expect(instance).toBe(e);
        };
    });

    it('should return child nodes with `slot` method', () => {
        const e = <any>document.createElement('c-element'),
            s = document.createElement('span');

        e.appendChild(s);
        e.render();

        expect(e.slot.values.length).toBe(1);
        expect(e.slot.values[0]).toBe(s);
    });
});

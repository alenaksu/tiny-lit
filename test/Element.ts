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
        const e = <Element>document.createElement('a-element');

        expect(e.getTemplate).toThrow();
    });

    it('should init with empty state', () => {
        const e = <Element>document.createElement('c-element');

        expect(e.state).toEqual({});
    });

    it('state should be immutable', () => {
        const e = <Element>document.createElement('c-element');
        const s = e.state;

        e.setState({});

        expect(e.state).not.toBe(s);
    });

    it('should render on setState', () => {
        const e = <Element>document.createElement('c-element');
        const r = e.render;

        let rendered = false;
        e.render = function() {
            rendered = true;
            r();
        };
        e.setState({});

        expect(rendered).toBe(true);
    });
});

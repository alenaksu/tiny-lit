import {
    html,
    Template,
    render,
    collection,
    TemplateCollection,
} from '../src/tiny-lit';
import { div } from './utils';

describe('tiny-lit', () => {
    describe('html', () => {
        it('returns a Template', () => {
            expect(html``).toEqual(jasmine.any(Template));
        });

        it('returns a TemplateCollection', () => {
            expect(collection([], () => {})).toEqual(
                jasmine.any(TemplateCollection)
            );
        });

        it('Template.strings are identical for multiple calls', () => {
            const t = () => html``;
            expect(t().strings).toEqual(t().strings);
        });

        it('values contain interpolated values', () => {
            const foo = 'foo',
                bar = 1;
            expect(html`${foo}${bar}`.values).toEqual([foo, bar]);
        });
    });

    describe('render', () => {
        let root;

        beforeEach(() => {
            root = div();
        });

        it('Template.create returns the rendered dom', () => {
            const foo = 'pippo',
                t = html`<div>${foo}</div>`,
                node = t.create();

            expect(node).toEqual(jasmine.any(Node));

            root.appendChild(node);
            expect(root.innerHTML).toEqual('<div>pippo</div>');
        });

        it('should render template into dom', () => {
            const t = html`<div>pippo</div>`;

            render(t, root);
            expect(root.innerHTML).toEqual('<div>pippo</div>');
        });

        it('should store template into __template', () => {
            const t = html`<div>pippo</div>`;

            render(t, root);
            expect(root.__template).toBeDefined();
        });

        it('should update the template', () => {
            const t = name => html`<div>${name}</div>`;

            render(t('pippo'), root);
            const children = [].slice.call(root.childNodes);
            render(t('pluto'), root);

            expect([].slice.call(root.children)).toEqual(<any[]>children);
            expect(root.innerHTML).toEqual('<div>pluto</div>');
        });

        it('should correctly set string attribute', () => {
            const c = 'btn',
                t = html`<div class=${c}></div>`;

            render(t, root);
            expect(root.children[0].getAttribute('class')).toEqual(c);
        });

        it('should correctly set non-string attribute as property', () => {
            const c = () => {},
                t = html`<div onclick=${c}></div>`;

            render(t, root);
            expect((<any>root.children[0]).onclick).toBe(c);
        });

        it('should update property', () => {
            const c = () => {},
                d = () => {},
                t = c => html`<div onclick=${c}></div>`;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).onclick).toEqual(d);
        });

        it('should update attribute', () => {
            const c = 'pippo',
                d = 'pluto',
                t = c => html`<div class=${c}></div>`;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).getAttribute('class')).toEqual(d);
        });

        it('should not update attribute with same value', () => {
            const c = () => {},
                t = c => html`<div onclick=${c}></div>`;

            render(t(c), root);

            root.children[0].propertyChangedCallback = () => {
                throw 'changed';
            };

            expect(() => {
                render(t(c), root);
            }).not.toThrow();
        });

        it('should switch between attribute and property', () => {
            const c = 'pippo',
                d = () => {},
                t = cb => html`<div onclick=${cb}></div>`;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).onclick).toBe(d);

            render(t(c), root);
            expect((<any>root.children[0]).getAttribute('onclick')).toBe(c);
        });

        it('should escape attributes', () => {
            const c = '">',
                t = html`<div class=${c}>pluto</div>`;

            render(t, root);
            expect(root.innerHTML).toEqual('<div class="&quot;>">pluto</div>');
        });

        it('should escape html', () => {
            const c = '<b>pippo</b>',
                t = html`<div>${c}</div>`;

            render(t, root);
            expect(root.innerHTML).toEqual(
                '<div>&lt;b&gt;pippo&lt;/b&gt;</div>'
            );
        });

        it('should correctly unset attributes', () => {
            const c = 'btn',
                t = v => html`<input min=${v.a} custom=${v.b}  />`;

            render(t({ a: 0 }), root);
            expect(root.children[0].min).toBe('0');
            render(t({ a: null }), root);
            expect(root.children[0].min).toBe('null');
            render(t({ a: undefined }), root);
            expect(root.children[0].min).toBe('');

            render(t({ b: 0 }), root);
            expect(root.children[0].custom).toBe(0);
            render(t({ b: null }), root);
            expect(root.children[0].custom).toBe(null);
            render(t({ b: undefined }), root);
            expect(root.children[0].custom).toBe(undefined);
        });

        it('should render nested templates', () => {
            const a = html`<b>pippo</b>`,
                b = html`<div>${a}</div>`;

            render(b, root);
            expect(root.innerHTML).toBe('<div><b>pippo</b></div>');
        });

        it('should replace nodes', () => {
            const t = s => html`<div>${s ? 'pippo' : null}</div>`;

            render(t(true), root);
            expect(root.innerHTML).toBe('<div>pippo</div>');
            render(t(false), root);
            expect(root.innerHTML).toBe('<div></div>');
        });

        it('should replace different templates', () => {
            const boldTemplate = html`<b>bold</b>`;
            const normalTemplate = html`<span>normal</span>`;
            const t = bold =>
                html`<div>${bold ? boldTemplate : normalTemplate}</div>`;

            render(t(false), root);
            render(t(true), root);
            expect(root.innerHTML).toBe('<div><b>bold</b></div>');
        });

        it('should update nested template', () => {
            const a = c => html`<b>pippo ${c}</b>`,
                b = c => html`<div>${a(c)}</div>`;

            render(b('pippo'), root);

            let updated = false;

            const elementExpression = root.__template.expressions[0].element;
            const update = elementExpression.update.bind(elementExpression);
            elementExpression.update = values => {
                update(values);
                updated = true;
            };
            render(b('pluto'), root);

            expect(updated).toBe(true);
            expect(root.children[0].children[0].innerHTML).toBe('pippo pluto');
        });

        it('should remove nested template on null value', () => {
            const a = html`<b>pippo</b>`,
                b = show => html`<div>${show ? a : null}</div>`;

            render(b(true), root);

            const node = root.children[0].children[0];
            render(b(false), root);

            expect(root.contains(node)).toBe(false);
        });

        describe('collection', () => {
            it('TemplateCollection.create returns the rendered dom', () => {
                const t = collection(['a', 'b', 'c'], i => html`<li>${i}</li>`),
                    node = t.create();

                expect(node).toEqual(jasmine.any(Node));

                root.appendChild(node);
                expect(root.innerHTML).toEqual(
                    '<li>a</li><li>b</li><li>c</li>'
                );
            });

            it('TemplateCollection.content returns all nodes', () => {
                const t = collection(['a', 'b', 'c'], i => html`<li>${i}</li>`);

                render(t, root);
                // the array contains also the root node
                expect(root.__template.content.length).toEqual(4);
            });

            it('should update existing items', () => {
                const t = items => html`
                    <ul>
                        ${collection(
                            items,
                            i => html`
                        <li>${i}</li>`
                        )}
                    </ul>`;

                render(t(['a', 'b', 'c']), root);
                const li = root.querySelectorAll('li');
                render(t(['d', 'e', 'c']), root);

                expect([].slice.call(li).every(i => root.contains(i))).toBe(
                    true
                );
            });

            it('should reorder items using key', () => {
                const t = items => html`
                    <ul>
                        ${collection(items, i =>
                            html`<li>${i}</li>`.withKey(i)
                        )}
                    </ul>`;

                let list = ['a', 'b', 'c'];
                render(t(list), root);

                list = ['b', 'c', 'a'];
                render(t(list), root);

                const li = root.querySelectorAll('li');
                list.forEach((i, index) =>
                    expect(li[index].textContent).toEqual(i)
                );
            });

            it('should remove items', () => {
                const t = items => html`
                    <ul>
                        ${collection(
                            items,
                            i => html`
                        <li>${i}</li>`
                        )}
                    </ul>`;

                render(t(['a', 'b', 'c']), root);
                const li = root.querySelectorAll('li');
                render(t(['a', 'b']), root);

                expect(root.querySelectorAll('li').length).toBe(2);
            });

            it('should replace different templates', () => {
                const t = (items, bold) => html`
                    <ul>
                        ${collection(
                            items,
                            i =>
                                bold
                                    ? html`<li><b>${i}</b></li>`
                                    : html`<li>${i}</li>`
                        )}
                    </ul>`;

                const list = ['a', 'b', 'c'];

                render(t(list, false), root);
                render(t(list.filter(c => c !== 'b'), true), root);

                const items = root.querySelectorAll('li');
                expect(items.length).toBe(2);
                expect(
                    [].every.call(items, item => !!item.querySelector('b'))
                ).toBe(true);
            });
        });
    });
});

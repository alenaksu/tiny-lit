import { html, Template, render, svg, } from '../src/index';
import { NodeExpression } from '../src/expressions';
import { setEnabled } from '../src/scheduler';
import {customMatchers} from './utils';

describe('tiny-lit', () => {
    beforeAll(() => {
        setEnabled(false);
    });

    afterAll(() => {
        setEnabled(true);
    });

    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
    });

    describe('html', () => {
        it('returns a Template', () => {
            expect(html``).toEqual(jasmine.any(Template));

            expect(html('')).toEqual(jasmine.any(Template));
        });

        it('Template.strings are identical for multiple calls', () => {
            const t = () => html``;
            expect(t().strings).toEqual(t().strings);
        });

        it('values contain interpolated values', () => {
            const foo = 'foo',
                bar = 1;
            expect(
                html`
                    ${foo}${bar}
                `.values
            ).toEqual([foo, bar]);
        });
    });

    describe('render', () => {
        let root: HTMLElement;

        beforeEach(() => {
            root = document.createElement('div');
            document.body.appendChild(root);
        });

        it('should has a map of all instances', () => {
            expect(render.instances).toEqual(jasmine.any(WeakMap));
        });

        it('Template.create returns the rendered dom', () => {
            const foo = 'pippo',
                t = html`
                    <div>${foo}</div>
                `,
                node = t.create();

            expect(node).toEqual(jasmine.any(Node));

            root.appendChild(node);
            expect(root.innerHTML).toSameHTML('<div>pippo</div>');
        });

        it('should render template into dom', () => {
            const t = html`
                <div>pippo</div>
            `;

            render(t, root);
            expect(root.innerHTML).toSameHTML('<div>pippo</div>');
        });

        it('should store template into instances property', () => {
            const t = html`
                <div>pippo</div>
            `;

            render(t, root);
            expect(render.instances.has(root)).toBe(true);
            expect(render.instances.get(root)).toBe(t);
        });

        it('should update the template', () => {
            const t = name =>
                html`
                    <div>${name}</div>
                `;

            render(t('pippo'), root);
            const children = [].slice.call(root.children);
            render(t('pluto'), root);

            expect([].slice.call(root.children)).toEqual(children);
            expect(root.innerHTML).toSameHTML('<div>pluto</div>');
        });

        it('should render svg elements', () => {
            const t = (radius, url) => html`
                <svg height="100" width="100">
                    <circle
                        cx="50"
                        cy="50"
                        r="${radius}"
                        stroke="black"
                        stroke-width="3"
                        fill="red"
                    />
                    <use xlink:href=${url} />
                </svg>
            `;
            let n = Math.floor(Math.random() * 10);
            render(t(n, '/image1.jpg'), root);
            const circle = root.querySelector('circle') as SVGCircleElement;
            const use = root.querySelector('use') as SVGUseElement;

            expect(circle.r.baseVal.value).toBe(n);
            expect(use.href.baseVal).toBe('/image1.jpg');

            n = Math.floor(Math.random() * 10);
            render(t(n, '/image2.png'), root);
            expect(circle.r.baseVal.value).toBe(n);
            expect(use.href.baseVal).toBe('/image2.png');
        });

        it('should render partial svgs', () => {
            const p = ['a', 'b', 'c'].map(i => svg`<path id=${i}></path>`),
                s = l =>
                    html`
                        <svg>${l}</svg>
                    `;

            render(s(null), root);

            expect(root.innerHTML).toSameHTML('<svg></svg>');
            render(s(p), root);
            expect(root.innerHTML).toSameHTML(
                '<svg><path id="a"></path><path id="b"></path><path id="c"></path></svg>'
            );

            const path = root.querySelector('path') as SVGPathElement;

            expect(path.namespaceURI).toBe('http://www.w3.org/2000/svg');
        });

        it('should correctly set string attribute', () => {
            const c = 'btn',
                t = html`
                    <div class=${c}></div>
                `;

            render(t, root);
            expect(root.children[0].getAttribute('class')).toEqual(c);
        });

        it('should correctly set non-string attribute as property', () => {
            const c = () => {},
                t = html`
                    <div onclick=${c}></div>
                `;

            render(t, root);
            expect((<any>root.children[0]).onclick).toBe(c);
        });

        it('should update property', () => {
            const c = () => {},
                d = () => {},
                t = c =>
                    html`
                        <div onclick=${c}></div>
                    `;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).onclick).toEqual(d);
        });

        it('should update attribute', () => {
            const c = 'pippo',
                d = 'pluto',
                t = c =>
                    html`
                        <div class=${c}></div>
                    `;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).getAttribute('class')).toEqual(d);
        });

        it('should switch between attribute and property', () => {
            const c = 'pippo',
                d = () => {},
                t = cb =>
                    html`
                        <div onclick=${cb}></div>
                    `;

            render(t(c), root);
            render(t(d), root);
            expect((<any>root.children[0]).onclick).toBe(d);

            render(t(c), root);
            expect((<any>root.children[0]).getAttribute('onclick')).toBe(null);
        });

        it('should escape attributes', () => {
            const c = '">',
                t = html`
                    <div class=${c}>pluto</div>
                `;

            render(t, root);
            expect(root.innerHTML).toSameHTML('<div class="&quot;>">pluto</div>');
        });

        it('should escape html', () => {
            const c = '<b>pippo</b>',
                t = html`
                    <div>${c}</div>
                `;

            render(t, root);
            expect(root.innerHTML).toSameHTML(
                '<div>&lt;b&gt;pippo&lt;/b&gt;</div>'
            );
        });

        it('should correctly set attributes', () => {
            const c = 'btn',
                t = v =>
                    html`
                        <input min=${v.a} custom=${v.b} />
                    `;

            render(t({ a: 0 }), root);
            expect((<any>root.children[0]).min).toBe('0');
            render(t({ a: null }), root);
            expect((<any>root.children[0]).min).toBe('null');
            render(t({ a: undefined }), root);
            expect((<any>root.children[0]).min).toBe('undefined');

            render(t({ b: 0 }), root);
            expect((<any>root.children[0]).custom).toBe(undefined);
            expect((<any>root.children[0]).getAttribute('custom')).toBe('0');

            render(t({ b: null }), root);
            expect((<any>root.children[0]).custom).toBe(undefined);
            expect((<any>root.children[0]).getAttribute('custom')).toBe('null');

            render(t({ b: undefined }), root);
            expect((<any>root.children[0]).custom).toBe(undefined);
            expect((<any>root.children[0]).hasAttribute('custom')).toBe(false);
        });

        it('should render nested templates', () => {
            const a = html`
                    <b>pippo</b>
                `,
                b = html`
                    <div>${a}</div>
                `;

            render(b, root);
            expect(root.innerHTML).toSameHTML('<div><b>pippo</b></div>');
        });

        it('should replace nodes', () => {
            const t = s =>
                html`
                    <div>${s ? 'pippo' : null}</div>
                `;

            render(t(true), root);
            expect(root.innerHTML).toSameHTML('<div>pippo</div>');
            render(t(false), root);
            expect(root.innerHTML).toSameHTML('<div></div>');
        });

        it('should replace different templates', () => {
            const boldTemplate = html`
                <b>bold</b>
            `;
            const normalTemplate = html`
                <span>normal</span>
            `;
            const t = bold =>
                html`
                    <div>${bold ? boldTemplate : normalTemplate}</div>
                `;

            render(t(false), root);
            render(t(true), root);
            expect(root.innerHTML).toSameHTML('<div><b>bold</b></div>');
        });

        it('should replace template with primitive values', () => {
            const t = content =>
                html`
                    <b>${content}</b>
                `;
            const c = html`
                <span>normal</span>
            `;

            render(t(c), root);
            render(t('ciao'), root);
            expect(root.innerHTML).toSameHTML('<b>ciao</b>');

            render(t(c), root);
            expect(root.innerHTML).toSameHTML('<b><span>normal</span></b>');
        });

        it('should update nested template', () => {
            const a = c =>
                    html`
                        <b>pippo ${c}</b>
                    `,
                b = c =>
                    html`
                        <div>${a(c)}</div>
                    `;

            render(b('pippo'), root);

            let updated = false;

            const elementExpression: Template = <Template>(
                (<NodeExpression>(
                    (<Template>render.instances.get(root))!.expressions![0]
                )).element
            );
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
            const a = html`
                    <b>pippo</b>
                `,
                b = show =>
                    html`
                        <div>${show ? a : null}</div>
                    `;

            render(b(true), root);

            const node = root.children[0].children[0];
            render(b(false), root);

            expect(root.contains(node)).toBe(false);
        });

        it('should manage arrays as array of templates', () => {
            const l = ['a', 'b', 'c'].map(
                    i =>
                        html`
                            <li>${i}</li>
                        `
                ),
                t = html`
                    ${l}
                `,
                node = t.create();

            expect(node).toEqual(jasmine.any(Node));

            root.appendChild(node);
            expect(root.innerHTML).toSameHTML(
                '<li>a</li><li>b</li><li>c</li>'
            );
        });

        it('should render partial tables', () => {
            const l = ['a', 'b', 'c'].map(
                    i =>
                        html`
                            <tr>
                                <td>${i}</td>
                            </tr>
                        `
                ),
                t = l =>
                    html`
                        <table>
                            ${l}
                        </table>
                    `;

            render(t(null), root);

            expect(root.innerHTML).toSameHTML('<table></table>');
            render(t(l), root);
            expect(root.innerHTML).toSameHTML(
                '<table><tr><td>a</td></tr><tr><td>b</td></tr><tr><td>c</td></tr></table>'
            );
        });

        it('should render style tags', () => {
            const t = display => html`
                <style>
                    .test {
                        display: ${display};
                    }
                </style>
            `;
            render(t('block'), root);

            expect(root.firstElementChild!.textContent).toSameHTML(
                '.test { display: block; }'
            );
            render(t('none'), root);
            expect(root.firstElementChild!.textContent).toSameHTML(
                '.test { display: none; }'
            );
        });

        describe('arrays', () => {
            it('should render the array', () => {
                const t = html`
                        ${['a', 'b', 'c'].map(
                            i =>
                                html`
                                    <li>${i}</li>
                                `
                        )}
                    `,
                    node = t.create();

                expect(node).toEqual(jasmine.any(Node));

                root.appendChild(node);
                expect(root.innerHTML).toSameHTML(
                    '<li>a</li><li>b</li><li>c</li>'
                );
            });

            it('should return boundaries nodes', () => {
                const t = l =>
                    html`
                        ${l.map(
                            i =>
                                html`
                                    <li>${i}</li>
                                `
                        )}
                    `;

                render(t(['a', 'b', 'c']), root);
                render(t(['a', 'd', 'c', 'b']), root);

                const range = render.instances.get(root)!.range;
                let node = range![0];
                let count = 0;

                while (node && node.nextSibling !== range![1]) {
                    count++;
                    node = node.nextSibling!;
                }

                // the array contains also the root node
                expect(count).toEqual(23);
            });

            it('should remove everything within boundaries', () => {
                const a = a =>
                    html`
                        ${a ? 'a' : null}
                    `;
                const b = b =>
                    html`
                        ${b ? a(!b) : null}
                    `;
                const c = c =>
                    html`
                        ${c ? b(c) : null} ${!c ? a(c) : null}
                    `;

                render(c(true), root);
                render(c(false), root);
                render(c(true), root);
                render(c(false), root);

                render.instances.get(root)!.delete();

                // the array contains also the root node
                expect(root.innerHTML).toSameHTML('');
            });

            it('should update existing items', () => {
                const t = items => html`
                    <ul>
                        ${items.map(
                            i => html`
                                <li>${i}</li>
                            `
                        )}
                    </ul>
                `;

                render(t(['a', 'b', 'c']), root);
                const li = root.querySelectorAll('li');
                render(t(['d', 'e', 'c']), root);

                expect([].slice.call(li).every(i => root.contains(i))).toBe(
                    true
                );
            });

            it('should reorder items using key', () => {
                let connect = 0,
                    disconnect = 0;
                class CustomLI extends HTMLElement {
                    connectedCallback() {
                        connect++;
                    }

                    disconnectedCallback() {
                        disconnect++;
                    }
                }
                customElements.define('custom-li', CustomLI);

                const t = items => html`
                    <ul>
                        ${items.map(i =>
                            html`
                                <custom-li>${i}</custom-li>
                            `.withKey(i)
                        )}
                    </ul>
                `;

                let list = ['a', 'b', 'c'];
                render(t(list), root);

                list = ['b', 'c', 'a'];
                render(t(list), root);

                const li = root.querySelectorAll('custom-li');
                list.forEach((i, index) =>
                    expect(li[index].textContent).toEqual(i)
                );

                expect(connect).toBe(5);
                expect(disconnect).toBe(2);
            });

            it('should remove items', () => {
                const t = items => html`
                    <ul>
                        ${items.map(
                            i => html`
                                <li>${i}</li>
                            `
                        )}
                    </ul>
                `;

                render(t(['a', 'b', 'c']), root);
                render(t(['a', 'b']), root);

                expect(root.querySelectorAll('li').length).toBe(2);
            });

            it('should replace different templates', () => {
                const t = (items, bold) => html`
                    <ul>
                        ${items.map(i =>
                            bold
                                ? html`
                                      <li><b>${i}</b></li>
                                  `
                                : html`
                                      <li>${i}</li>
                                  `
                        )}
                    </ul>
                `;

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

parcelRequire = (function(e, r, n, t) {
    var i = 'function' == typeof parcelRequire && parcelRequire,
        o = 'function' == typeof require && require;
    function u(n, t) {
        if (!r[n]) {
            if (!e[n]) {
                var f = 'function' == typeof parcelRequire && parcelRequire;
                if (!t && f) return f(n, !0);
                if (i) return i(n, !0);
                if (o && 'string' == typeof n) return o(n);
                var c = new Error("Cannot find module '" + n + "'");
                throw ((c.code = 'MODULE_NOT_FOUND'), c);
            }
            (p.resolve = function(r) {
                return e[n][1][r] || r;
            }),
                (p.cache = {});
            var l = (r[n] = new u.Module(n));
            e[n][0].call(l.exports, p, l, l.exports, this);
        }
        return r[n].exports;
        function p(e) {
            return u(p.resolve(e));
        }
    }
    (u.isParcelRequire = !0),
        (u.Module = function(e) {
            (this.id = e), (this.bundle = u), (this.exports = {});
        }),
        (u.modules = e),
        (u.cache = r),
        (u.parent = i),
        (u.register = function(r, n) {
            e[r] = [
                function(e, r) {
                    r.exports = n;
                },
                {}
            ];
        });
    for (var f = 0; f < n.length; f++) u(n[f]);
    if (n.length) {
        var c = u(n[n.length - 1]);
        'object' == typeof exports && 'undefined' != typeof module
            ? (module.exports = c)
            : 'function' == typeof define && define.amd
                ? define(function() {
                      return c;
                  })
                : t && (this[t] = c);
    }
    return u;
})(
    {
        Jbya: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var e = (function() {
                    var e = new Map(),
                        t = document.createRange();
                    return (
                        t.setStart(document.documentElement, 0),
                        function(n) {
                            return (
                                e.has(n) ||
                                    e.set(n, t.createContextualFragment(n)),
                                e.get(n).cloneNode(!0)
                            );
                        }
                    );
                })();
                function t(e, t) {
                    return t.some(function(t) {
                        return e instanceof t;
                    });
                }
                function n(e, t) {
                    return i(t, e[0]), r(e), t;
                }
                function r(e) {
                    e.forEach(function(e) {
                        e.parentNode && e.parentNode.removeChild(e);
                    });
                }
                function o(e) {
                    return e.__skip
                        ? (delete e.__skip, NodeFilter.FILTER_SKIP)
                        : NodeFilter.FILTER_ACCEPT;
                }
                function i(e, t) {
                    t.parentNode.insertBefore(e, t);
                }
                function s(e, t) {
                    return (
                        p(e) &&
                        e.constructor === t.constructor &&
                        ((!e.strings && !t.strings) ||
                            (e.strings.length &&
                                t.strings.length &&
                                e.strings.every(function(e, n) {
                                    return t.strings[n] === e;
                                })))
                    );
                }
                function u(e) {
                    return Number(e.replace(/\D+/g, ''));
                }
                function a(e) {
                    return void 0 === e && (e = ''), document.createTextNode(e);
                }
                function c(e) {
                    return !!e && !!e.ownerDocument;
                }
                function p(e) {
                    return t(e, [v, g]);
                }
                function l(t, n) {
                    var r = new Map(),
                        o = n.reduce(function(e, n, o) {
                            var i = '__' + o + '__';
                            return r.set(i, n), (e += i + t[o + 1]);
                        }, t[0]),
                        i = e(o);
                    return { fragment: i, expressions: h(i, r) };
                }
                function f(e, t, n) {
                    for (var r = e.attributes, o = r.length; o--; ) {
                        var i = r.item(o),
                            s = i.name,
                            a = i.value;
                        t.has(a) &&
                            (e.removeAttribute(s), (n[u(a)] = new N(e, s)));
                    }
                }
                function d(e, t) {
                    (e.data.match(/__\d+__/g) || []).forEach(function(n) {
                        var r = a(n);
                        (r.__skip = !0),
                            (e = e.splitText(e.data.indexOf(n))).deleteData(
                                0,
                                n.length
                            ),
                            i(r, e),
                            (t[u(n)] = new x(r));
                    });
                }
                function h(e, t) {
                    for (
                        var n = document.createTreeWalker(
                                e,
                                NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                                o,
                                !1
                            ),
                            r = Array(t.size);
                        n.nextNode();

                    ) {
                        var i = n.currentNode;
                        i.nodeType === Node.TEXT_NODE
                            ? d(i, r)
                            : i.nodeType === Node.ELEMENT_NODE && f(i, t, r);
                    }
                    return r;
                }
                o.acceptNode = o;
                var v = (function() {
                    function e(e, t) {
                        (this.content = []),
                            (this.expressions = []),
                            (this.key = void 0),
                            (this.values = t),
                            (this.strings = e);
                    }
                    return (
                        (e.prototype.withKey = function(e) {
                            return (this.key = e), this;
                        }),
                        (e.prototype.update = function(e, t) {
                            for (var n = 0; n < e.length; n++)
                                void 0 !== this.expressions[n] &&
                                    this.expressions[n].update(e[n], t);
                        }),
                        (e.prototype.create = function() {
                            var e = l(this.strings, this.values),
                                t = e.fragment,
                                n = e.expressions;
                            return (
                                (this.expressions = n),
                                this.update(this.values, !0),
                                (this.content = [].slice.call(t.childNodes)),
                                t
                            );
                        }),
                        e
                    );
                })();
                function m(e, t) {
                    var n = t;
                    e.content.forEach(function(e) {
                        n.parentNode.insertBefore(e, n.nextSibling), (n = e);
                    });
                }
                exports.Template = v;
                var g = (function() {
                    function e(e) {
                        (this.values = e), (this.templates = new Map());
                    }
                    return (
                        (e.prototype._flushTemplates = function(e) {
                            this.templates.forEach(function(t, n, o) {
                                -1 === e.indexOf(n) &&
                                    (r(t.content), o.delete(n));
                            });
                        }),
                        Object.defineProperty(e.prototype, 'content', {
                            get: function() {
                                var e = this.templates,
                                    t = [this.rootNode];
                                return (
                                    e.forEach(function(e) {
                                        return t.push.apply(t, e.content);
                                    }),
                                    t
                                );
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        (e.prototype.update = function(e) {
                            var t = this.rootNode,
                                r = this.templates,
                                o = t,
                                u = e.reduce(function(e, t, u) {
                                    var a = String(t.key || u),
                                        c = r.get(a);
                                    if (c)
                                        s(c, t)
                                            ? c.update(t.values)
                                            : (n(c.content, t.create()),
                                              r.set(a, t),
                                              (c = t));
                                    else {
                                        var p = t.create();
                                        o.nextSibling
                                            ? i(p, o.nextSibling)
                                            : o.parentNode.appendChild(p),
                                            r.set(a, t),
                                            (c = t);
                                    }
                                    return (
                                        o.nextSibling !== c.content[0] &&
                                            m(c, o),
                                        (o = c.content[c.content.length - 1]),
                                        e.push(a),
                                        e
                                    );
                                }, []);
                            this._flushTemplates(u);
                        }),
                        (e.prototype.create = function() {
                            var e = document.createDocumentFragment();
                            return (
                                (this.rootNode = a()),
                                e.appendChild(this.rootNode),
                                this.update(this.values),
                                e
                            );
                        }),
                        e
                    );
                })();
                exports.TemplateCollection = g;
                var N = (function() {
                    function e(e, t) {
                        (this.name = t), (this.element = e);
                    }
                    return (
                        (e.prototype.update = function(e, t) {
                            var n = this.name,
                                r = this.element,
                                o = this.value;
                            (t || o !== e) &&
                                (n in r
                                    ? (r[n] = e)
                                    : null != e && r.setAttribute(n, e),
                                null == e &&
                                    r.hasAttribute(n) &&
                                    r.removeAttribute(n),
                                (this.value = e));
                        }),
                        e
                    );
                })();
                exports.AttributeExpression = N;
                var x = (function() {
                    function e(e) {
                        (this.element = e), (this.value = void 0);
                    }
                    return (
                        (e.prototype.update = function(e, t) {
                            var r = this.element;
                            if (null == e) e = a();
                            else if (!t && e === this.value) return;
                            Array.isArray(e) && (e = new g(e)),
                                c(e) || p(e) || p(r)
                                    ? s(r, e)
                                        ? r.update(e.values)
                                        : (n(
                                              p(r) ? r.content : [r],
                                              p(e)
                                                  ? e.create()
                                                  : c(e)
                                                      ? e
                                                      : (e = a(e))
                                          ),
                                          (this.element = e))
                                    : (r.nodeValue = e),
                                (this.value = e);
                        }),
                        e
                    );
                })();
                function _(e, t) {
                    _.instances.has(t)
                        ? _.instances.get(t).update(e.values)
                        : (_.instances.set(t, e), t.appendChild(e.create()));
                }
                function y(e) {
                    for (var t = [], n = 1; n < arguments.length; n++)
                        t[n - 1] = arguments[n];
                    return new v([].concat(e), t);
                }
                (exports.NodeExpression = x),
                    (exports.render = _),
                    (_.instances = new WeakMap()),
                    (exports.html = y);
            },
            {}
        ],
        '6pAK': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var e = require('./tiny-lit');
                (exports.render = e.render),
                    (exports.html = e.html),
                    (exports.Template = e.Template),
                    (exports.TemplateCollection = e.TemplateCollection);
            },
            { './tiny-lit': 'Jbya' }
        ],
        kZxM: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.render = v),
                    (exports.html = E),
                    (exports.NodeExpression = exports.AttributeExpression = exports.TemplateCollection = exports.Template = void 0);
                const e = (function() {
                    const e = new Map(),
                        t = document.createRange();
                    return (
                        t.setStart(document.documentElement, 0),
                        n => (
                            e.has(n) || e.set(n, t.createContextualFragment(n)),
                            e.get(n).cloneNode(!0)
                        )
                    );
                })();
                function t(e, t) {
                    return t.some(t => e instanceof t);
                }
                function n(e, t) {
                    return r(t, e[0]), s(e), t;
                }
                function s(e) {
                    e.forEach(e => {
                        e.parentNode && e.parentNode.removeChild(e);
                    });
                }
                function o(e) {
                    return e.__skip
                        ? (delete e.__skip, NodeFilter.FILTER_SKIP)
                        : NodeFilter.FILTER_ACCEPT;
                }
                function r(e, t) {
                    t.parentNode.insertBefore(e, t);
                }
                function i(e, t) {
                    return (
                        l(e) &&
                        e.constructor === t.constructor &&
                        ((!e.strings && !t.strings) ||
                            (e.strings.length &&
                                t.strings.length &&
                                e.strings.every((e, n) => t.strings[n] === e)))
                    );
                }
                function c(e) {
                    return Number(e.replace(/\D+/g, ''));
                }
                function a(e = '') {
                    return document.createTextNode(e);
                }
                function u(e) {
                    return !!e && !!e.ownerDocument;
                }
                function l(e) {
                    return t(e, [m, g]);
                }
                function d(t, n) {
                    const s = new Map(),
                        o = n.reduce((e, n, o) => {
                            const r = `__${o}__`;
                            return s.set(r, n), (e += r + t[o + 1]);
                        }, t[0]),
                        r = e(o);
                    return { fragment: r, expressions: f(r, s) };
                }
                function p(e, t, n) {
                    const s = e.attributes;
                    let o = s.length;
                    for (; o--; ) {
                        const { name: r, value: i } = s.item(o);
                        t.has(i) &&
                            (e.removeAttribute(r), (n[c(i)] = new N(e, r)));
                    }
                }
                function h(e, t) {
                    (e.data.match(/__\d+__/g) || []).forEach(n => {
                        const s = a(n);
                        (s.__skip = !0),
                            (e = e.splitText(e.data.indexOf(n))).deleteData(
                                0,
                                n.length
                            ),
                            r(s, e),
                            (t[c(n)] = new _(s));
                    });
                }
                function f(e, t) {
                    const n = document.createTreeWalker(
                            e,
                            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                            o,
                            !1
                        ),
                        s = Array(t.size);
                    for (; n.nextNode(); ) {
                        const e = n.currentNode;
                        e.nodeType === Node.TEXT_NODE
                            ? h(e, s)
                            : e.nodeType === Node.ELEMENT_NODE && p(e, t, s);
                    }
                    return s;
                }
                o.acceptNode = o;
                class m {
                    constructor(e, t) {
                        (this.content = []),
                            (this.expressions = []),
                            (this.key = void 0),
                            (this.values = t),
                            (this.strings = e);
                    }
                    withKey(e) {
                        return (this.key = e), this;
                    }
                    update(e, t) {
                        for (let n = 0; n < e.length; n++)
                            void 0 !== this.expressions[n] &&
                                this.expressions[n].update(e[n], t);
                    }
                    create() {
                        const { fragment: e, expressions: t } = d(
                            this.strings,
                            this.values
                        );
                        return (
                            (this.expressions = t),
                            this.update(this.values, !0),
                            (this.content = [].slice.call(e.childNodes)),
                            e
                        );
                    }
                }
                function x(e, t) {
                    let n = t;
                    e.content.forEach(e => {
                        n.parentNode.insertBefore(e, n.nextSibling), (n = e);
                    });
                }
                exports.Template = m;
                class g {
                    constructor(e) {
                        (this.values = e), (this.templates = new Map());
                    }
                    _flushTemplates(e) {
                        const { templates: t } = this;
                        t.forEach((t, n, o) => {
                            -1 === e.indexOf(n) && (s(t.content), o.delete(n));
                        });
                    }
                    get content() {
                        const { templates: e, rootNode: t } = this,
                            n = [t];
                        return e.forEach(e => n.push(...e.content)), n;
                    }
                    update(e) {
                        const { rootNode: t, templates: s } = this;
                        let o = t;
                        const c = e.reduce((e, t, c) => {
                            const a = String(t.key || c);
                            let u = s.get(a);
                            if (u)
                                i(u, t)
                                    ? u.update(t.values)
                                    : (n(u.content, t.create()),
                                      s.set(a, t),
                                      (u = t));
                            else {
                                const e = t.create();
                                o.nextSibling
                                    ? r(e, o.nextSibling)
                                    : o.parentNode.appendChild(e),
                                    s.set(a, t),
                                    (u = t);
                            }
                            return (
                                o.nextSibling !== u.content[0] && x(u, o),
                                (o = u.content[u.content.length - 1]),
                                e.push(a),
                                e
                            );
                        }, []);
                        this._flushTemplates(c);
                    }
                    create() {
                        const e = document.createDocumentFragment();
                        return (
                            (this.rootNode = a()),
                            e.appendChild(this.rootNode),
                            this.update(this.values),
                            e
                        );
                    }
                }
                exports.TemplateCollection = g;
                class N {
                    constructor(e, t) {
                        (this.name = t), (this.element = e);
                    }
                    update(e, t) {
                        const { name: n, element: s, value: o } = this;
                        (t || o !== e) &&
                            (n in s
                                ? (s[n] = e)
                                : null != e && s.setAttribute(n, e),
                            null == e &&
                                s.hasAttribute(n) &&
                                s.removeAttribute(n),
                            (this.value = e));
                    }
                }
                exports.AttributeExpression = N;
                class _ {
                    constructor(e) {
                        (this.element = e), (this.value = void 0);
                    }
                    update(e, t) {
                        const { element: s } = this;
                        if (null == e) e = a();
                        else if (!t && e === this.value) return;
                        Array.isArray(e) && (e = new g(e)),
                            u(e) || l(e) || l(s)
                                ? i(s, e)
                                    ? s.update(e.values)
                                    : (n(
                                          l(s) ? s.content : [s],
                                          l(e)
                                              ? e.create()
                                              : u(e)
                                                  ? e
                                                  : (e = a(e))
                                      ),
                                      (this.element = e))
                                : (s.nodeValue = e),
                            (this.value = e);
                    }
                }
                function v(e, t) {
                    v.instances.has(t)
                        ? v.instances.get(t).update(e.values)
                        : (v.instances.set(t, e), t.appendChild(e.create()));
                }
                function E(e, ...t) {
                    return new m([].concat(e), t);
                }
                (exports.NodeExpression = _), (v.instances = new WeakMap());
            },
            {}
        ],
        SCxV: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    Object.defineProperty(exports, 'render', {
                        enumerable: !0,
                        get: function() {
                            return e.render;
                        }
                    }),
                    Object.defineProperty(exports, 'html', {
                        enumerable: !0,
                        get: function() {
                            return e.html;
                        }
                    }),
                    Object.defineProperty(exports, 'Template', {
                        enumerable: !0,
                        get: function() {
                            return e.Template;
                        }
                    }),
                    Object.defineProperty(exports, 'TemplateCollection', {
                        enumerable: !0,
                        get: function() {
                            return e.TemplateCollection;
                        }
                    });
                var e = require('./tiny-lit');
            },
            { './tiny-lit': 'kZxM' }
        ],
        wFtM: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var t =
                        window.requestIdleCallback ||
                        function(t, e) {
                            void 0 === e && (e = {});
                            var n = Date.now();
                            return setTimeout(function() {
                                return t({
                                    didTimeout: !1,
                                    timeRemaining: function() {
                                        return Math.max(
                                            0,
                                            (e.timeout || 50) - (Date.now() - n)
                                        );
                                    }
                                });
                            }, 1);
                        },
                    e = (function() {
                        function e() {
                            var t = this;
                            (this.tasks = []),
                                (this.running = !1),
                                (this.process = function(e) {
                                    for (
                                        var n = t.tasks;
                                        (e.timeRemaining() > 0 ||
                                            e.didTimeout) &&
                                        n.length > 0;

                                    ) {
                                        var i = n.shift();
                                        (i._scheduled = !1), i();
                                    }
                                    n.length > 0 ? t.start() : (t.running = !1);
                                });
                        }
                        return (
                            (e.prototype.start = function() {
                                t(this.process, { timeout: 100 }),
                                    (this.running = !0);
                            }),
                            (e.prototype.defer = function(t) {
                                var e = this;
                                return function() {
                                    void 0 === t._scheduled
                                        ? ((t._scheduled = !1), t())
                                        : t._scheduled
                                            ? (t._priority++,
                                              e.tasks.sort(function(t, e) {
                                                  return (
                                                      e._priority - t._priority
                                                  );
                                              }))
                                            : (e.tasks.push(t),
                                              (t._scheduled = !0),
                                              (t._priority = 0)),
                                        e.tasks.length &&
                                            !e.running &&
                                            e.start();
                                };
                            }),
                            e
                        );
                    })();
                (exports.Scheduler = e), (exports.default = new e());
            },
            {}
        ],
        hcCl: [
            function(require, module, exports) {
                'use strict';
                var e =
                        (this && this.__extends) ||
                        (function() {
                            var e = function(t, r) {
                                return (e =
                                    Object.setPrototypeOf ||
                                    ({ __proto__: [] } instanceof Array &&
                                        function(e, t) {
                                            e.__proto__ = t;
                                        }) ||
                                    function(e, t) {
                                        for (var r in t)
                                            t.hasOwnProperty(r) &&
                                                (e[r] = t[r]);
                                    })(t, r);
                            };
                            return function(t, r) {
                                function n() {
                                    this.constructor = t;
                                }
                                e(t, r),
                                    (t.prototype =
                                        null === r
                                            ? Object.create(r)
                                            : ((n.prototype = r.prototype),
                                              new n()));
                            };
                        })(),
                    t =
                        (this && this.__makeTemplateObject) ||
                        function(e, t) {
                            return (
                                Object.defineProperty
                                    ? Object.defineProperty(e, 'raw', {
                                          value: t
                                      })
                                    : (e.raw = t),
                                e
                            );
                        },
                    r =
                        (this && this.__assign) ||
                        function() {
                            return (r =
                                Object.assign ||
                                function(e) {
                                    for (
                                        var t, r = 1, n = arguments.length;
                                        r < n;
                                        r++
                                    )
                                        for (var o in (t = arguments[r]))
                                            Object.prototype.hasOwnProperty.call(
                                                t,
                                                o
                                            ) && (e[o] = t[o]);
                                    return e;
                                }).apply(this, arguments);
                        };
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var n,
                    o = require('@tiny-lit/core'),
                    i = require('./Scheduler');
                function s(e) {
                    return e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                }
                function c(s) {
                    return (function(s) {
                        function c() {
                            var e =
                                (null !== s && s.apply(this, arguments)) ||
                                this;
                            return (
                                (e.state = {}),
                                (e.__childNodes = []),
                                (e.rendered = !1),
                                (e.renderCallbacks = []),
                                (e.render = e.scheduler.defer(function() {
                                    for (
                                        e.rendered ||
                                            ((e.__childNodes = [].slice.call(
                                                e.childNodes
                                            )),
                                            (e.rendered = !0)),
                                            o.render(e.getTemplate(), e);
                                        e.renderCallbacks.length;

                                    )
                                        e.renderCallbacks.shift()();
                                })),
                                e
                            );
                        }
                        return (
                            e(c, s),
                            Object.defineProperty(c.prototype, 'scheduler', {
                                get: function() {
                                    return i.default;
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            Object.defineProperty(c.prototype, 'slot', {
                                get: function() {
                                    return this.__childNodes.map(function(e) {
                                        return o.html(
                                            n || (n = t(['', ''], ['', ''])),
                                            e
                                        );
                                    });
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            (c.prototype.connectedCallback = function() {
                                this.render();
                            }),
                            (c.prototype.setState = function(e, t) {
                                var n = this.state;
                                (this.state = r(
                                    {},
                                    n,
                                    'function' == typeof e ? e(n, this) : e
                                )),
                                    t && this.renderCallbacks.push(t),
                                    this.render();
                            }),
                            (c.prototype.getTemplate = function() {
                                throw 'Method not implemented';
                            }),
                            c
                        );
                    })(s);
                }
                function u(e) {
                    if (!e.hasOwnProperty('__attrsMap')) {
                        var t = e.properties,
                            r = Object.create(null);
                        if (t) {
                            var n = function(n) {
                                (r[s(n)] = n),
                                    Object.defineProperty(e.prototype, n, {
                                        get: function() {
                                            return this.__props[n];
                                        },
                                        set: function(e) {
                                            var r = this.__props[n];
                                            (this.__props[n] = t[n](e)),
                                                this.rendered &&
                                                    r !== e &&
                                                    !this.render._scheduled &&
                                                    this.render();
                                        }
                                    });
                            };
                            for (var o in t) n(o);
                        }
                        (e.__attrsMap = r),
                            (e.__observedProperties = Object.keys(r));
                    }
                    return e.__observedProperties;
                }
                function a(t) {
                    return (function(t) {
                        function r() {
                            var e =
                                (null !== t && t.apply(this, arguments)) ||
                                this;
                            return (e.__props = Object.create(null)), e;
                        }
                        return (
                            e(r, t),
                            Object.defineProperty(r, 'observedAttributes', {
                                get: function() {
                                    return u(this);
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            (r.prototype.attributeChangedCallback = function(
                                e,
                                t,
                                r
                            ) {
                                this[this.constructor.__attrsMap[e]] = r;
                            }),
                            r
                        );
                    })(t);
                }
                (exports.withElement = c),
                    (exports.withProps = a),
                    (exports.Element = a(c(HTMLElement)));
            },
            { '@tiny-lit/core': 'SCxV', './Scheduler': 'wFtM' }
        ],
        '4tHz': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var e = require('./Element');
                (exports.Element = e.Element),
                    (exports.withElement = e.withElement),
                    (exports.withProps = e.withProps);
            },
            { './Element': 'hcCl' }
        ],
        Qm0l: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.default = void 0);
                var n = require('@tiny-lit/core/lib/cjs');
                function e() {
                    var n = t([
                        "\n<style>\n    button {\n        margin: 0;\n        padding: 0;\n        border: 0;\n        background: none;\n        font-size: 100%;\n        vertical-align: baseline;\n        font-family: inherit;\n        font-weight: inherit;\n        color: inherit;\n        -webkit-appearance: none;\n        appearance: none;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n    }\n\n    .todoapp {\n        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;\n        line-height: 1.4em;\n        background: #f5f5f5;\n        color: #4d4d4d;\n        min-width: 230px;\n        max-width: 550px;\n        margin: 0 auto;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        font-weight: 300;\n    }\n\n    :focus {\n        outline: 0;\n    }\n\n    .hidden {\n        display: none;\n    }\n\n    .todoapp {\n        background: #fff;\n        margin: 130px auto;\n        position: relative;\n        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n                    0 25px 50px 0 rgba(0, 0, 0, 0.1);\n    }\n\n    .todoapp input::-webkit-input-placeholder {\n        font-style: italic;\n        font-weight: 300;\n        color: #e6e6e6;\n    }\n\n    .todoapp input::-moz-placeholder {\n        font-style: italic;\n        font-weight: 300;\n        color: #e6e6e6;\n    }\n\n    .todoapp input::input-placeholder {\n        font-style: italic;\n        font-weight: 300;\n        color: #e6e6e6;\n    }\n\n    .todoapp h1 {\n        position: absolute;\n        top: -155px;\n        width: 100%;\n        font-size: 100px;\n        font-weight: 100;\n        text-align: center;\n        color: rgba(175, 47, 47, 0.15);\n        -webkit-text-rendering: optimizeLegibility;\n        -moz-text-rendering: optimizeLegibility;\n        text-rendering: optimizeLegibility;\n    }\n\n    .new-todo,\n    .edit {\n        position: relative;\n        margin: 0;\n        width: 100%;\n        font-size: 24px;\n        font-family: inherit;\n        font-weight: inherit;\n        line-height: 1.4em;\n        border: 0;\n        color: inherit;\n        padding: 6px;\n        border: 1px solid #999;\n        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n        box-sizing: border-box;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n    }\n\n    .new-todo {\n        padding: 16px 16px 16px 60px;\n        border: none;\n        background: rgba(0, 0, 0, 0.003);\n        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);\n    }\n\n    .main {\n        position: relative;\n        z-index: 2;\n        border-top: 1px solid #e6e6e6;\n    }\n\n    .toggle-all {\n        text-align: center;\n        border: none; /* Mobile Safari */\n        opacity: 0;\n        position: absolute;\n    }\n\n    .toggle-all + label {\n        width: 60px;\n        height: 34px;\n        font-size: 0;\n        position: absolute;\n        top: -52px;\n        left: -13px;\n        -webkit-transform: rotate(90deg);\n        transform: rotate(90deg);\n    }\n\n    .toggle-all + label:before {\n        content: '❯';\n        font-size: 22px;\n        color: #e6e6e6;\n        padding: 10px 27px 10px 27px;\n    }\n\n    .toggle-all:checked + label:before {\n        color: #737373;\n    }\n\n    .todo-list {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .todo-list li {\n        position: relative;\n        font-size: 24px;\n        border-bottom: 1px solid #ededed;\n    }\n\n    .todo-list li:last-child {\n        border-bottom: none;\n    }\n\n    .todo-list li.editing {\n        border-bottom: none;\n        padding: 0;\n    }\n\n    .todo-list li.editing .edit {\n        display: block;\n        width: 506px;\n        padding: 12px 16px;\n        margin: 0 0 0 43px;\n    }\n\n    .todo-list li.editing .view {\n        display: none;\n    }\n\n    .todo-list li .toggle {\n        text-align: center;\n        width: 40px;\n        /* auto, since non-WebKit browsers doesn't support input styling */\n        height: auto;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        margin: auto 0;\n        border: none; /* Mobile Safari */\n        -webkit-appearance: none;\n        appearance: none;\n    }\n\n    .todo-list li .toggle {\n        opacity: 0;\n    }\n\n    .todo-list li .toggle + label {\n        /*\n            Firefox requires '#' to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433\n            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the '#' - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/\n        */\n        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');\n        background-repeat: no-repeat;\n        background-position: center left;\n    }\n\n    .todo-list li .toggle:checked + label {\n        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');\n    }\n\n    .todo-list li label {\n        word-break: break-all;\n        padding: 15px 15px 15px 60px;\n        display: block;\n        line-height: 1.2;\n        transition: color 0.4s;\n    }\n\n    .todo-list li.completed label {\n        color: #d9d9d9;\n        text-decoration: line-through;\n    }\n\n    .todo-list li .destroy {\n        display: none;\n        position: absolute;\n        top: 0;\n        right: 10px;\n        bottom: 0;\n        width: 40px;\n        height: 40px;\n        margin: auto 0;\n        font-size: 30px;\n        color: #cc9a9a;\n        margin-bottom: 11px;\n        transition: color 0.2s ease-out;\n    }\n\n    .todo-list li .destroy:hover {\n        color: #af5b5e;\n    }\n\n    .todo-list li .destroy:after {\n        content: '×';\n    }\n\n    .todo-list li:hover .destroy {\n        display: block;\n    }\n\n    .todo-list li .edit {\n        display: none;\n    }\n\n    .todo-list li.editing:last-child {\n        margin-bottom: -1px;\n    }\n\n    .footer {\n        color: #777;\n        padding: 10px 15px;\n        height: 20px;\n        text-align: center;\n        border-top: 1px solid #e6e6e6;\n    }\n\n    .footer:before {\n        content: '';\n        position: absolute;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        height: 50px;\n        overflow: hidden;\n        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),\n                    0 8px 0 -3px #f6f6f6,\n                    0 9px 1px -3px rgba(0, 0, 0, 0.2),\n                    0 16px 0 -6px #f6f6f6,\n                    0 17px 2px -6px rgba(0, 0, 0, 0.2);\n    }\n\n    .todo-count {\n        float: left;\n        text-align: left;\n    }\n\n    .todo-count strong {\n        font-weight: 300;\n    }\n\n    .filters {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        position: absolute;\n        right: 0;\n        left: 0;\n    }\n\n    .filters li {\n        display: inline;\n    }\n\n    .filters li a {\n        color: inherit;\n        margin: 3px;\n        padding: 3px 7px;\n        text-decoration: none;\n        border: 1px solid transparent;\n        border-radius: 3px;\n    }\n\n    .filters li a:hover {\n        border-color: rgba(175, 47, 47, 0.1);\n    }\n\n    .filters li a.selected {\n        border-color: rgba(175, 47, 47, 0.2);\n    }\n\n    .clear-completed,\n    html .clear-completed:active {\n        float: right;\n        position: relative;\n        line-height: 20px;\n        text-decoration: none;\n        cursor: pointer;\n    }\n\n    .clear-completed:hover {\n        text-decoration: underline;\n    }\n\n    .shuffle {\n        margin-right: 5px;\n    }\n\n    .info {\n        margin: 65px auto 0;\n        color: #bfbfbf;\n        font-size: 10px;\n        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n        text-align: center;\n    }\n\n    .info p {\n        line-height: 1;\n    }\n\n    .info a {\n        color: inherit;\n        text-decoration: none;\n        font-weight: 400;\n    }\n\n    .info a:hover {\n        text-decoration: underline;\n    }\n\n    /*\n        Hack to remove background from Mobile Safari.\n        Can't use it globally since it destroys checkboxes in Firefox\n    */\n    @media screen and (-webkit-min-device-pixel-ratio:0) {\n        .toggle-all,\n        .todo-list li .toggle {\n            background: none;\n        }\n\n        .todo-list li .toggle {\n            height: 40px;\n        }\n    }\n\n    @media (max-width: 430px) {\n        .footer {\n            height: 50px;\n        }\n\n        .filters {\n            bottom: 10px;\n        }\n    }\n</style>\n"
                    ]);
                    return (
                        (e = function() {
                            return n;
                        }),
                        n
                    );
                }
                function t(n, e) {
                    return (
                        e || (e = n.slice(0)),
                        Object.freeze(
                            Object.defineProperties(n, {
                                raw: { value: Object.freeze(e) }
                            })
                        )
                    );
                }
                var o = (0, n.html)(e());
                exports.default = o;
            },
            { '@tiny-lit/core/lib/cjs': '6pAK' }
        ],
        mHJN: [
            function(require, module, exports) {
                'use strict';
                var e = require('@tiny-lit/core/lib/cjs'),
                    t = require('@tiny-lit/element/lib/cjs'),
                    n = o(require('./style.js'));
                function o(e) {
                    return e && e.__esModule ? e : { default: e };
                }
                function l(e) {
                    return (l =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function(e) {
                                  return typeof e;
                              }
                            : function(e) {
                                  return e &&
                                      'function' == typeof Symbol &&
                                      e.constructor === Symbol &&
                                      e !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof e;
                              })(e);
                }
                function r() {
                    var e = c([
                        '\n                            <li class=',
                        '>\n                                <div\n                                    class="view"\n                                >\n                                    <input\n                                        class="toggle"\n                                        type="checkbox"\n                                        checked=',
                        '\n                                        onClick=',
                        '\n                                    />\n                                    <label onClick=',
                        '>',
                        '</label>\n                                    <button class="destroy" onClick=',
                        '></button>\n                                </div>\n                                <input class="edit" value=',
                        ' />\n                            </li>\n                        '
                    ]);
                    return (
                        (r = function() {
                            return e;
                        }),
                        e
                    );
                }
                function i() {
                    var e = c(
                        [
                            '\n            ',
                            '\n            <section class="todoapp body">\n                <header class="header">\n                    <h1>todos</h1>\n                    <form onSubmit=',
                            '>\n                        <input\n                            class="new-todo"\n                            placeholder="What needs to be done?"\n                            autofocus\n                        />\n                    </form>\n                </header>\n                \x3c!-- This section should be hidden by default and shown when there are todos --\x3e\n                <section class="main">\n                    <input id="toggle-all" class="toggle-all" type="checkbox" />\n                    <label for="toggle-all">Mark all as complete</label>\n                    <ul class="todo-list">\n                        \x3c!-- These are here just to show the structure of the list items --\x3e\n                        \x3c!-- List items should get the class `editing` when editing and `completed` when marked as completed --\x3e\n                        ',
                            '\n                    </ul>\n                </section>\n                \x3c!-- This footer should hidden by default and shown when there are todos --\x3e\n                <footer class="footer">\n                    \x3c!-- This should be `0 items left` by default --\x3e\n                    <span class="todo-count">\n                        <strong>',
                            '\n                        </strong> item left\n                    </span>\n\n                    <ul class="filters">\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/"\n                                onClick=',
                            '\n                            >\n                                All\n                            </a>\n                        </li>\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/active"\n                                onClick=',
                            '\n                            >\n                                Active\n                            </a>\n                        </li>\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/completed"\n                                onClick=',
                            '\n                            >\n                                Completed\n                            </a>\n                        </li>\n                    </ul>\n                    \x3c!-- Hidden if no completed items are left ↓ --\x3e\n                    <button class="clear-completed" onClick=',
                            '>Clear completed</button>\n                    <button class="clear-completed shuffle" onClick=',
                            '>Shuffle</button>\n                </footer>\n            </section>\n            <footer class="info">\n                <p>Double-click to edit a todo</p>\n                \x3c!-- Change this out with your name and url ↓ --\x3e\n                <p>Created by <a href="http://todomvc.com">you</a></p>\n                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>\n            </footer>\n        '
                        ],
                        [
                            '\n            ',
                            '\n            <section class="todoapp body">\n                <header class="header">\n                    <h1>todos</h1>\n                    <form onSubmit=',
                            '>\n                        <input\n                            class="new-todo"\n                            placeholder="What needs to be done?"\n                            autofocus\n                        />\n                    </form>\n                </header>\n                \x3c!-- This section should be hidden by default and shown when there are todos --\x3e\n                <section class="main">\n                    <input id="toggle-all" class="toggle-all" type="checkbox" />\n                    <label for="toggle-all">Mark all as complete</label>\n                    <ul class="todo-list">\n                        \x3c!-- These are here just to show the structure of the list items --\x3e\n                        \x3c!-- List items should get the class \\`editing\\` when editing and \\`completed\\` when marked as completed --\x3e\n                        ',
                            '\n                    </ul>\n                </section>\n                \x3c!-- This footer should hidden by default and shown when there are todos --\x3e\n                <footer class="footer">\n                    \x3c!-- This should be \\`0 items left\\` by default --\x3e\n                    <span class="todo-count">\n                        <strong>',
                            '\n                        </strong> item left\n                    </span>\n\n                    <ul class="filters">\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/"\n                                onClick=',
                            '\n                            >\n                                All\n                            </a>\n                        </li>\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/active"\n                                onClick=',
                            '\n                            >\n                                Active\n                            </a>\n                        </li>\n                        <li>\n                            <a\n                                class=',
                            '\n                                href="#/completed"\n                                onClick=',
                            '\n                            >\n                                Completed\n                            </a>\n                        </li>\n                    </ul>\n                    \x3c!-- Hidden if no completed items are left ↓ --\x3e\n                    <button class="clear-completed" onClick=',
                            '>Clear completed</button>\n                    <button class="clear-completed shuffle" onClick=',
                            '>Shuffle</button>\n                </footer>\n            </section>\n            <footer class="info">\n                <p>Double-click to edit a todo</p>\n                \x3c!-- Change this out with your name and url ↓ --\x3e\n                <p>Created by <a href="http://todomvc.com">you</a></p>\n                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>\n            </footer>\n        '
                        ]
                    );
                    return (
                        (i = function() {
                            return e;
                        }),
                        e
                    );
                }
                function c(e, t) {
                    return (
                        t || (t = e.slice(0)),
                        Object.freeze(
                            Object.defineProperties(e, {
                                raw: { value: Object.freeze(t) }
                            })
                        )
                    );
                }
                function s(e) {
                    return f(e) || u(e) || a();
                }
                function a() {
                    throw new TypeError(
                        'Invalid attempt to spread non-iterable instance'
                    );
                }
                function u(e) {
                    if (
                        Symbol.iterator in Object(e) ||
                        '[object Arguments]' ===
                            Object.prototype.toString.call(e)
                    )
                        return Array.from(e);
                }
                function f(e) {
                    if (Array.isArray(e)) {
                        for (
                            var t = 0, n = new Array(e.length);
                            t < e.length;
                            t++
                        )
                            n[t] = e[t];
                        return n;
                    }
                }
                function d(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError(
                            'Cannot call a class as a function'
                        );
                }
                function h(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        (o.enumerable = o.enumerable || !1),
                            (o.configurable = !0),
                            'value' in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o);
                    }
                }
                function p(e, t, n) {
                    return t && h(e.prototype, t), n && h(e, n), e;
                }
                function m(e, t) {
                    return !t || ('object' !== l(t) && 'function' != typeof t)
                        ? b(e)
                        : t;
                }
                function b(e) {
                    if (void 0 === e)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        );
                    return e;
                }
                function y(e, t, n) {
                    return (y =
                        'undefined' != typeof Reflect && Reflect.get
                            ? Reflect.get
                            : function(e, t, n) {
                                  var o = g(e, t);
                                  if (o) {
                                      var l = Object.getOwnPropertyDescriptor(
                                          o,
                                          t
                                      );
                                      return l.get ? l.get.call(n) : l.value;
                                  }
                              })(e, t, n || e);
                }
                function g(e, t) {
                    for (
                        ;
                        !Object.prototype.hasOwnProperty.call(e, t) &&
                        null !== (e = v(e));

                    );
                    return e;
                }
                function v(e) {
                    return (v = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function(e) {
                              return e.__proto__ || Object.getPrototypeOf(e);
                          })(e);
                }
                function w(e, t) {
                    if ('function' != typeof t && null !== t)
                        throw new TypeError(
                            'Super expression must either be null or a function'
                        );
                    (e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                        t && x(e, t);
                }
                function x(e, t) {
                    return (x =
                        Object.setPrototypeOf ||
                        function(e, t) {
                            return (e.__proto__ = t), e;
                        })(e, t);
                }
                function k(e) {
                    return function(t) {
                        t.preventDefault(), e(t);
                    };
                }
                function C(e) {
                    var t = localStorage.getItem('todoMvc');
                    return t ? JSON.parse(t) : e;
                }
                function S(e) {
                    window.requestAnimationFrame(function() {
                        return localStorage.setItem(
                            'todoMvc',
                            JSON.stringify(e)
                        );
                    });
                }
                function O(e) {
                    for (var t = e.length; t > 0; ) {
                        var n = Math.floor(Math.random() * t),
                            o = e[--t];
                        (e[t] = e[n]), (e[n] = o);
                    }
                    return e;
                }
                var j = (function(o) {
                    function l() {
                        var e;
                        return (
                            d(this, l),
                            ((e = m(this, v(l).call(this))).state = C({
                                todos: [],
                                filter: null
                            })),
                            e
                        );
                    }
                    return (
                        w(l, t.Element),
                        p(
                            l,
                            [
                                {
                                    key: 'setState',
                                    value: function(e) {
                                        y(
                                            v(l.prototype),
                                            'setState',
                                            this
                                        ).call(this, e),
                                            S(this.state);
                                    }
                                },
                                {
                                    key: 'setFilter',
                                    value: function(e) {
                                        this.setState({ filter: e });
                                    }
                                },
                                {
                                    key: 'handleAddTodo',
                                    value: function(e) {
                                        this.setState({
                                            todos: s(this.state.todos).concat([
                                                {
                                                    text:
                                                        e.target.elements[0]
                                                            .value,
                                                    completed: !1,
                                                    id: Math.random()
                                                        .toString()
                                                        .substr(2)
                                                }
                                            ])
                                        }),
                                            e.target.reset();
                                    }
                                },
                                {
                                    key: 'handleDeleteTodo',
                                    value: function(e) {
                                        this.setState({
                                            todos: s(
                                                this.state.todos.filter(
                                                    function(t) {
                                                        return t !== e;
                                                    }
                                                )
                                            )
                                        });
                                    }
                                },
                                {
                                    key: 'switchCompleted',
                                    value: function(e) {
                                        var t = this.state.todos;
                                        (t[e].completed = !t[e].completed),
                                            this.setState({ todos: s(t) });
                                    }
                                },
                                {
                                    key: 'handleClearCompleted',
                                    value: function() {
                                        this.setState({
                                            todos: s(
                                                this.state.todos.filter(
                                                    function(e) {
                                                        return !e.completed;
                                                    }
                                                )
                                            )
                                        });
                                    }
                                },
                                {
                                    key: 'getTemplate',
                                    value: function() {
                                        var t = this,
                                            o = this.state,
                                            l = o.filter,
                                            c = o.todos;
                                        return (0, e.html)(
                                            i(),
                                            n.default,
                                            k(function(e) {
                                                return t.handleAddTodo(e);
                                            }),
                                            c
                                                .map(function(e, t) {
                                                    return (e.index = t), e;
                                                })
                                                .filter(function(e) {
                                                    return (
                                                        null === l ||
                                                        e.completed === l
                                                    );
                                                })
                                                .map(function(n) {
                                                    return (0, e.html)(
                                                        r(),
                                                        n.completed
                                                            ? 'completed'
                                                            : '',
                                                        n.completed,
                                                        k(function() {
                                                            return t.switchCompleted(
                                                                n.index
                                                            );
                                                        }),
                                                        k(function() {
                                                            return t.switchCompleted(
                                                                n.index
                                                            );
                                                        }),
                                                        n.text,
                                                        k(function() {
                                                            return t.handleDeleteTodo(
                                                                n
                                                            );
                                                        }),
                                                        n.text
                                                    ).withKey(n.id);
                                                }),
                                            c.filter(function(e) {
                                                return !e.completed;
                                            }).length,
                                            null === l && 'selected',
                                            k(function() {
                                                return t.setFilter(null);
                                            }),
                                            !1 === l && 'selected',
                                            k(function() {
                                                return t.setFilter(!1);
                                            }),
                                            l && 'selected',
                                            k(function() {
                                                return t.setFilter(!0);
                                            }),
                                            k(function() {
                                                return t.handleClearCompleted();
                                            }),
                                            k(function() {
                                                return t.setState({
                                                    todos: O(t.state.todos)
                                                });
                                            })
                                        );
                                    }
                                }
                            ],
                            [
                                {
                                    key: 'is',
                                    get: function() {
                                        return 'todo-mvc';
                                    }
                                }
                            ]
                        ),
                        l
                    );
                })();
                customElements.define(j.is, j);
            },
            {
                '@tiny-lit/core/lib/cjs': '6pAK',
                '@tiny-lit/element/lib/cjs': '4tHz',
                './style.js': 'Qm0l'
            }
        ],
        xe9Y: [
            function(require, module, exports) {
                'use strict';
                var t = require('@tiny-lit/core/lib/cjs'),
                    e = require('@tiny-lit/element/lib/cjs');
                function n() {
                    var t = u([
                        '\n            <div style=',
                        '>\n                <karpinsky-triangle x=',
                        ' y=',
                        ' s=',
                        ' seconds=',
                        ' />\n            </div>\n        '
                    ]);
                    return (
                        (n = function() {
                            return t;
                        }),
                        t
                    );
                }
                function r() {
                    var t = u([
                        '\n            <karpinsky-triangle x=',
                        ' y=',
                        ' s=',
                        ' seconds=',
                        '></karpinsky-triangle>\n            <karpinsky-triangle x=',
                        ' y=',
                        ' s=',
                        ' seconds=',
                        '></karpinsky-triangle>\n            <karpinsky-triangle x=',
                        ' y=',
                        ' s=',
                        ' seconds=',
                        '></karpinsky-triangle>\n        '
                    ]);
                    return (
                        (r = function() {
                            return t;
                        }),
                        t
                    );
                }
                function i() {
                    var t = u([
                        '\n                <karpinsky-dot x=',
                        ' y=',
                        ' size=',
                        ' text=',
                        ' />\n            '
                    ]);
                    return (
                        (i = function() {
                            return t;
                        }),
                        t
                    );
                }
                function o(t) {
                    return (o =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function(t) {
                                  return typeof t;
                              }
                            : function(t) {
                                  return t &&
                                      'function' == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof t;
                              })(t);
                }
                function s() {
                    var t = u([
                        '<span style=',
                        '>\n                        ',
                        '\n                    </span>'
                    ]);
                    return (
                        (s = function() {
                            return t;
                        }),
                        t
                    );
                }
                function u(t, e) {
                    return (
                        e || (e = t.slice(0)),
                        Object.freeze(
                            Object.defineProperties(t, {
                                raw: { value: Object.freeze(e) }
                            })
                        )
                    );
                }
                function a(t, e) {
                    if (!(t instanceof e))
                        throw new TypeError(
                            'Cannot call a class as a function'
                        );
                }
                function c(t, e) {
                    return !e || ('object' !== o(e) && 'function' != typeof e)
                        ? l(t)
                        : e;
                }
                function l(t) {
                    if (void 0 === t)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        );
                    return t;
                }
                function f(t) {
                    return (f = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function(t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                function y(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(t, r.key, r);
                    }
                }
                function p(t, e, n) {
                    return e && y(t.prototype, e), n && y(t, n), t;
                }
                function h(t, e) {
                    if ('function' != typeof e && null !== e)
                        throw new TypeError(
                            'Super expression must either be null or a function'
                        );
                    (t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                        e && v(t, e);
                }
                function v(t, e) {
                    return (v =
                        Object.setPrototypeOf ||
                        function(t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                var m = 25;
                function b(t) {
                    var e = !0;
                    return (
                        requestAnimationFrame(function n() {
                            t(), e && requestAnimationFrame(n);
                        }),
                        function() {
                            return (e = !1);
                        }
                    );
                }
                var d = (function(n) {
                        function r() {
                            var t;
                            return (
                                a(this, r),
                                ((t = c(this, f(r).call(this))).x = 0),
                                (t.y = 0),
                                (t.size = 0),
                                (t.text = ''),
                                (t.hover = !1),
                                t.addEventListener('mouseover', function() {
                                    return (t.hover = !0);
                                }),
                                t.addEventListener('mouseleave', function() {
                                    return (t.hover = !1);
                                }),
                                t
                            );
                        }
                        return (
                            h(r, e.Element),
                            p(r, null, [
                                {
                                    key: 'is',
                                    get: function() {
                                        return 'karpinsky-dot';
                                    }
                                },
                                {
                                    key: 'properties',
                                    get: function() {
                                        return {
                                            x: Number,
                                            y: Number,
                                            size: Number,
                                            text: String,
                                            hover: Boolean
                                        };
                                    }
                                }
                            ]),
                            p(r, [
                                {
                                    key: 'getStyle',
                                    value: function() {
                                        var t = this.x,
                                            e = this.y,
                                            n = this.size,
                                            r = this.hover,
                                            i = 1.3 * n;
                                        return '\n            position: absolute;\n            font: normal 15px sans-serif;\n            text-align: center;\n            cursor: pointer;\n            width: '
                                            .concat(
                                                i,
                                                'px;\n            height: '
                                            )
                                            .concat(
                                                i,
                                                'px;\n            left: '
                                            )
                                            .concat(t, 'px;\n            top: ')
                                            .concat(
                                                e,
                                                'px;\n            border-radius: '
                                            )
                                            .concat(
                                                i / 2,
                                                'px;\n            line-height: '
                                            )
                                            .concat(
                                                i,
                                                'px;\n            background: '
                                            )
                                            .concat(
                                                r ? '#ff0' : '#61dafb',
                                                ';\n        '
                                            );
                                    }
                                },
                                {
                                    key: 'getTemplate',
                                    value: function() {
                                        var e = this.hover,
                                            n = this.text;
                                        return (0, t.html)(
                                            s(),
                                            this.getStyle(),
                                            e ? '**' + n + '**' : n
                                        );
                                    }
                                }
                            ]),
                            r
                        );
                    })(),
                    k = (function(n) {
                        function o() {
                            var t, e;
                            a(this, o);
                            for (
                                var n = arguments.length,
                                    r = new Array(n),
                                    i = 0;
                                i < n;
                                i++
                            )
                                r[i] = arguments[i];
                            return (
                                ((e = c(
                                    this,
                                    (t = f(o)).call.apply(t, [this].concat(r))
                                )).x = 0),
                                (e.y = 0),
                                (e.s = 0),
                                (e.seconds = 0),
                                e
                            );
                        }
                        return (
                            h(o, e.Element),
                            p(
                                o,
                                [
                                    {
                                        key: 'getTemplate',
                                        value: function() {
                                            var e = this.s,
                                                n = this.seconds,
                                                o = this.x,
                                                s = this.y;
                                            if (e <= m)
                                                return (0, t.html)(
                                                    i(),
                                                    o - m / 2,
                                                    s - m / 2,
                                                    m,
                                                    n
                                                );
                                            e /= 2;
                                            for (
                                                var u = performance.now() + 0.8;
                                                performance.now() < u;

                                            );
                                            return (0, t.html)(
                                                r(),
                                                o,
                                                s - e / 2,
                                                e,
                                                n,
                                                o - e,
                                                s + e / 2,
                                                e,
                                                n,
                                                o + e,
                                                s + e / 2,
                                                e,
                                                n
                                            );
                                        }
                                    }
                                ],
                                [
                                    {
                                        key: 'is',
                                        get: function() {
                                            return 'karpinsky-triangle';
                                        }
                                    },
                                    {
                                        key: 'properties',
                                        get: function() {
                                            return {
                                                x: Number,
                                                y: Number,
                                                s: Number,
                                                seconds: Number
                                            };
                                        }
                                    }
                                ]
                            ),
                            o
                        );
                    })(),
                    g = (function(r) {
                        function i() {
                            return (
                                a(this, i), c(this, f(i).apply(this, arguments))
                            );
                        }
                        return (
                            h(i, e.Element),
                            p(
                                i,
                                [
                                    {
                                        key: 'connectedCallback',
                                        value: function() {
                                            (this.start = Date.now()),
                                                (this.timerInterval = setInterval(
                                                    this.tick.bind(this),
                                                    1e3
                                                )),
                                                (this.renderInterval = b(
                                                    this.render
                                                )),
                                                this.setState({ seconds: 0 });
                                        }
                                    },
                                    {
                                        key: 'disconnectedCallback',
                                        value: function() {
                                            this.renderInterval(),
                                                clearInterval(
                                                    this.timerInterval
                                                );
                                        }
                                    },
                                    {
                                        key: 'tick',
                                        value: function() {
                                            this.setState({
                                                seconds:
                                                    (this.state.seconds % 10) +
                                                    1
                                            });
                                        }
                                    },
                                    {
                                        key: 'getStyle',
                                        value: function() {
                                            var t =
                                                ((Date.now() - this.start) /
                                                    1e3) %
                                                10;
                                            return '\n            position: absolute;\n            transform-origin: 0 0;\n            width: 10px;\n            height: 10px;\n            left: 50%;\n            top: 50%;\n            background: #eee;\n            transform: scaleX('.concat(
                                                (1 +
                                                    (t > 5 ? 10 - t : t) / 10) /
                                                    2.1,
                                                ') scaleY(0.7) translateZ(0.1px) translateX(50%)\n        '
                                            );
                                        }
                                    },
                                    {
                                        key: 'getTemplate',
                                        value: function() {
                                            var e = this.state.seconds;
                                            return (0, t.html)(
                                                n(),
                                                this.getStyle(),
                                                0,
                                                0,
                                                1e3,
                                                e
                                            );
                                        }
                                    }
                                ],
                                [
                                    {
                                        key: 'is',
                                        get: function() {
                                            return 'karpinsky-demo';
                                        }
                                    }
                                ]
                            ),
                            i
                        );
                    })();
                customElements.define(k.is, k),
                    customElements.define(d.is, d),
                    customElements.define(g.is, g);
            },
            {
                '@tiny-lit/core/lib/cjs': '6pAK',
                '@tiny-lit/element/lib/cjs': '4tHz'
            }
        ],
        g7Da: [
            function(require, module, exports) {
                'use strict';
                var e;
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (function(e) {
                        (e.Request = 'store::request'),
                            (e.Dispatch = 'store::dispatch'),
                            (e.Update = 'store::update');
                    })((e = exports.StoreEvents || (exports.StoreEvents = {})));
            },
            {}
        ],
        '1KTD': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var t = require('./types');
                function e(t) {
                    return function(e, n) {
                        return (
                            'string' == typeof e && (e = { type: e, data: n }),
                            t(e)
                        );
                    };
                }
                function n(e) {
                    var n = new CustomEvent(t.StoreEvents.Request, {
                        detail: {}
                    });
                    return e.dispatchEvent(n), n.detail.store;
                }
                function r(e, n) {
                    return new CustomEvent(t.StoreEvents.Update, {
                        detail: { state: e, mutation: n }
                    });
                }
                function o(e, n) {
                    return new CustomEvent(t.StoreEvents.Dispatch, {
                        detail: { type: e, data: n }
                    });
                }
                (exports.normalizeEvent = e),
                    (exports.requestStore = n),
                    (exports.createUpdateEvent = r),
                    (exports.createDispatchEvent = o);
            },
            { './types': 'g7Da' }
        ],
        eMQL: [
            function(require, module, exports) {
                'use strict';
                var t,
                    e =
                        (this && this.__assign) ||
                        function() {
                            return (e =
                                Object.assign ||
                                function(t) {
                                    for (
                                        var e, n = 1, i = arguments.length;
                                        n < i;
                                        n++
                                    )
                                        for (var r in (e = arguments[n]))
                                            Object.prototype.hasOwnProperty.call(
                                                e,
                                                r
                                            ) && (t[r] = e[r]);
                                    return t;
                                }).apply(this, arguments);
                        };
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var n = require('./events'),
                    i = Symbol(),
                    r = (function() {
                        function r(r) {
                            var s = this;
                            (this[t] = {}),
                                (this.listeners = new Set()),
                                (this.dispatch = n.normalizeEvent(function(t) {
                                    var e = s.config.actions;
                                    t.type in e && e[t.type](s, t.data);
                                })),
                                (this.commit = n.normalizeEvent(function(t) {
                                    var e = s.config.mutations;
                                    t.type in e && e[t.type](s.state, t.data),
                                        s.listeners.forEach(function(e) {
                                            return e(t);
                                        });
                                })),
                                (this.config = e(
                                    {
                                        mutations: {},
                                        actions: {},
                                        initialState: {},
                                        plugins: []
                                    },
                                    r
                                )),
                                (this[i] = this.config.initialState),
                                this.config.plugins.forEach(function(t) {
                                    return t(s);
                                });
                        }
                        return (
                            Object.defineProperty(r.prototype, 'state', {
                                get: function() {
                                    return this[i];
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            (r.prototype.subscribe = function(t) {
                                var e = this,
                                    n = this.listeners,
                                    i = function(n) {
                                        return t(e.state, n);
                                    };
                                return (
                                    n.add(i),
                                    t(this.state),
                                    function() {
                                        return n.delete(i);
                                    }
                                );
                            }),
                            r
                        );
                    })();
                (t = i),
                    (exports.Store = r),
                    (exports.createStore = function(t) {
                        return new r(t);
                    });
            },
            { './events': '1KTD' }
        ],
        yGCD: [
            function(require, module, exports) {
                'use strict';
                var t =
                    (this && this.__extends) ||
                    (function() {
                        var t = function(e, n) {
                            return (t =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function(t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function(t, e) {
                                    for (var n in e)
                                        e.hasOwnProperty(n) && (t[n] = e[n]);
                                })(e, n);
                        };
                        return function(e, n) {
                            function o() {
                                this.constructor = e;
                            }
                            t(e, n),
                                (e.prototype =
                                    null === n
                                        ? Object.create(n)
                                        : ((o.prototype = n.prototype),
                                          new o()));
                        };
                    })();
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var e = require('./types'),
                    n = require('./events');
                function o(o) {
                    return (function(o) {
                        function r() {
                            return (
                                (null !== o && o.apply(this, arguments)) || this
                            );
                        }
                        return (
                            t(r, o),
                            (r.prototype.connectedCallback = function() {
                                var t,
                                    r = this;
                                if (
                                    (o.prototype.connectedCallback &&
                                        o.prototype.connectedCallback.call(
                                            this
                                        ),
                                    (t = n.requestStore(this)))
                                ) {
                                    var i = function(t) {
                                        return r.onStateChange(
                                            t.detail.state,
                                            t.detail.mutation
                                        );
                                    };
                                    t.addEventListener(
                                        e.StoreEvents.Update,
                                        i,
                                        !0
                                    ),
                                        (this.unsubscribe = t.removeEventListener.bind(
                                            this,
                                            e.StoreEvents.Update,
                                            i,
                                            !0
                                        )),
                                        this.onStateChange(t.getStore().state);
                                }
                            }),
                            (r.prototype.disconnectedCallback = function() {
                                o.prototype.disconnectedCallback &&
                                    o.prototype.disconnectedCallback.call(this),
                                    this.unsubscribe();
                            }),
                            (r.prototype.onStoreConnect = function() {}),
                            (r.prototype.onStateChange = function(t, e) {}),
                            (r.prototype.dispatch = function(t, e) {
                                this.dispatchEvent(n.createDispatchEvent(t, e));
                            }),
                            r
                        );
                    })(o);
                }
                exports.withStore = o;
            },
            { './types': 'g7Da', './events': '1KTD' }
        ],
        RxfK: [
            function(require, module, exports) {
                'use strict';
                var t =
                    (this && this.__extends) ||
                    (function() {
                        var t = function(e, r) {
                            return (t =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function(t, e) {
                                        t.__proto__ = e;
                                    }) ||
                                function(t, e) {
                                    for (var r in e)
                                        e.hasOwnProperty(r) && (t[r] = e[r]);
                                })(e, r);
                        };
                        return function(e, r) {
                            function o() {
                                this.constructor = e;
                            }
                            t(e, r),
                                (e.prototype =
                                    null === r
                                        ? Object.create(r)
                                        : ((o.prototype = r.prototype),
                                          new o()));
                        };
                    })();
                Object.defineProperty(exports, '__esModule', { value: !0 });
                var e = require('./types'),
                    r = require('./events'),
                    o = require('./store'),
                    n = (function(n) {
                        function i() {
                            var t = n.call(this) || this;
                            return (
                                (t.store = void 0),
                                (t.listeners = new WeakMap()),
                                (t.onStateChange = function(e, o) {
                                    return t.dispatchEvent(
                                        r.createUpdateEvent(e, o)
                                    );
                                }),
                                (t.onStoreRequest = function(e) {
                                    e.stopPropagation(), (e.detail.store = t);
                                }),
                                (t.onStoreDispatch = function(e) {
                                    t.getStore().dispatch(e.detail);
                                }),
                                t.addEventListener(
                                    e.StoreEvents.Request,
                                    t.onStoreRequest,
                                    !0
                                ),
                                t.addEventListener(
                                    e.StoreEvents.Dispatch,
                                    t.onStoreDispatch,
                                    !0
                                ),
                                (t.store = o.createStore(t.config)),
                                t.store.subscribe(t.onStateChange),
                                t
                            );
                        }
                        return (
                            t(i, n),
                            Object.defineProperty(i.prototype, 'config', {
                                get: function() {
                                    return {};
                                },
                                enumerable: !0,
                                configurable: !0
                            }),
                            (i.prototype.getStore = function() {
                                return this.store;
                            }),
                            i
                        );
                    })(HTMLElement);
                exports.StoreProvider = n;
            },
            { './types': 'g7Da', './events': '1KTD', './store': 'eMQL' }
        ],
        qBKv: [
            function(require, module, exports) {
                'use strict';
                function e(e) {
                    for (var r in e)
                        exports.hasOwnProperty(r) || (exports[r] = e[r]);
                }
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    e(require('./store')),
                    e(require('./withStore')),
                    e(require('./StoreProvider')),
                    e(require('./types'));
            },
            {
                './store': 'eMQL',
                './withStore': 'yGCD',
                './StoreProvider': 'RxfK',
                './types': 'g7Da'
            }
        ],
        rMii: [
            function(require, module, exports) {
                'use strict';
                var e = require('@tiny-lit/store/lib/cjs'),
                    t = require('@tiny-lit/core/lib/cjs'),
                    n = require('@tiny-lit/element/lib/cjs');
                function r() {
                    var e = l(['<shop-item item=', '></shop-item>']);
                    return (
                        (r = function() {
                            return e;
                        }),
                        e
                    );
                }
                function o() {
                    var e = l([
                        '\n            <style>\n                h1 {\n                    font-size: 13px;\n                    font-weight: 500;\n                    line-height: 28px;\n                    margin: 0;\n                }\n                .detail {\n                    text-align:center;\n                    margin: 0 28px 48px;\n                }\n                .price {\n                    margin: 0px 0 10px;\n                    font-size: 13px;\n                    color: rgb(117, 117, 117);\n                }\n                .image {\n                    max-width: 100%;\n                    background: rgb(117, 117, 117);\n                }\n                .button {\n                    display: inline-block;\n                    box-sizing: border-box;\n                    border: 2px solid #000;\n                    background-color: #FFF;\n                    font-size: 14px;\n                    font-weight: 500;\n                    color: var(--app-primary-color);\n                    margin: 0;\n                    padding: 8px 44px;\n                    text-align: center;\n                    text-decoration: none;\n                    text-transform: uppercase;\n                    border-radius: 0;\n                    outline: none;\n                    -webkit-appearance: none;\n                }\n                my-store {\n                    display: flex;\n                    flex-wrap: wrap;\n                }\n                shop-item {\n                    flex: 1 1;\n                    flex-basis: 33%;\n                    max-width: 33%;\n                }\n            </style>\n            <my-store>\n                <shop-basket></shop-basket>\n                ',
                        '\n            </my-store>\n        '
                    ]);
                    return (
                        (o = function() {
                            return e;
                        }),
                        e
                    );
                }
                function i() {
                    var e = l([
                        '\n            <div class="detail" has-content="">\n                <img\n                    src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw"\n                    width="300"\n                    height="300"\n                    class="image"\n                />\n                <h1>',
                        '</h1>\n                <div class="price">',
                        '$</div>\n                <button\n                    onClick=',
                        '\n                    class="button"\n                    aria-label="Add this item to cart"\n                >\n                    Add to Cart\n                </button>\n            </div>\n        '
                    ]);
                    return (
                        (i = function() {
                            return e;
                        }),
                        e
                    );
                }
                function a() {
                    var e = l(['<button onClick=', '>remove all</button>']);
                    return (
                        (a = function() {
                            return e;
                        }),
                        e
                    );
                }
                function c() {
                    var e = l([
                        '\n                        <li>\n                            <button onCLick=',
                        '>X</button>\n                            ',
                        '\n                        </li>\n                    '
                    ]);
                    return (
                        (c = function() {
                            return e;
                        }),
                        e
                    );
                }
                function u() {
                    var e = l([
                        '\n            <style>\n                .basket {\n                    position: fixed;\n                    bottom: 0;\n                    right: 0;\n                    padding: 20px 50px;\n                    background: rgba(0,0,0,0.8);\n                    color: white;\n                }\n            </style>\n            <div class="basket">\n                Basket<br />\n                Total: ',
                        '\n\n                <ul>\n                    ',
                        '\n                </ul>\n\n                ',
                        '\n            </div>\n        '
                    ]);
                    return (
                        (u = function() {
                            return e;
                        }),
                        e
                    );
                }
                function l(e, t) {
                    return (
                        t || (t = e.slice(0)),
                        Object.freeze(
                            Object.defineProperties(e, {
                                raw: { value: Object.freeze(t) }
                            })
                        )
                    );
                }
                function s(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError(
                            'Cannot call a class as a function'
                        );
                }
                function m(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1),
                            (r.configurable = !0),
                            'value' in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r);
                    }
                }
                function p(e, t, n) {
                    return t && m(e.prototype, t), n && m(e, n), e;
                }
                function f(e, t) {
                    return !t || ('object' !== g(t) && 'function' != typeof t)
                        ? d(e)
                        : t;
                }
                function d(e) {
                    if (void 0 === e)
                        throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called"
                        );
                    return e;
                }
                function h(e) {
                    return (h = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function(e) {
                              return e.__proto__ || Object.getPrototypeOf(e);
                          })(e);
                }
                function y(e, t) {
                    if ('function' != typeof t && null !== t)
                        throw new TypeError(
                            'Super expression must either be null or a function'
                        );
                    (e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                        t && b(e, t);
                }
                function b(e, t) {
                    return (b =
                        Object.setPrototypeOf ||
                        function(e, t) {
                            return (e.__proto__ = t), e;
                        })(e, t);
                }
                function g(e) {
                    return (g =
                        'function' == typeof Symbol &&
                        'symbol' == typeof Symbol.iterator
                            ? function(e) {
                                  return typeof e;
                              }
                            : function(e) {
                                  return e &&
                                      'function' == typeof Symbol &&
                                      e.constructor === Symbol &&
                                      e !== Symbol.prototype
                                      ? 'symbol'
                                      : typeof e;
                              })(e);
                }
                var v = function(e) {
                        if (g(e) !== object)
                            try {
                                e = JSON.parse(e);
                            } catch (t) {}
                        return e;
                    },
                    w = [
                        {
                            name: 'Men+s+Tech+Shell+Full-Zip',
                            title: "Men's Tech Shell Full-Zip",
                            category: 'mens_outerwear',
                            price: 50.2
                        },
                        {
                            name: 'Anvil+L+S+Crew+Neck+-+Grey',
                            title: 'Anvil L/S Crew Neck - Grey',
                            category: 'mens_outerwear',
                            price: 22.15
                        },
                        {
                            name: 'Green+Flex+Fleece+Zip+Hoodie',
                            title: 'Green Flex Fleece Zip Hoodie',
                            category: 'mens_outerwear',
                            price: 45.65
                        },
                        {
                            name: 'Android+Nylon+Packable+Jacket',
                            title: 'Android Nylon Packable Jacket',
                            category: 'mens_outerwear',
                            price: 33.6
                        },
                        {
                            name: 'YouTube+Ultimate+Hooded+Sweatshirt',
                            title: 'YouTube Ultimate Hooded Sweatshirt',
                            category: 'mens_outerwear',
                            price: 32.35
                        },
                        {
                            name: 'Grey+Heather+Fleece+Zip+Hoodie',
                            title: 'Grey Heather Fleece Zip Hoodie',
                            category: 'mens_outerwear',
                            price: 38.85
                        },
                        {
                            name: 'Vastrm+Hoodie',
                            title: 'Vastrm Hoodie',
                            category: 'mens_outerwear',
                            price: 200
                        },
                        {
                            name: 'Recycled+Plastic+Bottle+Hoodie+-+Green',
                            title: 'Recycled Plastic Bottle Hoodie - Green',
                            category: 'mens_outerwear',
                            price: 60.95
                        },
                        {
                            name: 'Rowan+Pullover+Hood',
                            title: 'Rowan Pullover Hood',
                            category: 'mens_outerwear',
                            price: 60.85
                        },
                        {
                            name: 'Men+s+Voyage+Fleece+Jacket',
                            title: "Men's Voyage Fleece Jacket",
                            category: 'mens_outerwear',
                            price: 48
                        },
                        {
                            name: 'Eco-Jersey+Chrome+Zip+Up+Hoodie',
                            title: 'Eco-Jersey Chrome Zip Up Hoodie',
                            category: 'mens_outerwear',
                            price: 37.75
                        },
                        {
                            name: 'Android+Colorblock+Hooded+Pullover',
                            title: 'Android Colorblock Hooded Pullover',
                            category: 'mens_outerwear',
                            price: 50.2
                        },
                        {
                            name: 'Tri-blend+Full-Zip+Hoodie',
                            title: 'Tri-blend Full-Zip Hoodie',
                            category: 'mens_outerwear',
                            price: 52.2
                        },
                        {
                            name: 'Fleece+Full-Zip+Hoodie',
                            title: 'Fleece Full-Zip Hoodie',
                            category: 'mens_outerwear',
                            price: 45.65
                        },
                        {
                            name: 'Jacquard-Knit+Full-Zip+Fleece',
                            title: 'Jacquard-Knit Full-Zip Fleece',
                            category: 'mens_outerwear',
                            price: 74.9
                        },
                        {
                            name: 'YouTube+Unisex+Flex+Fleece+Zip+Hoodie',
                            title: 'YouTube Unisex Flex Fleece Zip Hoodie',
                            category: 'mens_outerwear',
                            price: 45.25
                        }
                    ],
                    A = (0, e.withStore)(n.Element),
                    k = (function(t) {
                        function n() {
                            return (
                                s(this, n), f(this, h(n).apply(this, arguments))
                            );
                        }
                        return (
                            y(n, e.StoreProvider),
                            p(
                                n,
                                [
                                    {
                                        key: 'config',
                                        get: function() {
                                            return {
                                                initialState: {
                                                    cart: [],
                                                    count: 0
                                                },
                                                plugins: [
                                                    function(e) {
                                                        return e.subscribe(
                                                            console.log
                                                        );
                                                    }
                                                ],
                                                actions: {
                                                    addToCart: function(e, t) {
                                                        var n = e.commit;
                                                        n('addItem', t),
                                                            n('updateCount');
                                                    },
                                                    removeFromCart: function(
                                                        e,
                                                        t
                                                    ) {
                                                        var n = e.commit;
                                                        n(
                                                            'removeItemByIndex',
                                                            t
                                                        ),
                                                            n('updateCount');
                                                    },
                                                    removeAllFromCart: function(
                                                        e
                                                    ) {
                                                        var t = e.commit;
                                                        e.state.cart.forEach(
                                                            function(e) {
                                                                return t(
                                                                    'removeItem',
                                                                    e
                                                                );
                                                            }
                                                        ),
                                                            t('updateCount');
                                                    }
                                                },
                                                mutations: {
                                                    addItem: function(e, t) {
                                                        e.cart.push(t);
                                                    },
                                                    removeItemByIndex: function(
                                                        e,
                                                        t
                                                    ) {
                                                        e.cart.splice(t, 1);
                                                    },
                                                    removeItem: function(e, t) {
                                                        e.cart = e.cart.filter(
                                                            function(e) {
                                                                return e !== t;
                                                            }
                                                        );
                                                    },
                                                    updateCount: function(e) {
                                                        e.count = e.cart.length;
                                                    }
                                                }
                                            };
                                        }
                                    }
                                ],
                                [
                                    {
                                        key: 'is',
                                        get: function() {
                                            return 'my-store';
                                        }
                                    }
                                ]
                            ),
                            n
                        );
                    })();
                customElements.define(k.is, k);
                var x = (function(e) {
                    function n() {
                        var e;
                        return (
                            s(this, n),
                            ((e = f(this, h(n).call(this))).count = 0),
                            (e.items = []),
                            e
                        );
                    }
                    return (
                        y(n, A),
                        p(
                            n,
                            [
                                {
                                    key: 'onStateChange',
                                    value: function(e) {
                                        (this.count = e.count),
                                            (this.items = e.cart);
                                    }
                                },
                                {
                                    key: 'handleRemove',
                                    value: function(e) {
                                        this.dispatch('removeFromCart', e);
                                    }
                                },
                                {
                                    key: 'handleRemoveAll',
                                    value: function() {
                                        this.dispatch('removeAllFromCart');
                                    }
                                },
                                {
                                    key: 'getTemplate',
                                    value: function() {
                                        var e = this;
                                        return (0, t.html)(
                                            u(),
                                            this.count,
                                            this.items.map(function(n, r) {
                                                return (0, t.html)(
                                                    c(),
                                                    function() {
                                                        return e.handleRemove(
                                                            r
                                                        );
                                                    },
                                                    n.title
                                                );
                                            }),
                                            this.items.length
                                                ? (0, t.html)(a(), function() {
                                                      return e.handleRemoveAll();
                                                  })
                                                : null
                                        );
                                    }
                                }
                            ],
                            [
                                {
                                    key: 'properties',
                                    get: function() {
                                        return { count: Number, items: Object };
                                    }
                                },
                                {
                                    key: 'is',
                                    get: function() {
                                        return 'shop-basket';
                                    }
                                }
                            ]
                        ),
                        n
                    );
                })();
                customElements.define(x.is, x);
                var F = (function(e) {
                    function n() {
                        var e, t;
                        s(this, n);
                        for (
                            var r = arguments.length, o = new Array(r), i = 0;
                            i < r;
                            i++
                        )
                            o[i] = arguments[i];
                        return (
                            ((t = f(
                                this,
                                (e = h(n)).call.apply(e, [this].concat(o))
                            )).item = {}),
                            (t.handleClick = function() {
                                t.dispatch('addToCart', t.item);
                            }),
                            t
                        );
                    }
                    return (
                        y(n, A),
                        p(
                            n,
                            [
                                {
                                    key: 'getTemplate',
                                    value: function() {
                                        return (0, t.html)(
                                            i(),
                                            this.item.title,
                                            this.item.price,
                                            this.handleClick
                                        );
                                    }
                                }
                            ],
                            [
                                {
                                    key: 'is',
                                    get: function() {
                                        return 'shop-item';
                                    }
                                },
                                {
                                    key: 'properties',
                                    get: function() {
                                        return { c: v };
                                    }
                                }
                            ]
                        ),
                        n
                    );
                })();
                customElements.define(F.is, F);
                var C = (function(e) {
                    function i() {
                        return s(this, i), f(this, h(i).apply(this, arguments));
                    }
                    return (
                        y(i, n.Element),
                        p(
                            i,
                            [
                                {
                                    key: 'getTemplate',
                                    value: function() {
                                        return (0, t.html)(
                                            o(),
                                            w.map(function(e) {
                                                return (0, t.html)(r(), e);
                                            })
                                        );
                                    }
                                }
                            ],
                            [
                                {
                                    key: 'is',
                                    get: function() {
                                        return 'store-demo';
                                    }
                                }
                            ]
                        ),
                        i
                    );
                })();
                customElements.define(C.is, C);
            },
            {
                '@tiny-lit/store/lib/cjs': 'qBKv',
                '@tiny-lit/core/lib/cjs': '6pAK',
                '@tiny-lit/element/lib/cjs': '4tHz'
            }
        ],
        '85jB': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.Router = void 0);
                const e = /(?:\/:(?<name>[\w]+)(?:(?<hasList>{(?<values>[\w,]+)}))?(?<optional>\?)?)/g;
                function t(t) {
                    let o,
                        n = t;
                    if ('*' === t) return /.*/;
                    for (; (o = e.exec(t)); ) {
                        const e = o.groups.hasList
                            ? `${o.groups.values.split(',').join('|')}`
                            : '[^/]+';
                        n = n.replace(
                            o[0],
                            `(?:\\/(?<${o.groups.name}>${e}))${
                                o.groups.optional ? '?' : ''
                            }`
                        );
                    }
                    return new RegExp(`^${n}$`);
                }
                class o {
                    constructor({ interceptLocal: e }) {
                        (this.routes = new Map()),
                            (this.handleLocalClick = e => {
                                const t = e.target;
                                'A' === t.nodeName &&
                                    0 === t.href.indexOf(location.origin) &&
                                    (e.preventDefault(),
                                    e.stopImmediatePropagation(),
                                    this.goTo(t.getAttribute('href')));
                            }),
                            (this.resolve = () => {
                                const e = location.pathname,
                                    t = this.current;
                                return (
                                    this.routes.forEach(o => {
                                        const n = e.match(o.regex);
                                        n &&
                                            (t !== o
                                                ? ((this.current = o),
                                                  t &&
                                                      t.onLeave &&
                                                      t.onLeave(n.groups),
                                                  o.onEnter &&
                                                      o.onEnter(n.groups))
                                                : o.onUpdate &&
                                                  o.onUpdate(n.groups));
                                    }),
                                    this
                                );
                            }),
                            window.addEventListener('popstate', this.resolve),
                            e &&
                                document.addEventListener(
                                    'click',
                                    this.handleLocalClick,
                                    !0
                                );
                    }
                    on(e, { onEnter: o, onLeave: n, onUpdate: r }) {
                        return (
                            this.routes.set(e, {
                                regex: t(e),
                                onEnter: o,
                                onLeave: n,
                                onUpdate: r
                            }),
                            this
                        );
                    }
                    off(e) {
                        return this.routes.delete(e), this;
                    }
                    goTo(e) {
                        return (
                            history.pushState(null, document.title, e),
                            this.resolve(),
                            this
                        );
                    }
                }
                exports.Router = o;
            },
            {}
        ],
        R1PX: [
            function(require, module, exports) {
                'use strict';
                var e;
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.RouterEvents = void 0),
                    (exports.RouterEvents = e),
                    (function(e) {
                        (e.Request = 'router::request'),
                            (e.Change = 'router::change');
                    })(e || (exports.RouterEvents = e = {}));
            },
            {}
        ],
        'ZH+v': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.requestRouter = t);
                var e = require('./types');
                function t(t) {
                    const r = new CustomEvent(e.RouterEvents.Request, {
                        detail: {}
                    });
                    return t.dispatchEvent(r), r.detail.router;
                }
            },
            { './types': 'R1PX' }
        ],
        'Q+74': [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.RouteElement = void 0);
                var e = require('./events');
                function t(e, t) {
                    for (const o in t) e.setAttribute(o, t[o]);
                }
                class o extends HTMLElement {
                    connectedCallback() {
                        if ((this.router = (0, e.requestRouter)(this))) {
                            const e = this.getAttribute('path'),
                                o = this.getAttribute('component');
                            if (!e || !o) return;
                            const n = document.createElement(o);
                            this.router.on(e, {
                                onEnter: e => {
                                    t(n, e),
                                        this.appendChild(n),
                                        n.onRouteEnter && n.onRouteEnter(e);
                                },
                                onUpdate: e => {
                                    t(n, e),
                                        n.onRouteUpdate && n.onRouteUpdate(e);
                                },
                                onLeave: () => {
                                    this.removeChild(n),
                                        n.onRouteLeave && n.onRouteLeave();
                                }
                            });
                        }
                    }
                    disconnectedCallback() {
                        const e = this.getAttribute('path');
                        this.router && e && this.router.off(e);
                    }
                }
                exports.RouteElement = o;
            },
            { './events': 'ZH+v' }
        ],
        S51Q: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    (exports.RouterProvider = void 0);
                var e = require('./router'),
                    t = require('./types');
                class r extends HTMLElement {
                    constructor() {
                        super(),
                            (this.onRouterRequest = e => {
                                e.detail.router = this.router;
                            }),
                            (this.router = new e.Router({
                                interceptLocal: !0
                            }));
                    }
                    connectedCallback() {
                        document.body.addEventListener(
                            t.RouterEvents.Request,
                            this.onRouterRequest,
                            !0
                        ),
                            requestAnimationFrame(() => this.router.resolve());
                    }
                    disconnectedCallback() {
                        document.body.removeEventListener(
                            t.RouterEvents.Request,
                            this.onRouterRequest,
                            !0
                        );
                    }
                }
                exports.RouterProvider = r;
            },
            { './router': '85jB', './types': 'R1PX' }
        ],
        yPLk: [
            function(require, module, exports) {
                'use strict';
                Object.defineProperty(exports, '__esModule', { value: !0 }),
                    Object.defineProperty(exports, 'Router', {
                        enumerable: !0,
                        get: function() {
                            return e.Router;
                        }
                    }),
                    Object.defineProperty(exports, 'RouteElement', {
                        enumerable: !0,
                        get: function() {
                            return r.RouteElement;
                        }
                    }),
                    Object.defineProperty(exports, 'RouterProvider', {
                        enumerable: !0,
                        get: function() {
                            return t.RouterProvider;
                        }
                    });
                var e = require('./router'),
                    r = require('./RouteElement'),
                    t = require('./RouterProvider');
            },
            {
                './router': '85jB',
                './RouteElement': 'Q+74',
                './RouterProvider': 'S51Q'
            }
        ],
        Focm: [
            function(require, module, exports) {
                'use strict';
                require('./todo'), require('./karpinsky'), require('./store');
                var e = require('@tiny-lit/router');
                customElements.define('demo-router', e.RouterProvider),
                    customElements.define('demo-route', e.RouteElement);
            },
            {
                './todo': 'mHJN',
                './karpinsky': 'xe9Y',
                './store': 'rMii',
                '@tiny-lit/router': 'yPLk'
            }
        ]
    },
    {},
    ['Focm'],
    null
);
//# sourceMappingURL=/demo.9fe8f492.map

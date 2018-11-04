import { RouteLifecycle, Route, Router as RouterInterface } from './types';
import { RouterOptions } from './types';

/**
 * Valid paths:
 * Required
 * /:param
 *
 * Optional
 * /:param?
 *
 * Required matching list
 * /:param{test1,test2}
 *
 * Optional matching list
 * /:param{test1,test2}?
 * @param {*} path
 */
const ParamsRegex: RegExp = /\/:([\w]+)(?:{([\w,]+)})?(\?)?/g;

function pathToRegex(path: string): RegExp {
    let m,
        pattern = path;

    if (path === '*') {
        return /.*/;
    }

    while ((m = ParamsRegex.exec(path))) {
        const paramRegex = m.groups[2]
            ? `${m.groups[2].split(',').join('|')}`
            : '[^/]+';

        pattern = pattern.replace(
            m[0],
            `(?:\\/(?<${m.groups[1]}>${paramRegex}))${
            m.groups[3] ? '?' : ''
            }`
        );
    }

    return new RegExp(`^${pattern}$`);
}

export class Router implements RouterInterface {
    routes: Map<string, Route> = new Map();
    current?: Route;

    constructor({ interceptLocal }: RouterOptions) {
        window.addEventListener('popstate', this.resolve);

        if (interceptLocal) {
            document.addEventListener('click', this.handleLocalClick, true);
        }
    }

    handleLocalClick = e => {
        const target = e.target;
        if (
            target.nodeName === 'A' &&
            target.href.indexOf(location.origin) === 0
        ) {
            e.preventDefault();
            e.stopImmediatePropagation();

            this.goTo(target.getAttribute('href'));
        }
    }

    on(path: string, { onEnter, onLeave, onUpdate }: RouteLifecycle) {
        this.routes.set(path, {
            regex: pathToRegex(path),
            onEnter,
            onLeave,
            onUpdate
        });

        return this;
    }

    off(path: string) {
        this.routes.delete(path);
        return this;
    }

    resolve = () => {
        const path = location.pathname,
            current = this.current;

        this.routes.forEach(route => {
            const match: any = path.match(route.regex);
            if (match) {
                if (current !== route) {
                    this.current = route;

                    if (current && current.onLeave) current.onLeave(match.groups);

                    route.onEnter && route.onEnter(match.groups);
                } else {
                    route.onUpdate && route.onUpdate(match.groups);
                }
            }
        });

        return this;
    }

    goTo(path) {
        history.pushState(null, document.title, path);
        this.resolve();
        return this;
    }
}

import {
    RouteCallbacks,
    Route,
    Router as RouterInterface,
    HistoryInterface
} from './types';
import { RouterOptions } from './types';
import { createPathHistory, createHashHistory } from './history';

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
            `(?:\\/(?<${m.groups[1]}>${paramRegex}))${m.groups[3] ? '?' : ''}`
        );
    }

    return new RegExp(`^${pattern}$`);
}

export class Router implements RouterInterface {
    history: HistoryInterface;
    routes: Map<string, Route> =new Map();
    current?: Route;

    constructor({ interceptLocals, useHash }: RouterOptions) {
        if (useHash) this.history = createHashHistory();
        else this.history = createPathHistory();

        this.history.listen(this.resolve);

        if (interceptLocals)
            document.addEventListener('click', this.handleLocalClick);
    }

    handleLocalClick = e => {
        const target = e.target;
        if (
            target.nodeName === 'A' &&
            target.href.indexOf(location.origin) === 0
        ) {
            e.preventDefault();

            this.goTo(target.getAttribute('href'));
        }
    }

    on(path: string, callbacks: RouteCallbacks) {
        this.routes.set(path, {
            ...callbacks,
            regex: pathToRegex(path)
        });
    }

    off(path: string) {
        this.routes.delete(path);
    }

    resolve = () => {
        const path = this.history.path();
        const current = this.current;

        this.routes.forEach(route => {
            const match: any = path.match(route.regex);
            if (match) {
                if (current !== route) {
                    this.current = route;

                    if (current && current.onLeave)
                        current.onLeave(match.groups);

                    route.onEnter && route.onEnter(match.groups);
                } else {
                    route.onUpdate && route.onUpdate(match.groups);
                }
            }
        });
    }

    goTo(path) {
        this.history.go(path);
    }
}

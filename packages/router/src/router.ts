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

function parsePath(path: string) {
    let m,
        params: Array<string> = [],
        pattern = path;

    if (path === '*') {
        return {
            regex: /.*/,
            params: []
        };
    }

    while ((m = ParamsRegex.exec(path))) {
        const paramRegex = m[2] ? `${m[2].split(',').join('|')}` : '[^/]+';

        params.push(m[1]);
        pattern = pattern.replace(
            m[0],
            `(?:\\/(${paramRegex}))${m[3] ? '?' : ''}`
        );
    }

    return {
        regex: new RegExp(`^${pattern}\\/?$`),
        params
    }
}

export class Router implements RouterInterface {
    history: HistoryInterface;
    routes: Array<Route> = [];
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

    on(path: string, callbacks: RouteCallbacks = {}) {
        const route = {
            path,
            callbacks,
            ...parsePath(path)
        };
        this.routes.push(route);

        return () => (this.routes = this.routes.filter(r => r !== route));
    }

    resolve = () => {
        const path = this.history.path();
        const current = this.current;

        this.routes.some((route: Route) => {
            let match: any = path.match(route.regex);
            const { onEnter, onUpdate } = route.callbacks;

            if (match) {
                match = match
                    .filter(m => m !== undefined)
                    .reduce((map, m, i) => {
                        if (i) map[route.params[i - 1]] = m;
                        return map;
                    }, {});

                if (current !== route) {
                    this.current = route;

                    if (current)
                        current.callbacks.onLeave!(match);

                    onEnter!(match);
                } else {
                    onUpdate!(match);
                }
            }

            return match;
        });
    }

    goTo(path) {
        this.history.go(path);
    }
}

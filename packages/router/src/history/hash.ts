import { HistoryInterface } from '../types';

export default (): HistoryInterface => ({
    path() {
        return location.hash ? location.hash.substring(1) : '';
    },
    go(path: string) {
        location.hash = `#${path}`;
    },
    listen(callback) {
        addEventListener('hashchange', <any>callback);

        return removeEventListener.bind(window, 'hashchange', callback);
    }
});

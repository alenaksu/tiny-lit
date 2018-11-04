import { HistoryInterface } from '../types';

export default (): HistoryInterface => ({
    path() {
        return location.pathname;
    },
    go(path: string) {
        history.pushState(null, document.title, path);
        dispatchEvent(new Event('pushstate'));
    },
    listen(callback) {
        addEventListener('popstate', <any>callback);
        addEventListener('pushstate', <any>callback);

        return removeEventListener.bind(window, 'popstate', callback);
    }
});
import { createStore } from '../src/store';

describe('super-mega-store', () => {
    it('hopefully works', () => {
        const spy = jasmine.createSpy('spy');
        const store = createStore({
            initialState: { count: 0 },
            actions: {
                increment({ commit }) {
                    // do stuff
                    commit('increment');
                }
            },
            mutations: {
                increment(state) {
                    return {
                        ...state,
                        count: state.count + 1
                    }
                }
            }
        });

        store.subscribe((state, mutation) => spy(state.count));
        expect(spy).toHaveBeenCalledWith(0);

        store.dispatch('increment');
        expect(spy).toHaveBeenCalledWith(1);

        store.commit('increment');
        expect(spy).toHaveBeenCalledWith(2);
    });
})
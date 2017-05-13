import { Cascade } from './types.d';

/**
 * A tiny cascading state machine.
 */
const cascade = (x: any): Cascade => {
    let state = x;
    const api: Cascade = {
        /**
         * This function allows one to pipe the current state through the
         * supplied function and optionally supply some additional arguments for
         * it.
         */
        chain: (fn: (state: any, ...rest) => any, ...args) => {
            state = args
                ? fn.apply(null, [state].concat(args)) : fn(state);
            return api;
        },

        // Read state.
        read: () => state,
    };

    return api;
};

export default cascade;

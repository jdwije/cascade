import { Cascade } from './types.d';

/**
 * A tiny cascading state machine.
 */
const cascade = (s: any): Cascade => {
    let state = s;
    const api: Cascade = {
        // Mutate state with function.
        chain: (fn, recover) => {
            try {
                const op = fn(state);
                state = op;
            } catch (err) {
                if (!recover) throw err;
                state = recover(err, state, fn);
            }

            return api;
        },

        // Read state.
        read: () => state,
    };

    return api;
};

export default cascade;

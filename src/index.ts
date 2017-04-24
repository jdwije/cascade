type CascadeApi = {
    chain: (state: any, recover?: (error: any, state: any, fn: any) => any) => any,
    read: () => any,
};

/**
 * A tiny cascading state machine.
 */
const cascade = (s: any): CascadeApi => {
    let state = s;
    const api: CascadeApi = {
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

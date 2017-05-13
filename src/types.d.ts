export type Cascade = {
    chain: (fn: (state: any, ...args) => any, ...args) => any,
    read: () => any,
};


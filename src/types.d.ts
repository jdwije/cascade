export type Cascade = {
    chain: (state: any, recover?: (error: any, state: any, fn: any) => any) => any,
    read: () => any,
};


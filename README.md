Cascade
===

> A tiny cascading state machine.

## quick-start

install:
```
npm i --save @jdw/cascade
```

usage:
```
import cascade from '@jdw/cascade';

const increment = x => x++;
const square = x => Math.pow(x, x);

cascade(100)
    .chain(square)
    .chain(increment)
    .read(); // 10001
```

## API

#### cascade(initialState: any): Cascade

This method takes an initial state and returns a `Cascade` type object.

#### Cascade.chain(fn: (state: any) => any) => Cascade

This method takes a function, invoking it with the current state as its first
argument and then changing (mutating) the state of machine to the resulting output.

#### Cascade.chain(fn: (state: any) => any, recover: (err: Error, state: any, fn: any) => any) => Cascade

As above however with an optional recovery method supplied. The recovery method
is invoked in case of an error with the error, current state, and the function
invoked.

### Cascade.read() => any

Returns the current state of the machine.


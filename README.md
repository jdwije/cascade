Cascade
===

> A tiny cascading state machine.

[![Build Status](https://travis-ci.org/jdwije/cascade.svg?branch=master)](https://travis-ci.org/jdwije/cascade)

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

// apply state to functions and sequentially
// calculate a result
cascade(100)
    .chain(square)
    .chain(increment)
    .read(); // 10001
```

## API

#### cascade(initialState) => Cascade

This initialization method takes an initial state and returns a `Cascade`
object.

### Cascade

#### chain(fn) => Cascade

This method takes function `fn` invoking it with the machines state as an
argument and then mutating state to the result.

#### chain(fn, cb) => Cascade

As above however with the optional recovery method `cb` supplied. `cb` is invoked
in case something went wrong with the error, state, and `fn` supplied as its
arguments.

#### read() => any

Returns the current state of the machine.


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

_example:_
```javascript
return cascade(1)
    .chain(x => x + 1) // internal state set to: 2
    .chain(x => x * x) // internal state set to: 4
    .read()            // return internal state: 4
```

#### chain(fn, cb) => Cascade

As above however with the optional recovery method `cb` supplied. `cb` is invoked
in case something went wrong with the error, state, and `fn` supplied as its
arguments.

_example:_
```javascript

const process = state => throw new Error();
const recover = (err, state, fn) => state + 10;

return cascade(90)
    .chain(process, recover) // errors on process(), invoke recover().
    .read();                 // outputs: 100
```

#### read() => any

Returns the current state of the machine.

_example:_
```javascript
return cascade(true)
    .read(); // true
```

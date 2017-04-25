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
// How one might handle async HTTP request processing in pseudo-code.


const ajv = new Ajv();
const validateWith = (validator, schemaId) => {
    return (document) => {
        if (!validator.validate(schemaId, document))
            throw new Error(validator.errors);
        return document;
    };
};
const process = (request) => {
    // do stuff
    return request;
};
const recover = (cb) => {
    return (err, state, fn) => {
        cb({
            statusCode: 500,
            description: err.message,
            errors: err.stack,
        });
    };
}

const handler = (request, cb) => {
    const failure = recover(cb);
    
    return cascade(request)
        .chain(validateWith(validator, 'http://json-schema.example.com/request#'), failure)
        .chain(process, failure)
        .chain(validateWith(validator, 'http://json-schema.example.com/response#'), failure)
        .chain(cb);
};
```

#### read() => any

Returns the current state of the machine.

_example:_
```javascript
return cascade(true)
    .read(); // true
```

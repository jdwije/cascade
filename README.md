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

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
    
const mal = () => throw new Error('foo');

cascade(null)
    .chain(mal, (err, state, fn) => {
        // Optional second callback in case of an error...
        // err.message is eq 'foo'
        // state is eq null
        // fn is eq mal
        
        return true;
    })
    .read(); // true
```

import { expect } from 'chai';
import cascade from './index';

describe('@jdw/cascade/index', () => {
    const fixture = { foo: 200 };
    const subject = cascade(fixture);

    it('can be initialised', () => {
        expect(subject).to.have.property('chain');
        expect(subject).to.have.property('read');
    });

    it('state can be read', () => {
        expect(subject.read()).to.deep.eq(fixture)
    });

    it('can transform state through functions', () => {
        const increment = 1000;
        const result = subject
            .chain((state) => {
                state.foo += increment;
                return state;
            })
            .read();

        expect(result.foo).to.eq(1200);
    });

    it('can transform state by applying some arguments to a function', () => {
        const fn = (state, fx) => {
            state.foo = fx(state.foo, 2);
            return state;
        };
        const result = subject
            .chain(fn, Math.pow)
            .read();

        expect(result.foo).to.eq(1440000);
    });

    it('bubbles up errors for the user to handle', () => {
        const test = () => {
            subject
                .chain((state) => {
                    throw new Error();
                })
                .read();
        };
        expect(test).to.throw();
    });

});

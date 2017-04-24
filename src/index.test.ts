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

    it('can recover from errors whilst chaining', () => {
        const state = { foo: 300, };
        const error = new Error('foo');
        const result = subject
            .chain(() => {
                throw error;
            }, (err, fn) => {
                expect(err).to.eq(error);
                return state;
            })
            .read();
        expect(result).to.eq(state);
    });

    it('still throws errors if no recovery is specified', () => {
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

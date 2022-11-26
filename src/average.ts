import {Operation, reduce} from 'iter-ops';

export function average<T>(): Operation<T, T>;
export function average<T, R>(keySelector: (value: T) => R): Operation<T, R>;

/**
 * Emits an average value, with optional key selector.
 */
export function average<T, R>(keySelector?: (value: T) => R): Operation<T, T | R> {
    let cb;
    if (keySelector) {
        cb = (p, c, idx, state) => {
            const a = idx > 1 ? p : keySelector(p);
            state.sum = (state.sum ?? a) + keySelector(c);
            return a && state.sum / (idx + 1);
        }
    } else {
        cb = (p, c, idx, state) => {
            state.sum = (state.sum ?? p) + c;
            return p && state.sum / (idx + 1);
        };
    }
    return reduce(cb);
}

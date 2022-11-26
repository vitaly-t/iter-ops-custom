/**
 * Selects unique key-values, then remaps them into just values.
 */
import {distinct, map, Operation} from 'iter-ops';

export function uniqueValues<T, R>(keySelector: (value: T, index: number) => R): Operation<T, R> {
    return i => {
        const k = distinct(keySelector)(i);
        return map(keySelector)(k);
    }
}

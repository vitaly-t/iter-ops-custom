import {filter, Operation} from 'iter-ops';

export function distinctUntilChanged<T>(): Operation<T, T>;
export function distinctUntilChanged<T>(compare: (prev: T, curr: T) => boolean): Operation<T, T>

/**
 * Filters out repeated values.
 */
export function distinctUntilChanged<T>(compare?: (prev: T, curr: T) => boolean): Operation<T, T> {
    return filter((value, index, state) => {
        const r = !index || !(compare ? compare(state.prev, value) : state.prev === value);
        state.prev = value;
        return r;
    });
}

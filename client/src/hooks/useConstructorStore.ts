import { useSyncExternalStore, useCallback } from 'react';


export function useConstructorStore(store: any, selector: any) {
    return useSyncExternalStore(
        store.subscribe,
        useCallback(() => selector(store.getState()), [store, selector])
    )
}
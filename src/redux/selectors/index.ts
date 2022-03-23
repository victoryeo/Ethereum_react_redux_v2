import type { RootState } from '../../store/store'

// get all txn
export const txns = (state: RootState) => state.txns;

export const value = (state: RootState) => state.value;
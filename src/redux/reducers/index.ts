import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  name: string,
  amount: number,
  from: string,
  hash: number,
}

interface TransactionState {
  value : number;
  txns: Transaction[];
}

const initialState: TransactionState = {
  value: 0,
  txns: [],
}

const txn = createSlice({
  name: 'txn',
  initialState,
  reducers: {
    SET_VALUE: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      console.log(state.value)
    },
    ADD_TXN: (state, action: PayloadAction<Transaction>) => {
      console.log(action)
      state.txns = [...state.txns, action.payload];
      console.log(state.txns)
    },
  }
})

export const txnActions = txn.actions;

export default txn.reducer;
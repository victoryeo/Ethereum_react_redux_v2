import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  txns: [],
}

const txn = createSlice({
  name: 'txn',
  initialState,
  reducers: {
    SET_VALUE: (state, action) => {
      state.value = action.payload;
      console.log(state.value)
    },
    ADD_TXN: (state, action) => {
      console.log(action)
      state.txns = [...state.txns, action.payload];
      console.log(state.txns)
    },
  }
})

export const txnActions = txn.actions;

export default txn.reducer;
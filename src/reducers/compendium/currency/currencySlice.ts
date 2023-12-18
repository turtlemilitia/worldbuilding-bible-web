import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCurrency } from '../../../types'


interface TState {
  currency: Partial<TCurrency>;
}

const initialState: TState = {
  currency: {
    name: '',
    content: '',
  }
}

const currencySlice: Slice<TState> = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyData: (state, action: PayloadAction<TCurrency>) => {
      state.currency = action.payload
    },
    updateCurrencyData: (state, action: PayloadAction<Partial<TCurrency>>) => {
      state.currency = { ...state.currency, ...action.payload }
    },
    clearCurrencyData: (state) => {
      state.currency = initialState.currency
    }
  }
})

export const { setCurrencyData, updateCurrencyData, clearCurrencyData } = currencySlice.actions

export default currencySlice.reducer
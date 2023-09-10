import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TItem } from '../../../types'


interface TState {
  item: Partial<TItem>;
}

const initialState: TState = {
  item: {
    name: '',
    content: '',
  }
}

const itemSlice: Slice<TState> = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<TItem>) => {
      state.item = action.payload
    },
    updateItemData: (state, action: PayloadAction<Partial<TItem>>) => {
      state.item = { ...state.item, ...action.payload }
    },
    clearItemData: (state) => {
      state.item = initialState.item
    }
  }
})

export const { setItemData, updateItemData, clearItemData } = itemSlice.actions

export default itemSlice.reducer
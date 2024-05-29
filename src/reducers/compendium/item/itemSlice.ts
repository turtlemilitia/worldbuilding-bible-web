import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TItem } from '../../../types'


interface TState {
  item?: TItem;
}

const initialState: TState = {
}

const itemSlice: Slice<TState> = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<TItem>) => {
      state.item = action.payload
    },
    updateItemData: (state, action: PayloadAction<Partial<TItem>>) => {
      state.item = { ...state.item as TItem, ...action.payload }
    },
    clearItemData: (state) => {
      state.item = initialState.item
    }
  }
})

export const { setItemData, updateItemData, clearItemData } = itemSlice.actions

export default itemSlice.reducer
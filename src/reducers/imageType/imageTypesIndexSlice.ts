import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TImageType } from '../../types'

interface TState {imageTypes: TImageType[]}

const initialState: TState = {
  imageTypes: []
}

const imageTypesIndexSlice: Slice<TState> = createSlice({
  name: 'imageTypesIndex',
  initialState,
  reducers: {
    setImageTypes: (state, action: PayloadAction<TImageType[]>) => {
      state.imageTypes = [...action.payload]
    },
    addImageType: (state, action: PayloadAction<TImageType>) => {
      state.imageTypes = [...state.imageTypes, action.payload]
    },
    removeImageType: (state, action: PayloadAction<TImageType>) => {
      state.imageTypes = state.imageTypes.filter((imageType: TImageType) => imageType.id !== action.payload.id)
    },
    clearImageTypes: (state) => {
      state.imageTypes = initialState.imageTypes
    }
  }
})

export const {
  setImageTypes,
  addImageType,
  clearImageTypes,
} = imageTypesIndexSlice.actions

export default imageTypesIndexSlice.reducer
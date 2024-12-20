import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type TState = {
  loading: { [id: string]: boolean };
  backgroundImage?: string;
  defaultBackgroundImage?: string;
}

const initialState: TState = {
  loading: {
    init: true
  },
}

export const postSlice: Slice<TState> = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ [id: string]: boolean }>) => {
      state.loading = {
        ...state.loading,
        ...action.payload
      }
    },
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      state.backgroundImage = action.payload
    },
    clearBackgroundImage: (state) => {
      state.backgroundImage = undefined
    },
    setDefaultBackgroundImage: (state, action: PayloadAction<string>) => {
      state.defaultBackgroundImage = action.payload
    },
    clearDefaultBackgroundImage: (state) => {
      state.defaultBackgroundImage = undefined
    },
  }
})

export const {
  setLoading,
  setBackgroundImage,
  clearBackgroundImage,
  setDefaultBackgroundImage,
  clearDefaultBackgroundImage
} = postSlice.actions

export default postSlice.reducer
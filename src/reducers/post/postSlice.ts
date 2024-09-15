import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type TState = {
  loading: boolean;
  backgroundImage?: string;
}

const initialState: TState = {
  loading: true,
}

export const postSlice: Slice<TState> = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      state.backgroundImage = action.payload
    },
    clearBackgroundImage: (state) => {
      state.backgroundImage = undefined
    },
  }
})

export const {
  setLoading,
  setBackgroundImage,
  clearBackgroundImage
} = postSlice.actions

export default postSlice.reducer
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

type TState = {
  loading: boolean;
}

const initialState: TState = {
  loading: true
}

const postSlice: Slice<TState> = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const {
  setLoading
} = postSlice.actions

export default postSlice.reducer
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

interface TState {
  token?: string;
}

const initialState: TState = {
}

const authSlice: Slice<TState> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: TState, action: PayloadAction<string>): void => {
      console.log({state, action})
      state.token = action.payload
    },
    unsetToken: (state: TState): void => {
      console.log({state})
      state = {};
    }
  }
})

export const { setToken,  unsetToken } = authSlice.actions

export default authSlice.reducer
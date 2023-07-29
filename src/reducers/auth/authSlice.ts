import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

interface TState {
  token: string|null;
}

const initialState: TState = {
  token: localStorage.getItem('token')
}

const authSlice: Slice<TState> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: TState, action: PayloadAction<string>): void => {
      console.log({state, action})
      state.token = action.payload
    }
  }
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSession } from '../../../types'


interface TState {
  session: Partial<TSession>;
}

const initialState: TState = {
  session: {
    name: '',
    content: '',
  }
}

const sessionSlice: Slice<TState> = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionData: (state, action: PayloadAction<TSession>) => {
      state.session = action.payload
    },
    updateSessionData: (state, action: PayloadAction<Partial<TSession>>) => {
      state.session = { ...state.session, ...action.payload }
    },
    clearSessionData: (state) => {
      state.session = initialState.session
    }
  }
})

export const { setSessionData, updateSessionData, clearSessionData } = sessionSlice.actions

export default sessionSlice.reducer
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TSystem } from '../../types'

interface TState {systems: TSystem[]}

const initialState: TState = {
  systems: []
}

const systemsIndexSlice: Slice<TState> = createSlice({
  name: 'systemsIndex',
  initialState,
  reducers: {
    setSystems: (state, action: PayloadAction<TSystem[]>) => {
      state.systems = [...action.payload]
    },
    addSystem: (state, action: PayloadAction<TSystem>) => {
      state.systems = [...state.systems, action.payload]
    },
    removeSystem: (state, action: PayloadAction<{ id: TSystem['id'] }>) => {
      state.systems = state.systems.filter((system: TSystem) => system.slug !== action.payload.id)
    },
    clearSystems: (state) => {
      state.systems = initialState.systems
    }
  }
})

export const { setSystems, addSystem, removeSystem, clearSystems } = systemsIndexSlice.actions

export default systemsIndexSlice.reducer
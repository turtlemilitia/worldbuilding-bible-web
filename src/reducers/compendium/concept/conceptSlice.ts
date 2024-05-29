import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TConcept } from '../../../types'

interface TState {
  concept?: TConcept;
}

const initialState: TState = {
}

const conceptSlice: Slice<TState> = createSlice({
  name: 'concept',
  initialState,
  reducers: {
    setConceptData: (state, action: PayloadAction<TConcept>) => {
      state.concept = action.payload
    },
    updateConceptData: (state, action: PayloadAction<Partial<TConcept>>) => {
      state.concept = { ...state.concept as TConcept, ...action.payload }
    },
    clearConceptData: (state) => {
      state.concept = initialState.concept
    }
  }
})

export const { setConceptData, updateConceptData, clearConceptData } = conceptSlice.actions

export default conceptSlice.reducer
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TConcept } from '../../../types'


interface TState {
  concept: Partial<TConcept>;
}

const initialState: TState = {
  concept: {
    name: '',
    content: '',
  }
}

const conceptSlice: Slice<TState> = createSlice({
  name: 'concept',
  initialState,
  reducers: {
    setConceptData: (state, action: PayloadAction<TConcept>) => {
      state.concept = action.payload
    },
    updateConceptData: (state, action: PayloadAction<Partial<TConcept>>) => {
      state.concept = { ...state.concept, ...action.payload }
    },
    clearConceptData: (state) => {
      state.concept = initialState.concept
    }
  }
})

export const { setConceptData, updateConceptData, clearConceptData } = conceptSlice.actions

export default conceptSlice.reducer
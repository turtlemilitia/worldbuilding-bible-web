import { createSlice, Draft, PayloadAction, Slice } from '@reduxjs/toolkit'

export type TIndexSliceState<T> = {
  data: T[]
}

export const createIndexSlice = <TEntity extends {id: number|string}> (name: string) => {
  const initialState: TIndexSliceState<TEntity> = {
    data: []
  }
  const entitySlice: Slice<TIndexSliceState<TEntity>> = createSlice({
    name,
    initialState,
    reducers: {
      set: (state, action: PayloadAction<Draft<TEntity>[]>) => {
        state.data = [...action.payload]
      },
      setOne: (state, action: PayloadAction<Draft<TEntity>>) => {
        state.data = state.data.find((entity) => entity.id === action.payload.id) ? state.data.map((entity) => {
          if (entity.id === action.payload.id) {
            return {...action.payload}
          }
          return entity;
        }) : [...state.data, action.payload]
      },
      updateOne: (state, action: PayloadAction<Partial<Draft<TEntity>>>) => {
        state.data = state.data.map((entity) => {
          if (entity.id === action.payload.id) {
            return {...entity, ...action.payload}
          }
          return entity;
        })
      },
      removeOne: (state, action: PayloadAction<{ id: TEntity['id'] }>) => {
        state.data = state.data.filter((entity) => entity.id !== action.payload.id)
      },
      clear: (state) => {
        state.data = []
      }
    }
  })

  return entitySlice
}

export default createIndexSlice
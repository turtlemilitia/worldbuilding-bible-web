import { createSlice, Draft, PayloadAction, Slice } from '@reduxjs/toolkit'
import { Identifiable } from '@/types'

export type TIndexSliceState<T> = {
  data: T[]
}

export const createIndexSlice = <TEntity extends Identifiable> (name: string) => {
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

      setChildData: (
        state,
        action: PayloadAction<{ id: TEntity['id'], field: keyof Draft<TEntity>, child: Identifiable }>
      ) => {
        const { id, field, child } = action.payload

        // Find the parent
        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        // Because we use Immer, we can mutate directly.
        // We'll treat parent[field] as an array of children.
        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        // Try to find existing child
        const idx = children.findIndex((c: Identifiable) => c.id === child.id)

        if (idx === -1) {
          // Insert if not found
          children.push(child)
        } else {
          // Replace if found
          children[idx] = child
        }
      },

      updateChildData: (
        state,
        action: PayloadAction<{
          id: TEntity['id'],
          field: keyof Draft<TEntity>,
          child: Identifiable }>
      ) => {
        const { id, field, child } = action.payload
        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        // Find the child to update
        const idx = children.findIndex((c: Identifiable) => c.id === child.id)
        if (idx === -1) {
          // Child doesn't exist; do nothing or insert
          return
        }

        // Merge partial fields
        children[idx] = {
          ...children[idx],
          ...child,
        }
      },

      removeChildData: (
        state,
        action: PayloadAction<{ id: TEntity['id'], field: keyof Draft<TEntity>, childId: Identifiable['id'] }>
      ) => {
        const { id, field, childId } = action.payload
        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        const idx = children.findIndex((c: Identifiable) => c.id === childId)
        if (idx !== -1) {
          children.splice(idx, 1)
        }
      },

      setChildChildData: (
        state,
        action: PayloadAction<{
          id: TEntity['id'],
          field: keyof Draft<TEntity>,
          childId: Identifiable['id'],
          childField: keyof Draft<Identifiable>,
          childChild: Identifiable
        }>
      ) => {
        const { id, field, childId, childField, childChild } = action.payload

        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        const child = children.find((c: Identifiable) => c.id === childId)
        if (!child) return

        const nestedChildren = child[childField] as unknown
        if (!Array.isArray(nestedChildren)) return

        const nestedIdx = nestedChildren.findIndex((c: Identifiable) => c.id === childChild.id)

        if (nestedIdx === -1) {
          nestedChildren.push(childChild)
        } else {
          nestedChildren[nestedIdx] = childChild
        }
      },

      updateChildChildData: (
        state,
        action: PayloadAction<{
          id: TEntity['id'],
          field: keyof Draft<TEntity>,
          childId: Identifiable['id'],
          childField: keyof Draft<Identifiable>,
          childChild: Partial<Identifiable>
        }>
      ) => {
        const { id, field, childId, childField, childChild } = action.payload

        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        const child = children.find((c: Identifiable) => c.id === childId)
        if (!child) return

        const nestedChildren = child[childField] as unknown
        if (!Array.isArray(nestedChildren)) return

        const nestedIdx = nestedChildren.findIndex((c: Identifiable) => c.id === childChild.id)
        if (nestedIdx !== -1) {
          nestedChildren[nestedIdx] = {
            ...nestedChildren[nestedIdx],
            ...childChild
          }
        }
      },

      removeChildChildData: (
        state,
        action: PayloadAction<{
          id: TEntity['id'],
          field: keyof Draft<TEntity>,
          childId: Identifiable['id'],
          childField: keyof Draft<Identifiable>,
          childChildId: Identifiable['id']
        }>
      ) => {
        const { id, field, childId, childField, childChildId } = action.payload

        const parent = state.data.find(p => p.id === id)
        if (!parent) return

        const children = parent[field] as unknown
        if (!Array.isArray(children)) return

        const child = children.find((c: Identifiable) => c.id === childId)
        if (!child) return

        const nestedChildren = child[childField] as unknown
        if (!Array.isArray(nestedChildren)) return

        const nestedIdx = nestedChildren.findIndex((c: Identifiable) => c.id === childChildId)
        if (nestedIdx !== -1) {
          nestedChildren.splice(nestedIdx, 1)
        }
      },

      clear: (state) => {
        state.data = []
      }
    }
  })

  return entitySlice
}

export default createIndexSlice
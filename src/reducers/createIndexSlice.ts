import { createSlice, Draft, PayloadAction, Slice } from '@reduxjs/toolkit'
import { Identifiable, TCanHaveImages, TImage } from '@/types'

export type TIndexSliceState<T> = {
  data: T[]
}

export const createIndexSlice = <TEntity extends Identifiable & TCanHaveImages> (name: string) => {
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

      setImage: (
        state,
          action: PayloadAction<{
            id: TEntity['id'];
            imageType?: string;  // e.g., 'cover' or 'profile'
            data: TImage;
          }>
      ) => {
        const { id, imageType, data } = action.payload;

        // Find the index of the entity we want to update
        const entityIndex = state.data.findIndex((entity) => entity.id === id);
        if (entityIndex < 0) return; // If not found, do nothing

        const entity = state.data[entityIndex];
        const currentImages = entity.images || [];

        // If we have an imageType ('cover', 'profile') and we find an existing
        // image with that pivot name, replace it. Otherwise, just append.
        if (
          imageType &&
          ['cover', 'profile'].includes(imageType.toLowerCase()) &&
          currentImages.some((img) => img.pivot?.image?.name?.toLowerCase() === imageType.toLowerCase())
        ) {
          entity.images = currentImages.map((img) =>
            img.pivot?.image?.name?.toLowerCase() === imageType.toLowerCase()
              ? data // Replace
              : img
          );
        } else {
          // No matching cover/profile image found; push a new image
          entity.images = [...currentImages, data];
        }
      },

      setChildImage: (
        state,
        action: PayloadAction<{
          id: TEntity['id'];                // Parent ID
          field: keyof Draft<TEntity>;      // Name of the child array field
          childId: Identifiable['id'];      // The child's ID
          imageType?: string;              // e.g., 'cover' or 'profile'
          data: TImage;
        }>
      ) => {
        const { id, field, childId, imageType, data } = action.payload;

        // 1. Find the parent by `id`
        const parent = state.data.find((p) => p.id === id);
        if (!parent) return; // If parent not found, do nothing

        // 2. Retrieve the array of children from `parent[field]`
        const children = parent[field] as unknown;
        if (!Array.isArray(children)) return; // If it's not an array, do nothing

        // 3. Find the specific child by `childId`
        const child = children.find((c: Identifiable) => c.id === childId) as (Draft<Identifiable> & TCanHaveImages) | undefined;
        if (!child) return; // If child not found, do nothing

        // 4. The child should have an `images` field (from TCanHaveImages).
        //    We can update it in the same manner as `setImage`.
        const currentImages = child.images || [];

        if (
          imageType &&
          ['cover', 'profile'].includes(imageType.toLowerCase()) &&
          currentImages.some((img) => img.pivot?.image?.name?.toLowerCase() === imageType.toLowerCase())
        ) {
          // If there's an existing cover/profile image, replace it
          child.images = currentImages.map((img) =>
            img.pivot?.image?.name?.toLowerCase() === imageType.toLowerCase()
              ? data
              : img
          );
        } else {
          // Otherwise, just append
          child.images = [...currentImages, data];
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
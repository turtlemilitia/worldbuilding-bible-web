import { createSlice, Draft, PayloadAction, Slice } from '@reduxjs/toolkit'
import { TGenericPostBasic, TImage } from '../types'

export type TEntitySliceState<T> = {
  data?: T
  fetching: boolean
}

export const createEntitySlice = <TEntity extends {[key: string]: any, images?: TImage[]}> (name: string) => {
  type TChildActionProps = {
    field: 'characters'|'concepts'|'factions'|'items'|'languages'|'locations'|'species'|'images'|'notes'
    data: { [key: string]: any };
  }
  type TRemoveChildActionProps = {
    field: 'characters'|'concepts'|'factions'|'items'|'languages'|'locations'|'species'|'notes'
    id: string | number
  }
  type TSetImageActionProps = {
    imageType?: string,
    data: TImage;
  }
  const initialState: TEntitySliceState<TEntity> = {
    fetching: false
  }
  const entitySlice: Slice<TEntitySliceState<TEntity>> = createSlice({
    name,
    initialState,
    reducers: {
      set: (state, action: PayloadAction<TEntity>) => {
        state.data = action.payload as Draft<TEntity>
      },
      update: (state, action: PayloadAction<Partial<TEntity>>) => {
        state.data = { ...state.data as Draft<TEntity>, ...action.payload as Partial<Draft<TEntity>> }
      },
      clear: (state, action: PayloadAction<string|number>) => {
        if (state.data?.slug === action.payload) {
          state.data = undefined
        }
      },
      setFetching: (state, action: PayloadAction<boolean>) => {
        state.fetching = action.payload
      },
      setChildData: (state, action: PayloadAction<TChildActionProps>) => {
        const field = action.payload.field
        if (state.data) {
          const prevData = state.data as Draft<TEntity> || {};
          state.data = {
            ...prevData,
            [field]: prevData[field]?.find((child: TGenericPostBasic) => child.id === action.payload.data.id)
              ? prevData[field]?.map((child: TGenericPostBasic) => child.id === action.payload.data.id ? action.payload.data : child)
              : [...(prevData[field] || []), action.payload.data]
          }
        }
      },
      updateChildData: (state, action: PayloadAction<TChildActionProps>) => {
        const field = action.payload.field
        if (state.data) {
          const prevData = state.data as Draft<TEntity> || {};
          state.data = {
            ...state.data as Draft<TEntity>,
            [field]: prevData[field]?.find((child: TGenericPostBasic) => child.id === action.payload.data.id)
              ? prevData[field]?.map((child: TGenericPostBasic) => child.id === action.payload.data.id ? { ...child, ...action.payload.data } : child)
              : [...(prevData[field] || []), action.payload.data]
          }
        }
      },
      removeChildData: (state, action: PayloadAction<TRemoveChildActionProps>) => {
        const field = action.payload.field
        if (state.data) {
          state.data = {
            ...state.data,
            [field]: state.data[field]?.filter((child: TGenericPostBasic) => ![child.id, child.slug].includes(action.payload.id))
          }
        }
      },
      setImage: (state, action: PayloadAction<TSetImageActionProps>) => {
        if (state.data) {
          const imageType = action.payload.imageType
          const prevData = state.data as Draft<TEntity> || {};
          if (prevData?.images && imageType && ['cover', 'profile'].includes(imageType) && prevData.images?.find((child: TImage) => child.pivot?.image?.name === action.payload.imageType)) {
            state.data = {
              ...state.data as Draft<TEntity>,
              images: prevData.images?.map((child: TImage) => child.pivot?.image?.name.toLowerCase() === imageType.toLowerCase() ? action.payload.data : child)
            }
          } else {
            state.data = {
              ...state.data as Draft<TEntity>,
              images: [...(prevData.images || []), action.payload.data]
            }
          }
        }
      },
    }
  })

  return entitySlice
}

export default createEntitySlice
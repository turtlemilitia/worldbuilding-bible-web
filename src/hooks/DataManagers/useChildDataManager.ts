import { TChildApi, TQueryParams } from '@/services/ApiService/types'
import {
  Identifiable,
  TCampaign,
  TCharacter,
  TCompendium,
  TConcept,
  TCurrency,
  TDeity,
  TEncounter,
  TFaction,
  TGenericPostBasic, TImage,
  TItem,
  TLanguage,
  TLocation,
  TNaturalResource,
  TPantheon,
  TPlane,
  TQuest, TReligion,
  TScene,
  TSession,
  TSpecies,
  TSpell,
  TStory, TUser,
} from '@/types'
import { Slice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback, useMemo } from 'react'
import { TDataManager } from './useDataManager'
import { TIndexSliceState } from '@/reducers/createIndexSlice'

export type TChildDataManager<TParentEntity, TEntity, TRequest> =
  TDataManager<TEntity, TRequest>
  & {
  parent?: TParentEntity
}
type TChildEntities<T extends 'campaigns' | 'compendia'> =
  T extends 'campaigns' ? {
      sessions: TSession
      encounters: TEncounter
      scenes: TScene
      quests: TQuest
      users: TUser
    }
    : T extends 'compendia' ? {
        characters: TCharacter
        concepts: TConcept
        currencies: TCurrency
        deities: TDeity
        factions: TFaction
        items: TItem
        languages: TLanguage
        locations: TLocation
        naturalResources: TNaturalResource
        pantheons: TPantheon
        planes: TPlane
        religions: TReligion
        species: TSpecies
        spells: TSpell
        stories: TStory
      }
      : never
type TParentByName<N extends 'campaigns' | 'compendia'> =
  N extends 'campaigns' ? TCampaign
    : N extends 'compendia' ? TCompendium
      : never

export const useChildDataManager = <
  TParentName extends 'campaigns' | 'compendia',
  TName extends Extract<keyof TChildEntities<TParentName>, string> & keyof TParentEntity,
  TParentEntity extends TParentByName<TParentName>,
  TEntity extends TChildEntities<TParentName>[TName] & Identifiable,
  TRequest,
  TIndexResponse,
  TResponse extends TEntity,
> (
  name: TName,
  parentName: TParentName,
  parentId: number | undefined,
  id: number | undefined,
  parentSlice: Slice<TIndexSliceState<TParentEntity>>,
  api: TChildApi<TRequest, TIndexResponse, TResponse>,
): TChildDataManager<TParentEntity, TEntity, TRequest> => {

  const dispatch = useAppDispatch()

  const { data } = useAppSelector(state => state[parentName]) as {
    data: TParentEntity[]
  }

  const parent = useMemo(() => {
    return data
      ?.find(item => item.id === parentId)
  }, [data, parentId])

  const entity = useMemo(() => {
    return (parent?.[name] as TEntity[] | undefined)
      ?.find(item => item.id === id)
  }, [id, name, parent])

  // REDUX MANAGEMENT
  const setData = useCallback((data: TEntity) => {
    if (!parentId) {
      throw new Error('Attempted to call update() with a null ID.')
    }
    dispatch(parentSlice.actions.setChildData({
      id: parentId,
      field: name,
      child: data,
    }))
  }, [parentId, name, parentSlice])

  const addData = useCallback((data: TEntity) => {
    if (!parentId) {
      throw new Error('Attempted to call update() with a null ID.')
    }
    dispatch(parentSlice.actions.setChildData({
      id: parentId,
      field: name,
      child: data,
    }))
  }, [parentId, name, parentSlice])

  const updateData = useCallback((data: Partial<TEntity>) => {
    if (!parentId) {
      throw new Error('Attempted to call update() with a null ID.')
    }
    dispatch(parentSlice.actions.updateChildData({
      id: parentId,
      field: name,
      child: data,
    }))
  }, [parentId, name, parentSlice])

  const removeData = useCallback((id: number) => {
    if (!parentId) {
      throw new Error('Attempted to call update() with a null ID.')
    }
    dispatch(parentSlice.actions.removeChildData({
      id: parentId,
      field: name,
      childId: id,
    }))
  }, [parentId, name, parentSlice])

  const setChildData = useCallback(
    (id: number, field: string, data: Identifiable) => {
      if (!parentId) {
        throw new Error('Attempted to call update() with a null ID.')
      }
      dispatch(parentSlice.actions.setChildChildData({
        id: parentId,
        field: name,
        childId: id,
        childField: field,
        childChild: data,
      }))
    }, [parentId, name, parentSlice])

  const updateChildData = useCallback(
    (id: number, field: string, data: Identifiable) => {
      if (!parentId) {
        throw new Error('Attempted to call update() with a null ID.')
      }
      dispatch(parentSlice.actions.updateChildChildData({
        id: parentId,
        field: name,
        childId: id,
        childField: field,
        childChild: data,
      }))
    }, [parentId, parentSlice])

  const removeChildData = useCallback(
    (id: number, field: string, childId: number) => {
      if (!parentId) {
        throw new Error('Attempted to call update() with a null ID.')
      }
      dispatch(parentSlice.actions.removeChildChildData({
        id: parentId,
        field: name,
        childId: id,
        childField: field,
        childChildId: childId,
      }))
    }, [parentId, parentSlice])

  const setImage = useCallback(
    (id: number, data: TImage, imageType: string) => {
      if (!parentId) {
        throw new Error('Attempted to call update() with a null ID.')
      }
      dispatch(parentSlice.actions.setChildImage({
        id: parentId,
        field: name,
        childId: id,
        data,
        imageType,
      }))
    }, [parentId, parentSlice])

  const view = useCallback(
    async (id: number, query: TQueryParams = {}): Promise<TEntity> => {
      if (!parentId) {
        throw new Error('Attempted to call view() with a null ID.')
      }
      const { data } = await api.view(id, query)
      setData(data.data)
      return data.data
    }, [setData, parentId, api])

  const store = useCallback(
    async (payload: TRequest, query: TQueryParams = {}) => {
      if (!parentId) {
        throw new Error('Attempted to call store() with a null parent ID.')
      }
      const { data } = await api.store(parentId as number, payload, query)
      addData(data.data)
      return data.data
    }, [addData, parentId, api])

  const update = useCallback(async (
    id: number, payload: Partial<TRequest>,
    query: TQueryParams = {}) => {
    if (!parentId) {
      throw new Error('Attempted to call update() with a null ID.')
    }
    const { data } = await api.update(id, payload, query)
    updateData(data.data)
    return data.data
  }, [updateData, api])

  const destroy = useCallback(async (id: number) => {
    if (!parentId) {
      throw new Error('Attempted to call destroy() with a null ID.')
    }
    await api.destroy(id)
    removeData(id)
  }, [removeData, api])

  return {
    entityName: name,
    parent,
    entity,
    setData,
    updateData,
    removeData,
    setChildData,
    updateChildData,
    removeChildData,
    view,
    store,
    update,
    destroy,
    setImage,
  }
}

import { useCallback } from 'react'
import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TAttachableApi } from '../../services/ApiService/createAttachableService'
import { useAppDispatch } from '../../hooks'
import {
  TCharacter,
  TEncounter,
  TFaction,
  TFavourite,
  TLanguage,
  TNote,
  TPermission,
  TPin,
  TQuest,
  TScene
} from '../../types'
import { TNotableApi, TNoteAttachRequest, TNoteAttachResponse } from '../../services/ApiService/createNotableService'
import { TQuestableApi, TQuestAttachRequest, TQuestAttachResponse } from '../../services/ApiService/createQuestableService'
import { TEncounterableApi, TEncounterAttachRequest, TEncounterAttachResponse } from '../../services/ApiService/createEncounterableService'
import {
  TFactionableApi,
  TFactionAttachRequest,
  TFactionAttachResponse
} from '../../services/ApiService/createFactionableService'
import {
  TLanguageableApi,
  TLanguageAttachRequest,
  TLanguageAttachResponse
} from '../../services/ApiService/createLanguageableService'
import {
  TCharacterableApi,
  TCharacterAttachRequest,
  TCharacterAttachResponse
} from '../../services/ApiService/createCharacterableService'
import {
  TFavouritableApi,
  TFavouriteAttachRequest,
  TFavouriteAttachResponse
} from '../../services/ApiService/createFavouritableService'
import { TPinAttachRequest, TPinAttachResponse, TPinnableApi } from '../../services/ApiService/createPinnableService'
import {
  TSceneableApi,
  TSceneAttachRequest,
  TSceneAttachResponse
} from '../../services/ApiService/createSceneableService'
import {
  TPermissionableApi,
  TPermissionAttachRequest,
  TPermissionAttachResponse
} from '../../services/ApiService/createPermissionableService'

export type TAttachableDataManager<TAttached, TRequest> = {
  attachData: (entity: TAttached) => any,
  updateData: (entity: Partial<TAttached>) => any,
  dettachData: (id: string | number) => any,
  attach: (id: string | number, payload: TRequest) => Promise<void>,
  detach: (parentId: number | string, id: number | string) => Promise<void>,
}

export type TOneOfAttachableNames = 'notes' | 'quests' | 'encounters' | 'factions' | 'languages' | 'characters' | 'favourites' | 'pins' | 'scenes' | 'permissions';

export const useAttachableDataManager = <TEntity, TAttached extends { id: number | string }, TAttachRequest, TAttachResponse extends TAttached> (
  attachedName: TOneOfAttachableNames,
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TAttachableApi<TAttachRequest, TAttachResponse>,
): TAttachableDataManager<TAttached, TAttachRequest> => {

  const dispatch = useAppDispatch()

  const attachData = useCallback((data: TAttached) => {
    dispatch(slice.actions.setChildData({ field: attachedName, data }))
  }, [])

  const updateData = useCallback((data: Partial<TAttached>) => {
    dispatch(slice.actions.updateChildData({ field: attachedName, data }))
  }, [])

  const dettachData = useCallback((id: string | number) => {
    dispatch(slice.actions.removeChildData({ field: attachedName, id }))
  }, [])

  const attach = useCallback(async (attachableId: string | number, payload: TAttachRequest) => {
    const { data } = await api.attach(attachableId, payload)
    attachData(data.data)
  }, [])

  const detach = useCallback(async (attachableId: number | string, id: number | string) => {
    try { // we should find a way to not send this if already deleted
      await api.detach(attachableId, id)
    } catch (error) {
      console.error(error)
    }
    dettachData(id)
  }, [])

  return {
    attachData,
    updateData,
    dettachData,
    attach,
    detach,
  }

}

export type TNotableDataManager = TAttachableDataManager<TNote, TNoteAttachRequest>
export type hasNotesAttachableDataManager = { notes: TNotableDataManager }
export const useNotableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TNotableApi['notes'],
): TNotableDataManager => useAttachableDataManager<TEntity, TNote, TNoteAttachRequest, TNoteAttachResponse>('notes', slice, api)

export type TEncounterableDataManager = TAttachableDataManager<TEncounter, TEncounterAttachRequest>
export type hasEncountersAttachableDataManager = { encounters: TEncounterableDataManager }
export const useEncounterableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TEncounterableApi['encounters'],
): TEncounterableDataManager => useAttachableDataManager<TEntity, TEncounter, TEncounterAttachRequest, TEncounterAttachResponse>('encounters', slice, api)

export type TSceneableDataManager = TAttachableDataManager<TScene, TSceneAttachRequest>
export type hasScenesAttachableDataManager = { scenes: TSceneableDataManager }
export const useSceneableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TSceneableApi['scenes'],
): TSceneableDataManager => useAttachableDataManager<TEntity, TScene, TSceneAttachRequest, TSceneAttachResponse>('scenes', slice, api)

export type TQuestableDataManager = TAttachableDataManager<TQuest, TQuestAttachRequest>
export type hasQuestsAttachableDataManager = { quests: TQuestableDataManager }
export const useQuestableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TQuestableApi['quests'],
): TQuestableDataManager => useAttachableDataManager<TEntity, TQuest, TQuestAttachRequest, TQuestAttachResponse>('quests', slice, api)

export type TFactionableDataManager = TAttachableDataManager<TFaction, TFactionAttachRequest>
export type hasFactionsAttachableDataManager = { factions: TFactionableDataManager }
export const useFactionableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TFactionableApi['factions'],
): TFactionableDataManager => useAttachableDataManager<TEntity, TFaction, TFactionAttachRequest, TFactionAttachResponse>('factions', slice, api)

export type TLanguageableDataManager = TAttachableDataManager<TLanguage, TLanguageAttachRequest>
export type hasLanguagesAttachableDataManager = { languages: TLanguageableDataManager }
export const useLanguageableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TLanguageableApi['languages'],
): TLanguageableDataManager => useAttachableDataManager<TEntity, TLanguage, TLanguageAttachRequest, TLanguageAttachResponse>('languages', slice, api)

export type TCharacterableDataManager = TAttachableDataManager<TCharacter, TCharacterAttachRequest>
export type hasCharactersAttachableDataManager = { characters: TCharacterableDataManager }
export const useCharacterableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TCharacterableApi['characters'],
): TCharacterableDataManager => useAttachableDataManager<TEntity, TCharacter, TCharacterAttachRequest, TCharacterAttachResponse>('characters', slice, api)

export type TFavouritableDataManager = TAttachableDataManager<TFavourite, TFavouriteAttachRequest>
export type hasFavouritesAttachableDataManager = { favourites: TFavouritableDataManager }
export const useFavouritableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TFavouritableApi['favourites'],
): TFavouritableDataManager => useAttachableDataManager<TEntity, TFavourite, TFavouriteAttachRequest, TFavouriteAttachResponse>('favourites', slice, api)

export type TPinnableDataManager = TAttachableDataManager<TPin, TPinAttachRequest>
export type hasPinsAttachableDataManager = { pins: TPinnableDataManager }
export const usePinnableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TPinnableApi['pins'],
): TPinnableDataManager => useAttachableDataManager<TEntity, TPin, TPinAttachRequest, TPinAttachResponse>('pins', slice, api)

export type TPermissionableDataManager = TAttachableDataManager<TPermission, TPermissionAttachRequest>
export type hasPermissionsAttachableDataManager = { permissions: TPermissionableDataManager }
export const usePermissionableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TPermissionableApi['permissions'],
): TPermissionableDataManager => useAttachableDataManager<TEntity, TPermission, TPermissionAttachRequest, TPermissionAttachResponse>('permissions', slice, api)

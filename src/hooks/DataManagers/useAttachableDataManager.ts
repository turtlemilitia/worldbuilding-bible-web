import { useCallback } from 'react'
import { TAttachableApi } from '@/services/ApiService/createAttachableService'
import {
  Identifiable,
  TCharacter,
  TEncounter,
  TFaction,
  TFavourite,
  TLanguage, TLocation,
  TNote,
  TPermission,
  TPin,
  TQuest,
  TScene,
} from '@/types'
import { TNotableApi, TNoteAttachRequest, TNoteAttachResponse } from '@/services/ApiService/createNotableService'
import { TQuestableApi, TQuestAttachRequest, TQuestAttachResponse } from '@/services/ApiService/createQuestableService'
import { TEncounterableApi, TEncounterAttachRequest, TEncounterAttachResponse } from '@/services/ApiService/createEncounterableService'
import {
  TFactionableApi,
  TFactionAttachRequest,
  TFactionAttachResponse
} from '@/services/ApiService/createFactionableService'
import {
  TLanguageableApi,
  TLanguageAttachRequest,
  TLanguageAttachResponse
} from '@/services/ApiService/createLanguageableService'
import {
  TCharacterableApi,
  TCharacterAttachRequest,
  TCharacterAttachResponse
} from '@/services/ApiService/createCharacterableService'
import {
  TFavouritableApi,
  TFavouriteAttachRequest,
  TFavouriteAttachResponse
} from '@/services/ApiService/createFavouritableService'
import { TPinAttachRequest, TPinAttachResponse, TPinnableApi } from '@/services/ApiService/createPinnableService'
import {
  TSceneableApi,
  TSceneAttachRequest,
  TSceneAttachResponse
} from '@/services/ApiService/createSceneableService'
import {
  TPermissionableApi,
  TPermissionAttachRequest,
  TPermissionAttachResponse
} from '@/services/ApiService/createPermissionableService'
import {
  TLocationableApi,
  TLocationAttachRequest,
  TLocationAttachResponse
} from '@/services/ApiService/createLocationableService';
import { TDataManager } from '@/hooks/DataManagers/useDataManager'

export type TAttachableDataManager<TAttached, TRequest> = {
  attachData: (attachableId: number, entity: TAttached) => any,
  updateData: (attachableId: number, entity: Identifiable & Partial<TAttached>) => any,
  dettachData: (attachableId: number, id: number) => any,
  attach: (attachableId: number, payload: TRequest) => Promise<void>,
  detach: (attachableId: number, id: number) => Promise<void>,
}

export type TOneOfAttachableNames = 'notes' | 'quests' | 'encounters' | 'factions' | 'languages' | 'characters' | 'favourites' | 'pins' | 'scenes' | 'permissions' | 'locations';

export const useAttachableDataManager = <TEntity, TAttached extends Identifiable, TAttachRequest, TAttachResponse extends TAttached> (
  attachedName: TOneOfAttachableNames,
  parentManager: TDataManager<TEntity, any>,
  api: TAttachableApi<TAttachRequest, TAttachResponse>,
): TAttachableDataManager<TAttached, TAttachRequest> => {

  const attachData = useCallback((attachableId: number, data: TAttached) => {
    parentManager.setChildData(attachableId, attachedName, data)
  }, [])

  const updateData = useCallback((attachableId: number, data: Identifiable & Partial<TAttached>) => {
    parentManager.updateChildData(attachableId, attachedName, data)
  }, [])

  const dettachData = useCallback((attachableId: number, id: number) => {
    parentManager.removeChildData(attachableId, attachedName, id)
  }, [])

  const attach = useCallback(async (attachableId: number, payload: TAttachRequest) => {
    const { data } = await api.attach(attachableId, payload)
    attachData(attachableId, data.data)
  }, [])

  const detach = useCallback(async (attachableId: number, id: number) => {
    try { // we should find a way to not send this if already deleted
      await api.detach(attachableId, id)
    } catch (error) {
      console.error(error)
    }
    dettachData(attachableId, id)
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
  parentManager: TDataManager<TEntity, any>,
  api: TNotableApi['notes'],
): TNotableDataManager => useAttachableDataManager<TEntity, TNote, TNoteAttachRequest, TNoteAttachResponse>('notes', parentManager, api)

export type TEncounterableDataManager = TAttachableDataManager<TEncounter, TEncounterAttachRequest>
export type hasEncountersAttachableDataManager = { encounters: TEncounterableDataManager }
export const useEncounterableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TEncounterableApi['encounters'],
): TEncounterableDataManager => useAttachableDataManager<TEntity, TEncounter, TEncounterAttachRequest, TEncounterAttachResponse>('encounters', parentManager, api)

export type TSceneableDataManager = TAttachableDataManager<TScene, TSceneAttachRequest>
export type hasScenesAttachableDataManager = { scenes: TSceneableDataManager }
export const useSceneableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TSceneableApi['scenes'],
): TSceneableDataManager => useAttachableDataManager<TEntity, TScene, TSceneAttachRequest, TSceneAttachResponse>('scenes', parentManager, api)

export type TQuestableDataManager = TAttachableDataManager<TQuest, TQuestAttachRequest>
export type hasQuestsAttachableDataManager = { quests: TQuestableDataManager }
export const useQuestableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TQuestableApi['quests'],
): TQuestableDataManager => useAttachableDataManager<TEntity, TQuest, TQuestAttachRequest, TQuestAttachResponse>('quests', parentManager, api)

export type TFactionableDataManager = TAttachableDataManager<TFaction, TFactionAttachRequest>
export type hasFactionsAttachableDataManager = { factions: TFactionableDataManager }
export const useFactionableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TFactionableApi['factions'],
): TFactionableDataManager => useAttachableDataManager<TEntity, TFaction, TFactionAttachRequest, TFactionAttachResponse>('factions', parentManager, api)

export type TLanguageableDataManager = TAttachableDataManager<TLanguage, TLanguageAttachRequest>
export type hasLanguagesAttachableDataManager = { languages: TLanguageableDataManager }
export const useLanguageableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TLanguageableApi['languages'],
): TLanguageableDataManager => useAttachableDataManager<TEntity, TLanguage, TLanguageAttachRequest, TLanguageAttachResponse>('languages', parentManager, api)

export type TLocationableDataManager = TAttachableDataManager<TLocation, TLocationAttachRequest>
export type hasLocationsAttachableDataManager = { locations: TLocationableDataManager }
export const useLocationableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TLocationableApi['locations'],
): TLocationableDataManager => useAttachableDataManager<TEntity, TLocation, TLocationAttachRequest, TLocationAttachResponse>('locations', parentManager, api)

export type TCharacterableDataManager = TAttachableDataManager<TCharacter, TCharacterAttachRequest>
export type hasCharactersAttachableDataManager = { characters: TCharacterableDataManager }
export const useCharacterableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TCharacterableApi['characters'],
): TCharacterableDataManager => useAttachableDataManager<TEntity, TCharacter, TCharacterAttachRequest, TCharacterAttachResponse>('characters', parentManager, api)

export type TFavouritableDataManager = TAttachableDataManager<TFavourite, TFavouriteAttachRequest>
export type hasFavouritesAttachableDataManager = { favourites: TFavouritableDataManager }
export const useFavouritableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TFavouritableApi['favourites'],
): TFavouritableDataManager => useAttachableDataManager<TEntity, TFavourite, TFavouriteAttachRequest, TFavouriteAttachResponse>('favourites', parentManager, api)

export type TPinnableDataManager = TAttachableDataManager<TPin, TPinAttachRequest>
export type hasPinsAttachableDataManager = { pins: TPinnableDataManager }
export const usePinnableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TPinnableApi['pins'],
): TPinnableDataManager => useAttachableDataManager<TEntity, TPin, TPinAttachRequest, TPinAttachResponse>('pins', parentManager, api)

export type TPermissionableDataManager = TAttachableDataManager<TPermission, TPermissionAttachRequest>
export type hasPermissionsAttachableDataManager = { permissions: TPermissionableDataManager }
export const usePermissionableDataManager = <TEntity> (
  parentManager: TDataManager<TEntity, any>,
  api: TPermissionableApi['permissions'],
): TPermissionableDataManager => useAttachableDataManager<TEntity, TPermission, TPermissionAttachRequest, TPermissionAttachResponse>('permissions', parentManager, api)

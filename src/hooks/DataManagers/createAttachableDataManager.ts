import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TAttachableApi } from '../../services/ApiService/createAttachableService'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { TEncounter, TFaction, TLanguage, TNote, TQuest } from '../../types'
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

export type TAttachableDataManager<TAttached, TRequest> = {
  attachData: (entity: TAttached) => any,
  updateData: (entity: Partial<TAttached>) => any,
  dettachData: (id: string | number) => any,
  attach: (id: string | number, payload: TRequest) => void,
  detach: (parentId: number | string, id: number | string) => void,
}

export const createAttachableDataManager = <TEntity, TAttached extends { id: number | string }, TAttachRequest, TAttachResponse extends TAttached> (
  attachedName: 'notes' | 'quests' | 'encounters' | 'factions' | 'languages',
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TAttachableApi<TAttachRequest, TAttachResponse>,
): TAttachableDataManager<TAttached, TAttachRequest> => {

  const dispatch = useDispatch()

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
    await api.dettach(attachableId, id)
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
export const createNotableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TNotableApi['notes'],
): TNotableDataManager => createAttachableDataManager<TEntity, TNote, TNoteAttachRequest, TNoteAttachResponse>('notes', slice, api)

export type TEncounterableDataManager = TAttachableDataManager<TEncounter, TEncounterAttachRequest>
export type hasEncountersAttachableDataManager = { encounters: TEncounterableDataManager }
export const createEncounterableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TEncounterableApi['encounters'],
): TEncounterableDataManager => createAttachableDataManager<TEntity, TEncounter, TEncounterAttachRequest, TEncounterAttachResponse>('encounters', slice, api)

export type TQuestableDataManager = TAttachableDataManager<TQuest, TQuestAttachRequest>
export type hasQuestsAttachableDataManager = { quests: TQuestableDataManager }
export const createQuestableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TQuestableApi['quests'],
): TQuestableDataManager => createAttachableDataManager<TEntity, TQuest, TQuestAttachRequest, TQuestAttachResponse>('quests', slice, api)

export type TFactionableDataManager = TAttachableDataManager<TFaction, TFactionAttachRequest>
export type hasFactionsAttachableDataManager = { factions: TFactionableDataManager }
export const createFactionableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TFactionableApi['factions'],
): TFactionableDataManager => createAttachableDataManager<TEntity, TFaction, TFactionAttachRequest, TFactionAttachResponse>('factions', slice, api)

export type TLanguageableDataManager = TAttachableDataManager<TLanguage, TLanguageAttachRequest>
export type hasLanguagesAttachableDataManager = { languages: TLanguageableDataManager }
export const createLanguageableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TLanguageableApi['languages'],
): TLanguageableDataManager => createAttachableDataManager<TEntity, TLanguage, TLanguageAttachRequest, TLanguageAttachResponse>('languages', slice, api)

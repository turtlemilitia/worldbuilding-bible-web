import { Slice } from '@reduxjs/toolkit'
import { TEntitySliceState } from '../../reducers/createEntitySlice'
import { TAttachableApi } from '../../services/ApiService/createAttachableService'
import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { TEncounter, TNote, TQuest } from '../../types'
import { TNotableApi, TNoteAttachRequest, TNoteAttachResponse } from '../../services/ApiService/createNotableService'
import { TQuestableApi, TQuestAttachRequest, TQuestAttachResponse } from '../../services/ApiService/createQuestableService'
import { TEncounterableApi, TEncounterAttachRequest, TEncounterAttachResponse } from '../../services/ApiService/createEncounterableService'

export type TUseAttachableDataManager<TAttached, TRequest> = {
  attachData: (entity: TAttached) => any,
  updateData: (entity: Partial<TAttached>) => any,
  dettachData: (id: string | number) => any,
  attach: (id: string | number, payload: TRequest) => void,
  detach: (parentId: number | string, id: number | string) => void,
}

export const createAttachableDataManager = <TEntity, TAttached extends { id: number | string }, TAttachRequest, TAttachResponse extends TAttached> (
  attachedName: 'notes' | 'quests' | 'encounters',
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TAttachableApi<TAttachRequest, TAttachResponse>,
): TUseAttachableDataManager<TAttached, TAttachRequest> => {

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

  const attach = useCallback(async (id: string | number, payload: TAttachRequest) => {
    const { data } = await api.attach(id, payload)
    attachData(data.data)
  }, [])

  const detach = useCallback(async (notableId: number | string, id: number | string) => {
    await api.dettach(notableId, id)
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

export type TUseNotableDataManager = TUseAttachableDataManager<TNote, TNoteAttachRequest>
export type hasNotesAttachableDataManager = { notes: TUseNotableDataManager }
export const createNotableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TNotableApi['notes'],
): TUseNotableDataManager => createAttachableDataManager<TEntity, TNote, TNoteAttachRequest, TNoteAttachResponse>('notes', slice, api)

export type TUseEncounterableDataManager = TUseAttachableDataManager<TEncounter, TEncounterAttachRequest>
export type hasEncountersAttachableDataManager = { encounters: TUseEncounterableDataManager }
export const createEncounterableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TEncounterableApi['encounters'],
): TUseEncounterableDataManager => createAttachableDataManager<TEntity, TEncounter, TEncounterAttachRequest, TEncounterAttachResponse>('encounters', slice, api)

export type TUseQuestableDataManager = TUseAttachableDataManager<TQuest, TQuestAttachRequest>
export type hasQuestsAttachableDataManager = { quests: TUseQuestableDataManager }
export const createQuestableDataManager = <TEntity> (
  slice: Slice<TEntitySliceState<TEntity>>,
  api: TQuestableApi['quests'],
): TUseQuestableDataManager => createAttachableDataManager<TEntity, TQuest, TQuestAttachRequest, TQuestAttachResponse>('quests', slice, api)

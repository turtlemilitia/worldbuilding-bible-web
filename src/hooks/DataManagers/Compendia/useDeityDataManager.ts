import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TDeity, TCompendium } from '../../../types'
import {
  createEncounterableDataManager,
  createNotableDataManager,
  createQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../createAttachableDataManager'
import { createImageableDataManager, hasImageableDataManager } from '../createImageableDataManager'
import { useMemo } from 'react'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'
import DeityService, { TDeityRequest } from '../../../services/ApiService/Compendia/DeityService'
import { deitySlice } from '../../../reducers/compendium/deity/deitySlice'

type TDeityDataManager = TChildDataManager<TCompendium, TDeity, TDeityRequest> & {
  compendium?: TCompendium,
  deity?: TDeity,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useDeityDataManager = (): TDeityDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'deity',
    'compendium',
    deitySlice,
    compendiumSlice,
    DeityService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    deity: manager.entity,
    notes: useMemo(() => createNotableDataManager(deitySlice, DeityService.notes), []),
    quests: useMemo(() => createQuestableDataManager(deitySlice, DeityService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(deitySlice, DeityService.encounters), []),
    images: useMemo(() => createImageableDataManager(deitySlice, DeityService.images), [])
  }
}

export default useDeityDataManager;
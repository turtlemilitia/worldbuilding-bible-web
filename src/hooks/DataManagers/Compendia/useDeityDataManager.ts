import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TDeity, TCompendium } from '../../../types'
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
import { campaignSlice } from '../../../reducers/campaign/campaignSlice'
import DeityService, { TDeityRequest } from '../../../services/ApiService/Compendia/DeityService'
import { deitySlice } from '../../../reducers/compendium/deity/deitySlice'

type TUseDeityDataManager = TUseChildDataManager<TCampaign, TDeity, TDeityRequest> & {
  compendium?: TCompendium,
  deity?: TDeity,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useDeityDataManager = (): TUseDeityDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'deity',
    'campaign',
    deitySlice,
    campaignSlice,
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
import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TNaturalResource, TCompendium } from '../../../types'
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
import NaturalResourceService, { TNaturalResourceRequest } from '../../../services/ApiService/Compendia/NaturalResourceService'
import { naturalResourceSlice } from '../../../reducers/compendium/naturalResource/naturalResourceSlice'

type TUseNaturalResourceDataManager = TUseChildDataManager<TCampaign, TNaturalResource, TNaturalResourceRequest> & {
  compendium?: TCompendium,
  naturalResource?: TNaturalResource,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useNaturalResourceDataManager = (): TUseNaturalResourceDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'naturalResource',
    'campaign',
    naturalResourceSlice,
    campaignSlice,
    NaturalResourceService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    naturalResource: manager.entity,
    notes: useMemo(() => createNotableDataManager(naturalResourceSlice, NaturalResourceService.notes), []),
    quests: useMemo(() => createQuestableDataManager(naturalResourceSlice, NaturalResourceService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(naturalResourceSlice, NaturalResourceService.encounters), []),
    images: useMemo(() => createImageableDataManager(naturalResourceSlice, NaturalResourceService.images), [])
  }
}

export default useNaturalResourceDataManager;
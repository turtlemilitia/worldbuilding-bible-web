import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TNaturalResource, TCompendium } from '../../../types'
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
import NaturalResourceService, { TNaturalResourceRequest } from '../../../services/ApiService/Compendia/NaturalResourceService'
import { naturalResourceSlice } from '../../../reducers/compendium/naturalResource/naturalResourceSlice'

type TNaturalResourceDataManager = TChildDataManager<TCompendium, TNaturalResource, TNaturalResourceRequest> & {
  compendium?: TCompendium,
  naturalResource?: TNaturalResource,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useNaturalResourceDataManager = (): TNaturalResourceDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'naturalResource',
    'compendium',
    naturalResourceSlice,
    compendiumSlice,
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
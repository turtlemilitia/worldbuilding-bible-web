import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TReligion, TCompendium } from '../../../types'
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
import ReligionService, { TReligionRequest } from '../../../services/ApiService/Compendia/ReligionService'
import { religionSlice } from '../../../reducers/compendium/religion/religionSlice'

type TReligionDataManager = TChildDataManager<TCompendium, TReligion, TReligionRequest> & {
  compendium?: TCompendium,
  religion?: TReligion,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useReligionDataManager = (): TReligionDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'religion',
    'compendium',
    religionSlice,
    compendiumSlice,
    ReligionService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    religion: manager.entity,
    notes: useMemo(() => createNotableDataManager(religionSlice, ReligionService.notes), []),
    quests: useMemo(() => createQuestableDataManager(religionSlice, ReligionService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(religionSlice, ReligionService.encounters), []),
    images: useMemo(() => createImageableDataManager(religionSlice, ReligionService.images), [])
  }
}

export default useReligionDataManager;
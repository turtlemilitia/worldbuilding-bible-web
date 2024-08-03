import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TPantheon, TCompendium } from '../../../types'
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
import PantheonService, { TPantheonRequest } from '../../../services/ApiService/Compendia/PantheonService'
import { pantheonSlice } from '../../../reducers/compendium/pantheon/pantheonSlice'

type TPantheonDataManager = TChildDataManager<TCompendium, TPantheon, TPantheonRequest> & {
  compendium?: TCompendium,
  pantheon?: TPantheon,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const usePantheonDataManager = (): TPantheonDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'pantheon',
    'compendium',
    pantheonSlice,
    compendiumSlice,
    PantheonService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    pantheon: manager.entity,
    notes: useMemo(() => createNotableDataManager(pantheonSlice, PantheonService.notes), []),
    quests: useMemo(() => createQuestableDataManager(pantheonSlice, PantheonService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(pantheonSlice, PantheonService.encounters), []),
    images: useMemo(() => createImageableDataManager(pantheonSlice, PantheonService.images), [])
  }
}

export default usePantheonDataManager;
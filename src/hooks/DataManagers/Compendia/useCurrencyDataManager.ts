import { createChildDataManager, TChildDataManager } from '../createChildDataManager'
import { TCurrency, TCompendium } from '../../../types'
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
import CurrencyService, { TCurrencyRequest } from '../../../services/ApiService/Compendia/CurrencyService'
import { currencySlice } from '../../../reducers/compendium/currency/currencySlice'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'

type TCurrencyDataManager = TChildDataManager<TCompendium, TCurrency, TCurrencyRequest> & {
  compendium?: TCompendium,
  currency?: TCurrency,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useCurrencyDataManager = (): TCurrencyDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'currency',
    'compendium',
    currencySlice,
    compendiumSlice,
    CurrencyService,
  ), [])
  return {
    ...manager,
    compendium: manager.parent,
    currency: manager.entity,
    notes: useMemo(() => createNotableDataManager(currencySlice, CurrencyService.notes), []),
    quests: useMemo(() => createQuestableDataManager(currencySlice, CurrencyService.quests), []),
    encounters: useMemo(() => createEncounterableDataManager(currencySlice, CurrencyService.encounters), []),
    images: useMemo(() => createImageableDataManager(currencySlice, CurrencyService.images), [])
  }
}

export default useCurrencyDataManager;
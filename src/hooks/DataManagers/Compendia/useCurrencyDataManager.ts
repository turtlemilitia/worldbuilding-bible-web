import { createChildDataManager, TUseChildDataManager } from '../createChildDataManager'
import { TCampaign, TCurrency, TCompendium } from '../../../types'
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
import CurrencyService, { TCurrencyRequest } from '../../../services/ApiService/Compendia/CurrencyService'
import { currencySlice } from '../../../reducers/compendium/currency/currencySlice'

type TUseCurrencyDataManager = TUseChildDataManager<TCampaign, TCurrency, TCurrencyRequest> & {
  compendium?: TCompendium,
  currency?: TCurrency,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useCurrencyDataManager = (): TUseCurrencyDataManager => {
  const manager = useMemo(() => createChildDataManager(
    'currency',
    'campaign',
    currencySlice,
    campaignSlice,
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
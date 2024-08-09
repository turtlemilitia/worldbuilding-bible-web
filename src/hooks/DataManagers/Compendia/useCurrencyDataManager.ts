import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { TCurrency, TCompendium } from '../../../types'
import {
  useEncounterableDataManager,
  useNotableDataManager,
  useQuestableDataManager,
  hasEncountersAttachableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '../useImageableDataManager'
import CurrencyService, { TCurrencyRequest } from '../../../services/ApiService/Compendia/CurrencyService'
import { currencySlice } from '../../../reducers/compendium/currency/currencySlice'
import { compendiumSlice } from '../../../reducers/compendium/compendiumSlice'

type TCurrencyDataManager = TChildDataManager<TCompendium, TCurrency, TCurrencyRequest> & {
  compendium?: TCompendium,
  currency?: TCurrency,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useCurrencyDataManager = (): TCurrencyDataManager => {
  const manager = useChildDataManager(
    'currency',
    'compendium',
    currencySlice,
    compendiumSlice,
    CurrencyService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    currency: manager.entity,
    notes: useNotableDataManager(currencySlice, CurrencyService.notes),
    quests: useQuestableDataManager(currencySlice, CurrencyService.quests),
    encounters: useEncounterableDataManager(currencySlice, CurrencyService.encounters),
    images: useImageableDataManager(currencySlice, CurrencyService.images)
  }
}

export default useCurrencyDataManager;
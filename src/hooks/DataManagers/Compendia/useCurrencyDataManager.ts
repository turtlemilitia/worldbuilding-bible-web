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
import { compendiaIndexSlice } from '@/reducers/compendium/compendiaIndexSlice'

export type TCurrencyDataManager = TChildDataManager<TCompendium, TCurrency, TCurrencyRequest> & {
  compendium?: TCompendium,
  currency?: TCurrency,
} & hasImageableDataManager & hasNotesAttachableDataManager & hasQuestsAttachableDataManager & hasEncountersAttachableDataManager

const useCurrencyDataManager = (compendiumId?: number, id?: number): TCurrencyDataManager => {
  const manager = useChildDataManager(
    'currencies',
    'compendia',
    compendiumId,
    id,
    compendiaIndexSlice,
    CurrencyService,
  )
  return {
    ...manager,
    compendium: manager.parent,
    currency: manager.entity,
    notes: useNotableDataManager(manager, CurrencyService.notes),
    quests: useQuestableDataManager(manager, CurrencyService.quests),
    encounters: useEncounterableDataManager(manager, CurrencyService.encounters),
    images: useImageableDataManager(manager, CurrencyService.images)
  }
}

export default useCurrencyDataManager;
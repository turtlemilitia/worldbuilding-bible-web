import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import sceneService, { TSceneRequest } from '../../../services/ApiService/Campaigns/SceneService'
import {
  hasNotesAttachableDataManager,
  hasEncountersAttachableDataManager,
  useEncounterableDataManager,
  useNotableDataManager,
  useCharacterableDataManager,
  hasCharactersAttachableDataManager,
  useLocationableDataManager,
  hasLocationsAttachableDataManager,
} from '../useAttachableDataManager'
import { useImageableDataManager, hasImageableDataManager } from '@/hooks/DataManagers'
import { TCampaign, TScene } from '@/types'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

export type TSceneDataManager = TChildDataManager<TCampaign, TScene, TSceneRequest> & {
  campaign?: TCampaign,
  scene?: TScene
} & hasNotesAttachableDataManager & hasImageableDataManager & hasEncountersAttachableDataManager & hasCharactersAttachableDataManager & hasLocationsAttachableDataManager

const useSceneDataManager = (campaignId?: number, id?: number): TSceneDataManager => {
  const manager = useChildDataManager(
    'scenes',
    'campaigns',
    campaignId,
    id,
    campaignsIndexSlice,
    sceneService,
  )
  return {
    ...manager,
    scene: manager.entity,
    notes: useNotableDataManager(manager, sceneService.notes),
    encounters: useEncounterableDataManager(manager, sceneService.encounters),
    characters: useCharacterableDataManager(manager, sceneService.characters),
    locations: useLocationableDataManager(manager, sceneService.locations),
    images: useImageableDataManager(manager, sceneService.images)
  }
}

export default useSceneDataManager;
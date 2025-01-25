import { useChildDataManager, TChildDataManager } from '../useChildDataManager'
import { sceneSlice } from '@/reducers/campaign/scene/sceneSlice'
import { campaignSlice } from '@/reducers/campaign/campaignSlice'
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
    notes: useNotableDataManager(sceneSlice, sceneService.notes),
    encounters: useEncounterableDataManager(sceneSlice, sceneService.encounters),
    characters: useCharacterableDataManager(sceneSlice, sceneService.characters),
    locations: useLocationableDataManager(sceneSlice, sceneService.locations),
    images: useImageableDataManager(sceneSlice, sceneService.images)
  }
}

export default useSceneDataManager;
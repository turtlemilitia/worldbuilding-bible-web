import {useChildDataManager, TChildDataManager} from '../useChildDataManager'
import sessionService from '../../../services/ApiService/Campaigns/SessionService'
import {
    hasNotesAttachableDataManager,
    useSceneableDataManager,
    hasScenesAttachableDataManager,
    hasEncountersAttachableDataManager,
    useEncounterableDataManager,
    useNotableDataManager,
    useQuestableDataManager,
    hasQuestsAttachableDataManager
} from '../useAttachableDataManager'
import {useImageableDataManager, hasImageableDataManager} from '../useImageableDataManager'
import {TCampaign, TSession} from '@/types'
import {TSessionRequest} from '@/services/ApiService/Campaigns/SessionService'
import { campaignsIndexSlice } from '@/reducers/campaign/campaignsIndexSlice'

export type TSessionDataManager =
    TChildDataManager<TCampaign, TSession, TSessionRequest>
    & {
    campaign?: TCampaign,
    session?: TSession,
}
    & hasNotesAttachableDataManager
    & hasImageableDataManager
    & hasScenesAttachableDataManager
    & hasEncountersAttachableDataManager
    & hasQuestsAttachableDataManager

const useSessionDataManager = (campaignId?: number, id?: number): TSessionDataManager => {
    const manager = useChildDataManager(
        'sessions',
        'campaigns',
        campaignId,
        id,
        campaignsIndexSlice,
        sessionService,
    )
    return {
        ...manager,
        session: manager.entity,
        campaign: manager.parent,
        notes: useNotableDataManager(manager, sessionService.notes),
        encounters: useEncounterableDataManager(manager, sessionService.encounters),
        scenes: useSceneableDataManager(manager, sessionService.scenes),
        quests: useQuestableDataManager(manager, sessionService.quests),
        images: useImageableDataManager(manager, sessionService.images)
    }
}

export default useSessionDataManager;
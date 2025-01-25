import {useChildDataManager, TChildDataManager} from '../useChildDataManager'
import {sessionSlice} from '../../../reducers/campaign/session/sessionSlice'
import {campaignSlice} from '../../../reducers/campaign/campaignSlice'
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
import {TCampaign, TSession} from '../../../types'
import {TSessionRequest} from '../../../services/ApiService/Campaigns/SessionService'
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
        notes: useNotableDataManager(sessionSlice, sessionService.notes),
        encounters: useEncounterableDataManager(sessionSlice, sessionService.encounters),
        scenes: useSceneableDataManager(sessionSlice, sessionService.scenes),
        quests: useQuestableDataManager(sessionSlice, sessionService.quests),
        images: useImageableDataManager(sessionSlice, sessionService.images)
    }
}

export default useSessionDataManager;
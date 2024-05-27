import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TEncounter } from '../../../types'
import { setEncounterData, updateEncounterData } from '../../../reducers/campaign/encounter/encounterSlice'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { useContext, useEffect, useMemo } from 'react'
import { EncounterWrapperContext } from '../../../components/EncounterWrapper/component'

const useEncounterPageData = () => {

  const { campaignId, encounterId } = useParams() as { campaignId: string; encounterId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { encounter: persistedData } = useAppSelector((state: RootState) => state.encounter) // redux]

  const isNew: boolean = useMemo(() => encounterId === 'new', [encounterId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  // todo reconsider this? doesn feel right
  const types = useContext(EncounterWrapperContext);

  // default data
  const { state: locationState } = useLocation()
  useEffect(() => {
    if (locationState?.type) {
      dispatch(updateEncounterData({ type: types?.find(type => type.id === locationState.type) }))
    }
  }, [locationState])

  return {
    isNew,
    canEdit,
    campaignId,
    encounterId,
    persistedData,
    setPersistedData: (data?: TEncounter) => dispatch(setEncounterData(data)),
    updatePersistedData: (data: Partial<TEncounter>) => dispatch(updateEncounterData(data)),
    resetPersistedData: () => dispatch(setEncounterData(undefined)),
    onCreated: (data: TEncounter) => {
      dispatch(addCampaignChildData({ field: 'encounters', data: data }))
      navigate(`/campaigns/${campaignId}/encounters/${data?.slug}`)
    },
    onUpdated: (data: TEncounter) => {
      dispatch(updateCampaignChildData({ field: 'encounters', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCampaignChildData({ field: 'encounters', id: encounterId }))
      navigate(`/campaigns/${campaignId}`)
    },
  }

}

export default useEncounterPageData

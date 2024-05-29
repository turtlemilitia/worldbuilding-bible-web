import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign } from '../../types'
import { addCampaign, removeCampaign } from '../../reducers/campaign/campaignsIndexSlice'
import { setCampaignData, updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { useMemo } from 'react'

const useCampaignPageData = () => {

  const { compendiumId, campaignId } = useParams() as { compendiumId: string; campaignId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { campaign: persistedData } = useAppSelector((state: RootState) => state.campaign) // redux]

  const isNew: boolean = useMemo(() => campaignId === 'new', [campaignId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    campaignId,
    persistedData,
    setPersistedData: (data?: TCampaign) => dispatch(setCampaignData(data)),
    updatePersistedData: (data: Partial<TCampaign>) => dispatch(updateCampaignData(data)),
    resetPersistedData: () => dispatch(setCampaignData(undefined)),
    onCreated: (data: TCampaign) => {
      dispatch(addCampaign(data))
      navigate(`/campaigns/${data?.slug}`)
    },
    onDeleted: () => {
      dispatch(removeCampaign({id: campaignId}))
      navigate(`/campaigns`)
    },
  }

}

export default useCampaignPageData

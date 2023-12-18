import React, { FunctionComponent, JSX } from 'react'
import Post from '../../components/Post/component'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign } from '../../types'
import { updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { storeCampaign, updateCampaign } from '../../services/CampaignService'
import { viewCampaign } from '../../services/CampaignService'
import { addCampaign } from '../../reducers/campaign/campaignsIndexSlice'

const Campaign: FunctionComponent = (): JSX.Element => {

  const { campaignId } = useParams() as { campaignId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const isNew: boolean = campaignId === 'new'

  const handleSubmit = (data: any): Promise<TCampaign> => {
    if (isNew) {
      return storeCampaign(data)
        .then(({ data }) => {
          dispatch(updateCampaignData(data.data))
          dispatch(addCampaign(data.data))
          navigate(`/campaigns/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCampaign(campaignId, data)
        .then(({ data }) => {
          dispatch(updateCampaignData(data.data))
          return data.data;
        })
    }
  }

  const handleReset = () => {};

  const handleFetch = async () => {
    if (campaignId && !isNew && !campaign) {
      await viewCampaign(campaignId)
        .then(response => {
          dispatch(updateCampaignData(response.data.data))
        })
    }
    if (isNew) {
      handleReset()
    }

  }

  return (
    <Post
      key={campaignId}
      initialValues={campaign}
      onSubmit={handleSubmit}
      onFetch={handleFetch}
      ready={true}
      fields={[]}
      resetData={handleReset}
    />
  )

}

export default Campaign

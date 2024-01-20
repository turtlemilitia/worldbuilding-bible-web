import React, { FunctionComponent, JSX, useState } from 'react'
import Post from '../../components/Post/component'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TLocationGovernmentType, TSystem } from '../../types'
import { clearCampaignData, setCampaignData, updateCampaignData } from '../../reducers/campaign/campaignSlice'
import { destroyCampaign, storeCampaign, TCampaignRequest, updateCampaign } from '../../services/CampaignService'
import { viewCampaign } from '../../services/CampaignService'
import { addCampaign, removeCampaign } from '../../reducers/campaign/campaignsIndexSlice'
import { TFields } from '../../components/InfoBar'

const Campaign: FunctionComponent = (): JSX.Element => {

  const { campaignId } = useParams() as { campaignId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const dispatch = useAppDispatch() // redux

  const readyDataForRequest = (data: any): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    visibility: data.visibility.id
  })

  const fields: TFields[] = [
    {
      name: 'visibility',
      label: 'Visibiliy',
      type: 'select',
      options: [
        { id: 1, name: 'Public' },
        { id: 2, name: 'Private' },
      ]
    }
  ]

  return (
    <Post
      key={campaignId}
      isNew={campaignId === 'new'}
      pathToNew={(data) => `/campaigns/${data.slug}`}
      pathAfterDelete={`/`}
      ready={true}

      onFetch={() => viewCampaign(campaignId).then(({ data }) => data.data)}
      onCreate={(data: TCampaignRequest) => storeCampaign(data).then(({ data }) => data.data)}
      onUpdate={(data: TCampaignRequest) => updateCampaign(campaignId, data).then(({ data }) => data.data)}
      onDelete={() => destroyCampaign(campaignId)}
      onCreated={(data) => {
        dispatch(addCampaign(data))
      }}
      onDeleted={() => {
        dispatch(removeCampaign({ id: campaignId }))
      }}
      requestStructureCallback={readyDataForRequest}

      fields={fields}

      persistedData={campaign as TCampaign}
      setPersistedData={(data) => dispatch(setCampaignData(data))}
      updatePersistedData={(data) => dispatch(updateCampaignData(data))}
      resetPersistedData={() => dispatch(clearCampaignData(undefined))}
    />
  )

}

export default Campaign

import React, { FunctionComponent, JSX, useCallback } from 'react'
import Post from '../../components/Post/component'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign, TLocationGovernmentType, TSystem } from '../../types'
import {
  addCampaignChildData,
  clearCampaignData,
  setCampaignData,
  setCampaignLoading,
  updateCampaignData
} from '../../reducers/campaign/campaignSlice'
import {
  createCampaignInvitation,
  destroyCampaign,
  storeCampaign,
  TCampaignRequest,
  updateCampaign
} from '../../services/CampaignService'
import { viewCampaign } from '../../services/CampaignService'
import { addCampaign, removeCampaign } from '../../reducers/campaign/campaignsIndexSlice'
import { TFields } from '../../components/InfoBar'
import ListAddUsers from './ListAddUsers/component'

const include = 'users;invitations'

const Campaign: FunctionComponent = (): JSX.Element => {

  const { campaignId } = useParams() as { campaignId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const dispatch = useAppDispatch() // redux

  const readyDataForRequest = (data: any): TCampaignRequest => ({
    name: data.name,
    content: data.content,
  })

  const onPostFetch = useCallback(async () => {
    // we tell it it's loading so we avoid loading it twice when CompendiaWrapper loads
    dispatch(setCampaignLoading(true));
    return viewCampaign(campaignId, { include })
      .then(({ data }) => {
        dispatch(setCampaignLoading(false))
        return data.data
      })
  }, [dispatch])

  const fields: TFields[] = [
    {
      name: 'invitations',
      label: 'Invite a new player',
      type: 'callback',
      Callback: () => <ListAddUsers
        users={campaign.users || []}
        invitations={campaign.invitations || []}
        onSubmit={(email) => createCampaignInvitation(campaign.slug, { email })
          .then((response) => {
            const newInvitationData = response.data.data;
            dispatch(addCampaignChildData({ field: 'invitations', data: newInvitationData }))
          })
        }
      />
    }
  ]

  return (
    <Post
      key={campaignId}
      isNew={campaignId === 'new'}
      pathToNew={(data) => `/campaigns/${data.slug}`}
      pathAfterDelete={`/`}
      ready={true}
      mapData={readyDataForRequest}

      onFetch={onPostFetch}
      onCreate={(data: TCampaignRequest) => storeCampaign(readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onUpdate={(data: TCampaignRequest) => updateCampaign(campaignId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onDelete={() => destroyCampaign(campaignId)}
      onCreated={(data) => {
        dispatch(addCampaign(data))
      }}
      onDeleted={() => {
        dispatch(removeCampaign({ id: campaignId }))
      }}

      fields={fields}

      persistedData={campaign as TCampaign}
      setPersistedData={(data) => dispatch(setCampaignData(data))}
      updatePersistedData={(data) => dispatch(updateCampaignData(data))}
      resetPersistedData={() => dispatch(clearCampaignData(undefined))}
    />
  )

}

export default Campaign

import React, { FunctionComponent, JSX } from 'react'
import Post from '../../components/Post/Post'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { TCampaign } from '../../types'
import {
  addCampaignChildData,
  clearCampaignData,
  setCampaignData,
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
import ListAddUsers from './ListAddUsers/component'
import { TField } from '../../hooks/useFields'

const include = 'users;invitations;compendium'

const Campaign: FunctionComponent = (): JSX.Element => {

  const { campaignId } = useParams() as { campaignId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux
  const { compendia } = useAppSelector((state: RootState) => state.compendia) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const readyDataForRequest = (data: any): TCampaignRequest => ({
    name: data.name,
    content: data.content,
    compendium_id: data.compendium?.id
  })

  const fields: TField[] = (campaign) ? [
    {
      name: 'invitations',
      label: 'Invite a new player',
      type: 'callback',
      Callback: () => <ListAddUsers
        users={campaign.users || []}
        invitations={campaign.invitations || []}
        onSubmit={(email) => createCampaignInvitation(campaign.slug, { email })
          .then((response) => {
            const newInvitationData = response.data.data
            dispatch(addCampaignChildData({ field: 'invitations', data: newInvitationData }))
          })
        }
      />
    }
  ] : []

  if (compendia.length > 0) {
    fields.push(
      {
        name: 'compendium',
        label: 'Compendium',
        type: 'select',
        options: compendia
      }
    )
  }

  return (
    <Post
      key={campaignId}
      isNew={campaignId === 'new'}
      pageTypeName={'Campaign'}
      ready={true}

      mapData={readyDataForRequest}
      canEdit={campaign && campaign.canUpdate}
      canDelete={campaign && campaign.canUpdate}

      onFetch={() => viewCampaign(campaignId, { include }).then(({ data }) => data.data)}
      onCreate={(data: TCampaignRequest) => storeCampaign(readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onUpdate={(data: TCampaignRequest) => updateCampaign(campaignId, readyDataForRequest(data), { include }).then(({ data }) => data.data)}
      onDelete={() => destroyCampaign(campaignId)}
      onCreated={(data) => {
        dispatch(addCampaign(data))
        navigate(`/campaigns/${data.slug}`)
      }}
      onDeleted={() => {
        dispatch(removeCampaign({ id: campaignId }))
        navigate(`/`)
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

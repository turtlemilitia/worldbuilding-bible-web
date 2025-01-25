import React, { FunctionComponent, JSX } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../components/Post'
import { TCampaign } from '@/types'
import { useCampaignForm } from '../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'

const Campaign: FunctionComponent = (): JSX.Element => {

  const navigate = useNavigate()

  const { campaignId } = useParams() as { campaignId: string }

  const form = useCampaignForm({
    campaignId: fixId(campaignId),
    onCreated: (data: TCampaign) => {
      navigate(`/campaigns/${data?.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaigns`)
    },
  })

  return (
    <Post
      pageTypeName={'Campaign'}
      form={form}
    />
  )
}

export default Campaign

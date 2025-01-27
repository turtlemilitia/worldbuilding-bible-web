import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useQuestForm } from '../../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'

const Quest: FunctionComponent = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const { campaignId,  campaignSlug,questId } = useParams() as { campaignId: string, campaignSlug: string; questId: string } // router

  const form = useQuestForm({
    campaignId: fixId(campaignId),
    questId: fixId(questId),
    onCreated: (data) => {
      navigate(`/campaigns/${campaignId}/${campaignSlug}/quests/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaigns/${campaignId}/${campaignSlug}/quests`)
    },
  })

  useEffect(() => {
    if (location.state?.type) {
      form.onFieldChange('type', location.state.type)
    }
  }, [form.data?.type, location.state?.type])

  return (
    <Post
      pageTypeName={'Quest'}
      form={form}
    />
  )
}

export default Quest

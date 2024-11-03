import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useQuestForm } from '../../../hooks/Forms'

const Quest: FunctionComponent = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const { campaignId, questId } = useParams() as { campaignId: string, questId: string } // router

  const form = useQuestForm({
    questId,
    onCreated: (data) => {
      navigate(`/campaigns/${campaignId}/quests/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaigns/${campaignId}/quests`)
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

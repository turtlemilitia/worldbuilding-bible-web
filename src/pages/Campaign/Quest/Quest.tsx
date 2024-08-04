import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useQuestForm } from '../../../hooks/Forms'

const Quest: FunctionComponent = () => {

  const navigate = useNavigate()

  const { campaignId, questId } = useParams() as { campaignId: string, questId: string } // router

  const form = useQuestForm({
    questId,
    onCreated: (data) => {
      navigate(`/campaign/${campaignId}/quests/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaign/${campaignId}/quests`)
    },
  })

  return (
    <Post
      pageTypeName={'Quest'}
      form={form}
    />
  )
}

export default Quest

import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useQuestForm } from '../../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'
import useUrlFormatter from '@/hooks/useUrlFormatter'

const Quest: FunctionComponent = () => {

  const navigate = useNavigate()
  const location = useLocation();

  const { campaignId, questId } = useParams() as { campaignId: string, questId: string } // router
  const { campaignPath } = useUrlFormatter()

  const form = useQuestForm({
    campaignId: fixId(campaignId),
    questId: fixId(questId),
    onCreated: (data) => {
      navigate(`${campaignPath}/quests/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${campaignPath}/quests`)
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

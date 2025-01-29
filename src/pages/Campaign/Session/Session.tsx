import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSessionForm } from '../../../hooks/Forms'
import useUrlFormatter from '@/hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'

const Session: FunctionComponent = () => {

  const navigate = useNavigate()

  const { campaignId, sessionId } = useParams() as { campaignId: string, sessionId: string } // router
  const { campaignPath } = useUrlFormatter()

  const form = useSessionForm({
    campaignId: fixId(campaignId),
    sessionId: fixId(sessionId),
    onCreated: (data) => {
      navigate(`${campaignPath}/sessions/${data.id}/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`${campaignPath}/sessions`)
    },
  })

  return (
    <Post
      pageTypeName={'Session'}
      form={form}
    />
  )
}

export default Session

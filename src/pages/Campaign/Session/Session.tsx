import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSessionForm } from '../../../hooks/Forms'

const Session: FunctionComponent = () => {

  const navigate = useNavigate()

  const { campaignId, sessionId } = useParams() as { campaignId: string, sessionId: string } // router

  const form = useSessionForm({
    sessionId,
    onCreated: (data) => {
      navigate(`/campaign/${campaignId}/sessions/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/campaign/${campaignId}/sessions`)
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

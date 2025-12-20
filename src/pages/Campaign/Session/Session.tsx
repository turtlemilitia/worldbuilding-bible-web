import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useSessionForm } from '../../../hooks/Forms'
import useUrlFormatter from '@/hooks/useUrlFormatter'
import { fixId } from '@/utils/dataUtils'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { TCampaign } from '@/types'
import { replace } from 'lodash'

const Session: FunctionComponent = () => {

  const navigate = useNavigate()

  const { campaignId, sessionNumber } = useParams() as { campaignId: string, sessionNumber: string } // router
  const { campaignPath } = useUrlFormatter()
  const { campaign } = useCurrentCampaign()
  const sessionId = (campaign as TCampaign).sessions.find(session => String(session.session_number) === sessionNumber)?.id as number

  const form = useSessionForm({
    campaignId: fixId(campaignId),
    sessionId: fixId(sessionId),
    onCreated: (data) => {
      navigate(`${campaignPath}/sessions/${data.session_number}/${data.slug}`)
    },
    onUpdated: (data) => {
      navigate(`${campaignPath}/sessions/${data.session_number}/${data.slug}`, { replace: true })
    },
    onDeleted: () => {
      navigate(`${campaignPath}/sessions`)
    },
  })

  return (
    <Post
      pageTypeName={`Session ${sessionNumber}`}
      form={form}
    />
  )
}

export default Session

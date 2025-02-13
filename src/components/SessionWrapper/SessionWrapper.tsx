import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import SessionSidebar from './SessionSidebar'
import { TGenericPostBasic, TSession } from '@/types'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const SessionWrapper: FunctionComponent = () => {

  const { campaign } = useCurrentCampaign()

  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.id || sessionId || !campaign.sessions) {
      return;
    }
    if (campaign.sessions?.length > 0) {
      const latestSession = campaign.sessions.reduce<TGenericPostBasic & { session_number: TSession['session_number'] }|null>((latest, session) => {
        return session.session_number > (latest?.session_number || 0) ? session : latest;
      }, null);
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/sessions/${latestSession?.id}/${latestSession?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.id}/${campaign.slug}/sessions/new`)
    }

  }, [sessionId, campaign?.sessions, campaign?.id, campaign?.slug])

  return (
    <>
      {campaign && campaign.sessions && (
        <SessionSidebar campaign={campaign}/>
      )}
      <div className="relative w-full h-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SessionWrapper
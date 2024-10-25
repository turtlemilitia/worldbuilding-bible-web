import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import SessionSidebar from './SessionSidebar'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { TGenericPostBasic, TSession } from '@/types'

const SessionWrapper: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()

  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.slug || sessionId) {
      return;
    }
    if (campaign.sessions?.length > 0) {
      const latestSession = campaign.sessions.reduce<TGenericPostBasic & { session_number: TSession['session_number'] }|null>((latest, session) => {
        return session.session_number > (latest?.session_number || 0) ? session : latest;
      }, null);
      navigate(`/campaigns/${campaign.slug}/sessions/${latestSession?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/sessions/new`)
    }

  }, [sessionId, campaign?.sessions, campaign?.slug])

  return (
    <>
      {campaign && (
        <SessionSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default SessionWrapper
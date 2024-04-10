import React, { FunctionComponent, useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import SessionSidebar from './SessionSidebar'

const SessionWrapper: FunctionComponent = () => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { sessionId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    if (!campaign?.slug || sessionId) {
      return;
    }
    if (campaign.sessions?.length > 1) {
      navigate(`/campaigns/${campaign.slug}/sessions/${campaign.sessions[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/sessions/new`)
    }

  }, [campaign?.slug])

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
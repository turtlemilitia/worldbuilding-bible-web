import React, { FunctionComponent, JSX, useMemo } from 'react'
import {
  destroySession,
  storeSession,
  TSessionRequest,
  updateSession,
  viewSession
} from '../../services/SessionService'
import { clearSessionData, setSessionData, updateSessionData } from '../../reducers/campaign/session/sessionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCampaignChildData,
  updateCampaignChildData
} from '../../reducers/campaign/campaignSlice'
import { TSession } from '../../types'
import Post from '../../components/Post/Post'
import { removeCompendiumChildData } from '../../reducers/compendium/compendiumSlice'

const Session: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate()

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux
  const { session } = useAppSelector((state: RootState) => state.session) // redux

  const readyDataForRequest = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
    session_number: data.session_number,
    scheduled_at: data.scheduled_at,
    duration: data.duration,
    location: data.location,
  })

  const nextSessionNumber = useMemo(
    () => campaign?.sessions.reduce((prev, { session_number }) => ((prev ? prev : Number(session_number)) + 1), 0),
    [campaign?.sessions]
  )

  return (
    <Post
      key={sessionId}
      isNew={sessionId === 'new'}
      pageTypeName={'Session'}
      canEdit={session.canUpdate}
      canDelete={session.canDelete}
      ready={true}

      onFetch={() => viewSession(sessionId).then(({ data }) => data.data)}
      onCreate={(data: TSessionRequest) => storeSession(campaignId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TSessionRequest) => updateSession(sessionId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroySession(sessionId)}
      onCreated={(data) => {
        dispatch(addCampaignChildData({ field: 'sessions', data: data }))
        navigate(`/campaigns/${campaignId}/sessions/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCampaignChildData({ field: 'sessions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'sessions', id: sessionId }))
        navigate(`/campaigns/${campaignId}`)
      }}

      fields={[
        {
          name: 'session_number',
          label: 'Session number',
          type: 'number',
          required: true
        },
        {
          name: 'scheduled_at',
          label: 'Scheduled at',
          type: 'text',
          required: true
        },
        {
          name: 'duration',
          label: 'Duration (hours)',
          type: 'number'
        },
        {
          name: 'location',
          label: 'Location',
          type: 'text'
        }
      ]}

      defaultData={{
        name: `Session ${nextSessionNumber}`,
        session_number: nextSessionNumber,
        scheduled_at: new Date().toISOString().substring(0, 10)
      }}

      persistedData={session as TSession}
      setPersistedData={(data) => dispatch(setSessionData(data))}
      updatePersistedData={(data) => dispatch(updateSessionData(data))}
      resetPersistedData={() => dispatch(clearSessionData(undefined))}
    />
  )
}

export default Session

import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
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
import Post from '../../components/Post/component'
import { removeCompendiumChildData } from '../../reducers/compendium/compendiumSlice'

const Session: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router

  const { session } = useAppSelector((state: RootState) => state.session) // redux

  const readyDataForRequest = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={sessionId}
      isNew={sessionId === 'new'}
      pathToNew={(data: TSession) => `/campaigns/${campaignId}/sessions/${data.slug}`}
      pathAfterDelete={`/sessions/${campaignId}`}
      ready={true}

      onFetch={() => viewSession(sessionId).then(({ data }) => data.data)}
      onCreate={(data: TSessionRequest) => storeSession(campaignId, data).then(({ data }) => data.data)}
      onUpdate={(data: TSessionRequest) => updateSession(sessionId, data).then(({ data }) => data.data)}
      onDelete={() => destroySession(sessionId)}
      onCreated={(data: TSession) => {
        dispatch(addCampaignChildData({ field: 'sessions', data: data }))
      }}
      onUpdated={(data: TSession) => {
        dispatch(updateCampaignChildData({ field: 'sessions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'sessions', id: sessionId }))
      }}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={session as TSession}
      setPersistedData={(data) => dispatch(setSessionData(data))}
      updatePersistedData={(data) => dispatch(updateSessionData(data))}
      resetPersistedData={() => dispatch(clearSessionData(undefined))}
    />
  )
}

export default Session

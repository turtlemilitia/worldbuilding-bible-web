import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeSession, TSessionRequest, updateSession, viewSession } from '../../services/SessionService'
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
import { TFields } from '../../components/InfoBar'

const Session: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux
  const { session } = useAppSelector((state: RootState) => state.session) // redux

  const dispatch = useAppDispatch() // redux

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = sessionId === 'new'

  const readyDataForRequest = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TSession> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeSession(campaignId, validated)
        .then(({ data }) => {
          dispatch(setSessionData(data.data))
          dispatch(addCampaignChildData({ field: 'sessions', data: data.data }))
          navigate(`/campaigns/${campaignId}/sessions/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateSession(sessionId, validated)
        .then(({ data }) => {
          dispatch(updateSessionData(data.data))
          dispatch(updateCampaignChildData({ field: 'sessions', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={sessionId}
      isNew={isNew}
      ready={true}
      remoteData={session as TSession}
      onSave={submit}
      onFetch={() => viewSession(sessionId, { include: 'campaign' }).then(({data}) => data.data)}
      fields={[]}
      setRemoteData={(data) => dispatch(setSessionData(data))}
      resetData={() => dispatch(clearSessionData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Session

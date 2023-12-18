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

  const reset = () => dispatch(clearSessionData(undefined));

  const fetch = async () => {
    if (sessionId && !isNew) {
      await viewSession(sessionId, { include: 'campaign' })
        .then(response => {
          dispatch(setSessionData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {
    if (sessionId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearSessionData(undefined))
    }
    return () => {
      dispatch(clearSessionData(undefined))
    }
  }, [sessionId])

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

  const fields: TFields[] = []

  return (
    <Post
      key={sessionId}
      ready={true}
      initialValues={session as TSession}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Session

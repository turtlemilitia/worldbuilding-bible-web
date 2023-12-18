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
import { TSession, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Session: FunctionComponent = (): JSX.Element => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux
  const { session } = useAppSelector((state: RootState) => state.session) // redux

  const dispatch = useAppDispatch() // redux

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = sessionId === 'new'

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TLocationType[]>([])

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

    if (campaign.slug) {
      indexSpecies(campaign.slug).then(response => setSpecies(response.data.data))
    }

  }, [campaign.slug])

  useEffect(() => {

    if (species.length) {
      setReady(true)
    }

  }, [species])

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

  const fields: TFields[] = [
    {
      name: 'age',
      label: 'Age',
      type: 'number'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'text'
    },
    {
      name: 'species',
      label: 'Species',
      type: 'select',
      options: species
    }
  ]

  return (
    <Post
      key={sessionId}
      ready={ready}
      initialValues={session as TSession}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Session

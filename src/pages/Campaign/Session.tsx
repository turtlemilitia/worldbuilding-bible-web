import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitle from '../../components/Forms/Fields/PageTitleField'
import ContentWrapper from '../../components/ContentWrapper'
import { Editor } from '../../components/Forms/Fields/Editor'
import { storeSession, TSessionRequest, updateSession, viewSession } from '../../services/SessionService'
import {
  clearSessionData,
  setSessionData,
  updateSessionData
} from '../../reducers/campaign/session/sessionSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCampaignData } from '../../reducers/campaign/campaignSlice'

const Session: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { campaignId, sessionId } = useParams() as { campaignId: string; sessionId: string } // router

  const { session } = useAppSelector((state: RootState) => state.session) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = sessionId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewSession(sessionId, { include: 'campaign' })
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setSessionData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (sessionId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearSessionData(undefined))
    }
    return () => {
      dispatch(clearSessionData(undefined))
    }
  }, [sessionId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true
  }

  const readyDataForRequest = (data: any): TSessionRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!validate()) {
      return
    }
    setLoading(true)
    const validated = readyDataForRequest(data)
    if (isNew) {
      storeSession(campaignId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setSessionData(data.data))
          dispatch(setCampaignData({ 'hasSessions': true }))
          // dispatch(addSession(data.data)) todo
          navigate(`/campaigns/${campaignId}/sessions/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateSession(sessionId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateSessionData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Session">
          <PageTitle value={data.name}
                     onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                     placeholder={'Session Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-3">

            </div>
            <div className="w-full md:w-2/4 max-w-2xl px-3 lg:flex-1">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the session.'}
              />}
            </div>
            <div className="flex lg:w-1/4 lg:px-3"></div>
            {/*spacer*/}
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Session

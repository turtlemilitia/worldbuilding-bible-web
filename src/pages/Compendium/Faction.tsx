import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import ContentWrapper from '../../components/ContentWrapper'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import { storeFaction, TFactionRequest, updateFaction, viewFaction } from '../../services/FactionService'
import {
  clearFactionData,
  setFactionData,
  updateFactionData
} from '../../reducers/compendium/faction/factionSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import FactionInfoBar from './FactionInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCompendiumData } from '../../reducers/compendium/compendiumSlice'

const Faction: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, factionId } = useParams() as { compendiumId: string; factionId: string } // router

  const { faction } = useAppSelector((state: RootState) => state.faction) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = factionId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewFaction(factionId, ['compendium'])
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setFactionData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (factionId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearFactionData(undefined))
    }
    return () => {
      dispatch(clearFactionData(undefined))
    }
  }, [factionId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true;
  }

  const readyDataForRequest = (data: any): TFactionRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!validate()) {
      return;
    }
    setLoading(true)
    const validated = readyDataForRequest(data);
    if (isNew) {
      storeFaction(compendiumId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setFactionData(data.data))
          dispatch(setCompendiumData({ 'hasFactions': true }))
          // dispatch(addFaction(data.data)) todo
          navigate(`/compendia/${compendiumId}/factions/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateFaction(factionId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateFactionData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Faction">
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                           placeholder={'Faction Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <FactionInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <DiscreetTextareaField
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the faction.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Faction;
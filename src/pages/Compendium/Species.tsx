import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import ContentWrapper from '../../components/ContentWrapper'
import Editor from '../../components/Forms/Fields/Editor'
import { storeSpecies, TSpeciesRequest, updateSpecies, viewSpecies } from '../../services/SpeciesService'
import {
  clearSpeciesData,
  setSpeciesData,
  updateSpeciesData
} from '../../reducers/compendium/species/speciesSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import SpeciesInfoBar from './SpeciesInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCompendiumData } from '../../reducers/compendium/compendiumSlice'

const Species: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, speciesId } = useParams() as { compendiumId: string; speciesId: string } // router

  const { species } = useAppSelector((state: RootState) => state.species) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = speciesId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewSpecies(speciesId, ['compendium'])
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setSpeciesData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (speciesId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearSpeciesData(undefined))
    }
    return () => {
      dispatch(clearSpeciesData(undefined))
    }
  }, [speciesId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true;
  }

  const readyDataForRequest = (data: any): TSpeciesRequest => ({
    name: data.name,
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
      storeSpecies(compendiumId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setSpeciesData(data.data))
          dispatch(setCompendiumData({ 'hasSpecies': true }))
          // dispatch(addSpecies(data.data)) todo
          navigate(`/compendia/${compendiumId}/species/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateSpecies(speciesId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateSpeciesData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Species">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                          placeholder={'Species Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <SpeciesInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the species.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Species;
